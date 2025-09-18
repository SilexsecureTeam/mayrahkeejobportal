import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { GiCircle, GiPlainCircle } from "react-icons/gi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import mayrahkeeIcon from "../../assets/pngs/mayrahkee-logo-2.png";
import Padlock from "../../assets/pngs/padlock.png";
import Person from "../../assets/pngs/person.png";

import { onSuccess } from "../../utils/notifications/OnSuccess";
import useLogin from "../../hooks/useLogin";
import FormButton from "../FormButton";

function LoginForm() {
  const [role, setRole] = useState("candidate");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const { loginDetails, loginUser, loading, onTextChange, setLoginDetails } =
    useLogin(role);

  const toggleRememberMe = () => setRememberMe((prev) => !prev);

  // Load remembered email from localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedRole = localStorage.getItem("rememberedRole");

    if (savedEmail) {
      setLoginDetails((prev) => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
    if (savedRole) {
      setRole(savedRole);
    }
  }, [setLoginDetails]);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    // Save email if "Remember Me" is checked
    if (rememberMe) {
      localStorage.setItem("rememberedEmail", loginDetails.email);
      localStorage.setItem("rememberedRole", role);
    } else {
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberedRole");
    }

    loginUser(() => {
      onSuccess({
        message: "Login Successful",
        success: "Continuing to dashboard",
      });

      if (role === "candidate") navigate("/applicant");
      else if (role === "employer") navigate("/company");
      else navigate("/staff");
    });
  };

  return (
    <div
      id="login-form"
      className="h-full w-full md:w-[65%] flex flex-col items-center bg-primaryColor md:bg-white md:rounded-md px-[3%] py-[10px]"
    >
      {" "}
      <img src={mayrahkeeIcon} className="w-60 md:hidden mt-[3%]" alt="logo" />
      <div
        id="login-section"
        className="flex flex-col justify-between w-[80%] lg:w-[60%] gap-2 md:mt-10 min-h-[60%] items-center"
      >
        <h3 className="font-bold text-2xl text-white md:text-black">
          Login to your Account
        </h3>
        <span className="font-medium text-center w-[90%] text-gray-200 md:text-gray-400 text-[12px] md:text-[11px]">
          Explore & manage different job opportunities
        </span>

        {/* Role Selection */}
        <div className="grid grid-cols-2 w-full md:mt-10 gap-[10px] text-sm font-semibold">
          <button
            onClick={() => setRole("candidate")}
            className={`px-2 py-1 text-little ${
              role === "candidate"
                ? "scale-[103%] shadow-sm shadow-black md:text-primaryColor text-white border bg-white/30 md:bg-primaryColor/30"
                : "md:text-white text-gray-500 bg-white md:bg-primaryColor border-0"
            }`}
          >
            Corporate Candidate
          </button>
          <button
            onClick={() => setRole("employer")}
            className={`px-2 py-1 text-little ${
              role === "employer"
                ? "scale-[103%] shadow-sm shadow-black md:text-lightblue text-white border bg-lightblue/30"
                : "md:text-white text-gray-500 bg-white md:bg-lightblue border-0"
            }`}
          >
            Corporate Employer
          </button>
          <button
            onClick={() => setRole("artisan")}
            className={`px-2 py-1 text-little ${
              role === "artisan"
                ? "scale-[103%] shadow-sm shadow-black md:text-darkblue text-white border bg-darkblue/30"
                : "md:text-white text-gray-500 bg-white md:bg-darkblue border-0"
            }`}
          >
            Artisan
          </button>
          <button
            onClick={() => setRole("staff")}
            className={`px-2 py-1 text-little ${
              role === "staff"
                ? "scale-[103%] shadow-sm shadow-black md:text-lightorange text-white border bg-lightorange/30"
                : "md:text-white text-gray-500 bg-white md:bg-lightorange border-0"
            }`}
          >
            Domestic Staff
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleOnSubmit}
          id="form-wrapper"
          className="flex flex-col mt-[5%] md:mt-10 w-full gap-[15px] items-center"
        >
          {/* Email */}
          <div className="h-[40px] w-full flex items-center bg-white pl-[10px] gap-[10px] rounded-md border-[1.5px]">
            <img src={Person} className="h-[20px]" alt="person-icon" />
            <input
              name="email"
              type="text"
              value={loginDetails.email}
              onChange={onTextChange}
              required
              className="w-full h-full placeholder:text-little text-md focus:outline-none text-gray-700"
              placeholder="Enter email or phone"
            />
          </div>

          {/* Password */}
          <div className="h-[40px] w-full flex items-center pl-[10px] pr-[5px] mt-[10px] bg-white gap-[10px] rounded-md border-[1.5px]">
            <img src={Padlock} className="h-[20px]" alt="padlock-icon" />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={loginDetails.password}
              onChange={onTextChange}
              required
              placeholder="Enter your password"
              className="w-[90%] h-full placeholder:text-md text-sm focus:outline-none text-gray-700"
            />
            {showPassword ? (
              <FaEyeSlash
                className="cursor-pointer text-green-600"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FaEye
                className="cursor-pointer text-green-600"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>

          {/* Remember Me + Forgot Password */}
          <div className="flex justify-between text-sm w-full text-white md:text-gray-800">
            <p className="flex items-center gap-[3px]">
              {rememberMe ? (
                <GiPlainCircle
                  onClick={toggleRememberMe}
                  className="text-slate-800 md:text-primaryColor cursor-pointer"
                />
              ) : (
                <GiCircle
                  className="cursor-pointer"
                  onClick={toggleRememberMe}
                />
              )}
              <span onClick={toggleRememberMe} className="cursor-pointer">
                Remember Me
              </span>
            </p>
            <p className="cursor-pointer hover:underline">
              <NavLink to={"/forgot-password"}>Forgot Password?</NavLink>
            </p>
          </div>

          {/* Submit Button */}
          <FormButton
            width="w-full md:bg-primaryColor md:text-white bg-white"
            loading={loading}
          >
            Login to continue
          </FormButton>
        </form>

        {/* Signup Redirect */}
        <p className="flex w-full items-center justify-center gap-[3px] text-md text-white md:text-gray-800">
          <NavLink to="/registration" className="hover:underline font-semibold">
            Do you have an account?
            <span className="ml-2 md:text-primaryColor">Sign up</span>
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default React.memo(LoginForm);
