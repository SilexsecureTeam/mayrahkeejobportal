import { useParticipant } from "@videosdk.live/react-sdk";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactPlayer from "react-player";

function Participant({ data }) {
  const micRef = useRef(null);
  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
    useParticipant(data?.id);

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
    return null;
  }, [webcamStream, webcamOn]);

  const [isMicEnabled, setIsMicEnabled] = useState(false);

  const toggleMic = () => setIsMicEnabled(!isMicEnabled);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <li className="w-fit relative bg-black/50 justify-center rounded-[10px] min-w-[20%] items-center flex">
      <audio ref={micRef} autoPlay playsInline muted={isLocal} />
      
      {webcamOn ? (
        <div className="object-cover rounded-lg overflow-hidden w-full">
          <ReactPlayer
            playsinline
            pip={false}
            light={false}
            controls={false}
            muted={true}
            playing={true}
            className=""
            url={videoStream}
            height={450}
            width={"100%"}
            onError={(err) => {
              console.log(err, "participant video error");
            }}
          />
        </div>
      ) : (
        <img
          className="h-[450px] w-[800px] object-cover rounded-md"
          src="https://images.pexels.com/photos/4491440/pexels-photo-4491440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="participant fallback"
        />
      )}
      
      {/* Uncomment and style mic toggle button if needed */}
      {/* 
      <div
        onClick={toggleMic}
        className={`absolute cursor-pointer hover:scale-105 duration-100 flex items-center justify-center left-2 bottom-2 ${
          isMicEnabled ? "bg-green" : "bg-red-700"
        } rounded-full h-[20px] w-[20px]`}
      >
        <img src={Mic} className="h-[10px]" />
      </div> 
      */}
    </li>
  );
}

export default Participant;
