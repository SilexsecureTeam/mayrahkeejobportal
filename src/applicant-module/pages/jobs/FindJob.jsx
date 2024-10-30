import { Helmet } from "react-helmet";
<<<<<<< HEAD
import { CiGrid2H, CiSearch } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { MdArrowDropUp } from "react-icons/md";
import CustomizedCheckbox from "./components/CustomizedCheckbox";
import ChecksCategory from "./components/ChecksCategory";
import { BsGrid, BsGrid1X2Fill, BsGridFill } from "react-icons/bs";
import newApplicant from "../../../assets/pngs/applicant-logo1.png"
import newApplicant2 from "../../../assets/pngs/applicant-Logo2.png"
import newApplicant3 from "../../../assets/pngs/applicant-logo3.png"
=======
import { CiSearch } from "react-icons/ci";
import { GrLocation } from "react-icons/gr";
import ChecksCategory from "./components/ChecksCategory";
import { BsGrid, BsGridFill } from "react-icons/bs";
import newApplicant from "../../../assets/pngs/applicant-logo1.png"
>>>>>>> afowebdev
import JobCard from "./components/JobCard";
import { TbLayoutList, TbLayoutListFilled } from "react-icons/tb";
import { useState, useContext, useEffect } from "react";
import JobGridCard from "./components/JobGridCard";
import { ResourceContext } from "../../../context/ResourceContext";
<<<<<<< HEAD
import { split } from "postcss/lib/list";
import { useMemo } from "react";
import CustomPagination from "../../../components/CustomPagination";
import Pagination from "../../components/Pagination";
=======
import { useMemo } from "react";
import CustomPagination from "../../../components/CustomPagination";
>>>>>>> afowebdev

const PageSize = 3;

function FindJob() {
  const { getAllJobs, setGetAllJobs, getAllApplications, setGetAllApplications } = useContext(ResourceContext);
  const [isGrid, setIsGrid] = useState(false);

<<<<<<< HEAD
  // const [filteredJobs, setFilteredJobs] = useState([]);
=======
>>>>>>> afowebdev
  const [salaryRange, setSalaryRange] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [category, setCategory] = useState('');
  const [jobLevel, setJobLevel] = useState('');

  useEffect(() => {
<<<<<<< HEAD
    setGetAllJobs((prev) => {
      return {
        ...prev, isDataNeeded: true
      }
    })
  }, [])

  useEffect(() => {
    setGetAllApplications((prev) => {
      return {
        ...prev, isDataNeeded: true
      }
    })
  }, [])
  // const allJobs = getAllJobs.data
  const filteredData = getAllJobs.data?.filter((job) => {
    // Apply filtering logic based on multiple criteria
    const salaryFigures = job.min_salary?.split(".")[0]
    const salaryInRange = salaryRange ? salaryFigures >= salaryRange : true;

    const matchesEmploymentType = employmentType ? job.type?.toLowerCase().includes(employmentType?.toLowerCase()) : true;

    const matchesCategory = category ? job.search_keywords?.toLowerCase().includes(category?.toLowerCase()) : true;

    const matchesJobLevel = jobLevel ? job.career_level?.toLowerCase() === jobLevel?.toLocaleLowerCase() : true;
=======
    setGetAllJobs((prev) => ({
      ...prev, isDataNeeded: true
    }));
  }, []);

  useEffect(() => {
    setGetAllApplications((prev) => ({
      ...prev, isDataNeeded: true
    }));
  }, []);

  const filteredData = getAllJobs.data?.filter((job) => {
    const salaryFigures = job.min_salary?.split(".")[0];
    const salaryInRange = salaryRange ? salaryFigures >= salaryRange : true;
    const matchesEmploymentType = employmentType ? job.type?.toLowerCase().includes(employmentType?.toLowerCase()) : true;
    const matchesCategory = category ? job.search_keywords?.toLowerCase().includes(category?.toLowerCase()) : true;
    const matchesJobLevel = jobLevel ? job.career_level?.toLowerCase() === jobLevel?.toLowerCase() : true;
>>>>>>> afowebdev

    return salaryInRange && matchesEmploymentType && matchesCategory && matchesJobLevel;
  });

<<<<<<< HEAD
  // pagination methods Starts here

=======
>>>>>>> afowebdev
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState();

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return filteredData?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filteredData]);

  useEffect(() => {
    setTotalPage(Math.ceil(filteredData?.length / PageSize));
<<<<<<< HEAD
  }, [filteredData])

  // pagination methods Ends here
=======
  }, [filteredData]);

