import { lazy, useReducer } from "react";
import { Route, Routes } from "react-router-dom";
import ApplicantReducer from "../reducers/ApplicantReducer";
import { applicantOptions, companyOptions, utilOptions } from "../utils/constants";
import { user } from "../utils/dummies";
import CompanyReducer from "../reducers/CompanyReducer";


//Util Components
const NavBar = lazy(() => import("../company-module/components/NavBar"));
const SideBar = lazy(() => import("../company-module/components/SideBar"));
const SideBarItem = lazy(() => import("../company-module/components/SideBarItem"));
 
//Route Pages
const Home = lazy(() => import("../company-module/pages/home/Home"));
const Messages = lazy(() => import("../company-module/pages/messages/Messages"));
const Applicants = lazy(() => import("../company-module/pages/applicants/Applicants"));
const JobListing = lazy(() => import("../company-module/pages/job-listing/JobListing"));
const CompanyProfile = lazy(() => import("../company-module/pages/company-profile/CompanyProfile"));
const Schedule = lazy(() => import("../company-module/pages/schedule/Schedule"));
const NotFound = lazy(() => import("../company-module/pages/404"));

function useCompanyRoute() {
  const [state, dispatch] = useReducer(CompanyReducer, companyOptions[0]);

  return (
    <main className="h-screen w-screen flex">
      {/* Side bar takes up 20% of total width and 100% of height */}
      <SideBar user={user}>
        <ul className="flex flex-col gap-[10px]">
        {companyOptions.map((currentOption) => (
          <SideBarItem
            key={currentOption.type}
            data={currentOption}
            dispatch={dispatch}
            state={state}
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
          />
        ))}
        </ul>
      </SideBar>

      {/* Routes and dashboard take up 80% of total width and 100% of height*/}
      <div className="w-[82%] flex divide-y-2 divide-secondaryColor bg-white flex-col h-full">
        <NavBar state={state}/>
        <div className="w-full p-2  h-[92%] overflow-y-auto">
          <Routes>
            <Route index element={<Home />} />
            <Route path="*" element={<NotFound />} />

            <Route path="messages" element={<Messages />} />
            <Route path="applicants" element={<Applicants />} />
            <Route path="company-profile" element={<CompanyProfile/>} />
            <Route path="job-listing" element={<JobListing />} />
            <Route path="schedule" element={<Schedule/>} />
          </Routes>
        </div>
      </div>
    </main>
  );
}

export default useCompanyRoute;
