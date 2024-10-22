import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContex";
import { FormatError } from "../utils/formmaters";
import { get, set } from "idb-keyval";
import { axiosClient } from "../services/axios-client";

export const AdminManagementContext = createContext();

const PROFILE_DETAILS_KEY = "Admin Profile Detaials Database";

export const AdminManagementContextProvider = ({ children }) => {
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails?.token);
  const [profileDetails, setProfileDetails] = useState();
  const [error, setError] = useState({
    message: "",
    error: ""
  });

  const [loading, setLoading] = useState(false);

  const adminProfile = async () => {
    // setLoading(true);
    // const { data } = await client.get(
    //   `/domesticStaff/get-staff/${authDetails.user.id}`
    // );
    // await set(PROFILE_DETAILS_KEY, data.data);
    // setProfileDetails(data.data);
    // setLoading(false);
  };

  useEffect(() => {
    const initProfileDetails = async () => {
      try {
        const dataFromDB = await get(PROFILE_DETAILS_KEY);
        if (dataFromDB) {
          setProfileDetails(dataFromDB);
          return;
        }

        adminProfile();
      } catch (error) {
        FormatError(error, setError, "Profile Error");
      }
    };

    initProfileDetails();
  }, []);
  return (
    <AdminManagementContext.Provider
      value={{ profileDetails, adminProfile }}
    >
      {children}
    </AdminManagementContext.Provider>
  );
};
