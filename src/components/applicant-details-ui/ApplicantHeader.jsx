import { useState, useEffect, useContext } from "react";
import useStaff from "../../hooks/useStaff";
import { onFailure } from "../../utils/notifications/OnFailure";
import { PiSpinnerGap } from "react-icons/pi";
import { axiosClient } from "../../services/axios-client";
import PickStaffModal from "./PickStaffModal";
import { AuthContext } from "../../context/AuthContex";
import { extractErrorMessage } from "../../utils/formmaters";
import { toast } from "react-toastify";

const ApplicantHeader = ({ contract, fetchContract, setContract }) => {
  const { authDetails } = useContext(AuthContext);
  const { ContractStatus, updateContractStatus } = useStaff();
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [complainLoading, setComplainLoading] = useState(false);
  const [terminateLoading, setTerminateLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const client = axiosClient();

  // Status checks
  const isAccepted = Number(contract?.contract_status) === 1;
  const isRejected = Number(contract?.contract_status) === 2;
  const isCancelled =
    Number(contract?.contract_status) === 3 ||
    contract?.status?.toLowerCase() === "cancelled";

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

  // Accept Contract
  const handleAccept = async () => {
    setAcceptLoading(true);
    const result = await updateContractStatus(
      contract,
      ContractStatus.accept,
      setContract
    );
    setAcceptLoading(false);
    if (!result)
      onFailure({ message: "Update Error", error: "Could not accept" });
  };

  // Reject Contract
  const handleReject = async () => {
    setRejectLoading(true);
    const result = await updateContractStatus(
      contract,
      ContractStatus.reject,
      setContract
    );
    setRejectLoading(false);

    if (result) {
      alert("Contract rejected. You can now pick another staff.");
      setIsModalOpen(true);
    } else {
      onFailure({ message: "Update Error", error: "Could not reject" });
    }
  };

  // Recontract
  const handleRecontract = async (newStaff) => {
    try {
      const response = await client.post(
        `${import.meta.env.VITE_BASE_URL}/contracts/recontract`,
        {
          user_id: authDetails?.user?.id,
          user_type: authDetails?.user?.role,
          domestic_staff_id: newStaff.id,
          contract_id: contract?.contract_id,
        }
      );

      const data = response.data;

      if (response.ok) {
        toast.success(data.message || "Recontract successful!");
        fetchContract();
        setIsModalOpen(false); // close modal only on success
      } else {
        throw new Error(data.message || "Failed to recontract");
      }
    } catch (error) {
      console.error("Recontract error:", error);
      toast.error(error.message);
    }
  };

  // Terminate Contract
  const handleTerminate = async () => {
    const activeContract =
      contract?.status?.toLowerCase() !== "cancelled" ||
      contract?.staff_category === "artisan";
    if (!activeContract) return alert("No active contract found.");

    const start = contract?.start_date ? new Date(contract?.start_date) : null;
    const end = contract?.end_date ? new Date(contract?.end_date) : null;
    const now = new Date();
    const isActive = start && end ? now >= start && now <= end : true;

    const confirmTerminate = window.confirm(
      isActive
        ? "⚠️ This contract is currently active. Terminating it may lead to disputes. Are you sure you want to continue?"
        : "Are you sure you want to terminate this expired or inactive contract?"
    );
    if (!confirmTerminate) return;

    setTerminateLoading(true);
    try {
      const { data } = await client.post(
        `${import.meta.env.VITE_BASE_URL}/contracts/cancel`,
        {
          user_id: contract?.user_id,
          user_type:
            contract?.staff_category?.toLowerCase() === "staff"
              ? "candidate"
              : "employer",
          domestic_staff_id: contract?.id,
          contract_id: contract?.contract_id,
        }
      );

      if (data) {
        alert(extractErrorMessage(data));
        fetchContract();
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

  // Report Contact Issue
  const reportContactIssue = async (staffContract) => {
    setComplainLoading(true);
    try {
      const response = await fetch(
        `https://dash.mayrahkeeafrica.com/api/support/report-contact-issue/${staffContract?.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            employer_comments: `Hello,\n\nI am unable to reach the artisan ${
              staffContract?.first_name ?? ""
            } - ${staffContract?.surname ?? ""} (ID: ${
              staffContract?.id
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

  // ----- RENDER -----
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
            {contract?.staff_category?.toLowerCase() === "staff"
              ? "Domestic Staff"
              : "Artisan"}
          </a>
        </nav>

        {/* Cancelled Banner */}
        {isCancelled && (
          <p className="text-sm font-bold text-red-600">
            ⚠️ Contract Cancelled
          </p>
        )}

        {/* Countdown only if not cancelled */}
        {!isCancelled && countdown && (
          <p
            className={`text-sm font-semibold ${
              countdown === "Expired" ? "text-red-600" : "text-primaryColor"
            }`}
          >
            Contract: {countdown}
          </p>
        )}
      </section>

      <div className="flex flex-wrap gap-3 items-center">
        {/* Artisan Button */}
        {contract?.staff_category === "artisan" && (
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
        {contract?.staff_category !== "artisan" && !isCancelled && (
          <>
            <button
              onClick={handleAccept}
              disabled={isAccepted}
              aria-busy={acceptLoading}
              className={`bg-green-600 relative text-white px-4 py-1 rounded overflow-hidden ${
                isAccepted ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isAccepted ? "Accepted" : "Accept"}
              {acceptLoading && (
                <div className="absolute inset-0 z-[999] bg-gray-50/50 flex items-center justify-center">
                  <PiSpinnerGap className="text-lg animate-spin text-black" />
                </div>
              )}
            </button>

            {isRejected ? (
              <button
                onClick={() => {
                  if (contract?.is_recontract) {
                    alert(
                      "⚠️ This contract has already been recontracted once. You cannot recontract again."
                    );
                  } else {
                    setIsModalOpen(true);
                  }
                }}
                className="bg-red-600 text-white px-4 py-1 rounded"
              >
                Pick New Staff
              </button>
            ) : (
              <button
                onClick={handleReject}
                disabled={rejectLoading}
                aria-busy={rejectLoading}
                className="bg-red-600 relative text-white px-4 py-1 rounded"
              >
                Reject
                {rejectLoading && (
                  <div className="absolute inset-0 z-[999] bg-gray-50/50 flex items-center justify-center">
                    <PiSpinnerGap className="text-lg animate-spin text-black" />
                  </div>
                )}
              </button>
            )}
          </>
        )}

        {/* Terminate Button */}
        {!isCancelled &&
          (isAccepted || contract?.staff_category === "artisan") && (
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

      {/* Pick Staff Modal */}
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
