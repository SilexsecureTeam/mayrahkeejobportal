import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import UseAdminManagement from "../../hooks/useAdminManagement";
import MainLogo from "../../assets/svgs/main-logo.svg";
function AdminRegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { AdminRegistration } = UseAdminManagement();
  const [error, setError] = useState(null);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const response = await AdminRegistration({ name, email, password, confirmPassword });
      console.log("Response:", response);
      if (response.status !== 400) {
        toast.success("Registration successful!");
      } else {
        toast.error("Registration failed");
        setError(response.response.data);
      }
    } catch (error) {
      toast.error("An error occurred during registration");
      console.error("Error details:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Registration</title>
      </Helmet>
      <ToastContainer />
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="flex justify-center mb-4">
          <img src={MainLogo} alt="Main Logo" className="h-12" />
        </div>
        <div className="bg-[#0F5A02] p-8 md:p-12 rounded-md shadow-md w-full max-w-md">
          <h1 className="text-center text-white py-4 text-2xl">Admin Registration</h1>
          <form onSubmit={handleOnSubmit}>
            <div className="mb-6">
              <div className="flex items-center bg-white p-3 rounded-md border">
                <input
                  name="name"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-transparent focus:outline-none"
                  placeholder="Enter your name"
                />
              </div>
              {error?.name && error.name.map((errMsg, index) => (
                <p key={index} className="text-red-500 text-sm">{errMsg}</p>
              ))}
            </div>
            <div className="mb-6">
              <div className="flex items-center bg-white p-3 rounded-md border">
                <input
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-transparent focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>
              {error?.email && error.email.map((errMsg, index) => (
                <p key={index} className="text-red-500 text-sm">{errMsg}</p>
              ))}
            </div>
            <div className="mb-6">
              <div className="flex items-center bg-white p-3 rounded-md border">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-transparent focus:outline-none"
                  placeholder="Enter your password"
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
              {error?.password && error.password.map((errMsg, index) => (
                <p key={index} className="text-red-500 text-sm">{errMsg}</p>
              ))}
            </div>
            <div className="mb-6">
              <div className="flex items-center bg-white p-3 rounded-md border">
                <input
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full bg-transparent focus:outline-none"
                  placeholder="Confirm your password"
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
            <button type="submit" className="w-full bg-[#47AA49] text-white p-3 rounded-md hover:bg-green-700">
              Register
            </button>
          </form>
          <div className="text-center mt-4">
            <NavLink to="/admin/login" className="text-sm hover:underline text-white">
              Back to Login
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminRegistrationForm;