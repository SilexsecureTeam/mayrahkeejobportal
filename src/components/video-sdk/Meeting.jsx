import { useMeeting } from "@videosdk.live/react-sdk";
import CompanyView from "./CompanyView";
import Participant from "./Participant";
import You from "./You";
import { useContext, useEffect, useState, useMemo } from "react";
import { AuthContext } from "../../context/AuthContex";
import { onSuccess } from "../../utils/notifications/OnSuccess";
import { onFailure } from "../../utils/notifications/OnFailure";
import { ApplicationContext } from "../../context/ApplicationContext";
import useJobManagement from "../../hooks/useJobManagement";
import { useNavigate } from "react-router-dom";
import { LuLoader } from "react-icons/lu";

/**
 * Meeting.jsx
 * - Welcome screen before join (no participant/company view).
 * - Show loading when user clicks join.
 * - After join: show normal layout if other present; otherwise role-specific waiting UI.
 */

function Meeting({ interview, exclusive = null }) {
  const { authDetails } = useContext(AuthContext);
  const { getJobById } = useJobManagement();
  const { getApplicant, application, getApplication, setApplication } =
    useContext(ApplicationContext);
  const [job, setJob] = useState(null);
  const [applicant, setApplicant] = useState(null);
  const [joined, setJoined] = useState(null); // null | "JOINING" | "JOINED" | "LEFT"
  const [participant, setParticipant] = useState(null);
  const [you, setYou] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplication = async () => {
      if (interview) {
        await getApplication(interview?.job_application_id, setApplication);
      }
    };
    fetchApplication();
  }, [interview]);

  const { join, participants, leave } = useMeeting({
    onMeetingJoined: () => {
      onSuccess({
        message: "Online Interview",
        success: "You have successfully joined the interview",
      });
      setJoined("JOINED");
    },
    onMeetingLeft: () => {
      setJoined("LEFT");
    },
    onParticipantLeft: (participant) => {
      if (
        participant.id !== authDetails.user.id &&
        authDetails.user.role !== "employer"
      ) {
        leave();
        setJoined("LEFT");
        navigate("/applicant/applications", { replace: true });
      }
    },
    onError: (error) => {
      onFailure({
        message: "Technical Error",
        error: error?.message || "An error occured",
      });
      console.error(error);
      // Ensure we exit JOINING state on error
      setJoined((prev) => (prev === "JOINING" ? "LEFT" : prev));
    },
  });

  const auth = exclusive?.user ? exclusive : authDetails;

  // only query participant objects after we have actually joined
  const getYou = () => {
    if (!participants || joined !== "JOINED") return null;
    const speakerParticipants = [...participants.values()].find(
      (current) => current.id === auth.user.role
    );
    setYou(speakerParticipants);
  };

  const getParticipant = () => {
    if (!participants || joined !== "JOINED") return null;
    const speakerParticipants = [...participants.values()].find(
      (current) => current.id !== auth.user.role
    );
    setParticipant(speakerParticipants);
  };

  useEffect(() => {
    if (joined === "JOINED") {
      getParticipant();
      getYou();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [participants, joined]);

  useEffect(() => {
    if (auth.user.role === "employer") {
      getApplicant(interview.candidate_id, setApplicant);
    } else {
      getJobById(application?.job_id, setJob);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // presence derived only when joined
  const { isOtherPresent } = useMemo(() => {
    if (!participants || joined !== "JOINED") return { isOtherPresent: false };
    const other = [...participants.values()].find(
      (p) => p.id !== auth.user.role
    );
    return { isOtherPresent: Boolean(other) };
  }, [participants, joined, auth.user.role]);

  // UI actions
  const handleEndInterview = () => {
    onSuccess({
      message: "Interview ended",
      success: "You ended the interview",
    });
    try {
      leave();
    } catch (err) {
      console.warn("leave() error", err);
    }
    setJoined("LEFT");
    navigate(-1);
  };

  const joinMeeting = () => {
    // set JOINING so UI shows loader
    setJoined("JOINING");
    join();
  };

  // Header: minimal, unchanged style
  const Header = () => (
    <div className="sticky top-0 z-10 w-[98%] md:w-[95%] min-h-16 py-2 md:py-3 flex items-center justify-between px-6 bg-primaryColor/60 rounded-md">
      <div className="flex flex-col text-white justify-between gap-[4px]">
        <h2 className="font-bold text-lg capitalize">
          {interview?.interviewer_name} interview
        </h2>
        <div className="text-sm opacity-90">{interview?.position || ""}</div>
      </div>

      <div className="flex items-center gap-3">
        {joined === "JOINED" ? (
          isOtherPresent ? (
            <div className="px-3 py-1 rounded-md bg-green-100 text-green-800 text-sm">
              Participant present
            </div>
          ) : (
            <div className="px-3 py-1 rounded-md bg-yellow-100 text-yellow-900 text-sm">
              {auth?.user?.role === "employer"
                ? "Waiting for candidate"
                : "Waiting for interviewer"}
            </div>
          )
        ) : joined === "JOINING" ? (
          <div className="px-3 py-1 rounded-md bg-white text-black text-sm flex items-center gap-2">
            <LuLoader className="animate-spin" /> Connecting...
          </div>
        ) : (
          <div className="px-3 py-1 rounded-md bg-white text-black text-sm">
            Welcome
          </div>
        )}
      </div>
    </div>
  );

  // Welcome screen before join (no participant, no company view)
  const renderWelcomeScreen = () => (
    <div className="h-[82%] w-full flex flex-col items-center justify-center rounded-[15px] bg-white p-6">
      <h2 className="text-2xl font-semibold mb-3">Welcome to the interview</h2>
      <p className="text-sm opacity-80 mb-6">
        Click <strong>Join Meeting</strong> when you're ready. No other content
        is shown until you join.
      </p>

      <div className="flex gap-3">
        <button
          onClick={joinMeeting}
          className="py-2 px-4 rounded-md bg-primaryColor text-white font-semibold"
        >
          Join Meeting
        </button>
        <button
          onClick={() => navigate(-1)}
          className="py-2 px-4 rounded-md bg-gray-200 text-black"
        >
          Back
        </button>
      </div>
    </div>
  );

  // Waiting UI after join and other not present (role-specific)
  const renderWaitingAfterJoin = () => {
    const isEmployer = auth?.user?.role === "employer";
    const heading = isEmployer
      ? "Waiting for candidate"
      : "Waiting for interviewer";
    const description = isEmployer
      ? "The candidate has not joined yet. You may wait for them or end the interview."
      : "The interviewer has not joined yet. You may wait for them or leave.";

    return (
      <div className="h-[82%] w-full flex flex-col items-center justify-center rounded-[15px] bg-white p-4">
        <LuLoader className="animate-spin text-3xl mb-3" />
        <h3 className="text-xl mb-2">{heading}</h3>
        <p className="text-sm opacity-80 mb-4 max-w-sm text-center">
          {description}
        </p>

        <div className="flex gap-3">
          {isEmployer ? (
            <>
              {/* <button
                onClick={handleSendReminder}
                className="py-2 px-4 rounded-md bg-white/90 text-black font-semibold"
              >
                Send reminder
              </button> */}
              <button
                onClick={handleEndInterview}
                className="py-2 px-4 rounded-md bg-red-600 text-white font-semibold"
              >
                End interview
              </button>
            </>
          ) : (
            <>
              {/* <button
                onClick={handleNotifyInterviewer}
                className="py-2 px-4 rounded-md bg-white/90 text-black font-semibold"
              >
                Notify interviewer
              </button> */}
              <button
                onClick={() => {
                  try {
                    leave();
                  } catch (err) {
                    console.warn("leave() error", err);
                  }
                  setJoined("LEFT");
                  navigate(-1);
                }}
                className="py-2 px-4 rounded-md bg-gray-200 text-black font-semibold"
              >
                Leave
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  // Normal live layout when joined and other present
  const renderLiveLayout = () => (
    <div className="h-[90%] w-full md:w-[98%] flex flex-col md:flex-row rounded-[15px] bg-white">
      <div className="flex flex-col p-2 gap-2 w-full md:w-[70%] h-max">
        <Participant interview={interview} data={participant} />
        <CompanyView interview={interview} />
      </div>

      <div className="flex flex-col w-full md:w-[30%]">
        <You
          data={you}
          job={job}
          applicant={applicant}
          auth={auth}
          exclusive={exclusive}
          interview={interview}
        />
      </div>
    </div>
  );

  // Final render flow:
  // - BEFORE join (joined === null or "LEFT"): show welcome screen
  // - WHEN joining (joined === "JOINING"): show welcome screen but header shows connecting (button still disabled by state change)
  // - AFTER join:
  //      - if other present -> live layout
  //      - else -> role-specific waiting UI
  if (!joined || joined === "LEFT") {
    // welcome screen
    return (
      <>
        <Header />
        {renderWelcomeScreen()}
      </>
    );
  }

  // joining -> show header with connecting indicator and the welcome screen (user clicked join)
  if (joined === "JOINING") {
    return (
      <>
        <Header />
        <div className="h-[82%] w-full flex items-center justify-center rounded-[15px] bg-white p-4">
          <div className="flex flex-col items-center gap-4">
            <LuLoader className="animate-spin text-4xl" />
            <div className="text-lg font-semibold">Connecting...</div>
            <div className="text-sm opacity-80">
              Please wait while we connect you to the meeting.
            </div>
          </div>
        </div>
      </>
    );
  }

  // joined === "JOINED"
  return (
    <>
      <Header />
      {joined === "JOINED" && !isOtherPresent
        ? renderWaitingAfterJoin()
        : renderLiveLayout()}
    </>
  );
}

export default Meeting;
