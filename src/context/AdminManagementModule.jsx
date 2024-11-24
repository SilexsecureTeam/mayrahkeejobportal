import { createContext, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContex";
import UseAdminManagement from "../hooks/useAdminManagement";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AdminManagementContext = createContext();

const PROFILE_DETAILS_KEY = "Admin Profile Detaials Database";

export const AdminManagementContextProvider = ({ children }) => {
  const {
    loading,
    error,
    adminProfile,
    profileDetails,
  } = UseAdminManagement();
  const { authDetails } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = window.location.pathname;

  useEffect(() => {
    if (!authDetails && location !== "/admin/login" && location !== "/admin/register" && location !== "/admin/forget-pwd" && location !== "/admin/reset-pwd" && location !== "/admin/logout") {
      toast.error("You are not authorized to view this page. Please login");
      navigate("/admin/login");
    }
  }, [authDetails, location]);


  return (
    <AdminManagementContext.Provider
      value={{
        loading,
        error,
        adminProfile,
        profileDetails,
      }}
    >
      {children}
    </AdminManagementContext.Provider>
  );
};