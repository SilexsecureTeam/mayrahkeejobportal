import { useState } from "react";
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
import ApplicantModal from "../../../components/ApplicantModal";

function Application() {

  const [closeNote, setCloseNote] = useState(true)
  const [view, setView] = useState("all")

  const handleView = (type) => setView(type);
  return (
    <>
      <Helmet>
        <title>Dashboard | My Application </title>
      </Helmet>

      <div className="h-full inter_font p-6 w-full text-sm text-primary">
        <div className="text-sm">
          <div className="flex justify-between align-center">
            <div className="">
              <h4 className="fair_clash bold text-2xl mb-5">Keep it up, Jake</h4>
              <p>Here is what’s happening with your job search applications from July 19 - July 25.f</p>
            </div>
            <div>
              <button className="border p-2 flex items-center hover:bg-gray-100">Jul 19 - Jul 25  <RiCalendarEventLine className="ml-2 prime_text" size={15} /></button>
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
                      <p>You can request a follow-up 7 days after appl
                        ying for a job if the application status is in review. Only one follow-up is allowed per job.
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
          <div className="flex border-b mb-6">
            <button
              onClick={() => handleView("all")}
              className={`mx-2 p-2 hover:text-gray-500 ${view === "all" ? "border-b-2 border-green-600 font-medium" : ""}`}>All (23)</button>
            <button
              onClick={() => handleView("review")}
              className={`mx-2 p-2 hover:text-gray-500 ${view === "review" ? "border-b-2 border-green-600 font-medium" : ""}`}>In Review (23)</button>
            <button
              onClick={() => handleView("interview")}
              className={`mx-2 p-2 hover:text-gray-500 ${view === "interview" ? "border-b-2 border-green-600 font-medium" : ""}`}>Interview (23)</button>
            <button
              onClick={() => handleView("assesment")}
              className={`mx-2 p-2 hover:text-gray-500 ${view === "assesment" ? "border-b-2 border-green-600 font-medium" : ""}`}>Assesment (23)</button>
            <button
              onClick={() => handleView("offered")}
              className={`mx-2 p-2 hover:text-gray-500 ${view === "offered" ? "border-b-2 border-green-600 font-medium" : ""}`}>Offered (23)</button>
            <button
              onClick={() => handleView("hired")}
              className={`mx-2 p-2 hover:text-gray-500 ${view === "hired" ? "border-b-2 border-green-600 font-medium" : ""}`}>Hired (23)</button>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-bold">Applications History</p>
            <div className="flex items-start">
              <div className="">
                <div className="relative border h-full py-1 px-6 mb-4">
                  <input type="text" placeholder="Search" className="pl-[10px] focus:outline-none w-full" />
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
            <div className="flex recent_added items-center">
              <div className="flex justify-between py-3 px-2 w-[25%]">
                <span>1</span>
                <div className="w-3/4 flex items-center">
                  <div>
                    <img src={newApplicant} width={'40px'} alt="" />
                  </div>
                  <p className="ml-2">Company</p>
                </div>
              </div>
              <div className="flex py-3 px-2 w-3/6">
                <p className="w-[60%]">Social Media Assistant</p>
                <p className="w-[40%]">24 July 2021</p>
              </div>
              <div className="flex justify-between py-3 px-2 w-[25%]">
                <div className="w-2/3">
                  <button className="border border-yellow-400 text-yellow-400 px-2 py-1 rounded-full">Review</button>
                </div>
                <div className="w-1/3">
                  <button className="hover:bg-gray-200 p-1 rounded-full"><MdMoreHoriz size={25} /></button>
                </div>
              </div>
            </div>
            <div className="flex recent_added items-center">
              <div className="flex justify-between py-3 px-2 w-[25%]">
                <span>2</span>
                <div className="w-3/4 flex items-center">
                  <div>
                    <img src={newApplicant2} width={'40px'} alt="" />
                  </div>
                  <p className="ml-2">Design</p>
                </div>
              </div>
              <div className="flex py-3 px-2 w-3/6">
                <p className="w-[60%]">Social Media Assistant</p>
                <p className="w-[40%]">24 July 2021</p>
              </div>
              <div className="flex justify-between py-3 px-2 w-[25%]">
                <div className="w-2/3">
                  <button className="border border-green-400 text-green-400 font-medium px-2 py-1 rounded-full">Shortlisted</button>
                </div>
                <div className="w-1/3">
                  <button className="hover:bg-gray-200 p-1 rounded-full"><MdMoreHoriz size={25} /></button>
                </div>
              </div>
            </div>
            <div className="flex recent_added items-center">
              <div className="flex justify-between py-3 px-2 w-[25%]">
                <span>3</span>
                <div className="w-3/4 flex items-center">
                  <div>
                    <img src={newApplicant3} width={'40px'} alt="" />
                  </div>
                  <p className="ml-2">Ares</p>
                </div>
              </div>
              <div className="flex py-3 px-2 w-3/6">
                <p className="w-[60%]">Social Media Assistant</p>
                <p className="w-[40%]">24 July 2021</p>
              </div>
              <div className="flex justify-between py-3 px-2 w-[25%]">
                <div className="w-2/3">
                  <button className="border border-black px-2 py-1 rounded-full">Offered</button>
                </div>
                <div className="w-1/3">
                  <button className="hover:bg-gray-200 p-1 rounded-full"><MdMoreHoriz size={25} /></button>
                </div>
              </div>
            </div>
            <div className="flex recent_added items-center">
              <div className="flex justify-between py-3 px-2 w-[25%]">
                <span>4</span>
                <div className="w-3/4 flex items-center">
                  <div>
                    <img src={newApplicant} width={'40px'} alt="" />
                  </div>
                  <p className="ml-2">Company</p>
                </div>
              </div>
              <div className="flex py-3 px-2 w-3/6">
                <p className="w-[60%]">Social Media Assistant</p>
                <p className="w-[40%]">24 July 2021</p>
              </div>
              <div className="flex justify-between py-3 px-2 w-[25%]">
                <div className="w-2/3">
                  <button className="border border-yellow-400 text-yellow-400 px-2 py-1 rounded-full">Review</button>
                </div>
                <div className="w-1/3">
                  <button className="hover:bg-gray-200 p-1 rounded-full"><MdMoreHoriz size={25} /></button>
                </div>
              </div>
            </div>
            <div className="flex recent_added items-center">
              <div className="flex justify-between py-3 px-2 w-[25%]">
                <span>5</span>
                <div className="w-3/4 flex items-center">
                  <div>
                    <img src={newApplicant2} width={'40px'} alt="" />
                  </div>
                  <p className="ml-2">Design</p>
                </div>
              </div>
              <div className="flex py-3 px-2 w-3/6">
                <p className="w-[60%]">Social Media Assistant</p>
                <p className="w-[40%]">24 July 2021</p>
              </div>
              <div className="flex justify-between py-3 px-2 w-[25%]">
                <div className="w-2/3">
                  <button className="border border-green-400 text-green-400 font-medium px-2 py-1 rounded-full">Shortlisted</button>
                </div>
                <div className="w-1/3">
                  <button className="hover:bg-gray-200 p-1 rounded-full"><MdMoreHoriz size={25} /></button>
                </div>
              </div>
            </div>
            <div className="flex recent_added items-center">
              <div className="flex justify-between py-3 px-2 w-[25%]">
                <span>6</span>
                <div className="w-3/4 flex items-center">
                  <div>
                    <img src={newApplicant3} width={'40px'} alt="" />
                  </div>
                  <p className="ml-2">Ares</p>
                </div>
              </div>
              <div className="flex py-3 px-2 w-3/6">
                <p className="w-[60%]">Social Media Assistant</p>
                <p className="w-[40%]">24 July 2021</p>
              </div>
              <div className="flex justify-between py-3 px-2 w-[25%]">
                <div className="w-2/3">
                  <button className="border border-black px-2 py-1 rounded-full">Offered</button>
                </div>
                <div className="w-1/3">
                  <button className="hover:bg-gray-200 p-1 rounded-full"><MdMoreHoriz size={25} /></button>
                </div>
              </div>
            </div>
          </div>
          <Pagination />
        </div>
      </div>
    </>
  );
}

export default Application;
