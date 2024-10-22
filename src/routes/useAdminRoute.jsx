import { lazy, useContext, useEffect, useReducer, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { adminOptions, adminnUtilOptions } from "../utils/constants";
import { AuthContext } from "../context/AuthContex";
import { clear } from "idb-keyval";
import StaffReducer from "../reducers/StaffReducer";
import { AdminManagementContextProvider } from "../context/AdminManagementModule";
import { AdminRouteContextProvider } from "../context/AdminRouteContext";

//Util Component
const NavBar = lazy(() => import("../admin-module/components/NavBar"));
const SideBar = lazy(() => import("../admin-module/components/SideBar"));
const SideBarItem = lazy(() =>
  import("../admin-module/components/SideBarItem")
);

//pages
const Dashboard = lazy(() => import("../admin-module/pages/dashboard/Dashboard"));
const HelpCenter = lazy(() => import("../admin-module/pages/help-center/Help"));
const Settings = lazy(() => import("../admin-module/pages/settings/Settings"));

function useAdminRoute() {
  const [state, dispatch] = useReducer(StaffReducer, adminOptions[0]);
  const { authDetails } = useContext(AuthContext);
  // const [redirectState, setRedirectState] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const toogleIsOpen = () => setIsOpen(!isOpen);

  const setSideBar = (index) => {
    const page = adminOptions[index];
    dispatch({ ...page });
  };

  useEffect(() => {
    const clearDb = async () => await clear();

    const handleUnload = () => {
      clearDb();
    };

    window.addEventListener("unload", handleUnload);

    return () => () => {
      handleUnload();
      window.removeEventListener("unload", handleUnload);
    };
  }, []);

  return (
    <>
      {true? (
        <AdminManagementContextProvider>
          <AdminRouteContextProvider setSideBar={setSideBar}>
            <main className="h-screen w-screen relative flex">
              {/* Side bar takes up 20% of total width and 100% of height */}

              <SideBar
                authDetails={authDetails}
                toogleIsOpen={toogleIsOpen}
                isMenuOpen={isOpen}
              >
                <ul className="flex flex-col gap-[10px]">
                  {adminOptions.map((currentOption) => (
                    <SideBarItem
                      key={currentOption.type}
                      data={currentOption}
                      dispatch={dispatch}
                      state={state}
                    />
                  ))}
                </ul>

                <ul className="flex flex-col gap-[10px]">
                  {adminnUtilOptions.map((currentOption) => (
                    <SideBarItem
                      key={currentOption.type}
                      data={currentOption}
                      dispatch={dispatch}
                    />
                  ))}
                </ul>
              </SideBar>

              {/* Routes and dashboard take up 80% of total width and 100% of height*/}
              <div className="md:w-[82%] w-full relative flex divide-y-2 divide-secondaryColor bg-white flex-col h-full">
                <NavBar
                  state={state}
                  toogleIsOpen={toogleIsOpen}
                  isMenuOpen={isOpen}
                />
                <div className="w-full  h-[92%] overflow-y-auto">
                  <Routes>
                    <Route index element={<Dashboard />} />
                    {/* <Route path="*" element={<NotFound />} /> */}
                    <Route path="settings" element={<Settings />} />
                    <Route path="help-center" element={<HelpCenter />} />
                  </Routes>
                </div>
              </div>
            </main>
          </AdminRouteContextProvider>
        </AdminManagementContextProvider>
      ) : (
        <Navigate to={"/"} replace />
      )}
    </>
  );
}

export default useAdminRoute;
