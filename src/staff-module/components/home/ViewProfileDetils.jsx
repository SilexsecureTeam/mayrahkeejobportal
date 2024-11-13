import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContex";
import { axiosClient, resourceUrl } from "../../../services/axios-client";
import { get, set } from "idb-keyval";
import { StaffManagementContext } from "../../../context/StaffManagementModule";

const PROFILE_DETAILS_KEY = "Staff Profile Detaials Database";

function ViewProfileDetails() {
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails?.token);
  const [loading, setLoading] = useState(false);
  const { profileDetails, getStaffProfile } = useContext(
    StaffManagementContext
  );

  const filterProfileDetails =
    profileDetails &&
    Object.keys(profileDetails).filter(
      (currentKey) =>
        currentKey !== "created_at" &&
        currentKey !== "updated_at" &&
        currentKey !== "id" &&
        currentKey !== "staff_category" &&
        currentKey !== "staff_category" &&
        currentKey !== "guarantor_verification_status" &&
        currentKey !== "residence_verification_status" &&
        currentKey !== "medical_history_verification_status" &&
        currentKey !== "police_report_verification_status" &&
        currentKey !== "previous_employer_verification_status" &&
        currentKey !== "family_verification_status" &&
        currentKey !== "contact_information" &&
        currentKey !== "subcategory" &&
        currentKey !== "resume" &&
        currentKey !== "availability_status" &&
        currentKey !== "job_type"
    );

    console.log(`${resourceUrl}${profileDetails?.profile_image}`)
  return (
    <div className="w-full flex flex-col gap-10">
      <h1 className="text-xl text-green-700 font-semibold">Your Profile Information</h1>
      <div className="h-[100px] flex items-center overflow-hidden justify-center text-gray-500 border border-[#dee2e6] w-[100px] rounded-full">
        <img src={`${resourceUrl}${profileDetails?.profile_image}`} className="h-full" />
     </div>
      {profileDetails ? (
        <>
          <div className="grid grid-cols-2 gap-x-3 gap-y-5 p-2 w-full text-gray-600 break-words">
            {filterProfileDetails.map((currentKey, index) => {
              const detail = profileDetails[currentKey];
              const labelText = currentKey.replace(/_/g, " ").toUpperCase();

              return (
                <div key={index} className="flex flex-col gap-1">
                  <label>{labelText}</label>
                  <p className="font-semibold text-wrap">{detail ? detail : "Pending" }</p>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <span>Loading Data</span>
      )}
    </div>
  );
}

export default ViewProfileDetails;
