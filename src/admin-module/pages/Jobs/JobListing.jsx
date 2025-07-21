import React, { useEffect, useState } from "react";
import { BiTrendingUp } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa6";
import JobListingChart from "./JobListingChart";
import JobsUsageChart from "./JobsUsageChart";
import { useNavigate } from "react-router-dom";
import UseAdminManagement from "../../../hooks/useAdminManagement";

function JobListing() {
  const navigate = useNavigate();
  const { getAllJobs } = UseAdminManagement();
  const [jobs, setJobs] = useState(0);

  useEffect(() => {
    (async () => {
      const allJobs = await getAllJobs();
      setJobs(allJobs.length);
    })();
  }, []);

  const visitorsByCountry = [
    { country: "USA", flag: "🇺🇸", visitors: 1200 },
    { country: "Canada", flag: "🇨🇦", visitors: 800 },
    { country: "UK", flag: "🇬🇧", visitors: 600 },
    { country: "Germany", flag: "🇩🇪", visitors: 400 },
    { country: "France", flag: "🇫🇷", visitors: 300 },
  ];

  const handleNavigate = () => {
    navigate("/admin/jobs");
  };

  return (
    <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Left Section: Charts + Stats */}
      <div className="lg:col-span-2 flex flex-col gap-4">
        {/* Stat Cards */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Total Views */}
          <div className="flex-1 shadow-lg p-4 bg-white rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-md text-zinc-400">Total Views</h2>
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-400">
                <FaEye className="text-white text-xl" />
              </div>
            </div>
            <div className="flex items-center">
              <h1 className="text-3xl mr-2 font-semibold">23,564</h1>
              <h1 className="text-green-500 flex items-center text-sm">
                6.4% <BiTrendingUp className="ml-1" />
              </h1>
            </div>
          </div>

          {/* Jobs Posted */}
          <div
            className="flex-1 shadow-lg p-4 bg-white rounded-lg cursor-pointer hover:bg-green-100 transition"
            onClick={handleNavigate}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-md text-zinc-400">All Jobs Posted</h2>
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-400">
                <FaBriefcase className="text-white text-xl" />
              </div>
            </div>
            <div className="flex items-center">
              <h1 className="text-3xl mr-2 font-semibold">{jobs}</h1>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="shadow-lg p-4 bg-white rounded-lg">
          <JobListingChart />
        </div>
      </div>

      {/* Right Section: Donut + Visitors */}
      <div className="flex flex-col gap-4">
        {/* Donut Chart */}
        <div className="shadow-lg bg-white rounded-lg p-4 w-full">
          <JobsUsageChart />
        </div>

        {/* Visitors */}
        <div className="shadow-lg p-4 bg-white rounded-lg max-h-64 overflow-y-auto">
          <h2 className="text-md text-zinc-400 mb-4">Visitors by Country</h2>
          <ul>
            {visitorsByCountry.map((visitor, index) => (
              <li
                key={index}
                className="flex justify-between items-center mb-2"
              >
                <span className="flex items-center">
                  <span className="mr-2">{visitor.flag}</span>
                  {visitor.country}
                </span>
                <span>{visitor.visitors}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default JobListing;
