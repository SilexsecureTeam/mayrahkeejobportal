import { Helmet } from "react-helmet";
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
import JobCard from "./components/JobCard";
import { TbLayoutList, TbLayoutListFilled } from "react-icons/tb";
import { useState, useContext, useEffect } from "react";
import JobGridCard from "./components/JobGridCard";
import { ResourceContext } from "../../../context/ResourceContext";
import { split } from "postcss/lib/list";
import { useMemo } from "react";
import CustomPagination from "../../../components/CustomPagination";
import Pagination from "../../components/Pagination";

const PageSize = 3;

function FindJob() {
  const { getAllJobs, setGetAllJobs, getAllApplications, setGetAllApplications } = useContext(ResourceContext);
  const [isGrid, setIsGrid] = useState(false);

  // const [filteredJobs, setFilteredJobs] = useState([]);
  const [salaryRange, setSalaryRange] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [category, setCategory] = useState('');
  const [jobLevel, setJobLevel] = useState('');

  useEffect(() => {
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

    return salaryInRange && matchesEmploymentType && matchesCategory && matchesJobLevel;
  });

  // pagination methods Starts here

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState();

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return filteredData?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filteredData]);

  useEffect(() => {
    setTotalPage(Math.ceil(filteredData?.length / PageSize));
  }, [filteredData])

  // pagination methods Ends here
  return (
    <>
      <Helmet>
        <title>Dashboard | Find Job </title>
      </Helmet>
      <div className="h-full text-[#25324b] p-8 text-sm w-full">
        <div className="px-3 py-5 border mb-2 flex">
          <div className="relative border-b py-1 px-6 mx-4 w-[35%] ">
            <input type="text" placeholder="Search messages" className="pl-[10px] focus:outline-none w-full" />
            <span className="absolute text-primary top-0 left-0 p-2">
              <CiSearch size={20} />
            </span>
          </div>
          <div className="relative border-b py-1 px-6 mx-4 w-[35%]">
            <input type="text" placeholder="Search messages" className="pl-[10px] focus:outline-none w-full" />
            <span className="absolute text-primary top-0 left-0 p-2">
              <GrLocation size={20} />
            </span>
          </div>
          <button
            // onClick={handleFilter}
            className="bg-green-700 text-white py-2 px-6 hover:bg-green-900 font-medium"
          >Search</button>
        </div>
        <p>Popular : UI Designer, UX Researcher, Android, Admin</p>
        <div className="my-6">
          <div className="flex">
            <div className="w-[25%]">
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
                          {currentTableData?.map((job) => (
                            <JobGridCard key={job.id} job={job} newApplicant={newApplicant} />
                          ))}
                        </div>
                      </div>
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
                <div className="">
                  <div>
                    <p>Showing {currentPage}/{totalPage} of  {filteredData?.length} entries</p>
                  </div>
                  {/* <Pagination /> */}
                  <div className="my-6 flex justify-center">
                    <div className="">
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
