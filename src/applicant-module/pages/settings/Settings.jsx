import React, { useContext, useState } from 'react'
import BasicInfo from './components/BasicInfo';
import ApplicantLoginDetails from './components/ApplicantLoginDetails';
import { AuthContext } from '../../../context/AuthContex';

const Settings = () => {
    const { authDetails } = useContext(AuthContext);

    const user = authDetails?.user
    const [active, setActive] = useState("log")
    const handleActive = (event) => setActive(event);
    return (
        <div className="h-full text-[#25324b] w-full">
            <div className="pl-6 mt-6">
                <div className="flex border-b pt-4">
                    {/* <button onClick={() => handleActive("profile")} className={`p-2 mx-3 border-green-700 ${active === "profile" ? "border-b-2 font-medium" : ""}`}>My Profile</button> */}
                    <button onClick={() => handleActive("log")} className={`p-2 mx-3 border-green-700 ${active === "log" ? "border-b-2 font-medium" : ""}`}>Log Details</button>
                    {/* <button onClick={() => handleActive("notification")} className={`p-2 mx-3 border-green-700 ${active === "notification" ? "border-b-2 font-medium" : ""}`}>Notifications</button> */}
                </div>
                <div className="my-5 pr-[100px] ">
                    <div className='border-b pb-4'>
                        <p className="font-medium mb-3 text-slate-950">Basic Information</p>
                        <p>This is your personal information that you can update anytime.</p>
                    </div>
                    {active === "log" ? <ApplicantLoginDetails authDetails={authDetails}/> : <BasicInfo authDetails={authDetails} />}
                </div>
            </div>
        </div>
    )
}

export default Settings