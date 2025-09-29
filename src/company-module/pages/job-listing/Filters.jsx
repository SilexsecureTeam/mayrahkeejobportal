import { useState } from "react";
import {
  FaFilter,
  FaSearch,
  FaUserTie,
  FaBriefcase,
  FaVenusMars,
} from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { MdOutlineWorkHistory } from "react-icons/md";

function Filters({
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
  genderFilter,
  setGenderFilter,
  professionFilter,
  setProfessionFilter,
  search,
  setSearch,
  uniqueTypes,
  uniqueGenders,
  uniqueProfessions,
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="space-y-3">
      {/* Section Title */}
      <h2 className="font-semibold text-lg text-gray-800">Job Listing</h2>

      {/* Filters Card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-2 bg-gray-50 cursor-pointer hover:bg-gray-100 transition"
          onClick={() => setOpen(!open)}
        >
          <div className="flex items-center gap-2 text-gray-700 font-semibold text-sm tracking-wide">
            <FaFilter className="text-green-500" />
            Filters
          </div>
          {open ? (
            <FiChevronUp className="text-gray-600" />
          ) : (
            <FiChevronDown className="text-gray-600" />
          )}
        </div>

        {/* Body with animation */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            open ? "max-h-[600px] opacity-100 p-5" : "max-h-0 opacity-0 p-0"
          } overflow-hidden`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Status */}
            <div>
              <label className="flex items-center gap-1 text-xs text-gray-500 font-medium mb-1">
                <MdOutlineWorkHistory className="text-gray-400" />
                Status
              </label>
              <select
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            {/* Job Type */}
            <div>
              <label className="flex items-center gap-1 text-xs text-gray-500 font-medium mb-1">
                <FaBriefcase className="text-gray-400" />
                Job Type
              </label>
              <select
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                {uniqueTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Gender */}
            <div>
              <label className="flex items-center gap-1 text-xs text-gray-500 font-medium mb-1">
                <FaVenusMars className="text-gray-400" />
                Gender
              </label>
              <select
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
              >
                <option value="all">All Genders</option>
                {uniqueGenders.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            {/* Profession */}
            <div>
              <label className="flex items-center gap-1 text-xs text-gray-500 font-medium mb-1">
                <FaUserTie className="text-gray-400" />
                Profession
              </label>
              <select
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                value={professionFilter}
                onChange={(e) => setProfessionFilter(e.target.value)}
              >
                <option value="all">All Professions</option>
                {uniqueProfessions.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div>
              <label className="flex items-center gap-1 text-xs text-gray-500 font-medium mb-1">
                <FaSearch className="text-gray-400" />
                Search
              </label>
              <div className="relative">
                <FaSearch className="absolute left-3 top-3 h-3.5 w-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by title..."
                  className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Clear Filters */}
          <div className="mt-5 flex justify-between">
            <button
              onClick={() => {
                setStatusFilter("all");
                setTypeFilter("all");
                setGenderFilter("all");
                setProfessionFilter("all");
                setSearch("");
              }}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-xs rounded-full text-gray-600 font-medium transition"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filters;
