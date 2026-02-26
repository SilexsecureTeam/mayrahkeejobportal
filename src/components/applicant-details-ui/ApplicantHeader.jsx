import { useState, useEffect, useContext } from "react";
import { PiSpinnerGap } from "react-icons/pi";
import { axiosClient } from "../../services/axios-client";
import PickStaffModal from "./PickStaffModal";
import { AuthContext } from "../../context/AuthContex";
import { extractErrorMessage } from "../../utils/formmaters";
import { toast } from "react-toastify";
import { onSuccess } from "../../utils/notifications/OnSuccess";
import FeedbackModal from "../modal/FeedbackModal";

const ApplicantHeader = ({ contract, fetchContract, openFeedback }) => {
  const { authDetails } = useContext(AuthContext);
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [complainLoading, setComplainLoading] = useState(false);
  const [terminateLoading, setTerminateLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countdown, setCountdown] = useState(null);

  const client = axiosClient();

  // Identify type and normalize status
  const isArtisan = contract?.staff_category?.toLowerCase() === "artisan";
  const status = contract?.status?.toLowerCase();

  // Unified state flags
  const isAccepted = status === "active";
  const isRejected = status === "inactive";
  const isCancelled = status === "cancelled";
  const isActive = status === "active";
  const isPending = status === "pending";

  // Countdown
  useEffect(() => {
    if (!contract?.end_date || isCancelled) return;

    const endDate = new Date(contract.end_date);

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
  }, [contract?.end_date, isCancelled]);

  //Accept Contract
  const handleAccept = async () => {
    if (isAccepted) return toast.info("Contract already accepted.");
    setAcceptLoading(true);
    try {
      const { data } = await client.post(`/contracts/status-update`, {
        contract_id: contract?.contract_id,
        status: "active",
      });

      onSuccess({
        message: "Contract Accepted!",
        success: extractErrorMessage(data) || "Contract accepted!",
      });
      fetchContract();
    } catch (error) {
      console.error("Accept error:", error);
      toast.error(error.message || "Failed to accept contract.");
    } finally {
      setAcceptLoading(false);
    }
  };

  //Reject Contract
  const handleReject = async () => {
    if (isRejected) return toast.info("Contract already rejected.");
    setRejectLoading(true);
    try {
      const { data } = await client.post(`/contracts/status-update`, {
        contract_id: contract?.contract_id,
        status: "inactive",
      });

      onSuccess({
        message: "Contract Rejected!",
        success: extractErrorMessage(data) || "Contract rejected.",
      });
      setIsModalOpen(true);
      fetchContract();
    } catch (error) {
      console.error("Reject error:", error);
      toast.error(error.message || "Failed to reject contract.");
    } finally {
      setRejectLoading(false);
    }
  };

  //Recontract
  const handleRecontract = async (newStaff) => {
    try {
      const { data } = await client.post(`/contracts/recontract`, {
        user_id: authDetails?.user?.id,
        user_type: authDetails?.user?.role,
        domestic_staff_id: newStaff.id,
        contract_id: contract?.contract_id,
      });

      toast.success(data.message || "Recontract successful!");
      fetchContract();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Recontract error:", error);
      toast.error(error.message || "Failed to recontract.");
    }
  };
  const handleTerminate = async () => {
    if (!isActive) return toast.warn("No active contract found.");
    if (!window.confirm("Are you sure you want to terminate?")) return;

    setTerminateLoading(true);
    try {
      await client.post(`/contracts/status-update`, {
        contract_id: contract?.contract_id,
        status: "cancelled",
      });

      onSuccess({ message: "Contract Terminated!", success: "Success" });

      // 1. Refresh data (this triggers parent loading)
      await fetchContract();

      // 2. Open the modal that now lives in the parent
      openFeedback();

    } catch (error) {
      toast.error("Failed to terminate.");
    } finally {
      setTerminateLoading(false);
    }
  };

  //Report Contact Issue (Artisan only)
  const reportContactIssue = async (staffContract) => {
    setComplainLoading(true);
    try {
      const response = await fetch(
        `https://dash.mayrahkeeafrica.com/api/support/report-contact-issue/${staffContract?.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            employer_comments: `Hello,\n\nI am unable to reach the artisan ${staffContract?.first_name ?? ""
              } - ${staffContract?.surname ?? ""} (USER ID: ${staffContract?.domestic_staff_id
              }). Please follow up on this issue.\n\nRegards,`,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || "Complaint submitted successfully.");
      } else {
        throw new Error(data.message || "Failed to submit complaint.");
      }
    } catch (error) {
      console.error("Contact issue error:", error);
      toast.error(error.message);
    } finally {
      setComplainLoading(false);
    }
  };

  return (
    <header className="text-white p-4 flex flex-wrap gap-5 items-center justify-between">
      <section>
        <h2 className="text-xl font-bold text-blue-900">
          {contract?.full_name}
        </h2>
        <nav className="flex flex-wrap my-2 gap-2 font-medium">
          <a href="#" className="text-green-500">
            Offers
          </a>
          <a href="#" className="text-gray-800 capitalize">
            {isArtisan ? "Artisan" : "Domestic Staff"}
          </a>
        </nav>

        {isCancelled && (
          <p className="text-sm font-bold text-red-600">
            Contract Cancelled
          </p>
        )}

        {!isArtisan && isAccepted && countdown && (
          <p
            className={`text-sm font-semibold ${countdown === "Expired" ? "text-red-600" : "text-primaryColor"
              }`}
          >
            Contract: {countdown}
          </p>
        )}
      </section>

      <div className="flex flex-wrap gap-3 items-center">
        {/* Artisan Button */}
        {isArtisan && (
          <button
            className="bg-yellow-600 relative text-white px-4 py-2 rounded"
            onClick={() => reportContactIssue(contract)}
            disabled={complainLoading || isCancelled}
          >
            {complainLoading
              ? "Sending..."
              : isCancelled
                ? "Contract Cancelled"
                : "Complain: Can't Reach Artisan"}
          </button>
        )}

        {/* Staff Buttons */}
        {!isArtisan && !isCancelled && (
          <>
            <button
              onClick={handleAccept}
              disabled={isAccepted}
              className={`bg-green-600 relative text-white px-4 py-1 rounded ${isAccepted ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              {isAccepted ? "Accepted" : "Accept"}
              {acceptLoading && (
                <div className="absolute inset-0 bg-gray-50/50 flex items-center justify-center">
                  <PiSpinnerGap className="animate-spin text-black" />
                </div>
              )}
            </button>

            {isRejected ? (
              <button
                onClick={() =>
                  contract?.is_recontract
                    ? toast.warn(
                      " This contract has already been recontracted once."
                    )
                    : setIsModalOpen(true)
                }
                className="bg-red-600 text-white px-4 py-1 rounded"
              >
                Pick New Staff
              </button>
            ) : (
              <button
                onClick={handleReject}
                disabled={rejectLoading}
                className="bg-red-600 relative text-white px-4 py-1 rounded"
              >
                Reject
                {rejectLoading && (
                  <div className="absolute inset-0 bg-gray-50/50 flex items-center justify-center">
                    <PiSpinnerGap className="animate-spin text-black" />
                  </div>
                )}
              </button>
            )}
          </>
        )}

        {/* Terminate Button */}
        {isActive && !isCancelled && (
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

      {isModalOpen && (
        <PickStaffModal
          contract={contract}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleRecontract}
        />
      )}
    </header>
  );
};

export default ApplicantHeader;
