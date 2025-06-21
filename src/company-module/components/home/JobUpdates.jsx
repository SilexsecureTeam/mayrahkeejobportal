import React, { useState } from "react";
import JobItem from "./JobItem";
import useJobManagement from "../../../hooks/useJobManagement";
import { useEffect } from "react";

function JobUpdates({ jobs, applicants }) {
  const [currency, setCurrency] = useState(""); // Selected currency type
  const [salaryInput, setSalaryInput] = useState(""); // User-entered salary value
  const [currencies, setCurrencies] = useState([]); // List of available currencies
  const { getCurrencies } = useJobManagement();

  useEffect(() => {
    // Fetch currencies when component mounts
    const fetchCurrencies = async () => {
      try {
        const response = await getCurrencies();
        setCurrencies(response || []);
      } catch (error) {}
    };

    fetchCurrencies();
  }, []);

  // Filter jobs based on currency and salary range
  const filteredJobs = jobs.filter((job) => {
    const salary = parseFloat(salaryInput);
    const minSalary = parseFloat(job?.min_salary);
    const maxSalary = parseFloat(job?.max_salary);

    return (
      (!currency || job.currency?.split(" ")[0] === currency) && // Match selected currency
      (!salaryInput || (salary >= minSalary && salary <= maxSalary)) // Salary within range
    );
  });

  return (
    <div className="w-full min-h-[250px] border flex flex-col items-start">
      <section className="w-full flex justify-between items-center gap-2">
        <div className="flex-shrink-0 h-[50px] w-max text-sm font-semibold p-2 flex items-center border-b">
          <h3 className="text-green-700">Jobs Updates</h3>
        </div>

        {/* Filter Section */}
        <div className="ml-auto p-3 grid grid-cols-2 gap-2 lg:gap-4">
          {/* Currency Filter */}
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="border px-1 py-2 md:p-2 rounded text-xs md:text-sm"
          >
            <option value="">Select Currency</option>
            {currencies?.map((curr) => (
              <option key={curr?.id} value={curr?.name}>
                {curr?.code}
              </option>
            ))}
          </select>

          {/* Salary Input */}
          <input
            type="number"
            placeholder="Enter Salary"
            value={salaryInput}
            onChange={(e) => setSalaryInput(e.target.value)}
            className="border p-2 rounded "
          />
        </div>
      </section>

      {/* Job Listings */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-3 px-8 mt-4 h-[85%] justify-start items-start gap-[15px] w-full max-w-[98%]">
        {filteredJobs?.length > 0 ? (
          filteredJobs?.map((current) => (
            <JobItem key={current.id} data={current} applicants={applicants} />
          ))
        ) : (
          <p>No job updates available</p>
        )}
      </ul>
    </div>
  );
}

export default JobUpdates;
