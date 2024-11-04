import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function AdminOTP() {
  const [otp, setOtp] = useState(new Array(4).fill(""));
const [timecount,setTImeCount] = useState(0)

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Entered OTP is " + otp.join(""));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-grey-100 px-4 ">
      <div className="bg-green-800 p-8 rounded-lg shadow-md w-full max-w-md text-white">
        <h2 className="text-3xl font-bold mb-4 text-center">OTP Verification</h2>
        <h2 className="text-center py-3">We sent a code to {}</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mb-4">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                name="otp"
                maxLength="1"
                className="w-12 h-12 m-1 text-center border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>
          <h1 className="text-center py-2"> (2:39) 
            <NavLink to="/"> Didn’t get a code ? Resend</NavLink>
          </h1>
          
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminOTP;