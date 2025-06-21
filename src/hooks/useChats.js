import { useContext, useState } from "react";
import { axiosClient } from "../services/axios-client";
import { FormatError } from "../utils/formmaters";
import { AuthContext } from "../context/AuthContex";
import { onValue, ref, set } from "firebase/database";
import { database } from "../utils/firebase";

function useChats() {
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails?.token, true);
  const [loading, setLoading] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [messagesByConversation, setMessagesByConversation] = useState({});
  const [hasNewMessage, setHasNewMessage] = useState(false);

  // Append a message to the right conversation
  const appendMessage = (userId, message) => {
    setMessagesByConversation((prev) => {
      const existing = prev[userId] || [];
      return {
        ...prev,
        [userId]: [...existing, message],
      };
    });
  };

  // Fetch all messages for one conversation
  const getMessages = async (userId, onSuccess = () => {}) => {
    setLoading(true);
    try {
      const role = authDetails.user.role;
      let uri, readUri;

      if (role === "employer") {
        uri = `/messages/all/${userId}/candidate/${authDetails.user.id}/${role}`;
        readUri = `/messages/read/${userId}/candidate`;
      } else {
        uri = `/messages/all/${authDetails.user.id}/${role}/${userId}/employer`;
        readUri = `/messages/read/${userId}/employer`;
      }

      const { data } = await client.get(uri);
      setMessagesByConversation((prev) => ({
        ...prev,
        [userId]: data.messages,
      }));

      // await client.post(readUri); // mark as read
      onSuccess();
    } catch (err) {
      FormatError(err);
    } finally {
      setLoading(false);
    }
  };

  // Send message
  const sendMessage = async (message, onSuccess = () => {}) => {
    setSendingMessage(true);
    try {
      const { data } = await client.post("/messages/send", message);
      appendMessage(message.receiver_id, data?.data);
      onSuccess();
    } catch (err) {
      FormatError(err);
    } finally {
      setSendingMessage(false);
    }
  };

  // Firebase session
  const initFirebaseChatSession = (receiverId) => {
    const path =
      authDetails.user.role === "employer"
        ? `employer-${authDetails.user.id}-candidate-${receiverId}`
        : `employer-${receiverId}-candidate-${authDetails.user.id}`;

    const chatRef = ref(database, `chats/` + path);
    onValue(chatRef, (snapshot) => {
      if (!snapshot.val()) {
        set(chatRef, {
          session_created: new Date(),
          employerId:
            authDetails.user.role === "employer"
              ? authDetails.user.id
              : receiverId,
          candidateId:
            authDetails.user.role === "candidate"
              ? authDetails.user.id
              : receiverId,
        });
      }
    });
  };

  return {
    loading,
    sendingMessage,
    messagesByConversation,
    getMessages,
    sendMessage,
    initFirebaseChatSession,
    appendMessage, // useful for pusher updates
    setMessagesByConversation,
  };
}

export default useChats;
