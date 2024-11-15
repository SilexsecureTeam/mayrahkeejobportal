import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import AdminLoginForm from "../components/AdminAuth/AdminLoginForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UseAdminManagement from "../hooks/useAdminManagement";
import { AuthContext } from "../context/AuthContex";

function AdminLogin() {
  const [rememberMe, setRememberMe] = useState(false);
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const { adminLogin } = UseAdminManagement();
  const { setAuthDetails } = useContext(AuthContext);
  const navigate = useNavigate();

  const toogleRememberMe = () => setRememberMe(!rememberMe);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await adminLogin(loginDetails);
      console.log("Response:", response);
      
      if (response) {
        toast.success("Login successful!");
        setAuthDetails({
          token: response.token,
          user: response.user,
        });
        navigate("/admin/");
      } else {
        toast.error("Incorrect credentials");
      }
    } catch (error) {
      toast.error("An error occurred during login");
      console.error("Error details:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Login Page</title>
      </Helmet>
      <ToastContainer />
      <main className="">
        <AdminLoginForm
          rememberMe={rememberMe}
          toogleRememberMe={toogleRememberMe}
          handleOnSubmit={handleOnSubmit}
          setLoginDetails={setLoginDetails}
        />
      </main>
    </>
  );
}

export default AdminLogin;
