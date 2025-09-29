import { useState, useEffect } from "react";
import { FaBriefcase, FaVenusMars, FaUserTie } from "react-icons/fa";
import { MdOutlineWorkHistory } from "react-icons/md";
import useJobManagement from "../hooks/useJobManagement";

function FilterPopup({
  open,
  setOpen,
  jobs,
  uniqueJobTitles,
  status,
  setStatus,
  type,
  setType,
  gender,
  setGender,
  profession,
  setProfession,
  search,
  setSearch,
}) {
  if (!open) return null;

  const [currency, setCurrency] = useState("");
  const [salaryInput, setSalaryInput] = useState("");
  const [currencies, setCurrencies] = useState([]);
  const [employmentTypes, setEmploymentTypes] = useState([]);

  const { getCurrencies, getEmployentTypes } = useJobManagement();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currencyRes = await getCurrencies();
        setCurrencies(currencyRes || []);
        const typeRes = await getEmployentTypes();
        setEmploymentTypes(typeRes || []);
      } catch (error) {
        console.error("Error loading filters", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-start justify-end z-50">
      <div className="bg-white w-full sm:w-[400px] h-full shadow-lg p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h4 className="text-gray-800 font-semibold">Filter Jobs</h4>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {/* Currency */}
          <div>
            <label className="block text-xs text-gray-500 font-medium mb-1">
              Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            >
              <option value="">All</option>
              {currencies?.map((curr) => (
                <option key={curr?.id} value={curr?.name}>
                  {curr?.code}
                </option>
              ))}
            </select>
          </div>

          {/* Salary */}
          <div>
            <label className="block text-xs text-gray-500 font-medium mb-1">
              Salary
            </label>
            <input
              type="number"
              placeholder="Enter Salary"
              value={salaryInput}
              onChange={(e) => setSalaryInput(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs text-gray-500 font-medium mb-1">
              <MdOutlineWorkHistory className="inline text-gray-400 mr-1" />
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">All</option>
              <option value="1">Open</option>
              <option value="0">Closed</option>
            </select>
          </div>

          {/* Job Type */}
          <div>
            <label className="block text-xs text-gray-500 font-medium mb-1">
              <FaBriefcase className="inline text-gray-400 mr-1" /> Job Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">All</option>
              {employmentTypes?.map((et) => (
                <option key={et.id} value={et.name}>
                  {et.name}
                </option>
              ))}
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-xs text-gray-500 font-medium mb-1">
              <FaVenusMars className="inline text-gray-400 mr-1" /> Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">All</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Profession */}
          <div>
            <label className="block text-xs text-gray-500 font-medium mb-1">
              <FaUserTie className="inline text-gray-400 mr-1" /> Profession
            </label>
            <select
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">All</option>
              {uniqueJobTitles?.map((title, i) => (
                <option key={i} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div>
            <label className="block text-xs text-gray-500 font-medium mb-1">
              Search
            </label>
            <input
              type="text"
              placeholder="Search by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* Clear / Apply */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={() => {
              setCurrency("");
              setSalaryInput("");
              setStatus("all");
              setType("all");
              setGender("all");
              setProfession("all");
              setSearch("");
            }}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-xs rounded-full text-gray-600"
          >
            Clear Filters
          </button>
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 bg-green-600 text-white rounded-full text-xs"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterPopup;
