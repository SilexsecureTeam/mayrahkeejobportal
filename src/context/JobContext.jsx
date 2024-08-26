import { createContext } from "react";
import useJobManagement from "../hooks/useJobManagement";

export const JobContext = createContext();

export const JobContextProvider = ({ children }) => {
  const {
    loading,
    details,
    jobList,
    onTextChange,
    setDetails,
    addJob,
    deleteJob,
    deactivateJob,
  } = useJobManagement();

  return (
    <JobContext.Provider
      value={{
        loading,
        details,
        jobList,
        onTextChange,
        setDetails,
        addJob,
        deleteJob,
        deactivateJob,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};
