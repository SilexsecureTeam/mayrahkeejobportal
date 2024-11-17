import { useMeeting } from "@videosdk.live/react-sdk";
import CompanyView from "./CompanyView";
import Participant from "./Participant";
import You from "./You";
import { useContext, useEffect, useState } from "react";
import { get } from "idb-keyval";
import { AuthContext } from "../../context/AuthContex";
import { onSuccess } from "../../utils/notifications/OnSuccess";
import { JobContext } from "../../context/JobContext";
import { ApplicationContext } from "../../context/ApplicationContext";

function Meeting({ interview }) {
  const { authDetails } = useContext(AuthContext);
  const { getJobById } = useContext(JobContext);
  const { getApplicant } = useContext(ApplicationContext);
  const [job, setJob] = useState(null);
  const [applicant, setApplicant] = useState(null);
  const [joined, setJoined] = useState(null);
  const [participant, setParticipant] = useState(null);
  const [you, setYou] = useState(null);
  const { join, participants } = useMeeting({
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
      alert(error.message);
      console.log(error);
    },
  });

  const getYou = () => {
    const speakerParticipants = [...participants.values()].find(
      (current) => current.id === authDetails.user.role
    );

    setYou(speakerParticipants);
  };

  const getParticipant = () => {
    const speakerParticipants = [...participants.values()].find(
      (current) => current.id !== authDetails.user.role
    );
    setParticipant(speakerParticipants);
  };

  const joinMeeting = () => {
    setJoined("JOINING");
    join();
  };

  useEffect(() => {
    if (joined === "JOINED" || joined === "JOINING") {
      getParticipant(), getYou();
    }
  }, [participants]);

  useEffect(() => {
    if (authDetails.user.role === "employer") {
      getApplicant(interview.candidate_id, setApplicant);
    } else {
      getJobById(interview.employer_id, setJob);
    }
  }, []);

  //console.log(interview);
  //console.log(applicant);
  return (
    <>
      <div className="w-[95%] h-fit py-1 flex items-center justify-between px-8 bg-primaryColor/50 rounded-r-full rounded-l-full">
        <div className="flex flex-col text-white justify-between gap-[5px]">
          <h2 className="font-bold text-lg capitalize">
            {interview?.interviewer_name} interview
          </h2>
        </div>

        {joined !== "JOINED" && (
          <button
            onClick={joinMeeting}
            className="py-1 px-2 animate-pulse duration-700 rounded-[20px] font-semibold text-little bg-white text-black"
          >
            Join Meeting
          </button>
        )}
      </div>

      {joined && joined === "JOINED" ? (
        <div className="h-[90%] w-full md:w-[98%] flex flex-col md:flex-row rounded-[15px] bg-white">
          <div className="flex justify-between flex-col p-2 gap-2 w-full md:w-[70%] h-max">
            <Participant interview={interview} data={participant} />
            <CompanyView interview={interview} />
          </div>
          <div className="flex flex-col w-full md:w-[30%]">
            <You data={you} job={job} applicant={applicant} />
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
