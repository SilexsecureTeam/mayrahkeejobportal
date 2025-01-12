import { useMeeting } from "@videosdk.live/react-sdk";
import CompanyView from "./CompanyView";
import Participant from "./Participant";
import You from "./You";
import { useContext, useEffect, useState } from "react";
import { get } from "idb-keyval";
import { AuthContext } from "../../context/AuthContex";
import { onSuccess } from "../../utils/notifications/OnSuccess";
import { onFailure } from "../../utils/notifications/OnFailure";
import { JobContext } from "../../context/JobContext";
import { ApplicationContext } from "../../context/ApplicationContext";
import useJobManagement from "../../hooks/useJobManagement";

function Meeting({ interview, exclusive }) {
  const { authDetails } = useContext(AuthContext);
  const { getJobById } = useJobManagement();
  const { getApplicant, application } = useContext(ApplicationContext);

  const [job, setJob] = useState(null);
  const [applicant, setApplicant] = useState(null);
  const [joined, setJoined] = useState(null);
  const [participant, setParticipant] = useState(null);
  const [you, setYou] = useState(null);

  // States for microphone and webcam
  const [micOn, setMicOn] = useState(true);
  const [webcamOn, setWebcamOn] = useState(true);

  const { join, participants, toggleMic, toggleWebcam, leave} = useMeeting({
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
    onError: (error) => {
      onFailure({
        message: "Technical Error",
        error: error?.message || "An error occurred",
      });
      console.error(error);
    },
  });

  const auth = exclusive ? exclusive : authDetails;

  const getYou = () => {
    const speakerParticipants = [...participants.values()].find(
      (current) => current.id === auth.user.role
    );
    setYou(speakerParticipants);
  };

  const getParticipant = () => {
    const speakerParticipants = [...participants.values()].find(
      (current) => current.id !== auth.user.role
    );
    setParticipant(speakerParticipants);
  };

  const joinMeeting = () => {
    setJoined("JOINING");
    join();
  };

  const handleMicToggle = () => {
    toggleMic();
    setMicOn((prev) => !prev);
  };

  const handleWebcamToggle = () => {
    toggleWebcam();
    setWebcamOn((prev) => !prev);
  };

  useEffect(() => {
    if (joined === "JOINED" || joined === "JOINING") {
      getParticipant();
      getYou();
    }
  }, [participants]);

  useEffect(() => {
    if (auth.user.role === "employer") {
      getApplicant(interview.candidate_id, setApplicant);
    } else {
      getJobById(interview.employer_id, setJob);
    }
  }, []);

  return (
    <>
      <div className="w-[98%] md:w-[95%] h-fit py-1 md:py-3 flex gap-5 items-center justify-between px-8 bg-primaryColor/60 rounded-md">
        <div className="flex flex-col text-white justify-between gap-[5px]">
          <h2 className="font-bold text-lg capitalize">
            {interview?.interviewer_name} interview
          </h2>
        </div>

        {joined !== "JOINED" && (
          <button
            onClick={joinMeeting}
            className="py-1 px-2 animate-pulse duration-700 rounded-md font-semibold text-xs md:text-sm bg-white text-black"
          >
            Join Meeting
          </button>
        )}
      </div>

      {joined && joined === "JOINED" ? (
        <div className="h-[90%] w-full md:w-[98%] flex flex-col md:flex-row rounded-[15px] bg-white">
          <div className="flex justify-between flex-col p-2 gap-2 w-full md:w-[70%] h-max">
            {/* Participant View */}
            <Participant
              interview={interview}
              data={participant}
              micOn={micOn}
              webcamOn={webcamOn}
              handleMicToggle={handleMicToggle}
              handleWebcamToggle={handleWebcamToggle}
            />
            <CompanyView interview={interview} />
          </div>
          <div className="flex flex-col w-full md:w-[30%]">
            {/* Host (You) View */}
            <You
              data={you}
              job={job}
              applicant={applicant}
              auth={auth}
              exclusive={exclusive}
              interview={interview}
              micOn={micOn}
              webcamOn={webcamOn}
              leave={leave}
              handleMicToggle={handleMicToggle}
              handleWebcamToggle={handleWebcamToggle}
            />
          </div>
        </div>
      ) : joined && joined === "JOINING" ? (
        <div className="h-[82%] w-full flex items-center justify-center rounded-[15px] bg-white p-4">
          <span className="text-center text-xl">Joining Meeting...</span>
        </div>
      ) : (
        <div className="h-[82%] w-full flex items-center justify-center rounded-[15px] bg-white p-4">
          <span className="text-center text-xl">Waiting for you to join...</span>
        </div>
      )}
    </>
  );
}

export default Meeting;
