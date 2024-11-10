
import { registration_steps_keys } from "../../utils/constants";
import { registrationType } from "../../reducers/RegistrationReducer";
import useStaffRoute from "../../routes/useStaffRoute";
import { useState } from "react";

function RegistrationProgress({state, dispatch, role}) {
  const [last, setLast]=useState("");
  const getSteps = () => {
    return Object.keys(registrationType(role)).map((key, index) => {
      const currentStep = registrationType(role)[key];
      if([Object.keys(registrationType(role)).length-1][0] ===key){ setLast(currentStep?.title)}

      const isSelected =  (currentStep?.title === state?.title) ? true : false
      const icon = isSelected ? currentStep?.activeIcon : currentStep?.inactiveIcon

      return (
        <li key={currentStep?.title} className={`w-full flex `}>
          <div className="flex flex-col items-center w-[25%]">
            <div className={`bg-white rounded-md p-[15px] ${isSelected && 'border-2 border-gray-800 transition duration-1000'}`}>
              <img className="h-[25px] w-[25px]  " src={icon} />
            </div>
            {currentStep?.title !== last && <hr className="h-[25px] border-dashed border w-0" />}
          </div>

          <div>
            <p className="font-semibold text-[15px] text-white">{currentStep?.title}</p>
            <p className="font-meduim text-little text-gray-400">{currentStep?.desc}</p>
          </div>
        </li>
      );
    });
  };


  return (
    <div className="w-full h-full bg-primaryColor flex items-center justify-center">
      <ul className="h-[70%] w-[60%]">{getSteps()}</ul>
    </div>
  );
}

export default RegistrationProgress;
