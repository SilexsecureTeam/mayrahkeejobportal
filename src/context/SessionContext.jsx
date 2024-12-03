import { createContext, useContext, useEffect, useRef, useState } from "react";
import { clear } from "idb-keyval";
import { redirect, useNavigate } from "react-router-dom";
import { useIdleTimer } from "react-idle-timer";
import { AuthContext } from "./AuthContex";

// const SESSION_TIMEOUT = 10000; //30 minutes
const SESSION_TIMEOUT = 1800000; //30 minutes

const SESSION_KEY = "_session_condition";

export const SessionContext = createContext();

export const SessionContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const {authDetails} = useContext(AuthContext)
  const remeberMeSes = JSON.parse(localStorage.getItem("status"));
  const expiryDateSes = JSON.parse(localStorage.getItem("expiry_date"));
  const [rememberMe, setRememberMe] = useState(remeberMeSes || false);
  const [date, setDate] = useState(expiryDateSes || null);

  const toogleRememberMe = () => setRememberMe(!rememberMe);


  const saveSession = () => {
    if (rememberMe) {
      localStorage.setItem(SESSION_KEY, {
        status: rememberMe,
        expiry_date: addDays(new Date(), 7),
      });
      setDate(addDays(new Date(), 7));
    } else {
      localStorage.setItem(
        SESSION_KEY,
        JSON.stringify({ status: rememberMe, expiry_date: null })
      );
    }
    console.log("Triggered");
  };

  const redirectAuthUser = () => {
    
    if (!authDetails?.user?.role) return;
    console.log("Triggered");
    switch (authDetails?.user?.role) {
      case "candidate":
        return navigate("/applicant");
      case "employer":
       navigate("/company") ;break;
      case "staff":
        return navigate("/staff");
    }
  };

  const onIdle = () => {
    if (!rememberMe) {
      if (date && data < new Date()) return;

      localStorage.clear();
      clear();
      navigate("/");
      console.log("Triggered");
    }
  };

  useIdleTimer({
    timeout: SESSION_TIMEOUT,
    onIdle,
  });

  useEffect(() => {}, []);

  return (
    <SessionContext.Provider
      value={{ toogleRememberMe, rememberMe, saveSession, redirectAuthUser }}
    >
      {children}
    </SessionContext.Provider>
  );
};
