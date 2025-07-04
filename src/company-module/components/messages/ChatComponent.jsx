import { useState, useEffect, useContext, useRef } from "react";
import clipIcon from "../../../assets/pngs/clip-icon.png";
import sendIcon from "../../../assets/pngs/send-icon.png";
import { resourceUrl } from "../../../services/axios-client";
import { AuthContext } from "../../../context/AuthContex";
import useCompanyProfile from "../../../hooks/useCompanyProfile";
import { ChatContext } from "../../../context/ChatContext";
import { BiLoaderCircle } from "react-icons/bi";
import { toast } from "react-toastify";

function ChatComponent({ applicationUtils }) {
  const scrollAnchorRef = useRef(null);
  const [currentCandidate, setCurrentCandidate] = useState(null);
  const [message, setMessage] = useState("");
  const [isMessagesLoaded, setIsMessagesLoaded] = useState(false);

  const { authDetails } = useContext(AuthContext);
  const { details } = useCompanyProfile();
  const {
    loading,
    sendingMessage,
    messagesByConversation = {},
    getMessages,
    sendMessage,
    markAllUnreadMessagesAsRead,
    selectedChat,
  } = useContext(ChatContext);

  const candidateId = selectedChat?.candidate_id;
  const currentMessages = messagesByConversation[candidateId] || [];

  const onSendButtonClick = () => {
    if (!message.trim()) {
      toast.error("Enter a message");
      return;
    }

    const messageToSend = {
      sender_id: authDetails.user.id,
      sender_type: authDetails.user.role,
      receiver_id: candidateId,
      receiver_type: "candidate",
      message,
      date_sent: new Date().toISOString(),
    };

    sendMessage(messageToSend, () => setMessage(""));
  };

  // Load candidate + messages
  useEffect(() => {
    if (!selectedChat) return;
    setIsMessagesLoaded(false);
    const id = selectedChat.candidate_id;

    applicationUtils.getApplicant(id, (profile) => {
      setCurrentCandidate(profile);

      const alreadyLoaded = !!messagesByConversation[id];

      if (!alreadyLoaded) {
        getMessages(id, () => {
          markAllUnreadMessagesAsRead(id);
          setIsMessagesLoaded(true);
        });
      } else {
        markAllUnreadMessagesAsRead(id);
        setIsMessagesLoaded(true);
      }
    });

    return () => {
      setCurrentCandidate(null);
      setIsMessagesLoaded(false);
    };
  }, [selectedChat?.candidate_id]);

  // Scroll to bottom after messages load
  useEffect(() => {
    if (isMessagesLoaded && scrollAnchorRef.current) {
      const timeout = setTimeout(() => {
        scrollAnchorRef.current.scrollIntoView({ behavior: "smooth" });
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [isMessagesLoaded, currentMessages.length]);

  return (
    <div className="w-full lg:w-3/4 flex flex-col items-center overflow-y-auto h-full relative">
      {loading ? (
        <div className="flex justify-center items-center h-full w-full">
          <BiLoaderCircle className="animate-spin text-4xl text-primaryColor" />
        </div>
      ) : currentCandidate ? (
        <>
          {/* Header */}
          <div className="h-max border-b flex w-full">
            <div className="flex w-full items-center p-2 gap-[10px]">
              <img
                src={`${resourceUrl}/${currentCandidate.profile}`}
                className="h-[50px] w-[50px] rounded-full bg-gray-300 border border-gray-500"
                alt="Profile"
              />
              <div className="flex flex-col">
                <h4 className="text-md font-semibold">
                  {currentCandidate.full_name}
                </h4>
                <span className="text-sm text-gray-400">
                  {selectedChat.job_title} Role
                </span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <ul className="flex-1 flex w-full flex-col p-2 pb-20 overflow-y-auto">
            {currentMessages.map((current, index) => {
              const isCandidate = current.sender_type === "candidate";
              const avatar = isCandidate
                ? `${resourceUrl}/${currentCandidate.profile}`
                : `${resourceUrl}/${details.logo_image}`;
              const name = isCandidate
                ? currentCandidate.full_name.split(" ", 1)
                : "You";
              const rowStyle = isCandidate
                ? ""
                : "flex-row-reverse place-self-end";
              const alignStyle = isCandidate ? "" : "items-end";

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
                  <div
                    className={`flex flex-col w-max max-w-full ${alignStyle}`}
                  >
                    <span className="text-sm font-semibold">{name}</span>
                    <p className="py-1 px-2 mt-2 rounded-md bg-gray-200">
                      {current.message}
                    </p>
                    <span className="text-[10px] text-gray-500 mt-1 block">
                      {new Date(current.updated_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </li>
              );
            })}

            <div ref={scrollAnchorRef} />
          </ul>

          {/* Input */}
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
                <img
                  src={sendIcon}
                  alt="Send"
                  title="send"
                  className="h-[15px]"
                />
              )}
            </button>
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          No candidate selected.
        </div>
      )}
    </div>
  );
}

export default ChatComponent;
