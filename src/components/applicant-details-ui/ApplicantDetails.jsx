import { useParams } from "react-router-dom";
import ApplicantHeader from "./ApplicantHeader";
import ApplicantProfileCard from "./ApplicantProfileCard";
import MainContent from "./MainContent";
import { useContext, useEffect, useState } from "react";
import { axiosClient } from "../../services/axios-client";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContex";
import { PiSpinnerGap } from "react-icons/pi";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import FeedbackModal from "../modal/FeedbackModal";
import { onFailure } from "../../utils/notifications/OnFailure";
import { extractErrorMessage } from "../../utils/formmaters";

const ApplicantDetails = () => {
  const navigate = useNavigate();
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails.token);
  const { id } = useParams();
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedbackLoading, setFeedbackLoading] = useState(false);

  const fetchContract = async () => {
    setLoading(true);
    try {
      // Fetch contract details for this staff
      const contractRes = await client.get(`/contracts/detail/${id}`);

      const contractData = contractRes?.data?.contract;

      setContract(contractData);
    } catch (error) {
      console.error("Error fetching staff details:", error);
      toast.error("Unable to retrieve staff and contract data.");
    } finally {
      setLoading(false);
    }
  };
  const handleFeedbackSubmit = async (feedbackData) => {
    setFeedbackLoading(true);
    try {
      const payload = {
        user_id: contract?.domestic_staff_id,
        user_type: contract?.staff_category?.toLowerCase() === "artisan" ? "Artisan" : "domestic",
        rate_by: authDetails?.user?.id,
        rate_by_type: authDetails?.user?.role,
        rating: feedbackData.rating,
        comment: feedbackData.comment || "No comment provided.",
      };
      await client.post(`/ratings`, payload);
      toast.success("Thank you for your feedback!");
      setIsFeedbackOpen(false);
    } catch (error) {
      onFailure({
        message: "Submission Error",
        error: extractErrorMessage(error) || "Failed to submit feedback."
      })
    } finally {
      setFeedbackLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchContract();
    }
  }, [authDetails, id]);

  return (
    <div className="p-5 bg-white min-h-screen text-gray-900">
      <button
        type="button"
        onClick={() =>
          navigate(
            `/${authDetails?.user?.role === "employer" ? "company" : "applicant"
            }/staff/cart`,
            {
              state: { data: { type: contract?.staff_category } },
            }
          )
        }
        className="my-2 w-max flex items-center gap-2 outline outline-offset-5 outline-green-500 px-4 py-2 rounded text-green-500 hover:bg-green-100"
      >
        <FaArrowLeftLong className="me-4 text-green-500" />
        Back
      </button>

      {!loading ? (
        contract ? (
          <>
            <ApplicantHeader
              contract={contract}
              fetchContract={fetchContract}
              openFeedback={() => setIsFeedbackOpen(true)}
            />
            <div className="flex gap-4 flex-col lg:flex-row">
              <ApplicantProfileCard userData={contract} />
              <MainContent staff={contract} />
            </div>
          </>
        ) : (
          <div className="text-center text-gray-600 mt-20">
            No staff details found.
          </div>
        )
      ) : (
        <div className="h-screen w-full flex text-3xl text-primaryColor flex-col items-center justify-center gap-3">
          <PiSpinnerGap className="animate-spin" />
          <span className="text-sm">Fetching data...</span>
        </div>
      )}
      <FeedbackModal
        isOpen={isFeedbackOpen}
        loading={feedbackLoading}
        onClose={() => setIsFeedbackOpen(false)}
        onSubmit={handleFeedbackSubmit}
      />
    </div>
  );
};

export default ApplicantDetails;
