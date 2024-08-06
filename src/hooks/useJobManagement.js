import { useContext, useEffect, useState } from "react";
import { axiosClient } from "../services/axios-client";
import { set, get, del, keys } from "idb-keyval";
import { FormatError } from "../utils/formmaters";
import { AuthContext } from "../context/AuthContex";
import { onFailure } from "../utils/notifications/OnFailure";

export const JOB_MANAGEMENT_Key = "Job Management Database";

function useJobManagement() {
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails.token);
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
      const response = await client.post(
        `/job/${details.employer_id}`,
        details
      );
      handleSuccess();
    } catch (error) {
      FormatError(error, setError, "Update Error");
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
          setDetails(storedValue);
        }
      } catch (error) {
        FormatError(error, setError, "Index Error");
      }
    };

    initValue();
  }, []);

  return { loading, details, onTextChange, setDetails, addJob };
}

export default useJobManagement;
