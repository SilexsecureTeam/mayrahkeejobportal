import React, { useState } from "react";
import MainLogo from "../../assets/svgs/main-logo.svg";
import Padlock from "../../assets/pngs/padlock.png";
import Person from "../../assets/pngs/person.png";
import { NavLink } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function AdminLoginForm({ rememberMe, toogleRememberMe }) {
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const onTextChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="flex justify-center mb-4">
        <img src={MainLogo} alt="Main Logo" className="h-12" />
      </div>
      <div className="bg-green-900 p-12 rounded-md shadow-md w-full max-w-md">

        <h1 className="text-center text-white py-4">Welcome back Admin!</h1>
        <div className="mb-4">
          <div className="flex items-center bg-white p-2 rounded-md border">
            <input
              name="email"
              type="text"
              value={loginDetails.email}
              onChange={onTextChange}
              required
              className="w-full bg-transparent focus:outline-none"
              placeholder="Enter email"
            />
          </div>
        </div>
        <div className="mb-4">
          <div className="flex items-center bg-white p-2 rounded-md border">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={loginDetails.password}
              onChange={onTextChange}
              required
              className="w-full bg-transparent focus:outline-none"
              placeholder="Enter password"
            />
            {showPassword ? (
              <FaEyeSlash
                className="cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <FaEye
                className="cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
        </div>
        <div className=" text-right  mb-4">
          <NavLink to="/forgot-password" className="text-sm hover:underline text-white">
            Forgot Password?
          </NavLink>
        </div>
        <button className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700">
          Login
        </button>
      </div>
    </div>
  );
}

export default React.memo(AdminLoginForm);