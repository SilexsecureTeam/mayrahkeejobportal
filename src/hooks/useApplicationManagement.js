import { useContext, useEffect, useState } from "react";
import { axiosClient } from "../services/axios-client";
import { AuthContext } from "../context/AuthContex";
import { FormatError } from "../utils/formmaters";
import { onFailure } from "../utils/notifications/OnFailure";
import { get, set, del } from "idb-keyval";
import { stages } from "../utils/constants";
import { onSuccess } from "../utils/notifications/OnSuccess";
import { debounce } from "lodash"; // Debounce function to limit requests
const APPLICANTS_KEY = "Applicants Database";

function useApplicationManagement() {
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails?.token);
  const [loading, setLoading] = useState(false);
  const [applicantLoading, setApplicantLoading] = useState(false);
  const [error, setError] = useState({
    message: "",
    error: "",
  });
  const [applicants, setApplicants] = useState([]);
  const [jobApplications, setjobApplications] = useState([]);
  const [interviewDetails, setInterviewDetails] = useState({});

  const onTextChange = (e) => {
    const { name, value } = e.target;
    setInterviewDetails({ ...interviewDetails, [name]: value });
  };

  // Debounced function to get applicants by employer ID
  const getApplicantsByEmployeeDebounced = debounce(async () => {
    if (authDetails?.token !== null) {
      setApplicantLoading(true);
      try {
        const response = await client(
          `getEmployerApply/${authDetails?.user?.id}`
        );
        await set(APPLICANTS_KEY, response.data.job_application);
        setApplicants(response.data.job_application);
      } catch (error) {
        FormatError(error, setError, "Applicants Error");
      } finally {
        setApplicantLoading(false);
      }
    }
  }, 1000); // Adjust debounce time as needed (1000ms = 1 second)

  // Debounced function to get job applications for the logged-in user
  const getJobApplicationsDebounced = debounce(async () => {
    if (authDetails?.token) {
      setLoading(true);
      try {
        const response = await client(`/getUserApply/${authDetails?.user?.id}`);
        setjobApplications(response.data.job_application);
      } catch (error) {
        FormatError(error, setError, "Applicants Error");
      } finally {
        setLoading(false);
      }
    }
  }, 1000); // Adjust debounce time as needed

  // Function to get applicant by ID
  const getApplicant = async (applicantId, setApplicant) => {
    setLoading(true);
    const applicant = applicants.find(
      (current) => current.id === Number(APPLICANTS_KEY)
    );
    if (applicant) {
      setApplicant(applicant.details);
      return;
    }
    try {
      const response = await client(`/candidate/getCandidate/${applicantId}`);
      setApplicant(response.data.details);
    } catch (error) {
      FormatError(error, setError, "Applicants Error");
    } finally {
      setLoading(false);
    }
  };

  // Function to get company details by employer ID
  const getCompany = async (employerId, setEmployer) => {
    setLoading(true);
    try {
      const response = await client(`/employer/getEmployer/${employerId}`);
      setEmployer(response.data.details);
    } catch (error) {
      FormatError(error, setError, "Applicants Error");
    } finally {
      setLoading(false);
    }
  };

  // Function to change user password
  const changePassword = async (currentPassword, newPassword) => {
    setLoading(true);
    try {
      const response = await client.post(`/candidate/changePassword`, {
        current_password: currentPassword,
        new_password: newPassword,
        user_id: authDetails.user.id,
      });
      onSuccess({
        message: "Password updated",
        success: "Password change was successful",
      });
    } catch (error) {
      FormatError(error, setError, "Applicants Error");
    } finally {
      setLoading(false);
    }
  };

  // Function to schedule an interview
  const scheduleInterview = async (
    applicant,
    data,
    setData,
    handleOnSuccess,
    option,
    meetingId,
    exclusive,
    edit
  ) => {
    setLoading(true);
    try {
      if (!option.name) throw Error("An interview option must be selected");
      if (!meetingId && option.name === "online")
        throw Error("Please generate a meeting ID");

      // Build the base object
      let interviewPrimarydata = {
        ...interviewDetails,
        job_application_id: data.id,
        employer_id: exclusive ? exclusive.id : authDetails.user.id,
        candidate_id: applicant.candidate_id,
        option: option.name,
      };

      // Include only necessary fields
      if (option.name === "online") {
        interviewPrimarydata.meeting_id = meetingId;
        interviewPrimarydata.location = null;
      } else {
        interviewPrimarydata.location = interviewDetails?.location;
        interviewPrimarydata.meeting_id = null;
      }

      // Build the payload from primary data and interviewDetails
      let payload = {
        ...interviewPrimarydata,
      };
      const updateprimarydata = {
        job_id: data.job_id,
        candidate_id: applicant.candidate_id,
      };
      const apiFunc = edit
        ? client.put(`/interviews/${interviewDetails?.id}`, payload)
        : client.post(`/interviews`, payload);

      const interviewResponse = await apiFunc;
      const interviewData = interviewResponse.data.interview;

      const applicationUpdateResponse = await client.post(
        `/applicationRespond`,
        {
          ...updateprimarydata,
          status: stages[1].name,
          interview_id: interviewData.id,
        }
      );
      const applicatonUpdateData =
        applicationUpdateResponse.data.job_application;
      setData(applicatonUpdateData);
      handleOnSuccess();
      onSuccess({
        message: `${edit ? "Update" : "Schedule"} Interview`,
        success:
          interviewResponse.data?.message ||
          `Interview ${edit ? "Updated" : "Scheduled"} successfully`,
      });
      await getApplicantsByEmployeeDebounced(); // Re-fetch the applicants list
    } catch (error) {
      console.log(error);
      FormatError(error, setError, "Schedule Error");
    } finally {
      setLoading(false);
    }
  };

  // Function to get resume by ID
  const getResume = async (resumeId, setResume) => {
    setLoading(true);
    try {
      if (!resumeId) throw Error("Resume not attached");
      const { data } = await client.get(`/myResumes/${resumeId}`);
      setResume(data[0]);
    } catch (error) {
      FormatError(error, setError, "Resume Error");
    } finally {
      setLoading(false);
    }
  };
  // Handle errors
  useEffect(() => {
    if (error?.error !== "" && error?.message !== "") {
      onFailure(error);
    }
  }, [error]);

  // Fetch data on mount or token change
  useEffect(() => {
    if (authDetails?.token) {
      const initValue = async () => {
        try {
          const storedValue = await get(APPLICANTS_KEY);
          if (storedValue) {
            setApplicants(storedValue); // Use cached data if available
          } else {
            getApplicantsByEmployeeDebounced(); // Fetch with debounce
            getJobApplicationsDebounced(); // Fetch with debounce
          }
        } catch (error) {
          FormatError(error, setError, "Index Error");
        }
      };
      initValue();
    }
  }, [authDetails?.token]); // Fetch data on token change

  return {
    loading,
    applicantLoading,
    applicants,
    interviewDetails,
    setInterviewDetails,
    jobApplications,
    scheduleInterview,
    onTextChange,
    getApplicantsByEmployee: getApplicantsByEmployeeDebounced, // Use debounced function
    getApplicant,
    getResume,
    getJobApplications: getJobApplicationsDebounced, // Use debounced function
    getCompany,
    changePassword,
  };
}

export default useApplicationManagement;
