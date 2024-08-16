import { lazy, useContext, useReducer } from "react";
import { Route, Routes } from "react-router-dom";
import ApplicantReducer from "../reducers/ApplicantReducer";
import { applicantOptions, utilOptions } from "../utils/constants";
import { user } from "../utils/dummies";
import { AuthContext } from "../context/AuthContex";
import ResourceContextProvider from "../context/ResourceContext";

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
const PublicProfile = lazy(() =>
  import("../applicant-module/pages/profile/PublicProfile")
);
const MyResume = lazy(() =>
  import("../applicant-module/pages/resume/MyResume")
);
const NotFound = lazy(() => import("../applicant-module/pages/404"));
const Settings = lazy(() => import("../applicant-module/pages/settings/Settings"));
const HelpCenter = lazy(() => import("../applicant-module/pages/help-center/HelpCenter"));

function useApplicantRoute() {
  const [state, dispatch] = useReducer(ApplicantReducer, applicantOptions[0]);
  const { authDetails } = useContext(AuthContext);

  console.log(authDetails)
  return (
    <main className="h-screen w-screen flex">
      <ResourceContextProvider>
        {/* Side bar takes up 20% of total width and 100% of height */}
        <SideBar authDetails={authDetails}>
          <ul className="flex flex-col gap-[10px]">
            {applicantOptions.map((currentOption) => (
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
          <NavBar state={state} />
          <div className="w-full h-[92%] overflow-y-auto">
            <Routes>
              <Route index element={<Home />} />
              <Route path="*" element={<NotFound />} />

              <Route path="messages" element={<Messages />} />
              <Route path="applications" element={<Applications />} />
              <Route path="find-job" element={<FindJob />} />
              <Route path="find-job/:id" element={<JobDetails />} />
              <Route path="browse-companies" element={<Companies />} />
              <Route path="public-profile" element={<PublicProfile />} />
              <Route path="setting" element={<Settings />} />
              <Route path="my-resume" element={<MyResume />} />
              <Route path="help-center" element={<HelpCenter />} />
            </Routes>
          </div>
        </div>
      </ResourceContextProvider>
    </main>
  );
}

export default useApplicantRoute;
