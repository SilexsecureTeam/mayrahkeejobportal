import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContex";
import { axiosClient } from "../../../services/axios-client";
import { FormatError } from "../../../utils/formmaters";
import DefaultSwitch from "../../../components/DefaultSwitch";
import VerificationItem from "./VerificationItem";
import { StaffManagementContext } from "../../../context/StaffManagementModule";
import FormButton from "../../../components/FormButton";
import { onFailure } from "../../../utils/notifications/OnFailure";
import { onSuccess } from "../../../utils/notifications/OnSuccess";
import {
  verificationOptions1,
  verificationOptions2,
} from "../../../utils/constants";

function ViewVerifications() {
  const { profileDetails, getStaffProfile } = useContext(StaffManagementContext);
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails?.token);
  const [loading, setLoading] = useState(false);
  const [trackRecords, setTrackRecords] = useState({});

  const filterVerificationDetails =
    authDetails?.user?.staff_category === "artisan"
      ? verificationOptions2
      : verificationOptions1;

  const onSubmit = async () => {
    setLoading(true);
    try {
      const response = await client.post(
        `/domesticStaff/update-profile/${authDetails.user.id}`,
        { ...trackRecords }
      );
      getStaffProfile();
      onSuccess({
        message: "Verifications Success",
        success: "Track record updated successfully",
      });
    } catch (error) {
      console.error(error);
      onFailure({
        message: "Verifications Error",
        error: "Update failed",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateTrackRecord = (key, value) =>
    setTrackRecords((prev) => ({ ...prev, [key]: value }));

  useEffect(() => {
    if (profileDetails && filterVerificationDetails) {
      const records = {};
      // Expect filterVerificationDetails to be array of keys like: [{ key: "guarantor_verification_status" }, ...]
      filterVerificationDetails.forEach((item) => {
        const key = typeof item === "string" ? item.toLowerCase().replace(/\s+/g, "_") + "_verification_status" : item.key;
        records[key] = profileDetails[key] ?? "";
      });
      setTrackRecords(records);
    }
  }, [profileDetails, filterVerificationDetails]);

  return (
    <div className="w-full flex flex-col gap-10">
      <h1 className="text-xl font-semibold text-green-700">Your Records Status</h1>

      {profileDetails ? (
        <div className="flex flex-col gap-5 w-full">
          {filterVerificationDetails.map((item, index) => {
            const key =
              typeof item === "string"
                ? item.toLowerCase().replace(/\s+/g, "_") + "_verification_status"
                : item.key;

            return (
              <VerificationItem
                key={index}
                item={item}
                profileDetails={profileDetails}
                updateTrackRecord={updateTrackRecord}
              />
            );
          })}

          <FormButton
            loading={loading}
            onClick={onSubmit}
            width="w-[20%] mt-2 bg-primaryColor text-white"
          >
            Save changes
          </FormButton>
        </div>
      ) : (
        <span>Loading Data...</span>
      )}
    </div>
  );
}

export default ViewVerifications;
