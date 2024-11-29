import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/svgs/main-logo.svg";
import Btn from "./Btn";
import { FaBars, FaTimes, FaCaretDown } from "react-icons/fa";
const Navbar = () => {
  const [menu, setMenu] = useState(true);
  return (
    <nav className="fixed top-0 right-0 left-0 z-20 max-w-[1200px] min-h-20 w-full mx-auto bg-white flex p-3 justify-between items-center flex-wrap md:flex-nowrap">
      <Link to="/" className="flex justify-center items-center mx-2">
        <img src={logo} alt="logo" className="w-28 md:w-32" />
      </Link>
      <div
        className={`${menu
          ? "hidden"
          : "absolute top-16 left-0 right-0 bg-white flex flex-col px-4"
          } lg:flex lg:flex-row lg:static lg:bg-transparent lg:items-center lg:gap-4 my-3 mx-auto gap-2 font-bold text-sm order-1 w-full lg:w-auto lg:order-0 *:p-2 *:rounded-md *:cursor-pointer hover:*:hover:bg-slate-300`}
      >

        <NavLink to="/">Home</NavLink>
        <NavLink to="/pages" className="flex gap-1 items-center md:justify-center">Find Jobs <FaCaretDown /></NavLink>
        <NavLink to="/about">Find Artisans</NavLink>
        <NavLink to="/services">Find Domestic Staffs</NavLink>
        <NavLink to="/about">Help Center</NavLink>
        <NavLink to="/about">Blog</NavLink>

        <div className="cursor-default flex md:hidden items-center gap-3 lg:order-2">
          <Btn
            title="Login"
            loc="/login"
            styl="bg-gray-100 shadow-[1px_1px_0_2px] shadow-gray-400 hover:shadow-[-1px_-1px_0]"
          />
          <Btn
            title="Register"
            loc="/login"
            styl="bg-black shadow-[1px_1px_0] shadow-gray-400 hover:shadow-[-1px_-1px_0] text-white"
          />
        </div>

      </div>
      <div className="hidden md:flex items-center justify-center gap-3 lg:order-2 ml-auto">
        <Btn
          title="Login"
          loc="/login"
          styl="bg-gray-100 shadow-[1px_1px_0_2px] shadow-gray-400 hover:shadow-[-1px_-1px_0]"
        />
        <Btn
          title="Register"
          loc="/login"
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
