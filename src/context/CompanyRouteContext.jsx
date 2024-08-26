import { createContext } from "react";
import useApplicationManagement from "../hooks/useApplicationManagement";

export const CompanyRouteContext = createContext();

export const CompanyRouteContextProvider = ({ children, setSideBar }) => {
  return (
    <CompanyRouteContext.Provider
      value={{
        setSideBar,
      }}
    >
      {children}
    </CompanyRouteContext.Provider>
  );
};
