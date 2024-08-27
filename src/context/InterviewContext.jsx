import { createContext } from "react";
import useInterviewManagement from "../hooks/useInterviewManagement";

export const InterviewContext = createContext();

export const InterviewContextProvider = ({ children }) => {
  const { getAllInterviews } = useInterviewManagement();

  return (
    <InterviewContext.Provider
      value={{
        getAllInterviews,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};
