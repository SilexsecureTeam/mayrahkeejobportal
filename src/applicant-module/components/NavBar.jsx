import { MdMenu } from "react-icons/md";

function NavBar({ state, toogleIsOpen, isOpen }) {
  return (
    <nav className="w-full h-[8%] px-2 lg:px-6 flex items-center justify-between bg-white">
      <MdMenu
            onClick={toogleIsOpen}
            className="text-primarycolor md:hidden  text-3xl"
          />
      <h1 className="font-semibold text-xl tracking-wide">{state.title}</h1>

      <div className="flex justify-between pr-5">
        <a href="https://mayrahkeeafrica.vercel.app/" className="border px-[5px] py-[3px] text-sm border-primaryColor text-primaryColor">Go to E-Learning</a>
      </div>
    </nav>
  );
}

export default NavBar;
