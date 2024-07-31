import { FaBriefcase,FaClipboardList,FaGift } from "react-icons/fa6";


function PostingHeader({ currentStep, jobSteps, setCurrentStep }) {
  return (
    <div className="w-full flex flex-col gap-[10px]">
      <h2 className="text-md font-bold">Post a Job</h2>

      <ul className="border p-2 w-full flex justify-between  items-center">
        <li
          className={`flex items-center jus w-[30%] gap-[10px] ${
            currentStep.id === jobSteps[0].id
              ? "text-primaryColor"
              : "text-gray-400"
          }`}
        >
          <div
            className={`p-2 rounded-full bg-gray-200 flex justify-center items-center ${
              currentStep.id === jobSteps[0].id
                ? "bg-primaryColor"
                : "bg-primaryColor/20"
            }`}
          >
            <FaBriefcase className={`text-sm ${
              currentStep.id === jobSteps[0].id
                ? "text-white"
                : "text-gray-400"
            }`} />
          </div>
          <div className="flex flex-col justify-center item gap-[5px]">
            <span className={`text-little`}>step {jobSteps[0].id}/3</span>
            <span className="text-md font-semibold">{jobSteps[0].title}</span>
          </div>
        </li>
        <hr className="h-[70%] w-[1px] bg-gray-200" />
        <li
          className={`flex items-center pl-[5px] w-[30%] gap-[10px] ${
            currentStep.id === jobSteps[1].id
              ? "text-primaryColor"
              : "text-gray-400"
          }`}
        >
          <div
            className={`p-2 rounded-full bg-gray-200 flex justify-center items-center ${
              currentStep.id === jobSteps[1].id
                  ? "bg-primaryColor"
                : "bg-primaryColor/20"
            }`}
          >
            <FaClipboardList className={`text-sm ${
              currentStep.id === jobSteps[1].id
                ? "text-white"
                : "text-gray-400"
            }`} />
          </div>
          <div className="flex flex-col justify-center item gap-[5px]">
            <span className={`text-little`}>step {jobSteps[1].id}/3</span>
            <span className="text-md font-semibold">{jobSteps[1].title}</span>
          </div>
        </li>
        <hr className="h-[70%] w-[1px] bg-gray-200" />
        <li
          className={`flex items-center pl-[5px] w-[30%] gap-[10px] ${
            currentStep.id === jobSteps[2].id
                ? "text-primaryColor"
              : "text-gray-400"
          }`}
        >
          <div
            className={`p-2 rounded-full bg-gray-200 flex justify-center items-center ${
              currentStep.id === jobSteps[2].id
               ? "bg-primaryColor"
                : "bg-primaryColor/20"
            }`}
          >
            <FaGift className={`text-sm ${
              currentStep.id === jobSteps[1].id
                ? "text-white"
                : "text-gray-400"
            }`} />
          </div>
          <div className="flex flex-col justify-center item gap-[5px]">
            <span className={`text-little`}>step {jobSteps[2].id}/3</span>
            <span className="text-md font-semibold">{jobSteps[2].title}</span>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default PostingHeader;
