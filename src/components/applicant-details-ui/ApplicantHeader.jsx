import { useState } from "react";
import useStaff from "../../hooks/useStaff";
import { onFailure } from "../../utils/notifications/OnFailure";
import { PiSpinnerGap } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const ApplicantHeader = ({ staff, setStaff }) => {
  const { ContractStatus, updateContractStatus } = useStaff();
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const navigate = useNavigate();
const [complainLoading, setComplainLoading] = useState(false);
  // Status checks based on 1 (Accepted) or 0 (Pending/Active)
  const isAccepted = Number(staff?.contract_status) === 1;
  const isRejected = Number(staff?.contract_status) === 2;

  const handleAccept = async () => {
    setAcceptLoading(true);
    const result = await updateContractStatus(staff, ContractStatus.accept, setStaff);
    setAcceptLoading(false);
    if (!result) {
      onFailure({ message: "Update Error", error: "Could not accept" });
    }
  };

  const handleReject = async () => {
    setRejectLoading(true);
    const result = await updateContractStatus(staff, ContractStatus.reject, setStaff);
    setRejectLoading(false);
    if (result) {
      navigate("/company/staff/cart");
    } else {
      onFailure({ message: "Update Error", error: "Could not reject" });
    }
  };
  
const reportContactIssue = async (staff) => {
    setComplainLoading(true);
    try {
      const response = await fetch(`https://dash.mayrahkeeafrica.com/api/support/report-contact-issue/${staff?.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employer_comments: `Hello,\n\nI am unable to reach the artisan ${staff?.first_name ?? ""} - ${staff?.surname ?? ""} (ID: ${staff?.id}). Please follow up on this issue.\n\nRegards,`,
        }),
      });

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
          <a href="#" className="text-green-500">Offers</a>
          <a href="#" className="text-gray-800 capitalize">{staff?.staff_category?.toLowerCase() === "staff" ? "Domestic Staff" : "Artisan"}</a>
        </nav>
      </section>

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
  <div className="flex space-x-4">
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
        <div className="absolute left-0 top-0 z-[999] bg-gray-50/50 w-full h-full flex items-center justify-center">
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
        <div className="absolute left-0 top-0 z-[999] bg-gray-50/50 w-full h-full flex items-center justify-center">
          <PiSpinnerGap className="text-lg animate-spin text-black" />
        </div>
      )}
    </button>
  </div>
)}

      
    </header>
  );
};

export default ApplicantHeader;
