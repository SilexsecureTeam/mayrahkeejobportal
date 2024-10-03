import { createContext } from "react";

export const StaffRouteContext = createContext();

export const StaffRouteContextProvider = ({ children, setSideBar }) => {
  return (
    <StaffRouteContext.Provider
      value={{
        setSideBar,
      }}
    >
      {children}
    </StaffRouteContext.Provider>
  );
};
