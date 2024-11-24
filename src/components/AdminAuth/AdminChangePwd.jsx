import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import MainLogo from "../../assets/svgs/main-logo.svg";
import UseAdminManagement from "../../hooks/useAdminManagement";

function AdminChangePassword() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const { AdminChangePwd } = UseAdminManagement();

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            current_password: currentPassword,
            new_password: newPassword,
        };

        try {
            const response = await AdminChangePwd(formData);
            if (response.status !== 422 && response.status !== 400) {
                setError(null);
                toast.success("Password changed successfully!");
                setTimeout(() => {
                    window.location.href = "/admin/settings";
                }, 2000);
            } else {
                toast.error("An error occurred while changing the password");
                setError(response.response.data.message || response.response.data.error.message);
                console.log(error);
                
            }
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
                            { error && <p className="text-red-300 text-sm">{error}</p> }
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

export default AdminChangePassword;