import { useContext, useEffect, useState } from "react";
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
          const watchOnlineStatus = (currentEmployer) => {
            console.log(current);
            const onlineStatusRef = ref(
              database,
              "online-status/" + `employer-${currentEmployer.employer_id}`
            );
            onValue(onlineStatusRef, (snapshot) => {
              const data = snapshot.val();
              if (data && data?.isOnline) {
                setOnlineStatus(true);
              } else {
                setOnlineStatus(false);
              }
            });
          };
          initFirebaseChatSession(current.employer_id);
          useEffect(() => {
            watchOnlineStatus(current);
          }, []);
          return (
            <li
              key={current.id}
              onClick={() => setSelectedChat(current)}
              className={`border-l border-r md:border-0 max-w-30 md:max-w-full flex ${selectedChat?.id === current.id
                ? "bg-primaryColor text-white"
                : "bg-opacity-0 text-black hover:bg-gray-100 hover:text-black "
                } cursor-pointer px-2 justify-between items-start gap-[10px]  border-b min-h-[50px]`}
            >
              {/* <img src={`${resourceUrl}/${current.}`} className="h-[35px] w-[35px] rounded-full bg-gray-300" /> */}
              <div className="flex flex-col h-full">
                <h4 className="text-sm font-semibold">
                  {current.employer_name}
                </h4>
                {onlineStatus && (
                  <div className="truncate flex flex-col h-full">
                    <h4 className="text-sm font-semibold">{current.full_name}</h4>
                    <span className="text-little font-thin italic pb-1">online</span>
                  </div>
                )}{" "}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MessagedList;
