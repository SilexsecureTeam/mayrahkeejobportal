import React, { useState, useEffect, useContext } from "react";
import logo from "../../assets/pngs/main-logo-icon.png";
import bgImg from "../../assets/pngs/job-hero-img.png";
import { FaSearch } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { ApplicationContext } from "../../context/ApplicationContext"; // 🔑 provides getSectors & getEmploymentTypes
import useJobManagement from "../../hooks/useJobManagement";

const Hero = ({ shrink = false, title }) => {
  const navigate = useNavigate();
  const applicationUtils = useContext(ApplicationContext);
  const { getEmployentTypes, getCurrencies, getSectors } = useJobManagement();

  const [sector, setSector] = useState("");
  const [jobType, setJobType] = useState("");
  const [sectors, setSectors] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const initData = async () => {
      const employementListResult = await getEmployentTypes();
      const sectors = await getSectors();
      setTypes(employementListResult);
      setSectors(sectors);
    };

    initData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/find-jobs", {
      state: { data: { sector, type: jobType } },
    });
  };

  return (
    <div
      className={`${
        shrink ? "min-h-[300px]" : "min-h-[550px]"
      } relative rounded-xl my-4 text-white flex flex-col items-center justify-around gap-5 *:transition-all *:ease-in-out *:duration-500`}
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.7)), url(${bgImg})`,
        backgroundPosition: "70%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <section className="flex flex-col items-center gap-2 ">
        <small className="w-max flex items-center justify-center gap-2 bg-green-200/20 px-[2px] border border-gray-200 rounded-full text-[10px] text-gray-300">
          <img src={logo} className="h-5" /> makes everything easier
        </small>
        <h1 className="my-3 capitalize text-center max-w-[747px] w-[95%] text-3xl font-bold lg:text-5xl">
          {title ||
            "Discover your dream job & thrive with top organizations near you!"}
        </h1>
      </section>

      {!shrink && (
        <form
          onSubmit={handleSubmit}
          className="mt-5 text-xs flex flex-col md:flex-row items-center justify-between gap-4 bg-green-200/20 border border-gray-200 rounded-3xl md:rounded-full max-w-[900px] w-[90%] min-h-14 p-2"
        >
          <section className="flex flex-col md:flex-row w-[80%] py-3 md:py-0 md:w-full items-center justify-center gap-4 relative">
            {/* Sector Dropdown */}
            <label className="flex items-center gap-3 text-gray-400 rounded-full px-3 py-1 md:py-2 w-full md:w-[40%] bg-transparent">
              <FaSearch size="15" />
              <select
                className="font-semibold bg-transparent ring-0 outline-0 w-full text-gray-200"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
              >
                <option value="">Select sector</option>
                {sectors.map((s) => (
                  <option key={s.id} className="!text-gray-600" value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </label>

            {/* Divider */}
            <div className="hidden md:block h-8 w-px bg-gray-400 md:mx-4"></div>
            <div className="block md:hidden w-full h-px bg-gray-400"></div>

            {/* Type Dropdown */}
            <label className="flex items-center gap-3 text-gray-400 rounded-full px-3 py-1 md:py-2 w-full md:w-[40%] bg-transparent">
              <FaBriefcase size="15" />
              <select
                className="font-semibold bg-transparent ring-0 outline-0 w-full text-gray-200"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
              >
                <option value="">Select type</option>
                {types.map((t) => (
                  <option key={t.id} className="!text-gray-600" value={t.name}>
                    {t.name}
                  </option>
                ))}
              </select>
            </label>
          </section>

          <button
            type="submit"
            className="font-bold min-w-28 bg-green-600 text-white rounded-full px-6 py-3"
          >
            search
          </button>
        </form>
      )}
    </div>
  );
};

export default Hero;
