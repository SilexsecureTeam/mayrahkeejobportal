import { useEffect, useState, useContext } from "react";
import { resourceUrl } from "../../../services/axios-client";
import { ChatContext } from "../../../context/ChatContext";
import { onValue, ref } from "firebase/database";
import { database } from "../../../utils/firebase";

function MessagedList({ data, closeSidePanel }) {
  const { initFirebaseChatSession, selectedChat, setSelectedChat } =
    useContext(ChatContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [onlineUsers, setOnlineUsers] = useState({});
  const { unreadMessage } = useContext(ChatContext);

  // Track online status for all users in `data`
  useEffect(() => {
    if (!data || data.length === 0) return;

    const listeners = [];

    data.forEach((current) => {
      const userKey = `candidate-${current.candidate_id}`;
      const statusRef = ref(database, `online-status/${userKey}`);

      const unsubscribe = onValue(statusRef, (snapshot) => {
        const isOnline = snapshot.val()?.isOnline ?? false;
        setOnlineUsers((prev) => ({
          ...prev,
          [current.candidate_id]: isOnline,
        }));
      });

      listeners.push({ ref: statusRef, unsubscribe });
    });

    return () => {
      listeners.forEach(({ unsubscribe }) => unsubscribe());
    };
  }, [data]);

  // Initialize Firebase chat sessions (optional per your backend)
  useEffect(() => {
    data?.forEach((current) => {
      initFirebaseChatSession(current.id);
    });
  }, [data]);

  // Search filter
  const filteredList = data?.filter((user) => {
    const query = searchQuery.toLowerCase();
    return user.full_name?.toLowerCase().includes(query);
    // user.job_title?.toLowerCase().includes(query)
  });

  return (
    <div className="">
      <input
        className="w-full border text-sm p-2 mb-2 focus:outline-none"
        placeholder="Search messages"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <ul className="min-h-20 w-full flex flex-col py-2 overflow-x-auto overflow-y-hidden md:overflow-y-auto">
        {filteredList?.length > 0 ? (
          filteredList.map((current) => {
            const isOnline = onlineUsers[current.candidate_id];
            const unreadCount =
              unreadMessage?.filter(
                (msg) => msg?.sender_id === current?.candidate_id
              )?.length || 0;
            return (
              <li
                key={current.id}
                onClick={() => {
                  setSelectedChat(current);
                  closeSidePanel();
                }}
                className={`relative border-l border-r md:border-0 max-w-30 md:max-w-full flex ${
                  selectedChat?.id === current.id
                    ? "bg-primaryColor text-white"
                    : "bg-opacity-0 text-black hover:bg-gray-100 hover:text-black"
                } cursor-pointer px-2 pr-4 justify-between items-start gap-[10px] border-b min-h-[50px]`}
              >
                <div className="truncate flex flex-col h-full w-full">
                  <h4 className="text-sm font-semibold">
                    {current?.full_name}
                  </h4>
                  <section className="w-full flex items-center justify-between gap-2">
                    <span className="text-little text-gray-400">
                      {current.job_title}
                    </span>
                    {unreadCount > 0 && (
                      <span
                        key={unreadCount} // helps re-render for animation
                        className="transition-all duration-300 ease-out transform scale-100 opacity-100 my-auto h-max w-max px-2 py-0.5 text-xs bg-red-500 text-white font-medium rounded-full flex items-center justify-center"
                      >
                        {unreadCount}
                      </span>
                    )}
                  </section>
                </div>

                {isOnline && (
                  <div className="absolute top-0 right-1 flex items-center gap-1 pt-1">
                    <div className="h-[8px] w-[8px] animate-pulse rounded-full bg-green-500" />
                  </div>
                )}
              </li>
            );
          })
        ) : (
          <p className="text-gray-400 text-sm px-2">No conversations found</p>
        )}
      </ul>
    </div>
  );
}

export default MessagedList;
