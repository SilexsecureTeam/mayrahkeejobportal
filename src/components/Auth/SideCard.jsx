import React from 'react';
import mayrahkeeIcon from '../../assets/pngs/mayrakee-icon.png'
import interviewIcon from '../../assets/svgs/interview-icon.svg'
function SideCard() {
  return <div className='h-full w-[50%] flex flex-col justify-start items-center  bg-primaryColor pt-[5%]'>
    <img src={mayrahkeeIcon} className='w-[50%] h-[15%]'/>
    <img src={interviewIcon} className='h-[40%] mt-[10%]'/>
  </div>;
}

export default React.memo(SideCard);
