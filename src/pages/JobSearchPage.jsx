import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/base";
import Hero from "../components/Landing/Hero";
import Navbar from "../components/Landing/Navbar";
import Advert from "../components/Landing/Advert";
import Footer from "../components/Landing/Footer";
import useJobManagement from "../hooks/useJobManagement";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "react-router-dom";
import { sanitizeHtml } from "../utils/formmaters";

const JobSearchPage = () => {
  const location = useLocation();
  const { getEmployentTypes, getSectors } = useJobManagement();

  const [jobs, setJobs] = useState([]);
  const [jobSectors, setJobSectors] = useState([]);
  const [employementList, setEmployementList] = useState([]);
  const [filters, setFilters] = useState({ keyword: "", sector: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const jobsPerPage = 5;
  const [displayedJobs, setDisplayedJobs] = useState([]);

  // Initialize job sectors and types
  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      try {
        const [employmentListResult, sectors] = await Promise.all([
          getEmployentTypes(),
          getSectors(),
        ]);

        setEmployementList(employmentListResult);
        setJobSectors(sectors);

        if (location.state?.data) {
          const incomingFilters = { ...filters, ...location.state.data };
          setFilters(incomingFilters);
          await fetchJobs(incomingFilters); // ✅ search using passed filters
        } else {
          await fetchJobs(); // ✅ normal fetch when no filters passed
        }
      } catch (error) {
        console.error("Initialization error:", error);
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    initData();
  }, []);

  // Fetch jobs from API (sector/type filters)
  const fetchJobs = async (appliedFilters = filters) => {
    setLoading(true);
    try {
      const queryParams = Object.fromEntries(
        Object.entries(appliedFilters).filter(
          ([key, value]) => value && key !== "keyword"
        )
      );

      const url = Object.keys(queryParams).length
        ? `${BASE_URL}/jobs/search?${new URLSearchParams(queryParams)}`
        : `${BASE_URL}/jobs/search`;

      const response = await axios.get(url);
      const fetchedJobs = response?.data?.data || [];

      const validJobs = fetchedJobs.filter(
        (job) => job.status === "approved" || Number(job.status) === 1
      );

      setJobs(validJobs);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  };

  // Update filters
  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    if (key === "keyword") {
      // Local filter
      const filtered = jobs.filter((job) =>
        job.job_title.toLowerCase().includes(value.toLowerCase())
      );
      setDisplayedJobs(filtered);
      setCurrentPage(1);
    } else {
      // Fetch new jobs for sector/type
      fetchJobs(newFilters);
    }
  };

  const handleClearFilters = () => {
    const cleared = { keyword: "", sector: "", type: "" };
    setFilters(cleared);
    fetchJobs(cleared);
  };

  // Keep displayedJobs synced
  useEffect(() => {
    if (filters.keyword) {
      const filtered = jobs.filter((job) =>
        job.job_title.toLowerCase().includes(filters.keyword.toLowerCase())
      );
      setDisplayedJobs(filtered);
    } else {
      setDisplayedJobs(jobs);
    }
  }, [jobs, filters.keyword]);

  const currentJobs = displayedJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  const handlePreviousPage = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNextPage = () => {
    const totalPages = Math.ceil(displayedJobs.length / jobsPerPage);
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const hasActiveFilters = Object.values(filters).some((v) => v);

  return (
    <>
      <Helmet>
        <title>Mayrahkee | Job Search</title>
      </Helmet>
      <div className="relative max-w-[1400px] w-full mx-auto">
        <Navbar />
        <main className="relative my-20 px-5 h-full">
          <Hero
            shrink
            title="Discover thousands of job opportunities across various sectors, tailored to match your skills and aspirations."
          />

          <div className="job-search-page max-w-7xl mx-auto my-4 px-2 h-max">
            <h1 className="text-center text-3xl font-bold my-8">
              Find Your Dream Job Today
            </h1>

            <div className="flex flex-col md:flex-row gap-8 mb-6">
              {/* Filter Panel */}
              <div className="filter-panel bg-white p-6 md:sticky md:top-20 shadow-md rounded-md border w-full md:w-72">
                <h2 className="text-xl font-bold mb-6">Filters</h2>
                {Object.keys(filters).map((key) => (
                  <div className="mb-4" key={key}>
                    <label className="block mb-1 text-sm font-medium capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </label>
                    {key === "sector" || key === "type" ? (
                      <select
                        className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-indigo-500"
                        value={filters[key]}
                        onChange={(e) =>
                          handleFilterChange(key, e.target.value)
                        }
                      >
                        <option value="">All</option>
                        {key === "sector" &&
                          jobSectors.map((item) => (
                            <option key={item.id} value={item.name}>
                              {item.name}
                            </option>
                          ))}
                        {key === "type" &&
                          employementList.map((item) => (
                            <option key={item.id} value={item.name}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-indigo-500"
                        placeholder={`Enter ${key}`}
                        value={filters[key]}
                        onChange={(e) =>
                          handleFilterChange(key, e.target.value)
                        }
                      />
                    )}
                  </div>
                ))}
                <button
                  className="w-full bg-green-600 text-white py-2 rounded-md mt-4"
                  onClick={handleClearFilters}
                >
                  Clear Filters
                </button>
              </div>

              {/* Job Listings */}
              <div className="md:w-2/3 min-h-80">
                {loading && !initialized ? (
                  <div className="flex justify-center items-center mt-10 min-h-60">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600"></div>
                  </div>
                ) : !initialized ? (
                  <p className="text-center text-gray-500 mt-10">
                    Loading jobs...
                  </p>
                ) : currentJobs.length > 0 ? (
                  <>
                    <div className="mb-4 text-sm text-gray-700 font-medium">
                      {hasActiveFilters
                        ? `Showing ${displayedJobs.length} job(s) for selected filters`
                        : `Showing all ${displayedJobs.length} job(s)`}
                    </div>
                    <div className="space-y-6 grid grid-cols-responsive gap-3">
                      {currentJobs.map((job) => (
                        <div
                          key={job.id}
                          className="flex flex-col bg-white p-6 shadow-md rounded-md border"
                        >
                          <h3 className="text-lg font-bold text-green-800 capitalize">
                            {job.job_title}
                          </h3>
                          <p className="text-gray-600 text-sm font-medium">
                            {job.location}
                          </p>
                          <p>
                            <strong>Type:</strong> {job.type}
                          </p>
                          <p>
                            <strong>Salary:</strong> {job.currency}{" "}
                            {job.min_salary} - {job.max_salary} /{" "}
                            {job.salary_type}
                          </p>
                          <p className="flex gap-x-2">
                            <strong>Experience:</strong>{" "}
                            <span
                              className="max-h-20 overflow-y-auto border p-2 rounded-md"
                              dangerouslySetInnerHTML={sanitizeHtml(
                                job.experience || ""
                              )}
                            />
                          </p>
                          <p className="mb-2">
                            <strong>Application Deadline:</strong>{" "}
                            {job.application_deadline_date}
                          </p>
                          <Link
                            to="/registration"
                            className="text-center text-sm mt-auto bg-green-600 p-2 rounded-md text-white font-medium mb-2 inline-block"
                          >
                            More Information
                          </Link>
                        </div>
                      ))}
                    </div>
                  </>
                ) : hasActiveFilters ? (
                  <p className="text-center text-gray-500 mt-10">
                    No jobs found for the selected filters.
                  </p>
                ) : (
                  <p className="text-center text-gray-500 mt-10">
                    No jobs available at the moment.
                  </p>
                )}

                {/* Pagination */}
                {displayedJobs.length > jobsPerPage && (
                  <div className="pagination flex justify-between items-center mt-8">
                    <button
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <span>
                      Page {currentPage} of{" "}
                      {Math.ceil(displayedJobs.length / jobsPerPage)}
                    </span>
                    <button
                      onClick={handleNextPage}
                      disabled={
                        currentPage ===
                        Math.ceil(displayedJobs.length / jobsPerPage)
                      }
                      className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Advert />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default JobSearchPage;
