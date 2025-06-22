import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContex"; // Make sure this path is correct

export const ApplicationContext = createContext();

export const ApplicationContextProvider = ({ children }) => {
  const { authDetails } = useContext(AuthContext); // ⬅️ detect login/logout
  const {
    loading,
    applicants,
    interviewDetails,
    setInterviewDetails,
    resume,
    jobApplications,
    scheduleInterview,
    onTextChange,
    getApplicantsByEmployee,
    getApplicant,
    getResume,
    getJobApplications,
    getCompany,
    resetApplicationState,
  } = useApplicationManagement();

  const [application, setApplication] = useState(null);

  // Automatically reset when user logs out
  useEffect(() => {
    if (!authDetails?.token) {
      resetApplicationState();
      setApplication(null); // Reset local state too
    }
  }, [authDetails]);

  return (
    <ApplicationContext.Provider
      value={{
        loading,
        applicants,
        interviewDetails,
        setInterviewDetails,
        resume,
        application,
        jobApplications,
        scheduleInterview,
        onTextChange,
        getApplicantsByEmployee,
        getApplicant,
        getResume,
        setApplication,
        getJobApplications,
        getCompany,
        resetApplicationState,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
