import { lazy, useContext, useEffect, useReducer, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ApplicantReducer from "../reducers/ApplicantReducer";
import { applicantOptions, utilOptions } from "../utils/constants";
import { AuthContext } from "../context/AuthContex";
import ResourceContextProvider from "../context/ResourceContext";
import { clear } from "idb-keyval";
import { ApplicantRouteContextProvider } from "../context/ApplicantRouteContext";
import { ref, set } from "firebase/database";
import { database } from "../utils/firebase";
import StaffInformation from "../staff-module/pages/verifications/StaffInformation";
import CartedStaffs from "../components/staffs/CartedStaffs";
import ApplicantDetails from "../components/applicant-details-ui/ApplicantDetails";
import AllApplication from "../components/applicant-details-ui/AllApplication";
import Application from "../components/applicant-details-ui/Application";
//Util Components
const NavBar = lazy(() => import("../applicant-module/components/NavBar"));
const SideBar = lazy(() => import("../applicant-module/components/SideBar"));
const SideBarItem = lazy(() =>
  import("../applicant-module/components/SideBarItem")
);

//Route Pages
const Home = lazy(() => import("../applicant-module/pages/home/Home"));
const Messages = lazy(() =>
  import("../applicant-module/pages/messages/Messages")
);
const Applications = lazy(() =>
  import("../applicant-module/pages/applications/Applications")
);
const FindJob = lazy(() => import("../applicant-module/pages/jobs/FindJob"));
const JobDetails = lazy(() =>
  import("../applicant-module/pages/job-details/JobDetails")
);
const Companies = lazy(() =>
  import("../applicant-module/pages/companies/Companies")
);
const CompanyDetails = lazy(() =>
  import("../applicant-module/pages/company-details/CompanyDetails")
);
const PublicProfile = lazy(() =>
  import("../applicant-module/pages/profile/PublicProfile")
);
const MyResume = lazy(() =>
  import("../applicant-module/pages/resume/MyResume")
);

const Artisan = lazy(() => import("../applicant-module/pages/artisan/Artisan"));
const DomesticStaffs = lazy(() =>
  import("../applicant-module/pages/staffs/DomesticStaffs")
);
const SuccessPage = lazy(() => import("../components/SuccessPage"));
const StaffDetails = lazy(() => import('../components/applicant-details-ui/ApplicantDetails'))
const ContractHistory = lazy(() => import('../components/staffs/ContractHistory'))


const ShortListedDetails = lazy(() =>
  import("../applicant-module/pages/shortlisted/ShortListedDetails")
);
const NotFound = lazy(() => import("../applicant-module/pages/404"));
const Settings = lazy(() =>
  import("../applicant-module/pages/settings/Settings")
);
const HelpCenter = lazy(() => import("../pages/HelpCenter"));

function useApplicantRoute() {
  const [state, dispatch] = useReducer(ApplicantReducer, null);
  const { authDetails } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [redirectState, setRedirectState] = useState();

  const toogleIsOpen = () => setIsOpen(!isOpen);

 // Step 2: Load saved state from localStorage on mount
 
 useEffect(() => {
  const savedState = localStorage.getItem("sidebarState");
  
  // Log saved state for debugging
  console.log("Saved State:", savedState);

  if (savedState) {
    // If there's a saved state, dispatch it
    const parsedState = JSON.parse(savedState);
    console.log("Parsed State:", parsedState);  // Log the parsed state
    dispatch(parsedState);  // Dispatch the loaded state
  } else {
    // If no saved state, set a default value based on user type
    const defaultState = applicantOptions[0];
    console.log("Setting default state:", defaultState);  // Log the default state
    dispatch(defaultState);  // Dispatch the default state
  }
}, []);  // Empty dependency array ensures this runs only once on mount

// Save to localStorage whenever state changes
useEffect(() => {
  if (state) {
    console.log("Saving state to localStorage:", state);  // Log before saving
    localStorage.setItem("sidebarState", JSON.stringify(state));
  }
}, [state]);  // This hook will be triggered every time 'state' changes


  const setSideBar = (index) => {
    const page = applicantOptions[index];
    dispatch({ ...page });
  };

  useEffect(() => {
    const clearDb = async () => await clear();

    const onlineStatusRef = ref(
      database,
      "online-status/" + `candidate-${authDetails?.user.id}`
    );

    const handleUnload = () => {
      clearDb();
      set(onlineStatusRef, {
        isOnline: false,
        timeStamp: new Date().toDateString(),
      });
    };

    set(onlineStatusRef, {
      isOnline: true,
      timeStamp: new Date().toDateString(),
    });

    window.addEventListener("unload", handleUnload);

    return () => {
      handleUnload();
      window.removeEventListener("unload", handleUnload);
    };
  }, []);

  return authDetails?.user.role === "candidate" ? (
    <ApplicantRouteContextProvider setSideBar={setSideBar}>
      <main className="h-screen w-screen flex">
        <ResourceContextProvider>
          {/* Side bar takes up 20% of total width and 100% of height */}
          <SideBar
            authDetails={authDetails}
            toogleIsOpen={toogleIsOpen}
            isMenuOpen={isOpen}
          >
            <ul className="flex flex-col gap-[10px]">
              {applicantOptions.map((currentOption) => (
                <SideBarItem
                  key={currentOption.type}
                  data={currentOption}
                  dispatch={dispatch}
                  state={state}
                  setIsOpen={setIsOpen}
                />
              ))}
            </ul>

            <ul className="flex flex-col gap-[10px]">
              {utilOptions.map((currentOption) => (
                <SideBarItem
                  key={currentOption.type}
                  data={currentOption}
                  dispatch={dispatch}
                  state={state}
                  setIsOpen={setIsOpen}
                />
              ))}
            </ul>
          </SideBar>

          {/* Routes and dashboard take up 80% of total width and 100% of height*/}
          <div className="flex-1 relative flex divide-y-2 divide-secondaryColor bg-white flex-col h-full">
            <NavBar
              state={state}
              toogleIsOpen={toogleIsOpen}
              isMenuOpen={isOpen}
            />
            <div className="w-full h-[92%] overflow-y-auto px-2 sm:px-4 md:px-8">
              <Routes>
                <Route index element={<Home />} />
                <Route path="*" element={<NotFound />} />

                <Route path="messages" element={<Messages />} />
                <Route path="applications" element={<Applications />} />
                <Route
                  path="applications/:id"
                  element={<ShortListedDetails />}
                />
                <Route path="find-job" element={<FindJob />} />
                <Route path="find-job/:id" element={<JobDetails />} />
                <Route path="browse-companies" element={<Companies />} />
                <Route
                  path="browse-companies/:id"
                  element={<CompanyDetails />}
                />

                <Route path="artisan" element={<Artisan />} />
                <Route path="domestic-staffs" element={<DomesticStaffs />} />
                <Route path="staff/cart" element={<CartedStaffs />} />
                <Route path=":category/:id" element={<StaffDetails />} />
                <Route path="staff/cart" element={<CartedStaffs />} />
                <Route path="staff/success" element={<SuccessPage />} />
                <Route path="staff/contract-history" element={<ContractHistory/>}/>  
                 
                {/* testing routes */}
                <Route path="applicant-detail" element={<ApplicantDetails />} />
                <Route path="application-detail" element={<AllApplication />} />
                <Route
                  path="application-detail/:id"
                  element={<Application />}
                />

                {/* <Route
                  path="staff/:category/:id"
                  element={<StaffInformation />}
                />
                <Route path="success" element={<SuccessPage />} /> */}

                <Route path="public-profile" element={<PublicProfile />} />
                <Route path="setting" element={<Settings />} />
                <Route path="my-resume" element={<MyResume />} />
                <Route path="help-center" element={<HelpCenter />} />
              </Routes>
            </div>
          </div>
        </ResourceContextProvider>
      </main>
    </ApplicantRouteContextProvider>
  ) : (
    <Navigate to={"/"} replace />
  );
}

export default useApplicantRoute;
