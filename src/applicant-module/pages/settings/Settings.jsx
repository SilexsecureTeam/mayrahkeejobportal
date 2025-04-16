import React, { useContext, useState } from 'react';
import BasicInfo from './components/BasicInfo';
import ApplicantLoginDetails from './components/ApplicantLoginDetails';
import { AuthContext } from '../../../context/AuthContex';
import Notification from '../../../company-module/components/settings/Notification';

const Settings = () => {
    const { authDetails } = useContext(AuthContext);
    const user = authDetails?.user;
    const [active, setActive] = useState("log");

    const handleActive = (event) => setActive(event);

    const renderHeader = () => {
        switch (active) {
            case 'log':
                return {
                    title: 'Login Details',
                    description: 'Manage your account login credentials including your email and password.'
                };
            case 'profile':
                return {
                    title: 'Profile Information',
                    description: 'Update your personal details such as name, contact information, and more.'
                };
            case 'notifications':
                return {
                    title: 'Notification Preferences',
                    description: 'Control how you receive updates, alerts, and other important communications.'
                };
            default:
                return { title: '', description: '' };
        }
    };

    const { title, description } = renderHeader();

    return (
        <div className="h-full text-[#25324b] w-full">
            <div className="mt-6">
                <div className="sticky top-0 flex border-b pt-4 bg-white">
                    <button 
                        onClick={() => handleActive("log")} 
                        className={`p-2 mx-3 border-green-700 ${active === "log" ? "border-b-2 font-medium" : ""}`}
                    >
                        Login Details
                    </button>
                    <button 
                        onClick={() => handleActive("profile")} 
                        className={`p-2 mx-3 border-green-700 ${active === "profile" ? "border-b-2 font-medium" : ""}`}
                    >
                        Profile
                    </button>
                    <button 
                        onClick={() => handleActive("notifications")} 
                        className={`p-2 mx-3 border-green-700 ${active === "notifications" ? "border-b-2 font-medium" : ""}`}
                    >
                        Notifications
                    </button>
                </div>

                <div className="my-5 px-5">
                    <div className="border-b pb-4">
                        <p className="font-bold mb-3 text-slate-950">{title}</p>
                        <p>{description}</p>
                    </div>

                    {active === "log" && <ApplicantLoginDetails authDetails={authDetails} />}
                    {active === "profile" && <BasicInfo authDetails={authDetails} />}
                    {active === "notifications" && <Notification />}
                </div>
            </div>
        </div>
    );
};

export default Settings;
