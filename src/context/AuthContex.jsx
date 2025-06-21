import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const STORAGE_KEY = "__auth_details";

export const AuthContextProvider = ({ children }) => {
  // Get auth directly from sessionStorage (no expiry)
  const getStoredAuth = () => {
    const sessionData = sessionStorage.getItem(STORAGE_KEY);
    return sessionData ? JSON.parse(sessionData) : null;
  };

  const [authDetails, setAuthDetails] = useState(getStoredAuth());

  // Save session to storage without expiry
  const saveSession = () => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(authDetails));
  };

  useEffect(() => {
    if (authDetails) {
      saveSession();
    }
  }, [authDetails]);

  return (
    <AuthContext.Provider value={{ authDetails, setAuthDetails }}>
      {children}
    </AuthContext.Provider>
  );
};
