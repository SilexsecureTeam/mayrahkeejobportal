import { useState, useEffect, useContext, useRef } from "react";
import clipIcon from "../../../assets/pngs/clip-icon.png";
import sendIcon from "../../../assets/pngs/send-icon.png";
import { resourceUrl } from "../../../services/axios-client";
import { AuthContext } from "../../../context/AuthContex";
import useCompanyProfile from "../../../hooks/useCompanyProfile";
import { ChatContext } from "../../../context/ChatContext";
import { BiLoaderCircle } from "react-icons/bi";
import { toast } from "react-toastify";

function ChatComponent({ selectedChat, setSelectedChat, applicationUtils }) {
  const chatContainer = useRef(null);
  const scrollAnchorRef = useRef(null);
  const [currentEmployer, setCurrentEmployer] = useState(null);
  const [message, setMessage] = useState("");

  const { authDetails } = useContext(AuthContext);
  const { details } = useCompanyProfile();
  const {
    loading,
    sendingMessage,
    messagesByConversation = {},
    sendMessage,
    getMessages,
    firebaseMessaging,
  } = useContext(ChatContext);

  const employerId = selectedChat?.employer_id;
  const currentMessages = messagesByConversation[employerId] || [];

  const onSendButtonClick = () => {
    if (!message.trim()) {
      toast.error("Enter a message");
      return;
    }

    const messageToSend = {
      sender_id: authDetails.user.id,
      sender_type: authDetails.user.role,
      receiver_id: employerId,
      receiver_type: "employer",
      message,
      date_sent: new Date().toISOString(),
    };

    sendMessage(messageToSend, () => setMessage(""));
  };

  // Scroll to bottom on new messages
  useEffect(() => {
    if (scrollAnchorRef.current) {
      scrollAnchorRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [currentMessages]);

  // Load employer and messages
  useEffect(() => {
    if (selectedChat) {
      applicationUtils.getCompany(employerId, setCurrentEmployer);
      getMessages(employerId);
    }

    return () => setCurrentEmployer(null);
  }, [selectedChat]);

  // Loading state
  if (loading && !sendingMessage) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <BiLoaderCircle className="animate-spin text-4xl text-primaryColor" />
      </div>
    );
  }

  // Empty or null state
  if (!selectedChat || !currentEmployer) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No employer selected.
      </div>
    );
  }

  return (
    <div className="w-full lg:w-3/4 flex flex-col items-center overflow-y-auto relative h-full">
      {/* Header */}
      <div className="h-max border-b flex w-full">
        <div className="flex w-full items-center p-2 gap-[10px]">
          <img
            src={`${resourceUrl}/${currentEmployer.logo_image}`}
            className="h-[50px] w-[50px] rounded-full bg-gray-300 border border-gray-500"
            alt="Profile"
          />
          <div className="flex flex-col">
            <h4 className="text-md font-semibold">
              {currentEmployer.company_name}
            </h4>
            <span className="text-sm text-gray-400">
              {currentEmployer.sector}
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ul
        ref={chatContainer}
        className="flex-1 flex w-full flex-col p-2 pb-20 overflow-y-auto"
      >
        {currentMessages.length > 0 ? (
          currentMessages.map((current, index) => {
            const isEmployer = current.sender_type === "employer";
            const avatar = isEmployer
              ? `${resourceUrl}/${currentEmployer.logo_image}`
              : `${resourceUrl}/${details.logo_image}`;
            const name = isEmployer ? currentEmployer.company_name : "You";
            const rowStyle = isEmployer
              ? ""
              : "flex-row-reverse place-self-end";
            const alignStyle = isEmployer ? "" : "items-end";
            const time = new Date(current.updated_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <li
                key={index}
                className={`flex w-[60%] lg:w-[50%] gap-[10px] mt-3 ${rowStyle}`}
              >
                <img
                  src={avatar}
                  alt="Avatar"
                  className="flex-shrink-0 h-[30px] w-[30px] rounded-full bg-gray-300"
                />
                <div className={`flex flex-col w-max max-w-full ${alignStyle}`}>
                  <span className="text-sm font-semibold">{name}</span>
                  <p className="p-2 mt-2 rounded-md bg-gray-200">
                    {current.message}
                  </p>
                  <span className="text-[10px] text-gray-500 mt-1">{time}</span>
                </div>
              </li>
            );
          })
        ) : (
          <p className="text-center text-gray-500">No messages yet.</p>
        )}
        <div ref={scrollAnchorRef} />
      </ul>

      {/* Message Input */}
      <div className="flex items-center justify-between bg-white p-2 absolute w-full bottom-0 h-max border-t">
        <img src={clipIcon} className="h-[20px]" alt="Attach" />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 focus:outline-none text-sm h-10"
          placeholder="Reply Message"
        />
        <button
          onClick={onSendButtonClick}
          className="h-fit p-2 w-8 flex justify-center items-center bg-primaryColor text-white rounded-md"
        >
          {sendingMessage ? (
            <BiLoaderCircle className="animate-spin text-white" />
          ) : (
            <img src={sendIcon} alt="Send" title="send" className="h-[15px]" />
          )}
        </button>
      </div>
    </div>
  );
}

export default ChatComponent;
