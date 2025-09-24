import { useContext, useState, useEffect } from "react";
import { onValue, ref } from "firebase/database";
import { ChatContext } from "../../../context/ChatContext";
import { database } from "../../../utils/firebase";

function MessageHead({ current }) {
  const [onlineStatus, setOnlineStatus] = useState(false);

  const {
    initFirebaseChatSession,
    unreadMessage,
    selectedChat,
    setSelectedChat,
  } = useContext(ChatContext);

  // Watch online status from Firebase Realtime DB
  const watchOnlineStatus = (currentEmployer) => {
    const onlineStatusRef = ref(
      database,
      "online-status/" + `employer-${currentEmployer.employer_id}`
    );
    onValue(onlineStatusRef, (snapshot) => {
      const data = snapshot.val();
      setOnlineStatus(!!data?.isOnline);
    });
  };

  useEffect(() => {
    initFirebaseChatSession(current.employer_id);
    watchOnlineStatus(current);
  }, []);

  // Count how many unread messages are from this employer
  const unreadCount =
    unreadMessage?.filter((msg) => msg?.sender_id === current?.employer_id)
      ?.length || 0;

  return (
    <li
      key={current.id}
      onClick={() => setSelectedChat(current)}
      className={`border-l border-r lg:border-0 lg:border-b lg:items-center min-w-20 lg:w-full flex ${
        selectedChat?.id === current.id
          ? "bg-primaryColor text-white"
          : "bg-opacity-0 text-black hover:bg-gray-100 hover:text-black"
      } cursor-pointer px-2 justify-between items-start gap-[10px] border-b min-h-[50px]`}
    >
      {/* Avatar or image could go here */}
      <div className="flex flex-col h-fit w-full relative pr-2">
        <section className="w-full flex items-center justify-between gap-2">
          <h4 className="text-sm font-semibold">{current?.employer_name}</h4>

          {unreadCount > 0 && (
            <span
              key={unreadCount} // helps re-render for animation
              className="transition-all duration-300 ease-out transform scale-100 opacity-100 my-auto h-max w-max px-2 py-0.5 text-xs bg-red-500 text-white font-medium rounded-full flex items-center justify-center"
            >
              {unreadCount}
            </span>
          )}
        </section>
        {onlineStatus && (
          <div className="absolute top-0 right-0 flex items-center pt-1">
            <div className="h-[8px] w-[8px] animate-pulse rounded-full bg-green-400" />
          </div>
        )}
      </div>
    </li>
  );
}

export default MessageHead;
