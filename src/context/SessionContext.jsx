import { createContext, useEffect, useRef } from "react";
import { clear } from "idb-keyval";
import { useNavigate } from "react-router-dom";
import { useIdleTimer } from "react-idle-timer";


const SESSION_TIMEOUT = 1800000; 

export const SessionContext = createContext();

export const SessionContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const onIdle = () => {
    localStorage.clear();
    clear();
    navigate("/");
    console.log("Triggered");
  };

  useIdleTimer({
    timeout: SESSION_TIMEOUT,
    onIdle,
  });

  return (
    <SessionContext.Provider value={{}}>{children}</SessionContext.Provider>
  );
};