>>>>>>> afowebdev
  return (
    <>
      <Helmet>
        <title>Dashboard | Find Job </title>
      </Helmet>
<<<<<<< HEAD
      <div className="h-full text-[#25324b] p-8 text-sm w-full">
        <div className="px-3 py-5 border mb-2 flex">
          <div className="relative border-b py-1 px-6 mx-4 w-[35%] ">
=======
      <div className="h-full text-[#25324b] p-4 md:p-8 text-sm w-full">
        <div className="px-3 py-5 border mb-2 flex flex-col md:flex-row">
          <div className="relative border-b py-1 px-4 md:px-6 mx-4 w-full md:w-[35%] mb-2 md:mb-0">
>>>>>>> afowebdev
            <input type="text" placeholder="Search messages" className="pl-[10px] focus:outline-none w-full" />
            <span className="absolute text-primary top-0 left-0 p-2">
              <CiSearch size={20} />
            </span>
          </div>
<<<<<<< HEAD
          <div className="relative border-b py-1 px-6 mx-4 w-[35%]">
            <input type="text" placeholder="Search messages" className="pl-[10px] focus:outline-none w-full" />
=======
          <div className="relative border-b py-1 px-4 md:px-6 mx-4 w-full md:w-[35%] mb-2 md:mb-0">
            <input type="text" placeholder="Location" className="pl-[10px] focus:outline-none w-full" />
>>>>>>> afowebdev
            <span className="absolute text-primary top-0 left-0 p-2">
              <GrLocation size={20} />
            </span>
          </div>
<<<<<<< HEAD
          <button
            // onClick={handleFilter}
            className="bg-green-700 text-white py-2 px-6 hover:bg-green-900 font-medium"
          >Search</button>
        </div>
        <p>Popular : UI Designer, UX Researcher, Android, Admin</p>
        <div className="my-6">
          <div className="flex">
            <div className="w-[25%]">
=======
          <button className="bg-green-700 text-white py-2 px-6 hover:bg-green-900 font-medium">Search</button>
        </div>
        <p className="text-sm md:text-base">Popular: UI Designer, UX Researcher, Android, Admin</p>
        <div className="my-6">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-[25%] mb-4 md:mb-0">
>>>>>>> afowebdev
              <div className="checks_container pr-5">
                <div className="mb-4">
                  <ChecksCategory
                    setSalaryRange={setSalaryRange}
                    setEmploymentType={setEmploymentType}
                    setCategory={setCategory}
                    setJobLevel={setJobLevel}
                  />
                </div>
              </div>
            </div>
<<<<<<< HEAD
            <div className="w-[75%]">
              <div>
                <h4 className="font-bold text-base">All Jobs</h4>
                <div className="flex justify-between mb-6">
                  <div className="">
                    <p>Showing {getAllJobs.data?.length} results</p>
                  </div>
                  <div className="flex">
                    {/* <div className="flex mr-3">
                      <span>Sorted by:</span>
                      <button className="flex">
                        <span className="mr-2 font-medium items-center">Most relevant</span>
                        <span><FaChevronDown size={10} /></span>
                      </button>
                    </div> */}
                    <div className="border- px-2">
                      <button
                        onClick={() => setIsGrid(true)}
                        className="bg-gray-200 rounded p-1 mx-3"> {isGrid ? <BsGridFill className="prime_text" /> : <BsGrid />}  </button>
                      <button
                        onClick={() => setIsGrid(false)}
                        className="bg-gray-200 rounded p-1">
                        {isGrid ? <TbLayoutList /> : <TbLayoutListFilled className="prime_text" />} </button>
                    </div>
                  </div>
                </div>
                <div className="max-h-[75vh] overflow-y-auto thin_scroll_bar">
                  {getAllJobs.data && (
                    <div className="">
                      {isGrid ? (<div className="">
                        <div className="grid grid-cols-3 gap-4">
=======
            <div className="w-full md:w-[75%]">
              <div>
                <h4 className="font-bold text-base">All Jobs</h4>
                <div className="flex justify-between mb-6">
                  <div>
                    <p>Showing {getAllJobs.data?.length} results</p>
                  </div>
                  <div className="flex">
                    <div className="border- px-2">
                      <button
                        onClick={() => setIsGrid(true)}
                        className="bg-gray-200 rounded p-1 mx-1">{isGrid ? <BsGridFill className="prime_text" /> : <BsGrid />}</button>
                      <button
                        onClick={() => setIsGrid(false)}
                        className="bg-gray-200 rounded p-1 mx-1">
                        {isGrid ? <TbLayoutList /> : <TbLayoutListFilled className="prime_text" />}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="min-h-full overflow-y-auto thin_scroll_bar">
                  {getAllJobs.data && (
                    <div>
                      {isGrid ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
>>>>>>> afowebdev
                          {currentTableData?.map((job) => (
                            <JobGridCard key={job.id} job={job} newApplicant={newApplicant} />
                          ))}
                        </div>
<<<<<<< HEAD
                      </div>
=======
>>>>>>> afowebdev
                      ) : (
                        <div>
                          {currentTableData?.map((job) => (
                            <JobCard
                              getAllApplications={getAllApplications?.data}
                              key={job.id} job={job}
                              newApplicant={newApplicant} />
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              {getAllJobs.data && (
<<<<<<< HEAD
                <div className="">
                  <div>
                    <p>Showing {currentPage}/{totalPage} of  {filteredData?.length} entries</p>
                  </div>
                  {/* <Pagination /> */}
                  <div className="my-6 flex justify-center">
                    <div className="">
=======
                <div>
                  <div>
                    <p>Showing {currentPage}/{totalPage} of {filteredData?.length} entries</p>
                  </div>
                  <div className="my-6 flex justify-center">
                    <div>
>>>>>>> afowebdev
                      <CustomPagination
                        className="pagination-bar"
                        currentPage={currentPage}
                        totalCount={filteredData?.length}
                        pageSize={PageSize}
                        onPageChange={page => setCurrentPage(page)} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FindJob;
