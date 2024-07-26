import clipIcon from "../../../assets/pngs/clip-icon.png";
import sendIcon from "../../../assets/pngs/send-icon.png";

function ChatComponent({ selectedChat, setSelectedChat }) {
  return (
    <div className="w-[70%] relative h-full flex flex-col items-center">
      {/* Chat Header */}
      <div className="h-[15%] border-b flex w-full">
        {/* Profile */}
        <div className="flex w-[40%] items-center p-2 gap-[10px]">
          <div className="h-[50px] w-[50px] rounded-full bg-gray-300" />
          <div className="flex flex-col">
            <h4 className="text-md font-semibold">{selectedChat?.name}</h4>
            <span className="text-sm  text-gray-400">Some message</span>
          </div>
        </div>

        <div className="w-[50%]"></div>
      </div>

      <ul className="flex w-full flex-col p-2">
        <li className="flex w-[50%] flex-row-reverse gap-[10px] place-self-end">
          <div className="h-[30px] w-[30px] rounded-full bg-gray-300" />

          <div className="flex flex-col w-[60%] items-end">
            <span className="text-little font-semibold">You</span>
            <p className="h-fit p-2 mt-2 text-little bg-gray-300">
              Hey Jan, I wanted to reach out because we saw your work
              contributions and were impressed by your work.{" "}
            </p>
          </div>
        </li>

        <li className="flex w-[50%] gap-[10px] ">
          <div className="h-[30px] w-[30px] rounded-full bg-gray-300" />

          <div className="flex flex-col w-[60%]">
            <span className="text-little font-semibold">
              {selectedChat?.name}
            </span>

            <p className="h-fit p-2 mt-2 text-little bg-gray-300">
              Hi Maria, sure I would love to. Thanks for taking the time to see
              my work!.{" "}
            </p>
          </div>
        </li>
        <li className="flex w-[50%] flex-row-reverse gap-[10px] place-self-end">
          <div className="h-[30px] w-[30px] rounded-full bg-gray-300" />

          <div className="flex flex-col w-[60%] items-end">
            <span className="text-little font-semibold">You</span>
            <p className="h-fit p-2 mt-2 text-little bg-gray-300">
              Hey Jan, I wanted to reach out because we saw your work
              contributions and were impressed by your work.{" "}
            </p>
          </div>
        </li>
      </ul>

      {/* Inout */}
      <div className="w-[90%] bg-white items-center justify-between px-2 h-[35px] flex border absolute bottom-2 left-5">
        <img src={clipIcon} className="h-[20px]" />
        <input
          className="h-full p-2 w-[80%] text-little"
          placeholder="Reply Message"
        />

        <button className="h-fit w-[8%] rounded-sm flex p-1 justify-center items-center bg-primaryColor">
          <img src={sendIcon} className="h-[15px]" />
        </button>
      </div>
    </div>
  );
}

export default ChatComponent;
