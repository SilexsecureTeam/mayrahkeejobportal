import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContex";
import { axiosClient } from "../../../services/axios-client";
import { get, set } from "idb-keyval";

const PROFILE_DETAILS_KEY = "Staff Profile Detaials Database";

function ViewProfileDetails() {
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails?.token);
  const [loading, setLoading] = useState(false);
  const [profileDetails, setProfileDetails] = useState();

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
        currentKey !== "availability_status"
    );

  useEffect(() => {
    const initProfileDetails = async () => {
      setLoading(true);
      try {
        const dataFromDB = await get(PROFILE_DETAILS_KEY);
        if (dataFromDB) {
          setProfileDetails(dataFromDB);
          return;
        }

        const { data } = await client.get(
          `/domesticStaff/get-staff/${authDetails.user.id}`
        );
        await set(PROFILE_DETAILS_KEY, data.data);
        setProfileDetails(data.data);
      } catch (error) {
        FormatError(error, setError, "Profile Error");
      }
    };

    initProfileDetails();
  }, []);
  return (
    <div className="w-full flex flex-col gap-10">
      <h1 className="text-xl font-semibold">Your Profile Information</h1>

      {profileDetails ? (
        <>
          <div className="grid grid-cols-2 gap-x-3 gap-y-5 p-2 w-full text-gray-600">
            {filterProfileDetails.map((currentKey) => {
              const detail = profileDetails[currentKey];
              const labelText = currentKey.replace(/_/g, " ").toUpperCase();

              return (
                <div className="flex flex-col gap-1">
                  <label>{labelText}</label>
                  <span className="font-semibold">{detail}</span>
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
