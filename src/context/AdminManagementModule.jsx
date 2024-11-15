import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContex";
import { FormatError } from "../utils/formmaters";
import { get, set } from "idb-keyval";
import { axiosClient } from "../services/axios-client";
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
    getArtisans,
    getEmployers,
  } = UseAdminManagement();
  const { authDetails, setAuthDetails } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = window.location.pathname;

  useEffect(() => {
    if (!authDetails && location !== "/admin/login" && location !== "/admin/register" && location !== "/admin/forget-pwd" && location !== "/admin/reset-pwd" && location !== "/admin/logout") {
      toast.error("You are not authorized to view this page. Please login");
      navigate("/admin/login");
    }
  }, [authDetails, location, navigate]);

  const handleLogout = () => {
    setAuthDetails(null);
    navigate("/admin/login");
  };

  return (
    <AdminManagementContext.Provider
      value={{
        loading,
        error,
        adminProfile,
        profileDetails,
        getArtisans,
        getEmployers,
        handleLogout,
      }}
    >
      {children}
    </AdminManagementContext.Provider>
  );
};