import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContex";
import { FormatError } from "../utils/formmaters";
import { get, set } from "idb-keyval";
import { axiosClient } from "../services/axios-client";

export const StaffManagementContext = createContext();

const PROFILE_DETAILS_KEY = "Staff Profile Detaials Database";

export const StaffManagementContextProvider = ({ children }) => {
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails?.token);
  const [profileDetails, setProfileDetails] = useState();
  const [error, setError] = useState({
    message: "",
    error: "",
  });

  const [loading, setLoading] = useState(false);

  const getStaffProfile = async () => {
    setLoading(true);
    const { data } = await client.get(
      `/domesticStaff/get-staff/${authDetails.user.id}`
    );
    await set(PROFILE_DETAILS_KEY, data.data);
    setProfileDetails(data.data);
    setLoading(false);
  };

  useEffect(() => {
    const initProfileDetails = async () => {
      try {
        const dataFromDB = await get(PROFILE_DETAILS_KEY);
        if (dataFromDB) {
          setProfileDetails(dataFromDB);
          return;
        }

        getStaffProfile();
      } catch (error) {
        FormatError(error, setError, "Profile Error");
      }
    };

    initProfileDetails();
  }, []);
  return (
    <StaffManagementContext.Provider
      value={{ profileDetails, getStaffProfile, authDetails }}
    >
      {children}
    </StaffManagementContext.Provider>
  );
};
