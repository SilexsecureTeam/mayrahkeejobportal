import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { MdClose, MdMoreHoriz, MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";
import { RiCalendarEventLine } from "react-icons/ri";
import noticeImg from "../../../assets/pngs/notice-icon.png"
import { CiSearch } from "react-icons/ci";
import { BsFilter } from "react-icons/bs";
import newApplicant from "../../../assets/pngs/applicant-logo1.png"
import newApplicant2 from "../../../assets/pngs/applicant-Logo2.png"
import newApplicant3 from "../../../assets/pngs/applicant-logo3.png"
import Pagination from "../../components/Pagination";
import { ResourceContext } from "../../../context/ResourceContext";
import AllApplicants from "./components/AllApplicants";
import { AuthContext } from "../../../context/AuthContex";
import AllShortlistedApplicants from "./components/AllShortlistedApplication";
// import ApplicantModal from "../../../components/ApplicantModal";

function Application() {
  const { getAllApplications, setGetAllApplications } = useContext(ResourceContext);
  const { authDetails } = useContext(AuthContext);

  const [closeNote, setCloseNote] = useState(true)
  const [view, setView] = useState("all")
  const [appFilter, setAppFilter] = useState("")

  const handleView = (type) => setView(type);
  function generateDateRange() {
    const today = new Date();
    const oneWeekLater = new Date(today);
    oneWeekLater.setDate(today.getDate() + 7);

    // Format dates as "Month Day, Year"
    const formattedStartDate = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const formattedEndDate = oneWeekLater.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    return `${formattedStartDate} - ${formattedEndDate}.`;
  }

  useEffect(() => {
    setGetAllApplications((prev) => {
      return {
        ...prev, isDataNeeded: true
      }
    })
  }, [])

  const filterByKeyword = getAllApplications.data?.filter((item) => (
    item.job_title?.toLowerCase().includes(appFilter)
  ))

  const allApplications = filterByKeyword
  const pendingReview = allApplications?.filter((app) => app.status === "in-review")
  const pendingInterview = allApplications?.filter((app) => app.status === "shortlist")

  console.log(filterByKeyword)
  return (
    <>
      <Helmet>
        <title>Dashboard | My Application </title>
      </Helmet>
      <div className="h-full p-8 px-5 md:px-8 w-full text-sm text-primary">
        <div className="text-sm">
          <div className="flex justify-between align-center">
            <div className="">
              <h4 className=" font-semibold text-2xl mb-5">Keep it up, {authDetails.user?.first_name}</h4>
              <p>Here is what’s happening with your job search applications from {generateDateRange()}</p>
            </div>
            <div>
              <button className="border p-2 flex items-center hover:bg-gray-100 text-xs md:text-sm">{generateDateRange()}  <RiCalendarEventLine className="ml-2 prime_text" size={15} /></button>
            </div>
          </div>
          <div className="my-6">
            {closeNote && (
              <div className="p-4 relative bg-[#47AA491A]">
                <div className="md:w-4/5">
                  <div className="flex">
                    <div className="">
                      <img src={noticeImg} alt="" />
                    </div>
                    <div className="ml-3">
                      <p className="font-bold">New Feature</p>
                      <p>You can request a follow-up 7 days after applying for a job if the application status is in review. Only one follow-up is allowed per job.
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setCloseNote(false)}
                  className="absolute top-0 right-0 p-2 hover:bg-green-200"><MdClose size={20} />
                </button>
              </div>
            )}
          </div>
          <div className="flex border-b mb-6 min-w-full overflow-auto">
            <button
              onClick={() => handleView("all")}
              className={`mx-2 p-2 hover:text-gray-500 ${view === "all" ? "sticky left-0 bg-gray-200 border-b-2 border-green-600 font-medium" : ""}`}>All ({allApplications?.length})</button>
            <button
              onClick={() => handleView("review")}
              className={`mx-2 p-2 hover:text-gray-500 ${view === "review" ? "sticky left-0 bg-gray-200 border-b-2 border-green-600 font-medium" : ""}`}>In Review ({pendingReview?.length})</button>
            <button
              onClick={() => handleView("interview")}
              className={`mx-2 p-2 hover:text-gray-500 ${view === "interview" ? "sticky left-0 bg-gray-200 border-b-2 border-green-600 font-medium" : ""}`}>shortlisted ({pendingInterview?.length})</button>
            <button
              onClick={() => handleView("assesment")}
              className={`mx-2 p-2 hover:text-gray-500 ${view === "assesment" ? "sticky left-0 bg-gray-200 border-b-2 border-green-600 font-medium" : ""}`}>interviewed (0)</button>
            <button
              onClick={() => handleView("offered")}
              className={`mx-2 p-2 hover:text-gray-500 ${view === "offered" ? "sticky left-0 bg-gray-200 border-b-2 border-green-600 font-medium" : ""}`}>Offered (0)</button>
            <button
              onClick={() => handleView("hired")}
              className={`mx-2 p-2 hover:text-gray-500 ${view === "hired" ? "sticky left-0 bg-gray-200 border-b-2 border-green-600 font-medium" : ""}`}>Hired (0)</button>
          </div>
          <div className="flex flex-wrap justify-between items-center">
            <p className="font-bold">Applications {view}</p>
            <div className="flex items-start">
              <div className="">
                <div className="relative border h-full py-1 px-6 mb-4">
                  <input type="text" placeholder="Search" onChange={(e) => setAppFilter(e.target.value)} className="pl-[10px] focus:outline-none w-full" />
                  <span className="absolute text-primary top-0 left-0 p-2">
                    <CiSearch />
                  </span>
                </div>
              </div>
              <button className="border px-2 py-1 mx-2 flex items-center hover:bg-gray-100"><BsFilter className="mx-2 prime_text" size={20} /> Filter</button>
            </div>
          </div>
          <div className="flex border-b items-center">
            <div className="flex justify-between py-3 px-2 w-[25%]">
              <span>#</span>
              <p className="w-3/4">Company Name</p>
            </div>
            <div className="flex py-3 px-2 w-3/6">
              <p className="w-[60%]">Roles</p>
              <p className="w-[40%]">Date Applied</p>
            </div>
            <div className="flex py-3 px-2 w-[25%]">
              <p>Status</p>
            </div>
          </div>
          <div className="my-3">
            {view === "all" && allApplications?.map((app, index) => (
              <AllApplicants key={app.id} app={app} index={index} />
            ))}
            {view === "review" && pendingReview?.map((app, index) => (
              <AllApplicants key={app.id} app={app} index={index} />
            ))}
            {view === "interview" && pendingInterview?.map((app, index) => (
              <AllShortlistedApplicants key={app.id} app={app} index={index} />
            ))}
          </div>
          {/* <Pagination /> */}
        </div>
      </div>
    </>
  );
}

export default Application;
