import { useEffect, useState } from "react";
import { resourceUrl } from "../../../services/axios-client";
import { useContext } from "react";
import { ChatContext } from "../../../context/ChatContext";
import { onValue, ref } from "firebase/database";
import { database } from "../../../utils/firebase";

function MessagedList({ chats, selectedChat, setSelectedChat, data }) {
  const {
    loading,
    messages,
    sendMessage,
    getMessages,
    initFirebaseChatSession,
  } = useContext(ChatContext);


  return (
    <div className="h-max w-full md:w-1/4 p-2 border-r">
      <input
        className="w-full border text-sm p-2 focus:outline-none"
        placeholder="Search messages"
      />

      <ul className="min-h-20 w-full flex flex-row md:flex-col py-2 overflow-x-auto overflow-y-hidden md:overflow-y-auto">
        {data?.map((current) => {
          const [onlineStatus, setOnlineStatus] = useState(false);
          const watchOnlineStatus = (currentCandidate) => {
            const onlineStatusRef = ref(
              database,
              "online-status/" + `candidate-${currentCandidate.candidate_id}`
            );
            onValue(onlineStatusRef, (snapshot) => {
              const data = snapshot.val();
              console.log("Online status Data", data);
              if (data && data?.isOnline) {
                setOnlineStatus(true);
              } else {
                setOnlineStatus(false);
              }
            });
          };
          initFirebaseChatSession(current.id);
          useEffect(() => {
            watchOnlineStatus(current);
          }, []);
          return (
            <li
              key={current.id}
              onClick={() => setSelectedChat(current)}
              className={`border-l border-r md:border-0 max-w-30 md:max-w-full flex ${
                selectedChat?.id === current.id
                  ? "bg-primaryColor text-white"
                  : "bg-opacity-0 text-black hover:bg-gray-100 hover:text-black "
              } cursor-pointer px-2 justify-between items-start gap-[10px]  border-b min-h-[50px]`}
            >
              {/* <img src={`${resourceUrl}/${current.}`} className="h-[35px] w-[35px] rounded-full bg-gray-300" /> */}
              <div className="truncate flex flex-col h-full">
                <h4 className="text-sm font-semibold">{current.full_name}</h4>
                <span className="text-little text-gray-400">
                  {current.job_title}
                </span>
              </div>
              {onlineStatus && (
                <div className="flex items-center gap-1 pt-1">
                  <div className="h-[8px] w-[8px] animate-pulse rounded-full bg-green-500" />
    
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MessagedList;
