import { useCallback, useContext, useEffect, useState } from "react";
import { axiosClient } from "../services/axios-client";
import { AuthContext } from "../context/AuthContex";
import { get, set } from "idb-keyval";
import { FormatError } from "../utils/formmaters";
import { onFailure } from "../utils/notifications/OnFailure";
import { onSuccess } from "../utils/notifications/OnSuccess";

const PACKAGES_KEY = "Packahes Database";

function useSubscription() {
  const PUBLIC_KEY = import.meta.env.VITE_TEST_PUBLIC_KEY;
  const { authDetails } = useContext(AuthContext);
  const [activePackage, setActivePackage] = useState();
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


  const getActivePackage = async () => {
    setLoading(true);
    try {
      const { data } = await client.get(
        `/user-package-payment/${authDetails.user.id}`
      );
      if (data.data.length !== 0) {
        const byAscendingOrder = data.data.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
        setActivePackage(byAscendingOrder[byAscendingOrder.length - 1]);
      }
    } catch (error) {
      FormatError(error);
    } finally {
      setLoading(false);
    }
  };


  const makePaymentCheck = useCallback(async (reference, data) => {
    setLoading(true);
    try {
      const response = await client.post("/package-payment", {
        package_id: data.id,
        amount: data.price,
        transaction_id: reference.reference,
        payment_status: "successful",
        employee_auth_id: authDetails.user.id,
      });
      getActivePackage()
    } catch (error) {
      FormatError(error, setError, "Payment Error");
    } finally {
      setLoading(false);
    }
  }, []);

  const config = (data, handleSuccess) => {
    const priceInKobo = Number(data.price) * 100;
    console.log(authDetails);

    const onClose = () => {
      onSuccess({
        message: "Payment Sucessful",
        success: "Hang on, validating payment...",
      });
    };

    return {
      reference: new Date().getTime().toString(),
      email: authDetails.user.email,
      amount: priceInKobo,
      publicKey: PUBLIC_KEY,
      text: "Paystack Button Implementation",
      onSuccess: (reference) => handleSuccess(reference, data),
      onClose: onClose,
    };
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

    getActivePackage()
    initVals();
  }, []);

  useEffect(() => {
    if (error.error && error.message) {
      onFailure(error);
    }
  }, [error.error, error.message]);
  return { loading, packages, activePackage, config, makePaymentCheck, getActivePackage };
}

export default useSubscription;
