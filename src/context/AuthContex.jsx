import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const STORAGE_KEY = "__auth_details";

export const AuthContextProvider = ({ children }) => {


  const [authDetails, setAuthDetails] = useState(() => {
    const details = localStorage.getItem(STORAGE_KEY);
    if (details !== null || details !== "undefined") {
      return JSON.parse(details);
    } else {
      return null;
    }
  });

  useEffect(() => {
    if (typeof authDetails !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(authDetails));
    }
  }, [authDetails?.token, authDetails?.user]);

  return (
    <AuthContext.Provider value={{ authDetails, setAuthDetails }}>
      {children}
    </AuthContext.Provider>
  );
};
