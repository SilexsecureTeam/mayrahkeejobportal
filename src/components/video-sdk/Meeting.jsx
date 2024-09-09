import { useMeeting } from "@videosdk.live/react-sdk";
import CompanyView from "./CompanyView";
import Participant from "./Participant";
import You from "./You";
import { useContext, useEffect, useState } from "react";
import { get } from "idb-keyval";
import { AuthContext } from "../../context/AuthContex";
import { onSuccess } from "../../utils/notifications/OnSuccess";

function Meeting() {
  const { authDetails } = useContext(AuthContext);
  const [joined, setJoined] = useState(null);
  const [participant, setParticipant] = useState(null);
  const [you, setYou] = useState(null);
  const { join, participants } = useMeeting({
    //callback for when meeting is joined successfully
    onMeetingJoined: () => {
      onSuccess({
        message: "Online Interview",
        success: "You have succesfully joined the interview",
      });
      setJoined("JOINED");
    },
    //callback for when meeting is left
    onMeetingLeft: () => {
      //   props.onMeetingLeave();
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

  return (
    <>
      <div className="w-[95%] h-[12%] flex items-center justify-between px-8 py-2 bg-primaryColor rounded-r-full rounded-l-full">
        <div className="flex flex-col text-white justify-between gap-2">
          <h2 className="font-bold text-2xl">Interview with Mr x</h2>
          <p className="text-[13px]"> Status: Ongoing</p>
        </div>

        { joined !== 'JOINED' && <button
          onClick={joinMeeting}
          className="py-1 px-2 rounded-[20px] font-semibold text-little bg-white text-black"
        >
          Join Meeting
          {/* {meetingId} */}
        </button>}
      </div>

      {joined && joined == "JOINED" ? (
        <div className="h-[85%] w-[98%] flex rounded-[15px] bg-white">
          <div className="flex justify-between flex-col p-2 gap-2 w-[70%] h-full">
            <Participant data={participant} />
            <You data={you} />
          </div>
          <CompanyView />
        </div>
      ) : joined && joined == "JOINING" ? (
        <div className="h-[82%] w-[95%] flex items-center justify-center rounded-[15px] bg-white">
          <span>Joining Meeting</span>
        </div>
      ) : (
        <div className="h-[82%] w-[95%] flex items-center justify-center rounded-[15px] bg-white">
          <span>Waiting for you to join meeting</span>
        </div>
      )}
    </>
  );
}

export default Meeting;
