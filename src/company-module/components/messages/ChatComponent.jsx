import { useState } from "react";
import clipIcon from "../../../assets/pngs/clip-icon.png";
import sendIcon from "../../../assets/pngs/send-icon.png";
import { useEffect } from "react";
import { resourceUrl } from "../../../services/axios-client";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContex";
import useCompanyProfile from "../../../hooks/useCompanyProfile";
import useChats from "../../../hooks/useChats";
import Spinner from "../../../components/Spinner";
import { BiLoaderCircle } from "react-icons/bi";
import { ChatContext } from "../../../context/ChatContext";
import { onValue, ref } from "firebase/database";
import { database } from "../../../utils/firebase";

function ChatComponent({ selectedChat, setSelectedChat, applicationUtils }) {
  const [currentCandidate, setCurrentCandidate] = useState();
  const { authDetails } = useContext(AuthContext);

  const [message, setMessage] = useState("");

  const { details } = useCompanyProfile();
  const { loading, messages, sendMessage, getMessages, firebaseMessaging } =
    useContext(ChatContext);

  const onSendButtonClick = () => {
    const messageToSend = {
      sender_id: authDetails.user.id,
      sender_type: authDetails.user.role,
      receiver_id: currentCandidate?.candidate_id,
      receiver_type: "candidate",
      message: message,
      date_sent: new Date().toDateString(),
    };
    firebaseMessaging(selectedChat.candidate_id, messageToSend);
    sendMessage(messageToSend, () => {
      setMessage("");
    });
  };

  const openCommunication = () => {
    if (!currentCandidate) return;
    const path = `employer-${authDetails.user.id}-candidate-${selectedChat.candidate_id}`;
    const messageRef = ref(database, `messages/` + path);

    onValue(messageRef, (snapshot) => {
      const data = snapshot.val();
      getMessages(currentCandidate.candidate_id, () => {});
      console.log("Message Data", data);
    });
  };

  useEffect(() => {
    openCommunication();
  }, [currentCandidate]);

  useEffect(() => {
    if (selectedChat) {
      applicationUtils.getApplicant(
        selectedChat?.candidate_id,
        setCurrentCandidate
      );
    }
    return setCurrentCandidate();
  }, [selectedChat]);

  return (
    currentCandidate && (
      <div className="w-[70%] relative h-full flex flex-col items-center">
        {/* Chat Header */}
        <div className="h-[15%] border-b flex w-full">
          {/* Profile */}
          <div className="flex w-[40%] items-center p-2 gap-[10px]">
            <img
              src={`${resourceUrl}/${currentCandidate?.profile}`}
              className="h-[50px] w-[50px] rounded-full bg-gray-300"
            />
            <div className="flex flex-col">
              <h4 className="text-md font-semibold">
                {currentCandidate?.full_name}
              </h4>
              <span className="text-sm  text-gray-400">
                {selectedChat.job_title} Role
              </span>
            </div>
          </div>

          <div className="w-[50%]"></div>
        </div>

        <ul className="flex w-full flex-col p-2 h-[75%] overflow-y-auto">
          {messages &&
            messages.length !== 0 &&
            messages?.map((current) => {
              const getPositions = (sender) => {
                switch (sender) {
                  case "candidate":
                    return [
                      "",
                      "",
                      `${resourceUrl}/${currentCandidate.profile}`,
                      currentCandidate.full_name.split(" ", 1),
                    ];
                  default:
                    return [
                      " flex-row-reverse place-self-end",
                      "items-end",
                      `${resourceUrl}/${details.logo_image}`,
                    ];
                }
              };

              const positions = getPositions(current.sender_type);

              return (
                <li
                  className={`flex w-[50%] bf gap-[10px] mt-3 ${positions[0]} `}
                >
                  <img
                    src={positions[2]}
                    className="h-[30px] w-[30px] rounded-full bg-gray-300"
                  />

                  <div className={`flex flex-col w-[60%] ${positions[1]}`}>
                    <span className="text-little font-semibold">
                      {positions[3] ? positions[3] : "you"}
                    </span>
                    <p className="h-fit min-w-[40%] w-fit rounded-md p-2 mt-2 text-center text-little bg-gray-200">
                      {current.message}
                    </p>
                  </div>
                </li>
              );
            })}
        </ul>

        {/* Inout */}
        <div className="w-[90%] bg-white items-center justify-between absolute px-2 h-[35px] flex border bottom-2 left-5">
          <img src={clipIcon} className="h-[20px]" />
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="h-full p-2 w-[80%] focus:outline-none text-little"
            placeholder="Reply Message"
          />

          <button
            onClick={onSendButtonClick}
            className="h-fit w-[8%] rounded-sm flex p-1 justify-center items-center bg-primaryColor"
          >
            {loading ? (
              <BiLoaderCircle className="animate-spin text-white" />
            ) : (
              <img src={sendIcon} className="h-[15px]" />
            )}
          </button>
        </div>
      </div>
    )
  );
}

export default ChatComponent;
