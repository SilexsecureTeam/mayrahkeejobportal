import { createContext } from "react";
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

  return (
    <ApplicationContext.Provider
      value={{
        loading,
        applicants,
        interviewDetails,
        resume,
        scheduleInterview,
        onTextChange,
        getApplicantsByEmployee,
        getApplicant,
        getResume
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
