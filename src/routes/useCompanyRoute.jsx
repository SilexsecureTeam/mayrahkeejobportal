import { lazy, useContext, useEffect, useReducer, useState } from "react";
import {
  Navigate,
  redirect,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import ApplicantReducer from "../reducers/ApplicantReducer";
import {
  applicantOptions,
  companyOptions,
  adminUtilOptions,
  companyExclusiveOptions,
  exclusiveUtilOptions,
} from "../utils/constants";
import CompanyReducer from "../reducers/CompanyReducer";
import { AuthContext } from "../context/AuthContex";
import RedirectModal from "../components/RedirectModal";
import UpdateCompanyProfileModal from "../company-module/components/company-profile/UpdateCompanyProfileModal";
import { clear} from "idb-keyval";
import useCompanyProfile from "../hooks/useCompanyProfile";
import withSubscription from "../hocs/withSubscription";
import useSubscription from "../hooks/useSubscription";
import SubscriptionModal from "../components/subscription/SubscriptionModal";
import SubscriptionPlans from "../pages/SubscriptionPlans";
import { ApplicationContextProvider } from "../context/ApplicationContext";
import {
  CompanyRouteContext,
  CompanyRouteContextProvider,
} from "../context/CompanyRouteContext";
import { ref, set } from "firebase/database";
import { database } from "../utils/firebase";
import StaffCard from "../components/staffs/StaffCard";
import StaffInformation from "../staff-module/pages/verifications/StaffInformation";
import CartedStaffs from "../components/staffs/CartedStaffs";
import SuccessPage from "../components/SuccessPage";
import CompanyExclusiveReducer from "../reducers/CompanyExclusiveReducer";

//Util Component
const NavBar = lazy(() => import("../company-module/components/NavBar"));
const SideBar = lazy(() => import("../company-module/components/SideBar"));
const SideBarItem = lazy(() =>
  import("../company-module/components/SideBarItem")
);

//Route Pages
const SubscriptionPackages = lazy(() => import("../components/subscription/SubscriptionPackages"));

const Home = lazy(() => import("../company-module/pages/home/Home"));
const Messages = lazy(() =>
  import("../company-module/pages/messages/Messages")
);

const Applicants = lazy(() =>
  import("../company-module/pages/applicants/Applicants")
);

const SingleApplicant = lazy(() =>
  import("../company-module/pages/applicants/SingleApplicant")
);

const JobListing = lazy(() =>
  import("../company-module/pages/job-listing/JobListing")
);

const JobType = lazy(() =>
  import("../company-module/pages/job-listing/JobType")
);

const CompanyProfile = lazy(() =>
  import("../company-module/pages/company-profile/CompanyProfile")
);

const Schedule = lazy(() =>
  import("../company-module/pages/schedule/Schedule")
);
const Artisan = lazy(() => import("../company-module/pages/artisan/Artisan"));
const DomesticStaffs = lazy(() =>
  import("../company-module/pages/staffs/DomesticStaffs")
);

const StaffDetails = lazy(() => import('../components/applicant-details-ui/ApplicantDetails'))
const ContractHistory = lazy(() => import('../components/staffs/ContractHistory'))

const JobPosting = lazy(() =>
  import("../company-module/pages/job-posting/JobPosting")
);

const Settings = lazy(() =>
  import("../company-module/pages/settings/Settings")
);

const HelpCenter = lazy(() => import("../pages/HelpCenter"));

const NotFound = lazy(() => import("../company-module/pages/404"));

function useCompanyRoute() {

  const { authDetails } = useContext(AuthContext);
  const [redirectState, setRedirectState] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [subPage, setSubPage] = useState(true);
  
  const activeReducer = authDetails?.user?.user_type === 'regular' ? CompanyReducer : CompanyExclusiveReducer
  const activeOptions = authDetails?.user?.user_type === 'regular' ? companyOptions : companyExclusiveOptions
  const activeUtilOptions = authDetails?.user?.user_type === 'regular' ? adminUtilOptions : exclusiveUtilOptions
  
  
  const [state, dispatch] = useReducer(activeReducer,null);
  

  // const [redirectState, setRedirectState] = useState();
  const navigate = useNavigate();
  const companyHookProps = useCompanyProfile();

  const toogleIsOpen = () => setIsOpen(!isOpen);

  // const navigateToProfile = (setIsOpen) => {
  //   const profile = companyOptions[3];
  //   navigate(profile.route);
  //   dispatch({ ...profile });
  //   setIsOpen(false);
  // };
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
    const defaultState = activeOptions[0];
    //console.log("Setting default state:", defaultState);  // Log the default state
    dispatch(defaultState);  // Dispatch the default state
  }
}, []);  // Empty dependency array ensures this runs only once on mount

