import { useContext, useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { axiosClient } from "../../../services/axios-client";
import { AuthContext } from "../../../context/AuthContex";
import { ApplicationContext } from "../../../context/ApplicationContext";
import { FormatError } from "../../../utils/formmaters";
import { onFailure } from "../../../utils/notifications/OnFailure";
import { onSuccess } from "../../../utils/notifications/OnSuccess";
import StatusUpdateModal from "./StatusUpdateModal";

function Shortlist({ data, exclusive, toogleInterview, setEdit }) {
  const { state } = useLocation();
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
  const [isInterviewLoading, setIsInterviewLoading] = useState(true); // loader state

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
      // For physical interviews, no virtual room to join
      console.log("Physical interview - no virtual room");
    } else {
      // For online interviews, navigate to interview room if live
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
        onSuccess({
          message: "Application Update",
          success: "Application status updated successfully.",
        });
        setApplication(applicationUpdateResponse.data.job_application);
        setShowStatusModal(false);
        setSelectedStatus("");
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
      if (!data?.interview_id) {
        setIsInterviewLoading(false);
        return;
      }
      try {
        const response = await client.get(`/interviews/${data.interview_id}`);
        setInterview(response.data.interview);
      } catch (err) {
        FormatError(err, setError, "Interview Error");
      } finally {
        setIsInterviewLoading(false);
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

  // Loader while fetching interview
  if (isInterviewLoading) {
    return (
      <div className="flex min-h-[160px] items-center justify-center px-2">
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-primaryColor/30 border-t-primaryColor" />
          <p className="text-sm font-medium text-slate-700">
            Loading interview details…
          </p>
        </div>
      </div>
    );
  }

  if (!interview) return null;

  const { isLive, hasEnded, formattedDate, formattedTime } = formatDateTime(
    interview?.interview_date,
    interview?.interview_time
  );

  // Main Button Label Logic
  let buttonLabel = "";

  if (isPhysicalInterview) {
    buttonLabel = "Physical Interview";
  } else {
    if (hasEnded) {
      buttonLabel = "Interview Ended";
    } else if (isLive && interview?.meeting_id) {
      buttonLabel = "Proceed to Interview";
    } else {
      buttonLabel = "Not Live";
    }
  }

  // Disable Logic for main button
  const isMainButtonDisabled =
    isPhysicalInterview || hasEnded || !isLive || !interview?.meeting_id;

  return (
    <>
      {/* Status Update Modal (separated component) */}
      <StatusUpdateModal
        isOpen={showStatusModal}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        isUpdating={isUpdating}
        onClose={() => {
          setShowStatusModal(false);
          setSelectedStatus("");
        }}
        onConfirm={handleUpdateStatus}
      />

      <div className="px-2 pb-4">
        <h3 className="mb-3 text-xl font-semibold tracking-tight text-slate-900">
          Interview Scheduled
        </h3>

        <div className="mb-5 grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-2">
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Interview Date
            </span>
            <span className="mt-1 text-sm font-medium text-slate-900">
              {formattedDate}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Interviewer
            </span>
            <span className="mt-1 text-sm font-medium text-slate-900">
              {interview?.interviewer_name}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Interview Time
            </span>
            <span className="mt-1 text-sm font-medium text-slate-900">
              {formattedTime}
            </span>
          </div>

          {interview?.location && (
            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Location
              </span>
              <span className="mt-1 text-sm font-medium text-slate-900">
                {interview?.location}
              </span>
            </div>
          )}

          {interview?.meeting_id && (
            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Meeting ID
              </span>
              <span className="mt-1 text-sm font-mono text-slate-900">
                {interview?.meeting_id}
              </span>
            </div>
          )}

          <div className="flex flex-col md:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Additional Notes
            </span>
            <span className="mt-1 text-sm text-slate-800">
              {interview?.notes || "No additional notes."}
            </span>
          </div>
        </div>

        {!isPhysicalInterview && countdown && (
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                Time Remaining
              </span>
              <span className="text-xs font-medium text-blue-800">
                {countdown}
              </span>
            </div>
          </div>
        )}

        {/* Buttons - Responsive layout */}
        <div className="flex flex-col gap-3 md:flex-row md:flex-wrap">
          {/* Main button */}
          <button
            onClick={handleOnClick}
            disabled={isMainButtonDisabled}
            className="flex-1 rounded-lg border border-primaryColor px-4 py-2.5 text-sm font-semibold text-primaryColor transition hover:bg-primaryColor hover:text-white disabled:cursor-not-allowed disabled:border-slate-300 disabled:bg-slate-50 disabled:text-slate-400"
          >
            {buttonLabel}
          </button>

          {/* Update Application Status button */}
          <button
            onClick={() => setShowStatusModal(true)}
            className="flex-1 rounded-lg border border-primaryColor bg-primaryColor px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primaryColor/90 hover:border-primaryColor/90"
          >
            Update Application Status
          </button>

          {/* Edit Interview button */}
          <button
            onClick={() => {
              setEdit(true);
              setInterviewDetails(interview);
              toogleInterview(interview);
            }}
            className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          >
            Edit Interview
          </button>
        </div>
      </div>
    </>
  );
}

export default Shortlist;
