import { useContext, useEffect, useState } from "react";
import { axiosClient } from "../services/axios-client";
import { set, get, del, keys } from "idb-keyval";
import { FormatError } from "../utils/formmaters";
import { AuthContext } from "../context/AuthContex";
import { onFailure } from "../utils/notifications/OnFailure";

export const COMPANY_PROFILE_Key = "Company Profile Database";

function useInterviewManagement() {
  const { authDetails } = useContext(AuthContext);
  const [error, setError] = useState({
    message: '',
    error: ''
  })

  const retrievalState = {
    init: 1,
    notRetrieved: 2,
    retrieved: 3,
  };

  const client = axiosClient(authDetails?.token, true);

  const [loading, setLoading] = useState(false);

  //Api request to update profile
  const getAllInterviews = async (handleSuccess) => {
    setLoading(true);
    try {
      const response = await client.get(`/interviews`);

      // //On success, save response data to index db
      // await set(COMPANY_PROFILE_Key, response.data.employer);
      handleSuccess();
    } catch (error) {
      console.log(error);
      // FormatError(error, setError, "Update Error");
    } finally {
      setLoading(false);
    }
  };

  // //   useEffect(() => console.log(details), [details]);
  // useEffect(() => {
  //   if (error.message && error.error) {
  //     onFailure(error);
  //   }
  // }, [error.message, error.error]);

  // useEffect(() => {
  //   //Initailise value from index db
  //   const initValue = async () => {
  //     try {
  //       const storedValue = await get(COMPANY_PROFILE_Key);
  //       if (storedValue !== undefined) {
  //         setDetails({
  //           ...storedValue,
  //           beenRetreived: retrievalState.retrieved,
  //         });
  //       } else {
  //         await getProfileInfo();
  //       }
  //     } catch (error) {
  //       FormatError(error, setError, "Index Error");
  //     }
  //   };

  //   initValue();
  // }, []);

  return {
    getAllInterviews
  };
}

export default useInterviewManagement;
