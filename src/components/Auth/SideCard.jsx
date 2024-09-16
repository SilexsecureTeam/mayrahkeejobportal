import React from 'react';
import mayrahkeeIcon from '../../assets/pngs/mayrakee-icon.png'
import interviewIcon from '../../assets/svgs/interview-icon.svg'
import managerAttireIcon from '../../assets/manager-business-attire.jpg'
import mainLogoTwo from '../../assets/pngs/mayrahkee-logo-2.png'

function SideCard() {
  return <div className='h-full w-[50%] hidden md:flex flex-col justify-start items-center  bg-primaryColor pt-[5%]'>
    <img src={mainLogoTwo} className='w-[50%] h-[15%]'/>
    <img src={managerAttireIcon} className='h-[50%] mt-[10%] rounded-[30px] border shadow shadow-gray-800'/>
    <span className='text-lg mt-5 text-white font-semibold'>Find top candidates around the globe</span>
  </div>;
}


export default React.memo(SideCard);
