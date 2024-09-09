import { MeetingProvider, useMeeting } from "@videosdk.live/react-sdk";
import CompanyView from "./CompanyView";
import Participant from "./Participant";
import You from "./You";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContex";
import { authToken, createMeeting } from "./Api";
import { onSuccess } from "../../utils/notifications/OnSuccess";
import { useLocation } from "react-router-dom";
import Meeting from "./Meeting";

function InterviewRoom() {
  const location = useLocation();
  const [meetingId, setMeetingId] = useState(location?.state?.meetingId);
  const { authDetails } = useContext(AuthContext);

  console.log("auth token", authToken);
  console.log("meeting id", meetingId);

  const onClick = async () => {
    const roomId = await createMeeting("");
    setMeetingId(roomId);
  };

  return (
    <main className="h-screen flex items-center justify-center w-screen bg-gray-200">
      <div className="w-[90%] p-2 flex flex-col items-center justify-between rounded-[15px] h-[95%] bg-white/50">
  
        {meetingId && (
          <MeetingProvider
            config={{
              meetingId,
              micEnabled: true,
              webcamEnabled: true,
              name: authDetails?.user?.name || "Someone",
              participantId: authDetails.user.role,
              mode: "CONFERENCE",
            }}
            token={authToken}
          >
            <Meeting />
          </MeetingProvider>
        )}
      </div>
    </main>
  );
}

export default InterviewRoom;
