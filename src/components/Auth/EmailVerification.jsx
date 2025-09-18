import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { formatTime } from "../../utils/formmaters";
import { onPrompt } from "../../utils/notifications/onPrompt";
import FormButton from "../../components/FormButton";
import useRegistration from "../../hooks/useRegistration";
import { onSuccess } from "../../utils/notifications/OnSuccess";
import { FaSpinner } from "react-icons/fa";

function EmailVerification() {
  const timeInMs = 60;
  const [secondsLeft, setSecondsLeft] = useState(timeInMs);
  const [otp, setOtp] = useState("");
  const [resendLoading, setResendLoading] = useState(false); // ✅ new state

  const { error, verifyOtp, loading, resendOtp } = useRegistration();
  const navigate = useNavigate();

  const regMail = JSON.parse(localStorage.getItem("__reg_info"))?.email;

  // Reset timer function
  const resetTimer = () => {
    setSecondsLeft(timeInMs);
    onSuccess({
      message: "OTP Sent!",
      success: "A new OTP has been sent to your email",
    });
  };

  // countdown effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (secondsLeft === 0) {
      onPrompt("Time elapsed");
    }
  }, [secondsLeft]);

  return (
    <div className="flex flex-col items-center justify-start w-full md:w-[50%] pt-[10%] px-[10%]">
      <div className="flex flex-col items-center">
        <h1 className="font-semibold text-[25px]">Verify your email</h1>
        <p className="text-little text-gray-400">We sent a code to {regMail}</p>
      </div>

      <div className="flex flex-col gap-[10px] mt-[5%] items-center justify-center">
        <OTPInput
          onChange={(val) => setOtp(val)}
          value={otp}
          numInputs={4}
          inputStyle={{
            background: "white",
            fontSize: "25px",
            borderBottom: "1px solid gray",
            height: "50px",
            width: "60px",
          }}
          renderSeparator={<div className="w-[10px]" />}
          renderInput={(props) => <input {...props} />}
        />

        <div className="flex gap-[10px] justify-between">
          <span className="text-little text-lime-700">
            Time Left: {formatTime(secondsLeft)}
          </span>
        </div>
      </div>

      <div className="w-[60%]">
        <FormButton
          onClick={() => {
            verifyOtp(otp, () => {
              navigate("/login");
              onSuccess({
                message: "Verification successful!",
                success: "Login to continue",
              });
              localStorage.clear();
            });
          }}
          loading={loading}
        >
          Verify OTP
        </FormButton>
      </div>

      {secondsLeft !== 0 && (
        <span className="text-little text-gray-400 mt-[3px]">
          Can't resend OTP until timeout
        </span>
      )}

      {!loading && secondsLeft === 0 && (
        <span
          onClick={async () => {
            try {
              setResendLoading(true);
              await resendOtp(resetTimer); // 🔥 call resend
            } finally {
              setResendLoading(false);
            }
          }}
          className="flex items-center gap-2 text-little text-gray-400 mt-[3px] hover:underline cursor-pointer"
        >
          {resendLoading ? (
            <>
              <FaSpinner className="animate-spin text-green-600" />
              Sending OTP...
            </>
          ) : (
            "Didn’t get a code? Resend"
          )}
        </span>
      )}

      {loading && (
        <span className="text-little text-gray-400 mt-[3px]">
          Processing request...
        </span>
      )}
    </div>
  );
}

export default EmailVerification;
