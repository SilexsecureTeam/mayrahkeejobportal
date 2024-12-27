import { useContext, useEffect, useState } from "react";
import { axiosClient } from "../services/axios-client";
import { set, get, del, keys, clear } from "idb-keyval";
import { FormatError } from "../utils/formmaters";
import { AuthContext } from "../context/AuthContex";
import { onFailure } from "../utils/notifications/OnFailure";
import { AdminExclusiveManagementContext } from "../context/AdminExclusiveManagement";

export const JOB_MANAGEMENT_Key = "Job Management Database";

function useJobManagement() {
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails?.token, true);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    featured_image: null,
    job_title: "",
    job_description: "",
    sector: "",
    type: "",
    search_keywords: "",
    job_apply_type: "",
    external_url: "",
    gender: "",
    email: "",
    salary_type: "",
    min_salary: 0,
    max_salary: 10000,
    experience: "",
    career_level: "",
    currency: "",
    preferred_age: null,
    qualification: [],
    introduction_video_url: "",
    application_deadline_date: "",
    office_address: "",
    location: "",
    maps_location: "",
    number_of_participants: 10,
  });
  const [jobList, setJobList] = useState([]);
  const [applicantJobs, setApplicantJobs] = useState([]);
  const [error, setError] = useState({
    message: "",
    error: "",
  });

  // const {} = useContext(AdminExclusiveManagementContext);

  const onTextChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const getEmployentTypes = async () => {
    try {
      const response = await client.get(`/employment-types`);
      return response.data;
    } catch (error) {
      FormatError(error, setError, "Employement types Error");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getCurrencies = async () => {
    try {
      const response = await client.get(`/currencies`);
      return response.data;
    } catch (error) {
      FormatError(error, setError, "Currency Error");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getSectors = async () => {
    try {
      const response = await client.get(`/sectors`);
      return response.data.data;
    } catch (error) {
      FormatError(error, setError, "Sector Error");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getSubSectors = async (sectorid) => {
    try {
      const response = await client.get(`/sub-sectors/${sectorid}`);
      return response.data.data;
    } catch (error) {
      FormatError(error, setError, "Sector Error");
      return [];
    } finally {
      setLoading(false);
    }
  };
  const validateJobDetails = (currentStep) => {
    // Mapping API keys to user-friendly names
    const fieldNames = {
      job_title: "Job Title",
      job_description: "Job Description",
      featured_image: "Featured Image",
      sector: "Job Sector",
      subsector: "Job Subsector",
      type: "Type of Employment",
      search_keywords: "Search Keywords",
      email: "Contact Email",
      salary_type: "Salary Type",
      min_salary: "Minimum Salary",
      max_salary: "Maximum Salary",
      experience: "Experience",
      currency: "Currency",
      application_deadline_date: "Application Deadline Date",
      office_address: "Office Address",
      location: "Location",
      preferred_age: "preferred age limit",
    };

    // Fields that are required in Stage 1
    const stage1Fields = [
      "sector",
      // "subsector",
      "featured_image",
      "type",
      "salary_type",
      "currency",
      "location",
      "search_keywords",
      "email",
      "min_salary",
      "max_salary",
      "application_deadline_date",
      "office_address",
      "preferred_age",
    ];

    // Fields that are required in Stage 2
    const stage2Fields = ["job_title", "job_description", "experience"];

    let fieldsToValidate = [];

    // Determine which fields to validate based on current step
    if (currentStep.id === 1) {
      fieldsToValidate = stage1Fields;
    } else if (currentStep.id === 2) {
      fieldsToValidate = [...stage1Fields, ...stage2Fields]; // Combine fields from both stages
    }

    // Check for missing or empty fields in the selected fields for the current step
    for (const key of fieldsToValidate) {
      if (
        !details[key] ||
        (Array.isArray(details[key]) && details[key].length === 0)
      ) {
        return `${fieldNames[key]} is required.`;
      }
    }

    // Ensure min_salary is less than or equal to max_salary
    if (Number(details.min_salary) > Number(details.max_salary)) {
      return "Minimum Salary cannot be greater than Maximum Salary.";
    }

    return null; // Validation passed
  };

  const addJob = async (handleSuccess) => {
    setLoading(true);
    try {
      // Validate details before submitting
      const validationError = validateJobDetails({ id: 2 });
      if (validationError) {
        throw new Error(validationError); // Throw error with descriptive message
      }

      // Submit the job
      const response = await client.post(`/job`, {
        employer_id: authDetails?.user.id,
        ...details,
      });

      setDetails({}); // Clear form
      handleSuccess(); // Call success handler
      getJobsFromDB(); // Refresh job list
    } catch (error) {
      // Notify user of validation or API errors
      onFailure({ message: "Submission Failed", error: error.message });
    } finally {
      setLoading(false);
    }
  };
  
  const editCurrentJob = async (handleSuccess) => {
    setLoading(true);
    console.log(details)
    try {
      // Validate details before submitting
      const validationError = validateJobDetails({ id: 2 });
      if (validationError) {
        throw new Error(validationError); // Throw error with descriptive message
      }

      // Submit the job
      const response = await client.put(`/job/${details.id}`, details
      );

      setDetails({}); // Clear form
      handleSuccess(); // Call success handler
      getJobsFromDB(); // Refresh job list
    } catch (error) {
      // Notify user of validation or API errors
      console.log(error)
      onFailure({ message: "Submission Failed", error: error.message });
    } finally {
      setLoading(false);
    }
  };
  const addJobForExclusive = async (handleSuccess, id) => {
    setLoading(true);
    try {
      // Validate details before submitting
      const validationError = validateJobDetails({ id: 2 });
      if (validationError) {
        throw new Error(validationError); // Throw error with descriptive message
      }

      // Submit the job
      const response = await client.post(`/job`, {
        employer_id: id,
        ...details,
      });

      setDetails({}); // Clear form
      handleSuccess(); // Call success handler
      getJobsFromDB(); // Refresh job list
      window.location.reload();
    } catch (error) {
      // Notify user of validation or API errors
      onFailure({ message: "Submission Failed", error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const deactivateJob = async (currentJob, status, handleSuccess) => {
    setLoading(true);
    try {
      const response = await client.put(`/job/${currentJob.id}`, {
        status: status,
      });
      handleSuccess();
      getJobsFromDB();
    } catch (error) {
      FormatError(error, setError, "Status Error");
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (handleSuccess, jobId) => {
    setLoading(true);
    try {
      const response = await client.delete(`/job/${jobId}`);
      await getJobsFromDB();
      handleSuccess();
    } catch (error) {
      FormatError(error, setError, "Delete Job");
    } finally {
      setLoading(false);
    }
  };

  const getJobsFromDB = async () => {
    setLoading(true);
    try {
      const response = await client.get("/job");
      await set(JOB_MANAGEMENT_Key, response.data);
    } catch (error) {
      FormatError(error, setError);
    } finally {
      setLoading(false);
    }
  };

  const getJobById = async (jobId, setJob) => {
    setLoading(true);
    const job = jobList.find((current) => current.id === Number(jobId));
    if (job) {
      setJob(job);
      return;
    }
    try {
      const { data } = await client.get(`/job/${jobId}`);
      setJob({ ...data });
    } catch (error) {
      FormatError(error);
    } finally {
      setLoading(false);
    }
  };

  const getJobsByApplicant = async () => {
    setLoading(true);
    try {
      const { data } = await client.get(`/getUserApply/${authDetails.user.id}`);
      setApplicantJobs(data.job_application);
    } catch (error) {
      FormatError(error, setError, "Jobs Error");
    } finally {
      setLoading(false);
    }
  };

  //   useEffect(() => console.log(details), [details]);
  useEffect(() => {
    if (error.message && error.error) {
      onFailure(error);
    }
  }, [error.message, error.error]);

  useEffect(() => {
    const initValue = async () => {
      try {
        const storedValue = await get(JOB_MANAGEMENT_Key);
        if (storedValue !== undefined) {
          setJobList(storedValue);
        }
        await getJobsFromDB();
      } catch (error) {
        FormatError(error, setError, "Index Error");
      }
    };

    initValue();
  }, []);

  return {
    loading,
    details,
    jobList,
    applicantJobs,
    onTextChange,
    setDetails,
    addJob,
    editCurrentJob,
    deleteJob,
    deactivateJob,
    getJobById,
    getJobsByApplicant,
    getEmployentTypes,
    getCurrencies,
    getSectors,
    getSubSectors,
    validateJobDetails,
    addJobForExclusive
  };
}

export default useJobManagement;
