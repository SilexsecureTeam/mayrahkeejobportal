import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContex";
import { axiosClient } from "../../../services/axios-client";
import { get, set } from "idb-keyval";
import { FormatError } from "../../../utils/formmaters";
import DefaultSwitch from "../../../components/DefaultSwitch";
import VerificationItem from "./VerificationItem";
import { StaffManagementContext } from "../../../context/StaffManagementModule";
import FormButton from "../../../components/FormButton";
import { onFailure } from "../../../utils/notifications/OnFailure";
import { onSuccess } from "../../../utils/notifications/OnSuccess";

const PROFILE_DETAILS_KEY = "Staff Profile Detaials Database";

function ViewVerifications() {
  const { profileDetails, getStaffProfile } = useContext(
    StaffManagementContext
  );
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails?.token);

  const [loading, setLoading] = useState(false);

  const [trackRecords, setTrackRecords] = useState();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await client.post(
        `/domesticStaff/update-profile/${authDetails.user.id}`,
        { ...trackRecords }
      );
      getStaffProfile();
      onSuccess({
        message: "Verifications Success",
        success: "Track record updated succesfully",
      });
    } catch (error) {
      console.log(error);
      onFailure({
        message: "Verifications Error",
        error: "Upadate failed",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterVerificationDetails =
    profileDetails &&
    Object.keys(profileDetails).filter(
      (currentKey) =>
        currentKey == "guarantor_verification_status" ||
        currentKey == "residence_verification_status" ||
        currentKey == "medical_history_verification_status" ||
        currentKey == "police_report_verification_status" ||
        currentKey == "previous_employer_verification_status" ||
        currentKey == "family_verification_status" ||
        currentKey == "availability_status"
    );

  const updateTrackRecord = (key, value) =>
    setTrackRecords({ ...trackRecords, [key]: value });

  useEffect(() => {
    if (filterVerificationDetails) {
      const records = {};
      filterVerificationDetails.map(
        (currentKey) => (records[currentKey] = profileDetails[currentKey])
      );
      setTrackRecords({ ...records });
    }
  }, []);

  return (
    <div className="w-full flex flex-col gap-10">
      <h1 className="text-xl font-semibold">Your Records status</h1>

      {profileDetails ? (
        <div className="flex flex-col gap-5 w-full">
          {filterVerificationDetails.map((currentKey) => (
            <VerificationItem
              currentKey={currentKey}
              profileDetails={profileDetails}
              updateTrackRecord={updateTrackRecord}
            />
          ))}
          <FormButton
            loading={loading}
            onClick={onSubmit}
            width="w-[20%] mt-2 bg-primaryColor text-white"
          >
            Save changes
          </FormButton>
        </div>
      ) : (
        <span>Loading Data</span>
      )}
    </div>
  );
}

export default ViewVerifications;
