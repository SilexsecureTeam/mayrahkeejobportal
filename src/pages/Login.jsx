import React, { useState } from "react";
import LoginForm from "../components/Auth/LoginForm";
import LoginOne from "../assets/pngs/login-image2.png";
import { Helmet } from "react-helmet";

function Login() {
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
        <title>Login Page</title>
      </Helmet>
      <main
        id="login-Wrapper"
        className={`h-screen w-screen flex bg-center items-start justify-center relative `}
      >
        <img
          className="w-full h-full object-cover object-top absolute"
          src={LoginOne}
        />

        <LoginForm
          rememberMe={rememberMe}
          toogleRememberMe={toogleRememberMe}
          handleOnSubmit={handleOnSubmit}
          setLoginDetails={setLoginDetails}
        />
      </main>
    </>
  );
}

export default Login;
