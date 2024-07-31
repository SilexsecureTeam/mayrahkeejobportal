import { useEffect, useState } from "react";
import { axiosClient } from "../services/axios-client";
import { FormatError } from "../utils/formmaters";
import { onFailure } from "../utils/notifications/OnFailure";

function useRegistration(role) {
  const [regDetails, setRegDetails] = useState({
    first_name: "",
    last_name: "",
    role: role,
    email: "",
    password: "",
    re_enter_password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    message: "",
    error: "",
  });
  const [] = useState();

  const client = axiosClient();

  const onTextChange = (e) => {
    const { name, value } = e.target;
    setRegDetails({ ...regDetails, [name]: value });
  };

  const registerUser = async (gender, onSuccess) => {
    setLoading(true);
    try {
      const detail =
        regDetails.role === "candidate"
          ? { ...regDetails, gender: gender.name }
          : {name: `${regDetails.first_name} ${regDetails.last_name}`, gender: gender.name, ...regDetails};

      if (regDetails.password !== regDetails.re_enter_password)
        throw Error("Password Mismatch");

      if (gender.id === 2000) throw Error("please selct a gender");

      const response = await client.post(`/${regDetails.role}/NewUser`, detail);
      onSuccess();
    } catch (e) {
      FormatError(e, setError, "Registration Error");
    } finally {
      setLoading(false);

    }
  };

  const verifyOtp = async (otp, onSuccess) => {
    setLoading(true);
    const regSessionDetails = JSON.parse(localStorage.getItem("__reg_info"));
    console.log("reg", regSessionDetails);
    try {
      const data = {
        email: regSessionDetails.email,
        otp: otp,
      };

      const dataCopy = JSON.parse(JSON.stringify(data));

      const response = await client.post(
        `/${regSessionDetails.role}/verifyOtp`,
        dataCopy
      );
      onSuccess();
    } catch (e) {
      FormatError(e, setError, "verification failed");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async (resetTimer) => {
    setLoading(true);
    const regSessionDetails = JSON.parse(localStorage.getItem("__reg_info"));
    try {
      const data = {
        email: regSessionDetails.email,
      };

      const dataCopy = JSON.parse(JSON.stringify(data));

      const response = await client.post(
        `/${regSessionDetails.role}/resendOtp`,
        dataCopy
      );
      resetTimer();
    } catch (e) {
      FormatError(e, setError, "Otp Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error.message && error.error) {
      onFailure(error);
    }
  }, [error.message, error.error]);

  useEffect(() => {
    setRegDetails({ ...regDetails, role: role });
  }, [role]);

  return {
    regDetails,
    loading,
    onTextChange,
    registerUser,
    verifyOtp,
    resendOtp,
  };
}

export default useRegistration;
