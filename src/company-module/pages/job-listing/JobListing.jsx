import { Helmet } from "react-helmet";
import ListingRow from "../../components/job-listing/ListingRow";
import useJobManagement from "../../../hooks/useJobManagement";
import useApplicationManagement from "../../../hooks/useApplicationManagement";
import { useEffect, useState } from "react";
import FilterPopup from "../../../components/FilterPopup";
import { FaFilter } from "react-icons/fa";

function JobListing() {
  const jobUtils = useJobManagement();
  const { applicants } = useApplicationManagement();

  // 🔹 Filters state
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [professionFilter, setProfessionFilter] = useState("all");
  const [search, setSearch] = useState("");

  // 🔹 Popup open state
  const [open, setOpen] = useState(false);

  useEffect(() => {
    jobUtils.getJobsFromDB(); // fetch jobs when page loads
  }, []);

  // 🔹 Apply filters
  const filteredJobs = jobUtils?.jobList.filter((job) => {
    const deadline = new Date(job?.application_deadline_date);
    deadline.setUTCHours(23, 59, 59, 999);
    const now = new Date();

    const jobStatus =
      (job?.status === "approved" || job?.status === "1") &&
      now.getTime() <= deadline.getTime()
        ? "open"
        : "closed";

    return (
      (statusFilter === "all" || jobStatus === statusFilter) &&
      (typeFilter === "all" ||
        job.type?.toLowerCase() === typeFilter.toLowerCase()) &&
      (genderFilter === "all" ||
        job.gender?.toLowerCase() === genderFilter.toLowerCase()) &&
      (professionFilter === "all" ||
        job.profession?.toLowerCase() === professionFilter.toLowerCase()) &&
      (search === "" ||
        job.job_title?.toLowerCase().includes(search.toLowerCase()))
    );
  });

  // 🔹 Unique dynamic filter options
  const uniqueProfessions = [
    ...new Set(jobUtils?.jobList.map((j) => j.profession).filter(Boolean)),
  ];
  const uniqueTypes = [
    ...new Set(jobUtils?.jobList.map((j) => j.type).filter(Boolean)),
  ];
  const uniqueGenders = [
    ...new Set(jobUtils?.jobList.map((j) => j.gender).filter(Boolean)),
  ];

  return (
    <>
      <Helmet>
        <title>Company Dashboard | Job Listing</title>
      </Helmet>

      <div className="h-full w-full flex flex-col py-5 gap-4 md:gap-[15px] px-0">
        {/* 🔹 Header with Filter Button */}
        <div className="flex justify-between items-center px-2">
          <h2 className="text-lg font-semibold text-gray-800">Job Listings</h2>
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 border rounded-md bg-gray-50 hover:bg-gray-100 text-sm font-medium text-gray-700"
          >
            <FaFilter className="text-green-500" /> Filters
          </button>
        </div>

        {/* 🔹 Popup Filters */}
        <FilterPopup
          open={open}
          setOpen={setOpen}
          currencies={[]} // not needed here
          employmentTypes={uniqueTypes.map((t) => ({ id: t, name: t }))}
          uniqueJobTitles={uniqueProfessions}
          currency={""}
          setCurrency={() => {}} // not used
          salaryInput={""}
          setSalaryInput={() => {}} // not used
          status={statusFilter}
          setStatus={setStatusFilter}
          type={typeFilter}
          setType={setTypeFilter}
          gender={genderFilter}
          setGender={setGenderFilter}
          profession={professionFilter}
          setProfession={setProfessionFilter}
          search={search}
          setSearch={setSearch}
        />

        {/* 🔹 Job Table */}
        <div className="min-w-[700px] w-full overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="border bg-white text-gray-600 font-semibold">
              <tr className="text-xs md:text-sm divide-gray-200">
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
              {filteredJobs
                ?.sort(
                  (a, b) => new Date(a.created_at) - new Date(b.created_at)
                )
                .reverse()
                .map((current) => {
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
