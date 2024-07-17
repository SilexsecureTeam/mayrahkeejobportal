import { useCallback, useContext, useEffect, useState } from "react";
import { axiosClient } from "../services/axios-client";
import { AxiosResponse } from "axios";
import { onFailure } from "../utils/notifications/OnFailure";
import { onSuccess } from "../utils/notifications/OnSuccess";
import { FormatError } from "../utils/UtilMethods";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../context/AuthenticationContext";

function useLogin() {
  const client = axiosClient(null);
  const navigate = useNavigate();
  const {authDetails, setAuthDetails} = useContext(AuthenticationContext)
  const [loginDetails, setloginDetails] = useState({});
  const [error, setError] = useState({
    message: "",
    error: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setloginDetails({ ...loginDetails, [name]: value });
  };

  const onLoginSuccessful = (response: AxiosResponse<any, any>) => {
    onSuccess({
      message: "Login Successful",
      success: `Logged in as ${response?.data?.user?.first_name} ${response?.data?.user?.last_name}`,
    });
    if(response?.data?.user?.role === 'instructor'){
      navigate('/admin/dashboard/home')
    }else{
      navigate('/dashboard/home')
    }

    setAuthDetails({
      token: response?.data?.token,
       user: response?.data?.user
    })
    
    setLoading(false);
  };

  const validateLoginDetails = () => {
    if (!loginDetails?.email) {
      throw new Error("Email field cannot be left black");
    } else if (!loginDetails?.password) {
      throw new Error("password field cannot be left black");
    }
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      validateLoginDetails();
      const response = await client.post("/login", loginDetails);
      onLoginSuccessful(response)
    } catch (error) {
      FormatError(error, setError, "Login Failed");
    }
  };

  useEffect(() => {
    if (error.message && error.error) {
      onFailure(error);
      setError({
        message: "",
        error: "",
      });
      setLoading(false);
    }
  }, [error.message, error.error]);

  return {
    onTextChange,
    loginDetails,
    error,
    loading,
    handleLogin,
  };
}

export default useLogin;
