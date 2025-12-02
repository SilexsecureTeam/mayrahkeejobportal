import { useContext, useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../../../services/axios-client";
import { AuthContext } from "../../../context/AuthContex";
import { ApplicationContext } from "../../../context/ApplicationContext";
import { FormatError } from "../../../utils/formmaters";
import { onFailure } from "../../../utils/notifications/OnFailure";
import { onSuccess } from "../../../utils/notifications/OnSuccess";

function Shortlist({ data, exclusive, toogleInterview, setEdit }) {
  const navigate = useNavigate();
  const { authDetails } = useContext(AuthContext);
  const { setApplication, setInterviewDetails } =
    useContext(ApplicationContext);

  const client = useMemo(
    () => axiosClient(authDetails?.token),
    [authDetails?.token]
  );

  const [interview, setInterview] = useState(null);
  const [error, setError] = useState({ message: "", error: "" });
  const [countdown, setCountdown] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // Check if interview is physical (location but no meeting link)
  const isPhysicalInterview =
    Boolean(interview?.location) && !Boolean(interview?.meeting_id);

  const formatDateTime = useCallback((date, time) => {
    if (!date || !time) {
      return {
        isLive: false,
        hasEnded: false,
        formattedDate: "",
        formattedTime: "",
        countdown: null,
      };
    }

    const datePart = date.split(" ")[0];
    const combinedDateTime = new Date(`${datePart}T${time}`);
    const now = new Date();
    const endTime = new Date(combinedDateTime.getTime() + 60 * 60 * 1000);

    const isLive = now >= combinedDateTime && now <= endTime;
    const hasEnded = now > endTime;

    let countdownValue = null;

    if (!isLive && !hasEnded) {
      const diff = combinedDateTime - now;
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        countdownValue = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      }
    }

    const formattedDate = combinedDateTime.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const formattedTime = combinedDateTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return {
      isLive,
      hasEnded,
      formattedDate,
      formattedTime,
      countdown: countdownValue,
    };
  }, []);

  const handleOnClick = () => {
    if (!interview) return;

    if (isPhysicalInterview) {
      if (hasEnded) {
        // Show modal instead of navigating
        setShowStatusModal(true);
        console.log(data);
      }
    } else {
      navigate("/interview-room", {
        state: {
          interview,
          exclusive: { user: state?.exclusiveData },
        },
      });
    }
  };

  const handleUpdateStatus = async () => {
    if (!selectedStatus || !data?.id) return;

    setIsUpdating(true);
    try {
      const applicationUpdateResponse = await client.post(
        `/applicationRespond`,
        {
          job_id: data.job_id,
          candidate_id: data.candidate_id,
          status: selectedStatus,
          interview_id: data.id,
        }
      );

      if (applicationUpdateResponse?.data) {
        onSuccess("Application status updated successfully!");
        setShowStatusModal(false);
        setSelectedStatus("");

        // You might want to refresh the application data here
        // or emit an event to parent component
      }
    } catch (err) {
      FormatError(err, setError, "Update Status Error");
    } finally {
      setIsUpdating(false);
    }
  };

  // Fetch interview details
  useEffect(() => {
    const initInterview = async () => {
      if (!data?.interview_id) return;
      try {
        const response = await client.get(`/interviews/${data.interview_id}`);
        setInterview(response.data.interview);
      } catch (err) {
        FormatError(err, setError, "Interview Error");
      }
    };

    initInterview();
  }, [client, data?.interview_id]);

  // Handle error notifications
  useEffect(() => {
    if (error.message && error.error) {
      onFailure(error);
    }
  }, [error.message, error.error]);

  // Handle countdown
  useEffect(() => {
    if (!interview || isPhysicalInterview) return;

    let countdownInterval;

    const updateCountdown = () => {
      const {
        isLive,
        hasEnded,
        countdown: countdownValue,
      } = formatDateTime(interview?.interview_date, interview?.interview_time);

      if (!isLive && !hasEnded) {
        setCountdown(countdownValue);
      } else {
        setCountdown(null);
      }

      return { isLive, hasEnded, countdownValue };
    };

    updateCountdown();

    countdownInterval = setInterval(() => {
      const { isLive, hasEnded, countdownValue } = updateCountdown();
      if (hasEnded || isLive || !countdownValue) {
        clearInterval(countdownInterval);
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [interview, formatDateTime, isPhysicalInterview]);

  if (!interview) return null;

  const { isLive, hasEnded, formattedDate, formattedTime } = formatDateTime(
    interview?.interview_date,
    interview?.interview_time
  );

  // Button Label Logic
  let buttonLabel = "";

  if (isPhysicalInterview) {
    if (hasEnded) {
      buttonLabel = "Update Application Status";
    } else if (isLive) {
      buttonLabel = "Physical Interview Ongoing";
    } else {
      buttonLabel = "Physical Interview Pending";
    }
  } else {
    if (hasEnded) {
      buttonLabel = "Interview Ended";
    } else if (isLive && interview?.meeting_id) {
      buttonLabel = "Proceed to Interview";
    } else {
      buttonLabel = "Not Live";
    }
  }

  // Disable Logic
  const isButtonDisabled =
    (isPhysicalInterview && !hasEnded) ||
    (!isPhysicalInterview && (!isLive || hasEnded || !interview?.meeting_id));

  return (
    <>
      {/* Status Update Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Update Application Status
              </h3>

              <p className="text-sm text-gray-600 mb-6">
                Set the final status for this application after the interview.
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="hired"
                    name="status"
                    value="hired"
                    checked={selectedStatus === "hired"}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="h-4 w-4 text-primaryColor focus:ring-primaryColor border-gray-300"
                  />
                  <label
                    htmlFor="hired"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    Hired
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    id="declined"
                    name="status"
                    value="declined"
                    checked={selectedStatus === "declined"}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="h-4 w-4 text-primaryColor focus:ring-primaryColor border-gray-300"
                  />
                  <label
                    htmlFor="declined"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    Declined
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowStatusModal(false);
                    setSelectedStatus("");
                  }}
                  disabled={isUpdating}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryColor disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateStatus}
                  disabled={!selectedStatus || isUpdating}
                  className="px-4 py-2 text-sm font-medium text-white bg-primaryColor border border-transparent rounded-md hover:bg-primaryColor/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryColor disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUpdating ? "Updating..." : "Update Status"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <h3 className="px-2 text-little">An Interview has been Scheduled</h3>

      <div className="grid grid-cols-2 w-full gap-y-2 justify-between items-center px-2">
        <div className="flex flex-col">
          <span className="text-gray-400 text-sm">Interview Date</span>
          <span className="text-gray-700 font-semibold text-little">
            {formattedDate}
          </span>
        </div>

        <div className="flex flex-col w-[40%]">
          <span className="text-gray-400 text-sm">Interviewer</span>
          <span className="text-gray-700 font-semibold text-little">
            {interview?.interviewer_name}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-gray-400 text-sm">Interview Time</span>
          <span className="text-gray-700 font-semibold text-little">
            {formattedTime}
          </span>
        </div>

        {interview?.location && (
          <div className="flex flex-col">
            <span className="text-gray-400 text-sm">Interview Location</span>
            <span className="text-gray-700 font-semibold text-little">
              {interview?.location}
            </span>
          </div>
        )}

        {interview?.meeting_id && (
          <div className="flex flex-col">
            <span className="text-gray-400 text-sm">Meeting ID</span>
            <span className="text-gray-700 font-semibold text-little">
              {interview?.meeting_id}
            </span>
          </div>
        )}

        <div className="flex flex-col">
          <span className="text-gray-400 text-sm">Add Ons</span>
          <span className="text-gray-700 font-semibold text-little">
            {interview?.notes || "—"}
          </span>
        </div>
      </div>

      {!isPhysicalInterview && countdown && (
        <div className="flex px-2 gap-2 items-center">
          <span className="text-gray-700 font-semibold text-little">
            Time Remaining: {countdown}
          </span>
        </div>
      )}

      <div className="flex px-2 gap-2 items-center mt-2">
        <button
          onClick={handleOnClick}
          disabled={isButtonDisabled}
          className="border w-fit hover:bg-primaryColor hover:text-white py-1 text-little px-2 border-primaryColor cursor-pointer disabled:hover:text-gray-700 disabled:hover:bg-transparent disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {buttonLabel}
        </button>

        <button
          onClick={() => {
            setEdit(true);
            setInterviewDetails(interview);
            toogleInterview(interview);
          }}
          className="border hover:bg-primaryColor hover:text-white p-2 md:py-1 text-little px-2 border-primaryColor"
        >
          Edit Interview
        </button>
      </div>
    </>
  );
}

export default Shortlist;
