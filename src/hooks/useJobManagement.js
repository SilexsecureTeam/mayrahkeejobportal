import { useContext, useEffect, useState } from "react";
import { axiosClient } from "../services/axios-client";
import { set, get, del, keys, clear } from "idb-keyval";
import { FormatError } from "../utils/formmaters";
import { AuthContext } from "../context/AuthContex";
import { onFailure } from "../utils/notifications/OnFailure";

export const JOB_MANAGEMENT_Key = "Job Management Database";

function useJobManagement() {
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails.token, true);
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
  });
  const [jobList, setJobList] = useState([]);
  const [error, setError] = useState({
    message: "",
    error: "",
  });

  const onTextChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const addJob = async (handleSuccess) => {
    setLoading(true);
    try {
      const response = await client.post(`/job`, details);
      setDetails({});
      handleSuccess();
      getJobsFromDB()
    } catch (error) {
      FormatError(error, setError, "Update Error");
    } finally {
      setLoading(false);
    }
  };


  const deleteJob = async (handleSuccess, jobId) => {
    setLoading(true)
    try {
       const response = await client.delete(`/job/${jobId}`)
       await getJobsFromDB()
       handleSuccess()
    } catch (error) {
        FormatError(error, setError, 'Delete Job')
    } finally{
      setLoading(false)
    }
  }

  const getJobsFromDB = async () => {
    setLoading(true);
    try {
      const response = await client.get("/job");
      await set(JOB_MANAGEMENT_Key, response.data);
      setJobList(response.data);
    } catch (error) {
      FormatError(error);
    } finally{
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
        await clear()
        const storedValue = await get(JOB_MANAGEMENT_Key);
        if (storedValue !== undefined) {
          setJobList(storedValue);
        }
        getJobsFromDB()
      } catch (error) {
        FormatError(error, setError, "Index Error");
      }
    };

    initValue();
  }, []);

  return { loading, details, jobList, onTextChange, setDetails, addJob, deleteJob };
}

export default useJobManagement;
