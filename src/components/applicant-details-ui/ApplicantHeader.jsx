import { useState, useEffect } from "react";
import useStaff from "../../hooks/useStaff";
import { onFailure } from "../../utils/notifications/OnFailure";
import { PiSpinnerGap } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const ApplicantHeader = ({ staff, setStaff }) => {
  const { ContractStatus, updateContractStatus } = useStaff();
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [complainLoading, setComplainLoading] = useState(false);
  const [terminateLoading, setTerminateLoading] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const navigate = useNavigate();

  // Status checks
  const isAccepted = Number(staff?.contract_status) === 1;
  const isRejected = Number(staff?.contract_status) === 2;

  // ✅ Countdown logic (using staff.end_date)
  useEffect(() => {
    if (!staff?.end_date) return;

    const endDate = new Date(staff.end_date);

    const updateCountdown = () => {
      const now = new Date();
      const distance = endDate - now;

      if (distance <= 0) {
        setCountdown("Expired");
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s left`);
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [staff?.end_date]);

  // ✅ Accept Contract
  const handleAccept = async () => {
    setAcceptLoading(true);
    const result = await updateContractStatus(
      staff,
      ContractStatus.accept,
      setStaff
    );
    setAcceptLoading(false);
    if (!result)
      onFailure({ message: "Update Error", error: "Could not accept" });
  };

  // ✅ Reject Contract
  const handleReject = async () => {
    setRejectLoading(true);
    const result = await updateContractStatus(
      staff,
      ContractStatus.reject,
      setStaff
    );
    setRejectLoading(false);
    if (result) {
      navigate("/company/staff/cart");
    } else {
      onFailure({ message: "Update Error", error: "Could not reject" });
    }
  };

  // ✅ Terminate Contract
  const handleTerminate = async () => {
    const activeContract = staff?.status?.toLowerCase() === "approved";
    if (!activeContract) return alert("No active contract found.");

    const now = new Date();
    const start = new Date(staff.start_date);
    const end = new Date(staff.end_date);
    const isActive = now >= start && now <= end;

    const confirmTerminate = window.confirm(
      isActive
        ? "⚠️ This contract is currently active. Terminating it may lead to disputes. Are you sure you want to continue?"
        : "Are you sure you want to terminate this expired or inactive contract?"
    );
    if (!confirmTerminate) return;

    setTerminateLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}contracts/cancel`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: staff?.id,
            user_type:
              staff?.staff_category?.toLowerCase() === "staff"
                ? "candidate"
                : "employer",
            domestic_staff_id: staff?.id,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Contract terminated successfully.");
        setStaff((prev) => ({
          ...prev,
          contract_status: 2, // mark as terminated/rejected
        }));
      } else {
        throw new Error(data.message || "Failed to terminate contract.");
      }
    } catch (error) {
      console.error("Termination error:", error);
      alert(error.message);
    } finally {
      setTerminateLoading(false);
    }
  };

  // ✅ Report Contact Issue
  const reportContactIssue = async (staff) => {
    setComplainLoading(true);
    try {
      const response = await fetch(
        `https://dash.mayrahkeeafrica.com/api/support/report-contact-issue/${staff?.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            employer_comments: `Hello,\n\nI am unable to reach the artisan ${
              staff?.first_name ?? ""
            } - ${staff?.surname ?? ""} (ID: ${
              staff?.id
            }). Please follow up on this issue.\n\nRegards,`,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Complaint submitted successfully.");
      } else {
        throw new Error(data.message || "Failed to submit complaint.");
      }
    } catch (error) {
      console.error("Error reporting contact issue:", error);
      alert(error.message);
    }
    setComplainLoading(false);
  };

  return (
    <header className="text-white p-4 flex flex-wrap gap-5 items-center justify-between">
      <section>
        <h2 className="text-xl font-bold text-blue-900">{staff?.full_name}</h2>
        <nav className="flex flex-wrap my-2 gap-2 font-medium">
          <a href="#" className="text-green-500">
            Offers
          </a>
          <a href="#" className="text-gray-800 capitalize">
            {staff?.staff_category?.toLowerCase() === "staff"
              ? "Domestic Staff"
              : "Artisan"}
          </a>
        </nav>

        {/* ✅ Countdown */}
        {countdown && (
          <p
            className={`text-sm font-semibold ${
              countdown === "Expired" ? "text-red-600" : "text-primaryColor"
            }`}
          >
            Contract: {countdown}
          </p>
        )}
      </section>

      {/* ===== BUTTONS ===== */}
      {staff?.staff_category === "artisan" ? (
        <button
          className="bg-yellow-600 relative text-white px-4 py-2 rounded"
          onClick={() => reportContactIssue(staff)}
          disabled={complainLoading}
        >
          {complainLoading ? (
            <div className="flex items-center justify-center gap-2">
              <PiSpinnerGap className="animate-spin" />
              Sending...
            </div>
          ) : (
            "Complain: Can't Reach Artisan"
          )}
        </button>
      ) : (
        <div className="flex space-x-4 items-center">
          {/* Accept Button */}
          <button
            onClick={handleAccept}
            disabled={isAccepted}
            aria-busy={acceptLoading}
            className={`bg-green-600 relative text-white px-4 py-1 rounded overflow-hidden ${
              isAccepted ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isAccepted && !isRejected ? "Accepted" : "Accept"}
            {acceptLoading && (
              <div className="absolute inset-0 z-[999] bg-gray-50/50 flex items-center justify-center">
                <PiSpinnerGap className="text-lg animate-spin text-black" />
              </div>
            )}
          </button>

          {/* Reject Button */}
          <button
            onClick={handleReject}
            disabled={isRejected}
            aria-busy={rejectLoading}
            className={`bg-red-600 relative text-white px-4 py-1 rounded ${
              isRejected ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isRejected ? "Rejected" : "Reject"}
            {rejectLoading && (
              <div className="absolute inset-0 z-[999] bg-gray-50/50 flex items-center justify-center">
                <PiSpinnerGap className="text-lg animate-spin text-black" />
              </div>
            )}
          </button>

          {/* Terminate Contract */}
          {isAccepted && (
            <button
              onClick={handleTerminate}
              disabled={terminateLoading}
              className="bg-yellow-700 relative text-white px-4 py-1 rounded"
            >
              {terminateLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <PiSpinnerGap className="animate-spin" />
                  Terminating...
                </div>
              ) : (
                "Terminate Contract"
              )}
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default ApplicantHeader;
