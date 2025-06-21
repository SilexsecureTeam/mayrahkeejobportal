import { useEffect, useRef, useContext } from "react";
import Pusher from "pusher-js";
import { onNewNotificationToast } from "../utils/notifications/onNewMessageToast";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContex";
import { useNavigate } from "react-router-dom";

const usePusher = ({ userId, role, token }) => {
  const pusherRef = useRef(null);
  const channelRef = useRef(null);
  const { appendMessage } = useContext(ChatContext);
  const { authDetails } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId || !token || !role) return;

    const channelName = `user.${userId}.${role}`;

    // Ensure only one instance
    if (pusherRef.current) {
      return;
    }

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

      // Avoid toast if from self
      if (otherUserId) {
        onNewNotificationToast({
          senderName: data?.sender?.sender_name || newMessage?.sender_type,
          message: newMessage?.message,
          onClick: () => {
            navigate(`/company/messages`, {
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
      if (channelRef.current) {
        channelRef.current.unbind("NewMessageEvent", handleMessage);
        pusher.unsubscribe(channelName);
      }
      pusher.disconnect();
      pusherRef.current = null;
      channelRef.current = null;
    };
  }, [userId, role, token]);
};

export default usePusher;
