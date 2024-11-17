import { useContext, useEffect, useState } from "react";
import { axiosClient } from "../services/axios-client";
import { set, get, del, keys, clear } from "idb-keyval";
import { FormatError } from "../utils/formmaters";
import { AuthContext } from "../context/AuthContex";
import { onFailure } from "../utils/notifications/OnFailure";

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
    number_of_participants: 10
  });
  const [jobList, setJobList] = useState([]);
  const [applicantJobs, setApplicantJobs] = useState([]);
  const [error, setError] = useState({
    message: "",
    error: "",
  });

  const onTextChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const getEmployentTypes = async () => {
    try {
      const response = await client.get(`/employment-types`);
      return response.data
    } catch (error) {
      FormatError(error, setError, "Employement types Error");
      return []
    } finally {
      setLoading(false);
    }
  }

  const getCurrencies = async () => {
    try {
      const response = await client.get(`/currencies`);
      return response.data
    } catch (error) {
      FormatError(error, setError, "Currency Error");
      return []
    } finally {
      setLoading(false);
    }
  }

  const getSectors = async () => {
    try {
      const response = await client.get(`/sectors`);
      return response.data.data
    } catch (error) {
      FormatError(error, setError, "Sector Error");
      return []
    } finally {
      setLoading(false);
    }
  }

  const getSubSectors = async (sectorid) => {
    try {
      const response = await client.get(`/sub-sectors/${sectorid}`);
      return response.data.data
    } catch (error) {
      FormatError(error, setError, "Sector Error");
      return []
    } finally {
      setLoading(false);
    }
  }

  const addJob = async (handleSuccess) => {
    setLoading(true);
    try {
      const response = await client.post(`/job`, {
        employer_id: authDetails?.user.id,
        ...details,
      });
      setDetails({});
      handleSuccess();
      getJobsFromDB();
    } catch (error) {
      FormatError(error, setError, "Update Error");
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
      FormatError(error);
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
        setApplicantJobs(data.job_application)
    } catch (error) {
      FormatError(error, setError, "Jobs Error");
    }finally{
      setLoading(false)
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
        getJobsFromDB();
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
    deleteJob,
    deactivateJob,
    getJobById,
    getJobsByApplicant,
    getEmployentTypes,
    getCurrencies,
    getSectors,
    getSubSectors

  };
}

export default useJobManagement;
