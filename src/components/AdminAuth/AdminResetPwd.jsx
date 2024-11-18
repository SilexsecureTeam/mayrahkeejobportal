import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import MainLogo from "../../assets/svgs/main-logo.svg";
function AdminResetPwd() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match");
      return;
    }
    try {
      // Add your change password logic here
      console.log("Password change submitted:", { currentPassword, newPassword });
      toast.success("Password changed successfully!");
    } catch (error) {
      toast.error("An error occurred while changing the password");
      console.error("Error details:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Change Password</title>
      </Helmet>
      <ToastContainer />
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="flex justify-center mb-4">
          <img src={MainLogo} alt="Main Logo" className="h-12" />
        </div>
        <div className="bg-[#0F5A02] p-8 md:p-12 rounded-md shadow-md w-full max-w-md">
          <h1 className="text-center text-white py-4 text-2xl">Change Password</h1>
          <form onSubmit={handleOnSubmit}>
            <div className="mb-6">
              <div className="flex items-center bg-white p-3 rounded-md border">
                <input
                  name="currentPassword"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="w-full bg-transparent focus:outline-none"
                  placeholder="Enter current password"
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
            <div className="mb-6">
              <div className="flex items-center bg-white p-3 rounded-md border">
                <input
                  name="newPassword"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full bg-transparent focus:outline-none"
                  placeholder="Enter new password"
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
            <div className="mb-6">
              <div className="flex items-center bg-white p-3 rounded-md border">
                <input
                  name="confirmNewPassword"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                  className="w-full bg-transparent focus:outline-none"
                  placeholder="Confirm new password"
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
              Change Password
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

export default AdminResetPwd;