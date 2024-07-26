function MessagedList({ chats, selectedChat, setSelectedChat }) {
  return (
    <div className="h-full w-[30%] p-2 border-r">
      <input
        className="w-full border text-sm p-2 focus:outline-none"
        placeholder="Search messages"
      />

      <ul className="w-full items-start flex flex-col py-2 overflow-y-auto">
        {chats.map((current) => (
          <li
            key={current.id}
            onClick={() => setSelectedChat(current)}
            className={`w-full flex ${selectedChat?.id === current.id ? 'bg-primaryColor text-white' : 'bg-opacity-0 text-black hover:bg-gray-100 hover:text-black '} cursor-pointer px-2 justify-start items-center gap-[10px] border-b h-[50px]`}
          >
            <div className="h-[35px] w-[35px] rounded-full bg-gray-300" />
            <div className="flex flex-col">
              <h4 className="text-sm font-semibold">{current.name}</h4>
              <span className="text-little text-gray-400">Some message</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MessagedList;
