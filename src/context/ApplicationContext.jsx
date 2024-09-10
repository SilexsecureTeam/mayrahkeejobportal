import { createContext, useState } from "react";
import useApplicationManagement from "../hooks/useApplicationManagement";

export const ApplicationContext = createContext();

export const ApplicationContextProvider = ({ children }) => {
  const {
    loading,
    applicants,
    interviewDetails,
    resume,
    scheduleInterview,
    onTextChange,
    getApplicantsByEmployee,
    getApplicant,
    getResume
  } = useApplicationManagement();

  //Application specific to the applicant being inteviews
  const [application, setApplication] = useState(null)

  return (
    <ApplicationContext.Provider
      value={{
        loading,
        applicants,
        interviewDetails,
        resume,
        application,        
        scheduleInterview,
        onTextChange,
        getApplicantsByEmployee,
        getApplicant,
        getResume,
        setApplication
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
