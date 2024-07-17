import React from "react";
import MainLogo from "../../assets/svgs/main-logo.svg";
import Padlock from "../../assets/pngs/padlock.png";
import Person from "../../assets/pngs/person.png";
import { GiCircle, GiPlainCircle } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import '../../utils/notifications/OnSuccess'
import { onSuccess } from "../../utils/notifications/OnSuccess";
import FormButton from "../FormButton";

function LoginForm({
  rememberMe,
  toogleRememberMe,
}) {
  // const { loginDetails, handleLogin, loading, onTextChange } = useLogin();


  const handleOnSubmit = (e) => {
      e.preventDefault()
      handleLogin()
  }

  return (
    <div
      id="login-form"
      className={`h-[55%] w-[25%] bg-white absolute rounded-md left-[10%] top-[20%] px-[3%] py-[10px]`}
    >
      <img src={MainLogo} />

      <div id="login-section" className="flex flex-col gap-[5px] w-full  items-center">
        <h3 className="font-bold text-meduim text-gray-700">
          Login to your Account
        </h3>
        <span className="font-meduim text-center text-gray-400 text-little">
          Explore/manage job different job oppurtunities
        </span>

        <form
          onSubmit={handleOnSubmit}
          id="form-wrapper"
          className="flex flex-col w-full gap-[10px] items-center mt-[10px]"
        >
          <div className="h-[40px] w-full flex items-center pl-[10px] gap-[10px] rounded-md border-[1.5px]">
            <img src={Person} className="h-[20px]" />
          
            <input
              name="email"
              type="text"
              required
              className="w-[80%] h-full placeholder:text-little text-little bg-white/0 focus:bg-white/0  focus:outline-none text-gray-700 "
              placeholder="Enter email or phone"
            />
          </div>

          <div className="h-[40px] w-full flex items-center pl-[10px] mt-[10px] gap-[10px] rounded-md border-[1.5px]">
            <img src={Padlock} className="h-[20px]" />
            <input
              name="password"
              type="password"
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

          <FormButton loading={false} onClick={() => onSuccess({
            message: 'Login Succesful',
            success: 'Procceding to dashboard',
          })}>Login to continue</FormButton>
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
