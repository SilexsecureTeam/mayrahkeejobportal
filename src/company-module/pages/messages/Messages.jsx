import { Helmet } from "react-helmet";
import MessagedList from "../../components/messages/MessagesList";
import { chat_dummies } from "../../../utils/dummies";
import ChatComponent from "../../components/messages/ChatComponent";
import { useEffect } from "react";
import useApplicationManagement from "../../../hooks/useApplicationManagement";
import { useState } from "react";
import { FiMessageSquare, FiX } from "react-icons/fi";

function Messages() {
  const applicationUtils = useApplicationManagement();
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-md">Messages</h1>
          {/* Toggle button only on mobile */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 rounded hover:bg-gray-200"
          >
            {sidebarOpen ? <FiX size={20} /> : <FiMessageSquare size={20} />}
          </button>
        </div>

        <div className="relative flex-1 flex flex-col md:flex-row border-2 w-full h-[90%]">
          {/* Loading state */}
          {applicationUtils.applicantLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-500"></div>
            </div>
          ) : (
            <>
              <div
                className={`h-full w-full md:w-1/4 p-2 border-r absolute md:relative top-0 left-0  bg-white transform transition-transform duration-300 z-20
                  ${
                    sidebarOpen
                      ? "translate-x-0"
                      : "-translate-x-[999px] md:translate-x-0"
                  }
                `}
              >
                <MessagedList
                  data={applicants}
                  closeSidePanel={() => setSidebarOpen(false)}
                />
              </div>

              {/* Overlay for mobile when sidebar open */}
              {sidebarOpen && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-40 z-10 md:hidden"
                  onClick={() => setSidebarOpen(false)}
                />
              )}

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
