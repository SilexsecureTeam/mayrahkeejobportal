import { Helmet } from "react-helmet";
import docsIcon from "../../../assets/pngs/doc-vector.png";
import chatsIcon from "../../../assets/pngs/multiple-chat.png";
import { FaArrowRightLong } from "react-icons/fa6";
import {
  MdChevronLeft,
  MdChevronRight,
  MdOutlineRateReview,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import { RiCalendarEventLine } from "react-icons/ri";
import { generateDateRange } from "../../../utils/formmaters";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContex";
import { StaffRouteContext } from "../../../context/StaffRouteContext";
import { useNavigate } from "react-router-dom";
import { StaffManagementContext } from "../../../context/StaffManagementModule";
import DefaultSwitch from "../../../components/DefaultSwitch";
import useStaff from "../../../hooks/useStaff";

function Dashboard() {
  const { authDetails } = useContext(AuthContext);
  const { setSideBar } = useContext(StaffRouteContext);
  const { profileDetails, getStaffProfile } = useContext(
    StaffManagementContext
  );

  const [availablityStatus, setAvailabiltyStatus] = useState();
  const [loading, setloading] = useState(false);
  const { updateAvailabilityStatus } = useStaff();

  const filterVerificationDetails =
    profileDetails &&
    Object.keys(profileDetails).filter(
      (currentKey) =>
        currentKey == "guarantor_verification_status" ||
        currentKey == "residence_verification_status" ||
        currentKey == "medical_history_verification_status" ||
        currentKey == "police_report_verification_status" ||
        currentKey == "previous_employer_verification_status"
    );

  const navigate = useNavigate();
  const navigateToPage = (route, index) => {
    navigate(route);
    setSideBar(index);
  };

  useEffect(() => {
    if(profileDetails && profileDetails["availability_status"] === '1'){
     setAvailabiltyStatus(true)
    } else{
      setAvailabiltyStatus(false)
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Dashboard | Dashboard</title>
      </Helmet>
      <div className="h-full p-6 w-full text-sm text-gray-800">
        <div className="text-sm">
          <div className="flex justify-between ">
            <div className="">
              <h4 className="font-bold text-2xl mb-2  ">
                Welcome back, {authDetails.user.first_name}{" "}
                {authDetails.user.surname}
              </h4>
              <p>
                Here a summary of your recent activities {generateDateRange()}
              </p>
            </div>
            <div>
              <button className="border p-2 hidden md:flex items-center">
                {" "}
                {generateDateRange()}
                <RiCalendarEventLine className="ml-2 " size={15} />
              </button>
            </div>
          </div>
          <div className="md:flex-row flex-col flex justify-between  mt-8 gap-2">
            <div className=" w-full md:w-[23%]  flex justify-between md:flex-col ">
              <div className="pb-1 h-full md:w-full w-[45%] md:h-1/2">
                <div
                  onClick={() => navigateToPage("/staff/profile", 1)}
                  className="border text-white transition duration-400 bg-lightgreen h-full cursor-pointer mb-4 p-3 pb-0 flex flex-col justify-between"
                >
                  <p className="font-bold">Profile Update</p>
                  <p className="pl-2 text-2xl font-medium">Completed</p>
                  <div className="flex justify-between items-end mt-">
                    <p className="text-2xl font-medium"></p>
                    <div className="">
                      <img src={docsIcon} alt="" className="h-[30px]" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-1 h-full md:w-full w-[45%]  md:h-1/2">
                <div
                  onClick={() => navigateToPage("/staff/resume", 2)}
                  className="border bg-darkblue text-white transition duration-400 h-full cursor-pointer mb-4 p-3 pb-0 flex flex-col justify-between"
                >
                  <p className="font-bold">Resume</p>
                  <p className="pl-2 text-2xl font-medium">Uploaded</p>
                  <div className="flex justify-between items-end mt-4">
                    <p className="text-6xl font-medium"></p>
                    <div className="">
                      <img src={chatsIcon} alt="" className="w-[30px]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" w-full md:w-[23%]  flex justify-between md:flex-col ">
              <div className="pt-1 h-full md:w-full w-[45%]  md:h-1/2">
                <div
                  onClick={() => navigateToPage("/staff/verifications", 2)}
                  className="border  bg-lightorange text-white transition duration-400 h-full cursor-pointer mb-4 p-3 pb-0 flex flex-col justify-between"
                >
                  <p className="font-bold">Verifications</p>
                  <p className="pl-2 text-2xl font-medium">In-Review</p>
                  <div className="flex justify-between items-end mt-4">
                    <p className="text- font-medium"></p>
                    <div className=" text-gray-300">
                      <MdOutlineRateReview size={30} />
                      {/* <img src={docsIcon} alt="" className="w-10" /> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-1 h-full md:w-full w-[45%]  md:h-1/2">
                <div
                  onClick={() => navigateToPage("/staff/help-center", 5)}
                  className="border bg-lightblue text-white transition duration-400 h-full cursor-pointer mb-4 p-3 pb-0 flex flex-col justify-between"
                >
                  <p className="font-bold">Help Center</p>
                  <p className="pl-2 text-2xl font-medium">Get Help</p>
                  <div className="flex justify-between items-end mt-4">
                    <p className="text-6xl font-medium"></p>
                    <div className=" text-gray-300">
                      <MdOutlineRemoveRedEye size={30} />
                      {/* <img src={chatsIcon} alt="" className="w-[60px]" /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-[50%] font-medium border py-3 text-sm">
              <div className="px-3 border-b">
                <p className="font-bold my-3">Records Status</p>
              </div>
              <div className="px-3 flex flex-col border-b justify-between items-start">
                {filterVerificationDetails?.map((currentKey) => {
                  const detail = profileDetails[currentKey];
                  const value = detail == "1" ? true : false;
                  const labelText = currentKey.replace(/_/g, " ").toUpperCase();

                  return (
                    <div
                      onClick={() => navigateToPage("/staff/verifications", 2)}
                      className="p-2 cursor-pointer hover:bg-gray-100 flex justify-between w-full"
                    >
                      <span>{labelText}</span>
                      {value ? (
                        <span className="text-green-500 font-semibold">
                          Verified
                        </span>
                      ) : (
                        <span className="text-red-500 font-semibold">
                          Unverified
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="my-5">
          <div className="border">
            <div className="p-3 flex  gap-10 border-b">
              <p className="font-bold text-base">Availability Status</p>
              <DefaultSwitch
                enabled={availablityStatus}
                // disabled={loading}
                onClick={async () => {
                  console.log('clicked')
                  setloading(true);
                  const result = await updateAvailabilityStatus(
                    authDetails.user.id,
                    availablityStatus ? "0" : "1"
                  );
                  if (result) {
                    setAvailabiltyStatus(!availablityStatus);
                  }
                  setloading(false);
                }}
              />
            </div>
            <div className="p-3 h-[30vh] overflow-y-auto no_scroll_bar">
              <div className="my-4 flex justify-center">
                <div className="flex items-center cursor-pointer  hover:opacity-90">
                  <p className="text-md leading-7 tracking-wider">
                    We've introduced a user-friendly feature just for you,
                    giving you the power to control your availability status
                    with a simple toggle. This means you can easily let others
                    know whether you're currently available for work or not.
                    With just one click, you can update your status in
                    real-time—whether you're ready to take on new opportunities
                    or need to mark yourself as unavailable. This feature is
                    designed to give you control over how you're seen by
                    potential employers or clients, allowing you to manage your
                    own schedule.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
