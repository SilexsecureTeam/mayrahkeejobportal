import { createContext } from "react";

export const AdminRouteContext = createContext();

export const AdminRouteContextProvider = ({ children, setSideBar }) => {
  return (
    <AdminRouteContext.Provider
      value={{
        setSideBar,
      }}
    >
      {children}
    </AdminRouteContext.Provider>
  );
};
