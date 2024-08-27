import { createContext } from "react";

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
