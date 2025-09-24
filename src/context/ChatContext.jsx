import { createContext, useState } from "react";
import useChats from "../hooks/useChats";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const {
    loading,
    messagesByConversation,
    sendMessage,
    hasNewMessage,
    getMessages,
    setMessagesByConversation,
    initFirebaseChatSession,
    sendingMessage,
    appendMessage,
    unreadMessage,
    setUnreadMessage,
    unreadMessages,
    markMessageAsRead,
    markAllUnreadMessagesAsRead,
    isConversationFetched,
  } = useChats();

  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <ChatContext.Provider
      value={{
        loading,
        messagesByConversation,
        sendMessage,
        setMessagesByConversation,
        getMessages,
        hasNewMessage,
        initFirebaseChatSession,
        sendingMessage,
        appendMessage,
        unreadMessage,
        setUnreadMessage,
        unreadMessages,
        markMessageAsRead,
        markAllUnreadMessagesAsRead,
        selectedChat,
        setSelectedChat,
        isConversationFetched,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
