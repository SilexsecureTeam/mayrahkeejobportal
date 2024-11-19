import { FaBriefcase, FaClipboardList } from "react-icons/fa6";

function PostingHeader({ currentStep, jobSteps, setCurrentStep }) {
  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-lg md:text-md font-bold">Post a Job</h2>

      <ul className="border p-2 w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <li
          className={`flex items-center w-full md:w-[30%] gap-4 ${
            currentStep.id === jobSteps[0].id
              ? "text-primaryColor"
              : "text-gray-400"
          }`}
        >
          <div
            className={`p-2 rounded-full flex justify-center items-center ${
              currentStep.id === jobSteps[0].id
                ? "bg-primaryColor"
                : "bg-primaryColor/20"
            }`}
          >
            <FaBriefcase
              className={`text-lg md:text-sm ${
                currentStep.id === jobSteps[0].id
                  ? "text-white"
                  : "text-gray-400"
              }`}
            />
          </div>
          <div className="flex flex-col justify-center gap-1">
            <span className="text-xs md:text-sm">Step {jobSteps[0].id}/2</span>
            <span className="text-sm md:text-md font-semibold">
              {jobSteps[0].title}
            </span>
          </div>
        </li>

        <hr className="h-0.5 w-full bg-gray-200 md:hidden" />

        <li
          className={`flex items-center w-full md:w-[30%] gap-4 ${
            currentStep.id === jobSteps[1].id
              ? "text-primaryColor"
              : "text-gray-400"
          }`}
        >
          <div
            className={`p-2 rounded-full flex justify-center items-center ${
              currentStep.id === jobSteps[1].id
                ? "bg-primaryColor"
                : "bg-primaryColor/20"
            }`}
          >
            <FaClipboardList
              className={`text-lg md:text-sm ${
                currentStep.id === jobSteps[1].id
                  ? "text-white"
                  : "text-gray-400"
              }`}
            />
          </div>
          <div className="flex flex-col justify-center gap-1">
            <span className="text-xs md:text-sm">Step {jobSteps[1].id}/2</span>
            <span className="text-sm md:text-md font-semibold">
              {jobSteps[1].title}
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default PostingHeader;
