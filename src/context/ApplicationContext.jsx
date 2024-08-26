import { createContext } from "react";
import useApplicationManagement from "../hooks/useApplicationManagement";

export const ApplicationContext = createContext();

export const ApplicationContextProvider = ({ children }) => {
  const {
    loading,
    applicants,
    interviewDetails,
    scheduleInterview,
    onTextChange,
    getApplicantsByEmployee,
    getApplicant,
  } = useApplicationManagement();

  return (
    <ApplicationContext.Provider
      value={{
        loading,
        applicants,
        interviewDetails,
        scheduleInterview,
        onTextChange,
        getApplicantsByEmployee,
        getApplicant,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
