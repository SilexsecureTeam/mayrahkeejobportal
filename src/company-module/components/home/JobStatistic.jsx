function JobStatistic() {
  return (
    <div className="border h-full w-[65%]  ">
      <div className="h-[28%] border-b px-2 justify-between pt-1 flex flex-col">
        <div className="w-full justify-between flex">
          <div className="flex flex-col">
            <h3 className="font-semibold text-sm">Job Statistics</h3>
            <span className=" text-gray-400 text-little">
              Showing Jobstatistic Jul 19-25
            </span>
          </div>

          <div className="w-[35%] flex justify-between p-1 bg-gray-400 h-[80%]">
            <button className="w-[30%] bg-white hover:scale-105 duration-75 text-black font-semibold text-little">
              Week
            </button>
            <button className="w-[30%] bg-white hover:scale-105 duration-75 text-black font-semibold text-little">
              Month
            </button>
            <button className="w-[30%] bg-white hover:scale-105 duration-75 text-black font-semibold text-little">
              Year
            </button>
          </div>
        </div>

        <h3 className="text-little border-b w-fit border-primaryColor font-semibold">
          Overview
        </h3>
      </div>
    </div>
  );
}

export default JobStatistic;
