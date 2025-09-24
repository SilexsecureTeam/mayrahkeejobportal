import { Helmet } from "react-helmet";
import MessagedList from "./MessagesList";
import { chat_dummies } from "../../../utils/dummies";
import ChatComponent from "./ChatComponent";
import { useState, useEffect, useContext } from "react";
import { ApplicationContext } from "../../../context/ApplicationContext";
import { ChatContext } from "../../../context/ChatContext";

function Messages() {
  const applicationUtils = useContext(ApplicationContext);
  const [loading, setLoading] = useState(true);

  const byCompany = () => {
    const newList = [];

    applicationUtils?.jobApplications?.forEach((current) => {
      if (!newList.some((app) => app.employer_id === current.employer_id)) {
        newList.push(current);
      }
    });

    return newList;
  };

  useEffect(() => {
    const fetchApps = async () => {
      setLoading(true);
      try {
        await applicationUtils.getJobApplications();
      } catch (err) {
        console.error("Failed to fetch applications", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApps();
  }, []);

  return (
    <>
      <Helmet>
        <title>Company Dashboard | Messages</title>
      </Helmet>
      <div className="h-full w-full flex py-2 justify-between flex-col overflow-hidden">
        <h1 className="font-semibold text-md">Messages</h1>

        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-500"></div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col md:flex-row border-2 w-full h-[90%]">
            <MessagedList chats={chat_dummies} data={byCompany()} />
            <ChatComponent />
          </div>
        )}
      </div>
    </>
  );
}

export default Messages;
