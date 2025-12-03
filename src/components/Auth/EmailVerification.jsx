import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { formatTime } from "../../utils/formmaters";
import { onPrompt } from "../../utils/notifications/onPrompt";
import FormButton from "../../components/FormButton";
import useRegistration from "../../hooks/useRegistration";
import { onSuccess } from "../../utils/notifications/OnSuccess";
import { FaSpinner } from "react-icons/fa";

const OTP_DURATION_SECONDS = 60; // better naming

function EmailVerification() {
  const [secondsLeft, setSecondsLeft] = useState(OTP_DURATION_SECONDS);
  const [otp, setOtp] = useState("");
  const [resendLoading, setResendLoading] = useState(false);

  const { error, verifyOtp, loading, resendOtp } = useRegistration();
  const navigate = useNavigate();

  const regMail = JSON.parse(localStorage.getItem("__reg_info"))?.email;

  // helper: get stored expiry or null
  const getStoredExpiry = () => {
    const raw = localStorage.getItem("__otp_expiry");
    if (!raw) return null;
    const ts = Number(raw);
    if (Number.isNaN(ts)) return null;
    return ts;
  };

  const setStoredExpiry = (ts) => {
    localStorage.setItem("__otp_expiry", String(ts));
  };

  // On mount: compute remaining time from stored expiry
  useEffect(() => {
    const now = Date.now();
    const existingExpiry = getStoredExpiry();

    if (existingExpiry && existingExpiry > now) {
      const diffInSeconds = Math.floor((existingExpiry - now) / 1000);
      setSecondsLeft(diffInSeconds);
    } else {
      // no valid expiry stored → start a fresh countdown and store it
      const newExpiry = now + OTP_DURATION_SECONDS * 1000;
      setStoredExpiry(newExpiry);
      setSecondsLeft(OTP_DURATION_SECONDS);
    }
  }, []);

  // countdown effect
  useEffect(() => {
    if (secondsLeft <= 0) {
      setSecondsLeft(0);
      onPrompt("Time elapsed");
      return;
    }

    const intervalId = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [secondsLeft]);

  // Reset timer when OTP is resent
  const resetTimer = () => {
    const newExpiry = Date.now() + OTP_DURATION_SECONDS * 1000;
    setStoredExpiry(newExpiry);
    setSecondsLeft(OTP_DURATION_SECONDS);
    onSuccess({
      message: "OTP Sent!",
      success: "A new OTP has been sent to your email",
    });
  };

  return (
    <div className="flex flex-col items-center justify-start w-full md:w-[50%] pt-[10%] px-[10%]">
      <div className="flex flex-col items-center">
        <h1 className="font-semibold text-[25px]">Verify your email</h1>
        <p className="text-little text-gray-400">
          We sent a code to {regMail || "your email"}
        </p>
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
              localStorage.removeItem("__otp_expiry");
              localStorage.removeItem("__reg_info");
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
              await resendOtp(resetTimer);
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
