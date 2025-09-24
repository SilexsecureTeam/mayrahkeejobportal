import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../../context/ChatContext";
import MessageHead from "./MessageHead";

function MessagedList({ data }) {
  const [searchTerm, setSearchTerm] = useState("");
  const { selectedChat, setSelectedChat } = useContext(ChatContext);

  // Filter chats based on search term
  const filteredData = data?.filter((chat) =>
    chat?.employer_name?.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="h-max w-full md:w-1/4 p-2 border-r">
      <input
        className="w-full border text-sm p-2 focus:outline-none"
        placeholder="Search messages"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
      />

      {filteredData?.length > 0 ? (
        <ul className="min-h-20 w-full flex flex-row lg:flex-col py-2 overflow-x-auto overflow-y-hidden lg:overflow-y-auto">
          {filteredData.map((current) => (
            <MessageHead key={current.id || current.name} current={current} />
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500 mt-2">No matches found.</p>
      )}
    </div>
  );
}

export default MessagedList;
