import React, { useState } from "react";
import JobItem from "./JobItem";
import { FaFilter } from "react-icons/fa";
import FilterPopup from "../../../components/FilterPopup";

function JobUpdates({ jobs, applicants }) {
  const [open, setOpen] = useState(false);

  // Filters
  const [status, setStatus] = useState("all");
  const [type, setType] = useState("all");
  const [gender, setGender] = useState("all");
  const [profession, setProfession] = useState("all");
  const [search, setSearch] = useState("");

  // Filter jobs
  const filteredJobs = jobs.filter((job) => {
    return (
      (status === "all" || job.status === status) &&
      (type === "all" || job.type === type) &&
      (gender === "all" ||
        job.gender?.toLowerCase() === gender.toLowerCase()) &&
      (profession === "all" || job.profession === profession) &&
      (search === "" ||
        job?.job_title?.toLowerCase().includes(search?.toLowerCase()))
    );
  });

  const uniqueJobTitles = [
    ...new Set(jobs.map((job) => job.job_title).filter(Boolean)),
  ];

  return (
    <div className="w-full min-h-[250px] border rounded-lg shadow-sm bg-white flex flex-col relative">
      {/* Header Section */}
      <section className="w-full flex justify-between items-center border-b px-4 py-3">
        <h3 className="text-green-700 font-semibold text-lg">Jobs Updates</h3>

        {/* Filter Button */}
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 border rounded-md bg-gray-50 hover:bg-gray-100 text-sm font-medium text-gray-700"
        >
          <FaFilter className="text-green-500" /> Filters
        </button>
      </section>

      {/* Filter Popup */}
      {open && (
        <FilterPopup
          open={open}
          setOpen={setOpen}
          jobs={jobs} // 👈 pass all jobs so popup can fetch currencies/types
          uniqueJobTitles={uniqueJobTitles}
          status={status}
          setStatus={setStatus}
          type={type}
          setType={setType}
          gender={gender}
          setGender={setGender}
          profession={profession}
          setProfession={setProfession}
          search={search}
          setSearch={setSearch}
        />
      )}

      {/* Job Listings */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-3 px-8 mt-4 gap-[15px] w-full">
        {filteredJobs?.length > 0 ? (
          filteredJobs?.map((current) => (
            <JobItem key={current.id} data={current} applicants={applicants} />
          ))
        ) : (
          <p className="text-gray-500 text-sm">No job updates available</p>
        )}
      </ul>
    </div>
  );
}

export default JobUpdates;
