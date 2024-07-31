import { useContext, useEffect, useState } from "react";
import { axiosClient } from "../services/axios-client";
import { FormatError } from "../utils/formmaters";
import { onFailure } from "../utils/notifications/OnFailure";
import { AuthContext } from "../context/AuthContex";

function useLogin(role) {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const {setAuthDetails} = useContext(AuthContext)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    message: "",
    error: "",
  });
  const [] = useState();

  const client = axiosClient();

  const onTextChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  const loginUser = async (onSuccess) => {
    setLoading(true);
    try {
      const response = await client.post(`/${role}/login`, loginDetails);
      onSuccess();
      setAuthDetails({
        token: response.data.token,
        user: response.data.user
      })
    } catch (e) {
      FormatError(e, setError, "Registration Error");
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
    setLoginDetails({ ...loginDetails, role: role });
  }, [role]);

  return {
    loginDetails,
    loading,
    onTextChange,
    loginUser,
  };
}

export default useLogin;
