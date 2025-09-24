import { Helmet } from "react-helmet";
import MessagedList from "../../components/messages/MessagesList";
import { chat_dummies } from "../../../utils/dummies";
import ChatComponent from "../../components/messages/ChatComponent";
import { useEffect } from "react";
import useApplicationManagement from "../../../hooks/useApplicationManagement";

function Messages() {
  const applicationUtils = useApplicationManagement();

  const byApplicants = () => {
    const newList = [];

    applicationUtils.applicants?.forEach((current) => {
      if (!newList.some((app) => app.candidate_id === current.candidate_id)) {
        newList.push(current);
      }
    });

    return newList;
  };

  useEffect(() => {
    applicationUtils.getApplicantsByEmployee();
  }, []);

  const applicants = byApplicants();

  return (
    <>
      <Helmet>
        <title>Company Dashboard | Messages</title>
      </Helmet>

      <div className="h-full w-full flex p-2 justify-between flex-col overflow-hidden">
        <h1 className="font-semibold text-md">Messages</h1>

        <div className="relative flex-1 flex flex-col md:flex-row border-2 w-full h-[90%]">
          {/* Loading state */}
          {applicationUtils.applicantLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-500"></div>
            </div>
          ) : (
            <>
              <MessagedList chats={chat_dummies} data={applicants} />
              <ChatComponent
                chats={chat_dummies}
                applicationUtils={applicationUtils}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Messages;
