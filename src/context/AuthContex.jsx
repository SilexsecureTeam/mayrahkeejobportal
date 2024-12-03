import { createContext, useContext, useEffect, useState } from "react";
import { addDays } from "date-fns";
import { clear } from "idb-keyval";

export const AuthContext = createContext();

export const STORAGE_KEY = "__auth_details";
const SESSION_KEY = "_session_condition";

export const AuthContextProvider = ({ children }) => {
  // for user update details
  const update = JSON.parse(localStorage.getItem("userDetails"));
  const [userUpdate, setUserUpdate] = useState(update ? update : null);
  const [rememberMe, setRememberMe] = useState(false);

  const toogleRememberMe = () => setRememberMe(!rememberMe);

  const [authDetails, setAuthDetails] = useState(() => {
    const details = localStorage.getItem(STORAGE_KEY);
    if (details !== null || details !== "undefined") {
      return JSON.parse(details);
    } else {
      return null;
    }
  });

  const saveSession = () => {
    if (rememberMe) {
      localStorage.setItem(SESSION_KEY, {
        status: rememberMe,
        expiry_date: addDays(new Date(), 7),
      });
    } else {
      localStorage.setItem(
        SESSION_KEY,
        JSON.stringify({ status: rememberMe, expiry_date: null })
      );
    }
  };

  useEffect(() => {
    if (typeof authDetails !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(authDetails));
    }
  }, [authDetails?.token, authDetails?.user]);



  return (
    <AuthContext.Provider
      value={{
        authDetails,
        setAuthDetails,
        userUpdate,
        setUserUpdate
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
