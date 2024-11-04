import wheelIcon from "../../assets/pngs/wheel-icon.png";
import { PiBellLight, PiBellRingingDuotone } from "react-icons/pi";
import { useContext, useState } from "react";

import { MdClose, MdMenu } from "react-icons/md";

function NavBar({ state, toogleIsOpen, isMenuOpen }) {
  // const { notifications, getNotifications } = useContext(NotificationContext);
  const [isOpen, setIsOpen] = useState(false);

  // useEffect(() => {
  //   getNotifications();
  // }, []);
  return (
    <>
      <nav className="w-full h-[8%] px-2 md:px-12 flex items-center justify-between bg-white">
        <MdMenu
          onClick={toogleIsOpen}
          className="text-primarycolor md:hidden  text-3xl"
        />
        <div className="flex items-center gap-[5px]">
          <img src={wheelIcon} className="h-[35px] md:block hidden w-[35px]" />
          <h1 className="font-semibold text-xl tracking-wide">{state.title}</h1>
        </div>

        <div className="flex justify-end items-center pr-2 md:w-[25%] gap-[5px]">
          <PiBellLight
            onClick={() => setIsOpen(true)}
            className="text-lg cursor-pointer"
          />
        </div>
      </nav>
    </>
  );
}

export default NavBar;
