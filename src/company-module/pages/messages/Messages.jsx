import { Helmet } from "react-helmet";
import MessagedList from "../../components/messages/MessagesList";
import { chat_dummies } from "../../../utils/dummies";
import ChatComponent from "../../components/messages/ChatComponent";
import { useState } from "react";
import { ApplicationContext } from "../../../context/ApplicationContext";
import { useContext } from "react";
import { useEffect } from "react";

function Messages() {
  const applicationUtils = useContext(ApplicationContext);
  const [selectedChat, setSelectedChat] = useState(null);

  const byApplicants = () => {
    const newList = [];

    applicationUtils.applicants.map((current) => {
      if (newList.length !== 0) {
        const doesExist = newList.filter(
          (currentApp) => current.candidate_id === currentApp.candidate_id
        );
        if (doesExist.length === 0) {
          newList.push(current);
        } else {
          return;
        }
      } else {
        newList.push(current);
      }
    });

    return newList;
  };

  useEffect(() => {
    applicationUtils.getApplicantsByEmployee();
  }, []);

  return (
    <>
      <Helmet>
        <title>Company Dashboard | Messages</title>
      </Helmet>
      <div className="h-full w-full flex p-2 justify-between  flex-col">
        <h1 className="font-semibold text-md">Messages</h1>

        <div className="flex border-2 h-[95%] w-full">
          <MessagedList
            chats={chat_dummies}
            data={byApplicants()}
            setSelectedChat={setSelectedChat}
            selectedChat={selectedChat}
          />
          <ChatComponent
            chats={chat_dummies}
            applicationUtils={applicationUtils}
            setSelectedChat={setSelectedChat}
            selectedChat={selectedChat}
          />
        </div>
      </div>
    </>
  );
}

export default Messages;
