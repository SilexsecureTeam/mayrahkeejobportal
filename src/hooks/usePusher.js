import { useEffect, useRef, useContext } from "react";
import Pusher, { Channel } from "pusher-js";
import { onNewNotificationToast } from "../utils/notifications/onNewMessageToast";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContex";
import { useNavigate } from "react-router-dom";

const usePusher = ({ userId, role, token }) => {
  const pusherRef = useRef(null);
  const channelRef = useRef(null);

  const selectedChatRef = useRef(null);

  const chatContext = useContext(ChatContext);
  const { appendMessage, markMessageAsRead, selectedChat } = chatContext || {};

  const { authDetails } = useContext(AuthContext);

  const navigate = useNavigate();

  // Keep latest selectedChat in ref
  useEffect(() => {
    selectedChatRef.current = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    if (!userId || !token || !role) return;

    // Clean previous connection
    if (pusherRef.current) {
      try {
        pusherRef.current.disconnect();
      } catch (e) {
        console.warn("Pusher disconnect error:", e);
      }
      pusherRef.current = null;
    }

    const channelName = `user.${userId}.${role}`;

    const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
      cluster: "mt1",
      forceTLS: true,
      disableStats: true,
      enabledTransports: ["ws", "wss"],
      auth: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    const channel = pusher.subscribe(channelName);

    const handleMessage = (data) => {
      const newMessage = data?.message;
      if (!newMessage) return;

      const otherUserId = newMessage.sender_id;

      // Use latest selectedChat ref
      const currentChat = selectedChatRef.current;
      const isCurrentChat =
        (currentChat?.candidate_id &&
          Number(currentChat.candidate_id) === Number(otherUserId)) ||
        (currentChat?.employer_id &&
          Number(currentChat.employer_id) === Number(otherUserId));

      if (isCurrentChat) {
        markMessageAsRead(newMessage.id);
      } else {
        onNewNotificationToast({
          senderName: data?.sender?.sender_name || newMessage?.sender_type,
          message: newMessage?.message,
          onClick: () => {
            navigate(`/${role === "employer" ? "company" : role}/messages`, {
              state: { chat: newMessage },
            });
          },
        });
      }

      appendMessage(otherUserId, newMessage);
    };

    channel.bind("NewMessageEvent", handleMessage);
    pusherRef.current = pusher;
    channelRef.current = channel;

    return () => {
      try {
        pusher.disconnect();
      } catch (e) {
        console.warn("Cleanup error:", e);
      }
    };
  }, [userId, token]);
};

export default usePusher;
