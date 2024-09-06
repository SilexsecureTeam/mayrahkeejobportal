import { createContext } from "react";

export const ApplicantRouteContext = createContext();

export const ApplicantRouteContextProvider = ({ children, setSideBar }) => {
  return (
    <ApplicantRouteContext.Provider
      value={{
        setSideBar,
      }}
    >
      {children}
    </ApplicantRouteContext.Provider>
  );
};
