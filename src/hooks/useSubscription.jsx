import { useContext, useEffect, useState } from "react";
import { axiosClient } from "../services/axios-client";
import { AuthContext } from "../context/AuthContex";
import { get, set } from "idb-keyval";
import { FormatError } from "../utils/formmaters";
import { onFailure } from "../utils/notifications/OnFailure";

const PACKAGES_KEY = "Packahes Database";

function useSubscription() {
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails.token);
  const [error, setError] = useState({
    message: "",
    error: "",
  });
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPackages = async () => {
    setLoading(true);
    try {
      const response = await client.get("/packages");
      setPackages(response.data.data);
      await set(PACKAGES_KEY, response.data.data);
    } catch (error) {
      FormatError(error, setError, "Subscription Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initVals = async () => {
      const result = await get(PACKAGES_KEY);
      if (result) {
        console.log("Found");
        setPackages(result);
      } else {
        console.log("Not Found");
        await getPackages();
      }
    };
    
    initVals();
  }, []);

  useEffect(() => {
    if (error.error && error.message) {
      onFailure(error);
    }
  }, [error.error, error.message]);
  return { loading, packages };
}

export default useSubscription;
