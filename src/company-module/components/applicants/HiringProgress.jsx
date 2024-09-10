import { stages } from "../../../utils/constants";
import InterviewPhase from "./InterviewPhase";
import Shortlist from "./Shortlist";

function HiringProgress({ data, applicant, toogleInterview }) {
  const bgColor = (current) => {
    if (current.stage === "passed") {
      return "bg-primaryColor/80";
    } else if (current.stage === "current") {
      return "bg-primaryColor";
    } else {
      return "bg-gray-300";
    }
  };

  const getbgcolor = (current) => {
    switch (data.status) {
      case "pending":
        return current === stages[0].name
          ? "bg-primaryColor text-white"
          : "text-black bg-white";
      case stages[0].name:
        return current === stages[0].name
          ? "bg-primaryColor text-white"
          : "text-black bg-white";
      case stages[1].name:
        return current === stages[1].name || current === stages[0].name
          ? "bg-primaryColor text-white"
          : "bg-white text-black";
      case stages[2].name:
        return current === stages[2].name ||
          current === stages[0].name ||
          current === stages[1].name
          ? "bg-primaryColor text-white"
          : "bg-white text-black";
      case stages[3].name:
        return current === stages[3].name ||
          current === stages[0].name ||
          current === stages[1].name ||
          current === stages[2].name
          ? "bg-primaryColor text-white"
          : "bg-white text-black";
    }
  };

  const InView = (
    <div className="flex flex-col w-full justify-between gap-[20px] items-start px-2">
      <span className="text-little">
        This customer is still in review and waiting for your action
      </span>
      <div className="flex  gap-[20px] w-full">
        <button onClick={toogleInterview} className="border w-[40%] md:w-[20%] hover:bg-primaryColor hover:text-white p-2 md:py-1 text-little px-2  border-primaryColor">
          Schedule Interview
        </button>
        <button className="border w-[40%] md:w-[20%] hover:bg-red-500 hover:text-white p-2 md:py-1 text-little px-2  border-red-500">
          Turn Down
        </button>
      </div>
      
    </div>
  );

  const statusTexts = () => {
    switch (data.status) {
      case "pending":
        return InView;
      case stages[0].name:
        return InView;
      case stages[1].name:
        return <Shortlist data={data}/>;
      case stages[2].name:
        return <InterviewPhase data={data}/>;
    }
  };

  return (
    <>
      <h3 className="font-semibold text-sm px-2">Current Stage</h3>

      <ul className="w-full px-2 flex justify-between">
        {stages.map((current) => (
          <li
            className={`w-[24%] flex items-center border font-semibold justify-center py-2 text-sm ${getbgcolor(
              current.name
            )}`}
          >
            {current.name}
          </li>
        ))}
      </ul>

      <h3 className="font-semibold text-sm px-2 ">Stage Info</h3>

      {statusTexts()}
    </>
  );
}

export default HiringProgress;
