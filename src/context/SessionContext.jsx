import { createContext, useEffect, useRef } from "react";
import { clear } from "idb-keyval";
import { useNavigate } from "react-router-dom";
import { useIdleTimer } from "react-idle-timer";

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
    timeout: 15000,
    onIdle,
  });

  return (
    <SessionContext.Provider value={{}}>{children}</SessionContext.Provider>
  );
};
