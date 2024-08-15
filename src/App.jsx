import { lazy, Suspense, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "react-toastify/dist/ReactToastify.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import FallBack from "./components/Fallback";
import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "./context/AuthContex";
import { SubscriptionContextProvider } from "./context/SubscriptionContext";

//Lazy imports of pages
const Login = lazy(() => import("./pages/Login"));
// const Registration = lazy(() => import("./pages/Registration"));
const RegistrationTwo = lazy(() => import("./pages/RegistrationTwo"));
const NotFound = lazy(() => import("./pages/404"));

//Lazy imports of routes
const RegistrationRoute = lazy(() => import("./routes/useRegistrationRoute"));
const ApplicantRoutes = lazy(() => import("./routes/useApplicantRoute"));
const CompanyRoutes = lazy(() => import("./routes/useCompanyRoute"));

function App() {
  return (
    <>
      <AuthContextProvider>
        <SubscriptionContextProvider>
          <Suspense fallback={<FallBack />}>
            <Router>
              <Routes>
                <Route path="/" element={<Login />} />
                {/* <Route path="/registration" element={<Registration />} /> */}
                <Route path="*" element={<NotFound />} />

                {/* Dashboard Routes using the dashboard hook */}
                {/* Other Routes can go here using thier hook e.g adminDashboardRoute */}
                <Route path="/applicant/*" element={<ApplicantRoutes />} />
                <Route path="/registration/*" element={<RegistrationRoute />} />
                <Route path="/company/*" element={<CompanyRoutes />} />
              </Routes>
            </Router>
          </Suspense>
          <ToastContainer autoClose={2000} draggable />
        </SubscriptionContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
