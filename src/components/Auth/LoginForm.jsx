import React, { useEffect, useState } from "react";
import MainLogo from "../../assets/svgs/main-logo.svg";
import Padlock from "../../assets/pngs/padlock.png";
import Person from "../../assets/pngs/person.png";
import { GiCircle, GiPlainCircle } from "react-icons/gi";
import { NavLink, useNavigate } from "react-router-dom";
import "../../utils/notifications/OnSuccess";
import { onSuccess } from "../../utils/notifications/OnSuccess";
import FormButton from "../FormButton";
import useLogin from "../../hooks/useLogin";

function LoginForm({ rememberMe, toogleRememberMe }) {
  const [role, setRole] = useState();
  const navigate = useNavigate();
  const { loginDetails, loginUser, loading, onTextChange } = useLogin(role);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    loginUser(() => {
      onSuccess({
        message: "Login Successful",
        success: "Continuing to dashboard",
      });
      if (role === "candidate") {
        navigate("/applicant");
      } else {
        navigate("/company");
      }
    });
  };

  useEffect(() => {
    setRole("candidate");
    }, []);
  return (
    <div
      id="login-form"
      className={`h-full w-[60%] flex pt-[10%] justify-center bg-white rounded-md  px-[3%] py-[10px]`}
    >
      <div
        id="login-section"
        className="flex flex-col gap-[3%] w-[50%] h-[60%] items-center"
      >
        <h3 className="font-bold text-2xl text-black">Login to your Account</h3>
        <span className="font-meduim text-center w-[80%] text-gray-400 text-[11px]">
          Explore/manage job different job oppurtunities
        </span>

        <div className="flex w-full justify-center gap-[20px] text-sm font-semibold items-centeritems">
          <button
            onClick={() => setRole("candidate")}
            className={`px-2 py-1 ${
              role === "candidate"
                ? "text-white bg-primaryColor border-0"
                : "text-primaryColor border bg-primaryColor/30"
            }`}
          >
            Candidate
          </button>
          <button
            onClick={() => setRole("employee")}
            className={`px-2 py-1 ${
              role === "employee"
                ? "text-white bg-primaryColor border-0"
                : "text-primaryColor border bg-primaryColor/30"
            }`}
          >
            Employer
          </button>
        </div>

        <form
          onSubmit={handleOnSubmit}
          id="form-wrapper"
          className="flex flex-col mt-[10%] w-full gap-[15px] items-center "
        >
          <div className="h-[40px] w-full flex items-center pl-[10px] gap-[10px] rounded-md border-[1.5px]">
            <img src={Person} className="h-[20px]" />

            <input
              name="email"
              type="text"
              value={loginDetails.email}
              onChange={onTextChange}
              required
              className="w-[80%] focus:bg-opacity-white h-full placeholder:text-little text-little bg-white/0 focus:bg-white/0  focus:outline-none text-gray-700 "
              placeholder="Enter email or phone"
            />
          </div>

          <div className="h-[40px] w-full flex items-center pl-[10px] mt-[10px] gap-[10px] rounded-md border-[1.5px]">
            <img src={Padlock} className="h-[20px]" />
            <input
              name="password"
              type="password"
              value={loginDetails.password}
              onChange={onTextChange}
              required
              className="w-[80%] h-full placeholder:text-littleall text-little bg-white/0 focus:outline-none text-gray-700 "
              placeholder="Password"
            />
          </div>

          <div className="flex justify-between text-little w-full text-gray-400">
            <p className="flex items-center gap-[3px]">
              {rememberMe ? (
                <GiPlainCircle
                  onClick={toogleRememberMe}
                  className="text-primaryColor cursor-pointer"
                />
              ) : (
                <GiCircle
                  className="cursor-pointer"
                  onClick={toogleRememberMe}
                />
              )}
              <span onClick={toogleRememberMe} className="cursor-pointer">
                Remember Me
              </span>
            </p>
            <p className="cursor-pointer hover:underline">
              <NavLink to={"/forgot_password"}>Forgot Password?</NavLink>
            </p>
          </div>

          <FormButton
            loading={loading}
          >
            Login to continue
          </FormButton>
        </form>

        <p className="flex w-full group items-center mt-[10px] cursor-pointer hover:underline justify-center gap-[3px] text-little all text-gray-400">
          <NavLink to="/registration">
            Do not have an account?
            <span className="text-green group-hover:underline">Sign up</span>
          </NavLink>{" "}
        </p>
      </div>
    </div>
  );
}

export default React.memo(LoginForm);
