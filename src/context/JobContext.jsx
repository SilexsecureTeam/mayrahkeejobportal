import { createContext, useEffect } from "react";
import useJobManagement from "../hooks/useJobManagement";

export const JobContext = createContext();

export const JobContextProvider = ({ children }) => {
  const {
    loading,
    details,
    jobList,
    applicantJobs,
    onTextChange,
    setDetails,
    addJob,
    deleteJob,
    deactivateJob,
    getSectors,
    getJobById,
    getJobsByApplicant
  } = useJobManagement();




  return (
    <JobContext.Provider
      value={{
        loading,
        details,
        jobList,
        applicantJobs,
        onTextChange,
        setDetails,
        addJob,
        getSectors,
        deleteJob,
        deactivateJob,
        getJobById,
        getJobsByApplicant
      }}
    >
      {children}
    </JobContext.Provider>
  );
};
