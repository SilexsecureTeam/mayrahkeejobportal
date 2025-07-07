import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/pngs/main-logo-icon.png";
import Btn from "./Btn";
import { FaBars, FaTimes, FaCaretDown, FaCaretUp } from "react-icons/fa";
const Navbar = ({ register = "/registration", login = "/login" }) => {
  const [menu, setMenu] = useState(true);
  const [drop, setDrop] = useState(false);
  return (
    <nav className="fixed top-0 right-0 left-0 z-20 max-w-[1400px] min-h-20 w-full mx-auto bg-white flex p-3 md:px-5 justify-between items-center flex-wrap md:flex-nowrap">
      <Link to="/" className="flex justify-center items-center mx-2 mr-auto">
        <img src={logo} alt="logo" className="w-32 md:w-36" />
      </Link>
      <div
        className={`${
          menu
            ? "hidden"
            : "absolute top-16 left-0 right-0 bg-white flex flex-col px-4"
        } lg:flex lg:flex-row lg:static lg:bg-transparent lg:items-center lg:gap-4 my-3 mx-auto gap-2 font-bold text-sm order-1 w-full lg:w-auto lg:order-0 *:p-2 *:rounded-md *:cursor-pointer hover:*:hover:bg-slate-300`}
      >
        <a href="https://mayrahkeeafrica.vercel.app/">Home</a>

        <NavLink className="[&.active]:bg-slate-300" to="/find-jobs">
          Find Jobs
        </NavLink>
        <NavLink className="[&.active]:bg-slate-300" to="/find-staff/artisan">
          Find Artisans
        </NavLink>
        <NavLink
          className="[&.active]:bg-slate-300"
          to="/find-staff/domestic staff"
        >
          Find Domestic Staff
        </NavLink>
        <NavLink className="[&.active]:bg-slate-300" to="/help">
          Help Center
        </NavLink>
        <NavLink className="[&.active]:bg-slate-300" to="/blogs">
          Blog
        </NavLink>

        <div className="cursor-default flex md:hidden items-center gap-3 lg:order-2">
          <Btn
            title="Login"
            loc={login}
            styl="bg-gray-100 shadow-[1px_1px_0_2px] shadow-gray-400 hover:shadow-[-1px_-1px_0]"
          />
          <Btn
            title="Register"
            loc={register}
            styl="bg-black shadow-[1px_1px_0] shadow-gray-400 hover:shadow-[-1px_-1px_0] text-white"
          />
        </div>
      </div>
      <div className="hidden md:flex items-center justify-center gap-3 lg:order-2 ml-auto">
        <Btn
          title="Login"
          loc={login}
          styl="bg-gray-100 shadow-[1px_1px_0_2px] shadow-gray-400 hover:shadow-[-1px_-1px_0]"
        />
        <Btn
          title="Register"
          loc={register}
          styl="bg-black shadow-[1px_1px_0] shadow-gray-400 hover:shadow-[-1px_-1px_0] text-white"
        />
      </div>
      <div
        onClick={() => {
          setMenu(!menu);
        }}
        className="mx-2 block lg:hidden transition-all ease-in-out duration-300 cursor-pointer"
      >
        {menu ? <FaBars size={24} /> : <FaTimes size={24} />}
      </div>
    </nav>
  );
};

export default Navbar;
