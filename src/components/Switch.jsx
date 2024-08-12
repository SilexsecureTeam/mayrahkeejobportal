import React from "react";
import { IoIosAdd } from "react-icons/io";

export default function Switch({ isOpen, setIsOpen }) {
  return (
    <div className="flex items-center border p-1">
      <input
        onChange={(e) => setIsOpen(e.target.value)}
        value={isOpen}
        className={`mr-2  h-3.5 w-8 appearance-none rounded-[0.4375rem] ${ isOpen ? 'bg-primaryColor' : 'bg-gray-400'} before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]`}
        type="checkbox"
        role="switch"
        id="flexSwitchCheckDefault"
      />
      <label
        className="inline-block  text-little hover:cursor-pointer"
        htmlFor="flexSwitchCheckDefault"
      >
        {isOpen ? "Opened" : "Closed"}
      </label>
    </div>
  );
}