// Save to localStorage whenever state changes
useEffect(() => {
  if (state) {
    //console.log("Saving state to localStorage:", state);  // Log before saving
    localStorage.setItem("sidebarState", JSON.stringify(state));
  }
}, [state]);  // This hook will be triggered every time 'state' changes



  useEffect(() => {
    const clearDb = async () => await clear();

    const onlineStatusRef = ref(
      database,
      "online-status/" + `employer-${authDetails?.user?.id}`
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

  const setSideBar = (index) => {
    const page = activeOptions[index];
    dispatch(page);
  };
  return (
    <>
      {authDetails?.user?.role === "employer" ? (
        <CompanyRouteContextProvider setSideBar={setSideBar}>
          <SubscriptionModal redirectState={redirectState} />
          <main className="h-screen w-screen relative flex overflow-hidden">
            {/* Side bar takes up 20% of total width and 100% of height */}

            <SideBar
              companyHookProps={companyHookProps}
              authDetails={authDetails}
              toogleIsOpen={toogleIsOpen}
              isMenuOpen={isOpen}
              
            >
              <ul className="flex flex-col gap-[10px]">
                {activeOptions.map((currentOption) => (
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
                {activeUtilOptions.map((currentOption) => (
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
            <div className="w-full relative flex divide-y-2 divide-secondaryColor bg-white flex-col h-full">
              <UpdateCompanyProfileModal
                isOpen={redirectState}
                setIsOpen={setRedirectState}
                onInit={true}
                companyHookProps={companyHookProps}
              />
              <NavBar
                state={state}
                toogleIsOpen={toogleIsOpen}
                isMenuOpen={isOpen}
              />
              <div className="w-full h-[92%] overflow-y-auto px-2 lg:px-4">
                <Routes>
                  <Route index element={<Home />} />
                  <Route path="*" element={<NotFound />} />

                  <Route path="messages" element={withSubscription(Messages, "Message")} />
                  <Route
                    path="job-posting"
                    element={withSubscription(JobPosting, "Job")}
                  />
                   <Route
                  path="subscription" 
                  element={<SubscriptionPackages />}
                />
                  <Route path="applicants/*">
                    <Route
                      index
                      element={withSubscription(Applicants, "candidate")}
                    />
                    <Route
                      path="detail/:id"
                      element={withSubscription(SingleApplicant, "candidate")}
                    />
                  </Route>

                  <Route path="company-profile" element={<CompanyProfile />} />
                  <Route path="artisan" element={<Artisan />} />
                  <Route path="domestic-staffs" element={<DomesticStaffs />} />
                  <Route path=":category/:id" element={<StaffDetails />} />
                  <Route path="staff/cart" element={<CartedStaffs />} />
                  <Route path="staff/success" element={<SuccessPage/>}/>  
                  <Route path="staff/contract-history" element={<ContractHistory/>}/>  
                 
                  <Route path="job-listing/*">
                    <Route
                      index
                      element={withSubscription(JobListing, "Job")}
                    />
                    <Route path="type/:id" element={withSubscription(JobType, "Job")} />
                  </Route>

                  <Route
                    path="schedule"
                    element={withSubscription(Schedule, "job")}
                  />

                  <Route path="settings" element={<Settings />} />
                  <Route path="help-center" element={<HelpCenter />} />
                </Routes>
              </div>
            </div>
          </main>
        </CompanyRouteContextProvider>
      ) : (
        <Navigate to={"/"} replace />
      )}
    </>
  );
}

export default useCompanyRoute;
