import { useParticipant } from "@videosdk.live/react-sdk";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactPlayer from "react-player";

function You({ data }) {
  const micRef = useRef(null);
  const {
    webcamStream,
    micStream,
    enableWebcam,
    webcamOn,
    micOn,
    isLocal,
    displayName,
  } = useParticipant(data.id);

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    } else {
      console.log("Camera error");
      console.log(webcamOn);
      console.log(webcamStream);

      enableWebcam();
    }
  }, [webcamStream, webcamOn]);

  const [isMicEnabled, setIsMicEnabled] = useState(false);

  const toogleMic = () => setIsMicEnabled(!isMicEnabled);


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
    <div className="w-full h-[70%] overflow-hidden rounded-[10px]">
      <audio ref={micRef} autoPlay playsInline muted={isLocal} />

      <div className="w-full  h-full rounded-[10px]">
        {webcamOn ? (
          <ReactPlayer
            //
            playsinline // extremely crucial prop
            pip={false}
            light={false}
            controls={false}
            muted={true}
            playing={true}
            //
            url={videoStream}
            //
            height={"300px"}
            width={"400px"}
            onError={(err) => {
              console.log(err, "participant video error");
            }}
          />
        ) : (
          <div className="flex flex-col w-[35%] h-full overflow-hidden rounded-[10px]">
            <img
              src="https://images.pexels.com/photos/6325968/pexels-photo-6325968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="w-full h-[80%]  object-cover bg-gray-400/10"
            />
            <span className=" bg-gray-500 text-little text-white h-[15%] px-2">
              {data.displayName}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default You;

{
  /* <div className="w-[35%]  h-[22%]">
<img
  className="h-full w-full object-cover rounded-md"
  src="https://images.pexels.com/photos/6325968/pexels-photo-6325968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
/>
</div> */
}
