import wheelIcon from '../../assets/pngs/wheel-icon.png'
import plusIcon from '../../assets/pngs/plus-icon.png'
import { Link } from 'react-router-dom';

function NavBar({ state }) {
  return (
    <nav className="w-full h-[8%] px-4 flex items-center justify-between bg-white">
      <div className='flex items-center gap-[5px]'>
        <img src={wheelIcon} className='h-[35px] w-[35px]'/>
        <h1 className="font-semibold text-xl tracking-wide">{state.title}</h1>
      </div>

      <div className="flex justify-end items-end  px-7 w-[25%]">
        <Link to={'/company/job-posting'} className="border px-[5px] flex py-[5px] font-semibold justify-center items-center gap-[3px] text-sm bg-primaryColor text-white">
          <img src={plusIcon} className='h-[15px] w-[15px]'/>
          Post a Job
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
