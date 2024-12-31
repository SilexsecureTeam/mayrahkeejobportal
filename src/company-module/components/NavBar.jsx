import wheelIcon from "../../assets/pngs/wheel-icon.png";
import plusIcon from "../../assets/pngs/plus-icon.png";
import { Link } from "react-router-dom";
import { PiBellLight, PiBellRingingDuotone } from "react-icons/pi";
import { useContext, useState } from "react";
import { NotificationContext } from "../../context/NotificationContext";
import { useEffect } from "react";
import NotificationsModal from "./NotificationsModal";
import { MdClose, MdMenu } from "react-icons/md";

function NavBar({ state, toogleIsOpen, isMenuOpen }) {
  const { notifications, getNotifications } = useContext(NotificationContext);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getNotifications();
  }, []);
  return (
    <>
      <NotificationsModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        data={notifications}
      />
      <nav className="w-full h-[8%] px-2 sm:px-4 md:px-8 flex items-center justify-between bg-white">
    
          <MdMenu
            onClick={toogleIsOpen}
            className="text-primarycolor lg:hidden text-3xl"
          />
        <div className="flex items-center gap-[5px] mr-auto">
          <img src={wheelIcon} className="h-[35px] md:block hidden w-[35px]" />
          <h1 className="font-semibold text-[18px] md:text-xl leading-none ml-[2px]">{state.title}</h1>
        </div>

        <div className="flex justify-end items-center pr-2 md:w-[25%] gap-[5px]">
          <Link
            to={"/company/job-posting"}
            className="border px-[5px] flex py-[5px] font-semibold justify-center items-center gap-[3px] text-sm bg-primaryColor text-white"
          >
            <img src={plusIcon} className="h-[15px] w-[15px]" />
            Post a Job
          </Link>
          {notifications?.length === 0 || !notifications ? (
            <PiBellLight
              onClick={() => setIsOpen(true)}
              className="text-lg cursor-pointer"
            />
          ) : (
            <PiBellRingingDuotone
              onClick={() => setIsOpen(true)}
              className="text-primaryColor cursor-pointer text-lg animate-bounce"
            />
          )}
        </div>
      </nav>
    </>
  );
}

export default NavBar;
