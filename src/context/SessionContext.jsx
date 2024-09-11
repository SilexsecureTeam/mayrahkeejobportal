import { createContext, useEffect, useState } from "react";
import {clear} from 'idb-keyval'
import {useNavigate} from 'react-router-dom'
import { onPrompt } from "../utils/notifications/onPrompt";

export const SessionContext = createContext();

export const SessionContextProvider = ({ children }) => {
  const [timeoutId, setTimeoutId] = useState(null);
  const navigate = useNavigate();


  const resetInactivityTimer = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      // console.log('cleared succesfully', timeoutId)
    }

    const newTimeoutId = setTimeout(() => {
      // Clear session and redirect to login after inactivity
      handleLogout();
      // console.log('count down')
    }, 300000); // 5 minutes of inactivity
    setTimeoutId(newTimeoutId);
  };

  useEffect(() => {
    const handleUserActivity = () => {
      resetInactivityTimer();
    };

    window.addEventListener("mousemove",()  => {handleUserActivity();});
    window.addEventListener("keypress", handleUserActivity);

    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keypress", handleUserActivity);
    };
  }, [timeoutId]);

 

  const handleLogout = async () => {
    localStorage.clear()
    // onPrompt('Session Expired')
    await clear()
    navigate("/");
  };

  return (
    <SessionContext.Provider value={{}}>{children}</SessionContext.Provider>
  );
};
