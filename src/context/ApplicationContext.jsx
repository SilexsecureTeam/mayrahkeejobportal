import { useContext, useEffect, useState, createContext } from "react";
import { AuthContext } from "./AuthContex"; // Make sure this path is correct
import useApplicationManagement from "../hooks/useApplicationManagement";

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
  } = useApplicationManagement();

  const [application, setApplication] = useState(null);

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
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
