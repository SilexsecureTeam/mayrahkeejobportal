import { Helmet } from "react-helmet";
import Header from "../../components/job-listing/Header";
import ListingRow from "../../components/job-listing/ListingRow";
import useJobManagement from "../../../hooks/useJobManagement";
import useApplicationManagement from "../../../hooks/useApplicationManagement";
import { useContext, useState } from "react";
import { ApplicationContext } from "../../../context/ApplicationContext";
import { JobContext } from "../../../context/JobContext";

function JobListing() {
  const jobUtils = useContext(JobContext);
  const { applicants } = useContext(ApplicationContext);

  // State for filter criteria
  const [filterCriteria, setFilterCriteria] = useState({
    status: "",
    jobType: "",
    role: "",
  });

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterCriteria((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Filtered job list
  const filteredJobs = jobUtils?.jobList
    ?.filter((job) => {
      // Filter by status
      if (filterCriteria.status && job.status !== filterCriteria.status) {
        return false;
      }
      // Filter by job type
      if (filterCriteria.jobType && job.jobType !== filterCriteria.jobType) {
        return false;
      }
      // Filter by role
      if (filterCriteria.role && !job.role.includes(filterCriteria.role)) {
        return false;
      }
      return true;
    })
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    .reverse();

  return (
    <>
      <Helmet>
        <title>Company Dashboard | Job Listing </title>
      </Helmet>
      <div className="h-full w-full flex flex-col px-4 md:px-12 py-5 gap-4 md:gap-[15px]">
        <div className="w-full flex flex-col md:flex-row justify-between">
          <div className="flex flex-col">
            <h2 className="font-semibold text-md">Job Listing</h2>
            <span className="text-sm md:text-little text-gray-400">
              Here is your jobs listing status from July 19 - July 25.
            </span>
          </div>
        </div>

        {/* Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <select
            name="status"
            value={filterCriteria.status}
            onChange={handleFilterChange}
            className="border px-2 py-1 text-sm"
          >
            <option value="">All Statuses</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
          <select
            name="jobType"
            value={filterCriteria.jobType}
            onChange={handleFilterChange}
            className="border px-2 py-1 text-sm"
          >
            <option value="">All Job Types</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
          </select>
          <input
            type="text"
            name="role"
            value={filterCriteria.role}
            onChange={handleFilterChange}
            placeholder="Search by Role"
            className="border px-2 py-1 text-sm"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="border bg-white text-gray-600 font-semibold">
              <tr className="text-xs md:text-little divide-gray-200">
                <th className="px-2 md:px-4 py-1 text-center">Roles</th>
                <th className="px-2 md:px-4 py-1 text-center">Status</th>
                <th className="px-2 md:px-4 py-1 text-center">Date Posted</th>
                <th className="px-2 md:px-4 py-1 text-center">Due Date</th>
                <th className="px-2 md:px-4 py-1 text-center">Job Type</th>
                <th className="px-2 md:px-4 py-1 text-center">Applicants</th>
                <th className="px-2 md:px-4 py-1 text-center">Gender</th>
              </tr>
            </thead>

            <tbody>
              {filteredJobs?.map((current) => {
                const jobApplicants = applicants?.filter(
                  (currentApplicant) => current.id === currentApplicant.job_id
                );
                return (
                  <ListingRow
                    applicants={jobApplicants}
                    data={current}
                    key={current.id}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default JobListing;
