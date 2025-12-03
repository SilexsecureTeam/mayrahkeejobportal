import { useState } from "react";
import ApplicantProfile from "./ApplicantProfile";
import Resume from "./Resume";
import HiringProgress from "./HiringProgress";
// import IntervieweSchedule from "./InterviewerSchedule";

const options = ["Applicant's Profile", "Resume", "Hiring Progress"];

function SecondaryDetail(props) {
  const [currentOption, setCurrentOption] = useState(options[0]);

  const getCurrentOption = () => {
    switch (currentOption) {
      case options[0]:
        return <ApplicantProfile {...props} />;
      case options[1]:
        return <Resume {...props} />;
      case options[2]:
        return <HiringProgress {...props} />;
    }
  };

  return (
    <div className="w-full lg:w-[65%] min-h-full flex flex-col border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      {/* Tabs Navigation - Fixed height */}
      <div className="bg-white border-b border-gray-200">
        <ul className="flex gap-4 w-full items-center px-4 py-3 text-sm font-semibold overflow-x-auto">
          {options.map((current, index) => (
            <li
              key={index}
              onClick={() => setCurrentOption(current)}
              className={`text-sm cursor-pointer whitespace-nowrap px-3 py-2 transition-colors duration-200 ${
                current === currentOption
                  ? "text-primaryColor border-b-2 border-primaryColor"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {current}
            </li>
          ))}
        </ul>
      </div>

      {/* Content Area - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {getCurrentOption()}
      </div>
    </div>
  );
}

export default SecondaryDetail;
