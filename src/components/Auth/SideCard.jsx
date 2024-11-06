import React from "react";
import mayrahkeeIcon from "../../assets/pngs/mayrakee-icon.png";
import interviewIcon from "../../assets/svgs/interview-icon.svg";
import managerAttireIcon from "../../assets/manager-business-attire.jpg";
import mainLogoTwo from "../../assets/pngs/mayrahkee-logo-2.png";

function SideCard() {
  return (
    <div className="h-full w-[50%] hidden md:flex flex-col justify-start items-center  bg-primaryColor pt-[5%]">
      <img src={mainLogoTwo} className="w-[50%] h-[15%]" />
      <img
        src={"/main-side-icon.jpg"}
        className="h-[50%] mt-[2%] rounded-[30px] border shadow shadow-gray-800"
      />
      <span className="text-lg mt-5 text-white font-bold">
        Find top candidates around the globe
      </span>
      <span className="text-sm w-[60%] text-center  mt-2 text-white ">
        we connect employers and creative candidate with diverse multi-cultural backgrounds, qualifications and work experiences.
      </span>
    </div>
  );
}

export default React.memo(SideCard);
