import React, { useState } from 'react'

const Settings = () => {
    const [active, setActive] = useState("profile")
    const handleActive = (event) => setActive(event);
    return (
        <div className="h-full text-[#25324b] epilogue w-full">
            <div className="pl-6 mt-6">
                <div className="flex">
                    <button onClick={() => handleActive("profile")} className={`p-2 mx-3 border-green-700 ${active === "profile" ? "border-b-2 font-medium" : ""}`}>My Profile</button>
                    <button onClick={() => handleActive("log")} className={`p-2 mx-3 border-green-700 ${active === "log" ? "border-b-2 font-medium" : ""}`}>Log Details</button>
                    <button onClick={() => handleActive("notification")} className={`p-2 mx-3 border-green-700 ${active === "notification" ? "border-b-2 font-medium" : ""}`}>Notifications</button>
                </div>
            </div>
        </div>
    )
}

export default Settings