import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UseAdminManagement from "../hooks/useAdminManagement";
import MainLogo from "../assets/svgs/main-logo.svg";
function AdminForgotPassword() {
  const [email, setEmail] = useState("");
  const { AdminForgotPwd } = UseAdminManagement();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AdminForgotPwd({ email });
      if (response.status == 200) {
        toast.success("Password reset link sent to your email!");
      } else if (response.status === 404 && response.response.data.message === "User not found.") {
        toast.error("User not found");
      } else {
        toast.error("An error occurred while sending the reset link");
      }
    } catch (error) {
      // toast.error("An error occurred while sending the reset link");
      console.error("Error details:", error);
    }
  };

  const onTextChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <Helmet>
        <title>Forgot Password</title>
      </Helmet>
      <ToastContainer />
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="flex justify-center mb-4">
          <img src={MainLogo} alt="Main Logo" className="h-12" />
        </div>
        <div className="bg-[#0F5A02] p-8 md:p-12 rounded-md shadow-md w-full max-w-md">
          <h1 className="text-center text-white py-4 text-2xl">
            Forgot Password
          </h1>
          <form onSubmit={handleOnSubmit}>
            <div className="mb-6">
              <div className="flex items-center bg-white p-3 rounded-md border">
                <input
                  name="email"
                  type="email"
                  onChange={onTextChange}
                  required
                  className="w-full bg-transparent focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700"
            >
              Submit
            </button>
          </form>
          <div className="text-center mt-4">
            <NavLink
              to="/admin/login"
              className="text-sm hover:underline text-white"
            >
              Back to Login
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminForgotPassword;
