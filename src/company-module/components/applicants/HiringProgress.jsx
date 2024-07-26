const stages = [
    {
      name: "In-Review",
      stage: "passed",
    },
    {
      name: "Shortlist",
      stage: "passed",
    },
    {
      name: "Interview",
      stage: "current",
    },
    {
      name: "Hired/Declined",
      stage: null,
    },
  ];
  
  function HiringProgress() {
    const bgColor = (current) => {
      if (current.stage === "passed") {
        return "bg-primaryColor/80";
      } else if (current.stage === "current") {
        return "bg-primaryColor";
      } else {
        return "bg-gray-300";
      }
    };
  
    return (
      <>
        <h3 className="font-semibold text-sm px-2">Current Stage</h3>
  
        <ul className="w-full px-2 flex justify-between">
          {stages.map((current) => (
            <li
              className={`w-[24%] flex items-center text-white font-semibold justify-center py-2 text-sm ${bgColor(
                current
              )}`}
            >
              {current.name}
            </li>
          ))}
        </ul>
  
        <h3 className="font-semibold text-sm px-2">Stage Info</h3>
  
        <div className="grid grid-cols-2 w-full gap-y-2 justify-between items-center px-2">
          <div className="flex flex-col">
            <span className="text-gray-400 text-sm">Interview Date</span>
            <span className="text-gray-700 font-semibold text-little">
              10 - 13 July 2021
            </span>
          </div>
          <div className="flex flex-col w-[40%]">
            <span className="text-gray-400 text-sm">Interview Status</span>
            <span className="text-amber-600 rounded-[30px] py-[1px] flex items-center justify-center bg-amber-400/20 font-semibold text-little">
              In Progress
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-400 text-sm">Interview Location</span>
            <span className="text-gray-700 font-semibold text-little">
              Silver Crysta Room, Nomad Office 3517 W. Gray St. Utica,
              Pennsylvania 57867
            </span>
          </div>
        </div>
  
        <hr className="h-[1px] bg-gray-400 w-full" />
  
        <div className="w-full flex justify-between px-2">
          <h3 className="font-semibold text-sm px-2">Current Stage</h3>
          <button className="text-primaryColor font-semibold text-little">
            Add notes
          </button>
        </div>
  
        <ul className="flex flex-col gap-[10px] w-full px-2">
          <li className="w-full flex flex-col p-2 items-start justify-end border">
            <div className="flex justify-center items-center gap-[5px]">
              <div className="h-[30px] w-[30px] rounded-full bg-gray-400" />
              <span className="font-semibold text-sm">Maria Kelly</span>
            </div>
  
            <p className="text-little pl-8 text-gray-400">
              Please, do an interview stage immediately. The design division needs
              more new employee now
            </p>
          </li>
          <li className="w-full flex flex-col p-2 items-start justify-end border">
            <div className="flex justify-center items-center gap-[5px]">
              <div className="h-[30px] w-[30px] rounded-full bg-gray-400" />
              <span className="font-semibold text-sm">Maria Kelly</span>
            </div>
  
            <p className="text-little pl-8 text-gray-400">
              Please, do an interview stage immediately. The design division needs
              more new employee now
            </p>
          </li>
        </ul>
      </>
    );
  }
  
  export default HiringProgress;
  