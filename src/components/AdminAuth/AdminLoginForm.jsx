import React, { useState } from "react";
import MainLogo from "../../assets/svgs/main-logo.svg";
import { NavLink } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function AdminLoginForm({ rememberMe, toogleRememberMe, handleOnSubmit, setLoginDetails }) {
  const [showPassword, setShowPassword] = useState(false);

  const onTextChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="flex justify-center mb-4">
        <img src={MainLogo} alt="Main Logo" className="h-12" />
      </div>
      <div className="bg-green-900 p-16 rounded-md shadow-md w-full max-w-lg">
        <h1 className="text-center text-white py-4 text-2xl">Welcome back Admin!</h1>
        <form onSubmit={handleOnSubmit}>
          <div className="mb-6">
            <div className="flex items-center bg-white p-3 rounded-md border">
              <input
                name="email"
                type="text"
                onChange={onTextChange}
                required
                className="w-full bg-transparent focus:outline-none"
                placeholder="Enter email"
              />
            </div>
          </div>
          <div className="mb-6">
            <div className="flex items-center bg-white p-3 rounded-md border">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
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
          <div className="text-right mb-6">
            <NavLink to="/admin/forget-pwd" className="text-sm hover:underline text-white">
              Forgot Password?
            </NavLink>
          </div>
          <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default React.memo(AdminLoginForm);