import React, { useEffect, useState } from "react";
import LoginForm from "../components/Auth/LoginForm";
import LoginOne from "../assets/pngs/login-image2.png";
import { Helmet } from "react-helmet";
import SideCard from "../components/Auth/SideCard";
import { useNavigate } from "react-router-dom";
import AdminLoginForm from "../components/AdminAuth/AdminLoginForm";

function AdminLogin() {
  const [rememberMe, setRememberMe] = useState(false);
  const [loginDetails, setLoginDetails] = useState({
    email_phone: "",
    password: "",
  });


  const toogleRememberMe = () => setRememberMe(!rememberMe);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(loginDetails);
  };


  return (
    <>
      <Helmet>
        <title>Admin Login Page</title>
      </Helmet>
      <main className={` `}>

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
