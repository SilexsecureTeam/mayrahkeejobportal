import React from 'react';
import mayrahkeeIcon from '../../assets/pngs/mayrakee-icon.png'
function SideCard() {
  return <div className='h-full w-[50%] flex justify-center   bg-primaryColor pt-[5%]'>
    <img src={mayrahkeeIcon} className='w-[50%] h-[15%]'/>
  </div>;
}

export default React.memo(SideCard);
