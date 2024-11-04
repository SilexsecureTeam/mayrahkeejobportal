import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContex";
import { FormatError } from "../utils/formmaters";
import { get, set } from "idb-keyval";
import { axiosClient } from "../services/axios-client";
import UseAdminManagement from '../hooks/useAdminManagement'


export const AdminManagementContext = createContext();

const PROFILE_DETAILS_KEY = "Admin Profile Detaials Database";

export const AdminManagementContextProvider = ({ children }) => {
  const { loading, error, adminProfile, profileDetails, getArtisans,getEmployers } = UseAdminManagement();



  return (
    <AdminManagementContext.Provider
      value={{ loading, error, adminProfile, profileDetails,getArtisans,getEmployers }}
    >
      {children}
    </AdminManagementContext.Provider>
  );
};
