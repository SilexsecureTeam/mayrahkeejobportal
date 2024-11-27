import React from "react";
import Btn from "./Btn";
import logo from "../../assets/svgs/main-logo.svg";
import bgImg from "../../assets/pngs/happy-couple-of-african-american-business-partners-2023-11-27-05-18-22-utc.jpg";
import { FaSearch, FaSearchLocation } from "react-icons/fa";
const Hero = () => {
  return (
    <div className="relative rounded-xl my-4 text-white min-h-[550px] flex flex-col items-center justify-around gap-5 *:transition-all *:ease-in-out *:duration-500"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.6)), url(${bgImg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <section className="flex flex-col items-center gap-2 ">
        <small className="w-max flex items-center justify-center gap-2 bg-green-200/20 px-[2px] border border-gray-200 rounded-full text-[10px] text-gray-300"><img src={logo} className="h-5" /> makes everything easier</small>
        <h1 className="my-3 capitalize text-center max-w-[747px] w-[98%] text-3xl font-bold lg:text-5xl">
          Discover your dream job & thrive with top organizations near you!
        </h1>
      </section>

      <form className="mt-5 text-xs flex flex-col md:flex-row items-center justify-between gap-4 bg-green-200/20 border border-gray-200 rounded-full max-w-[900px] w-[90%] min-h-14 p-4">
  {/* Input Section */}
  <section className="flex flex-col md:flex-row w-[80%] md:w-full items-center justify-center gap-4 relative">
    {/* Job Title Input */}
    <label className="flex items-center gap-3 text-gray-400 rounded-full px-3 py-1 md:py-2 w-full md:w-[40%]">
      <FaSearch size="15" />
      <input
        className="font-medium bg-transparent ring-0 outline-0 w-full"
        type="text"
        placeholder="Job title or keyword"
      />
    </label>

    {/* Divider Line */}
    <div className="hidden md:block h-8 w-px bg-gray-400 md:mx-4"></div>
    <div className="block md:hidden w-full h-px bg-gray-400"></div>

    {/* Location Input */}
    <label className="flex items-center gap-3 text-gray-400 rounded-full px-3 py-1 md:py-2 w-full md:w-[40%]">
      <FaSearchLocation size="15" />
      <input
        className="font-medium bg-transparent ring-0 outline-0 w-full"
        type="text"
        placeholder="Add country or city"
      />
    </label>
  </section>

  {/* Search Button */}
  <button className="font-medium min-w-28 bg-green-500 text-white rounded-full px-6 py-3">
    search
  </button>
</form>


    </div>
  );
};

export default Hero;
