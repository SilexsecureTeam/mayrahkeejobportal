import { Helmet } from "react-helmet";
import MessagedList from "../../components/messages/MessagesList";
import { chat_dummies } from "../../../utils/dummies";
import ChatComponent from "../../components/messages/ChatComponent";
import { useState } from "react";

function Messages() {

  const [selectedChat, setSelectedChat] = useState(null)

  return (
    <>
      <Helmet>
        <title>Company Dashboard | Messages</title>
      </Helmet>
      <div className="h-full w-full flex p-2 justify-between  flex-col">
        <h1 className="font-semibold text-md">Messages</h1>

        <div className="flex border-2 h-[95%] w-full">
              <MessagedList chats={chat_dummies} setSelectedChat={setSelectedChat} selectedChat={selectedChat}/>
              <ChatComponent chats={chat_dummies} setSelectedChat={setSelectedChat} selectedChat={selectedChat}/>
        </div>
      </div>
    </>
  );
}

export default Messages;
