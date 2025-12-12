import { MeetingProvider } from "@videosdk.live/react-sdk";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContex";
import { getAuthToken, createMeeting } from "./Api";
import { useLocation } from "react-router-dom";
import Meeting from "./Meeting";
//import { ApplicationContext } from "../../context/ApplicationContext";

function InterviewRoom() {
  const { state } = useLocation();
  const [meetingId, setMeetingId] = useState(state?.interview?.meeting_id);
  const { authDetails } = useContext(AuthContext);
  //const { application } = useContext(ApplicationContext);
  const exclusive = state?.exclusive;
  const auth = !!exclusive?.user ? exclusive : authDetails;
  const onClick = async () => {
    const roomId = await createMeeting("");
    setMeetingId(roomId);
  };

  return (
    <main className="h-screen flex items-center justify-center w-screen">
      <div className="w-[95%] flex flex-col items-center justify-between rounded-[15px] h-[95%] bg-white/50">
        {meetingId && (
          <MeetingProvider
            config={{
              meetingId,
              micEnabled: true,
              webcamEnabled: true,
              name: auth?.user?.name || "You",
              participantId: auth?.user?.role,
              mode: "CONFERENCE",
            }}
            token={getAuthToken()}
          >
            <Meeting
              interview={state?.interview}
              exclusive={state?.exclusive}
            />
          </MeetingProvider>
        )}
      </div>
    </main>
  );
}

export default InterviewRoom;
