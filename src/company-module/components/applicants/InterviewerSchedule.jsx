function IntervieweSchedule() {
  return (
    <>
      <div className="w-full flex justify-between px-2">
        <h3 className="font-semibold text-sm px-2">Interview List</h3>
        <button className="text-primaryColor font-semibold text-little">
          Schedule Interview
        </button>
      </div>

      <ul className="w-full items-start flex-col gap-[15px]  pl-6 text-gray-400 text-little flex justify-between">
        <li className="w-[80%] flex flex-col  gap-[5px] ">
          <span>Tomorrow - 10 July, 2021</span>
          <div className="border w-full p-2 flex items-center justify-between">
            <div className="h-[35px] w-[35px] rounded-full bg-gray-400" />

            <div className="flex flex-col justify-center items-center gap-[2px]">
              <span className="font-semibold ">Jerome Bell</span>
              <span className=" ">Product Designer</span>
            </div>

            <div className="flex flex-col justify-center items-center gap-[2px]">
              <span className="font-semibold ">10:00 AM - 11:30pm</span>
              <span className=" ">Silver Crysta Room, Nomad</span>
            </div>

            <button className="px-2 py-[3px] h-fit border border-primaryColor text-primaryColor">Add Feedback</button>
          </div>
        </li>
        <li className="w-[80%] flex flex-col  gap-[5px] ">
          <span>Tomorrow - 10 July, 2021</span>
          <div className="border w-full p-2 flex items-center justify-between">
            <div className="h-[35px] w-[35px] rounded-full bg-gray-400" />

            <div className="flex flex-col justify-center items-center gap-[2px]">
              <span className="font-semibold ">Jerome Bell</span>
              <span className=" ">Product Designer</span>
            </div>

            <div className="flex flex-col justify-center items-center gap-[2px]">
              <span className="font-semibold ">10:00 AM - 11:30pm</span>
              <span className=" ">Silver Crysta Room, Nomad</span>
            </div>

            <button className="px-2 py-[3px] h-fit border border-primaryColor text-primaryColor">Add Feedback</button>
          </div>
        </li>
        <li className="w-[80%] flex flex-col  gap-[5px] ">
          <span>Tomorrow - 10 July, 2021</span>
          <div className="border w-full p-2 flex items-center justify-between">
            <div className="h-[35px] w-[35px] rounded-full bg-gray-400" />

            <div className="flex flex-col justify-center items-center gap-[2px]">
              <span className="font-semibold ">Jerome Bell</span>
              <span className=" ">Product Designer</span>
            </div>

            <div className="flex flex-col justify-center items-center gap-[2px]">
              <span className="font-semibold ">10:00 AM - 11:30pm</span>
              <span className=" ">Silver Crysta Room, Nomad</span>
            </div>

            <button className="px-2 py-[3px] h-fit border border-primaryColor text-primaryColor">Add Feedback</button>
          </div>
        </li>
        <li className="w-[80%] flex flex-col  gap-[5px] ">
          <span>Tomorrow - 10 July, 2021</span>
          <div className="border w-full p-2 flex items-center justify-between">
            <div className="h-[35px] w-[35px] rounded-full bg-gray-400" />

            <div className="flex flex-col justify-center items-center gap-[2px]">
              <span className="font-semibold ">Jerome Bell</span>
              <span className=" ">Product Designer</span>
            </div>

            <div className="flex flex-col justify-center items-center gap-[2px]">
              <span className="font-semibold ">10:00 AM - 11:30pm</span>
              <span className=" ">Silver Crysta Room, Nomad</span>
            </div>

            <button className="px-2 py-[3px] h-fit border border-primaryColor text-primaryColor">Add Feedback</button>
          </div>
        </li>
        
      </ul>
    </>
  );
}

export default IntervieweSchedule;
