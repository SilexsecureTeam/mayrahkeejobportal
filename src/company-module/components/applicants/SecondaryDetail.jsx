import { useState } from "react";
import ApplicantProfile from "./ApplicantProfile";
import Resume from "./Resume";
import HiringProgress from "./HiringProgress";
import IntervieweSchedule from "./InterviewerSchedule";

const options = [
  "Applicant Profile",
  "Resume",
  "Hiring Progress",
  "Intervie Schedule",
];

function SecondaryDetail(props) {
  const [currentOption, setCurrentOption] = useState(options[0]);

  const getCurrentOption = () => {
    switch (currentOption) {
      case options[0]:
        return <ApplicantProfile {...props}/>;
      case options[1]:
        return <Resume {...props}/>;
      case options[2]:
        return <HiringProgress {...props}/>;
      case options[3]:
        return <IntervieweSchedule {...props}/>;
    }
  };

  return (
    <div className="w-[65%] h-full flex flex-col border gap-[10px]">
      <ul className="border-b flex gap-[15px] w-full  items-center text-sm font-semibold">
        {options.map(current => <li onClick={() => setCurrentOption(current)} className={`text-sm cursor-pointer p-2 ${current === currentOption ? 'border-b border-primaryColor' : 'border-0'}`}>{current}</li>)}
      </ul>

      {getCurrentOption()}
    </div>
  );
}

export default SecondaryDetail;
