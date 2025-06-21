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
  } = useChats();

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
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
