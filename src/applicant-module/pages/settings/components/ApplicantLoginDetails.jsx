import React, { useContext, useState } from "react";
import { FaRegCheckCircle, FaSpinner } from "react-icons/fa";
import DeleteUser from "./DeleteUser";
import useLogin from "../../../../hooks/useLogin";
import OTPInput from "react-otp-input";

const ApplicantLoginDetails = ({ authDetails }) => {
  const { otp, setOtp } = useState("");
  const { resetPassword, forgotPassword, loading } = useLogin();

  // console.log(authDetails)

  return (
    <div className="p-4 md:p-6">
      <div className="update_form py-6">
        <div>
          <form>
            <div className="border-b py-6">
              <div className="md:flex md:w-4/5">
                <div className="w-full md:w-2/5 pr-3 mb-4 md:mb-0">
                  <p className="font-medium text-slate-900">New Password</p>
                  <p className="text-sm text-slate-700">
                    Manage your password to make <br /> sure it is safe
                  </p>
                </div>
                <div className="w-full md:w-3/5">
                  <div className="mb-6">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700">
                        Enter New Password
                      </span>
                      <input
                        type="password"
                        placeholder="Enter your old password"
                        className="mt-1 block p-2 focus:outline-none w-full border"
                      />
                    </label>
                    <span className="text-sm text-slate-600">
                      Minimum of 8 characters
                    </span>
                  </div>
                  <div className="mb-6">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700">
                        Reconfirm New Password
                      </span>
                      <input
                        type="password"
                        placeholder="Enter your new password"
                        className="mt-1 block p-2 focus:outline-none w-full border"
                      />
                    </label>
                    <span className="text-sm text-slate-600">
                      Minimum of 8 characters
                    </span>
                  </div>
                  <div className="flex flex-col gap-[10px] bg-gray-100 p-5 items-center">
                    <OTPInput
                      onChange={(val) => setOtp(val)}
                      value={otp}
                      numInputs={4}
                      inputStyle={{
                        background: "white",
                        fontSize: "25px",
                        borderBottom: "1px solid gray",
                        height: "50px",
                        width: "100%",
                      }}
                      renderSeparator={<sdiv className="w-[10px]" />}
                      renderInput={(props) => <input {...props} />}
                    />
                  </div>
                  <span
                    onClick={() =>
                      forgotPassword(
                        authDetails.user.email,
                        authDetails.user.role
                      )
                    }
                    className="cursor-pointer gap-4 mt-2 flex items-center hover:underline hover:text-primaryColor"
                  >
                    Request for new pin
                    {loading && <FaSpinner className="animate-spin"/>}
                  </span>
                  <div className="my-3">
                    <button className="bg-green-700 hover:bg-green-900 p-2 px-4 text-white w-full md:w-auto">
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>

          <DeleteUser authDetails={authDetails} />
        </div>
      </div>
    </div>
  );
};

export default ApplicantLoginDetails;
