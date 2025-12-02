import { useMeeting, useParticipant } from "@videosdk.live/react-sdk";
import { useEffect, useMemo, useRef, useState, useContext } from "react";
import ReactPlayer from "react-player";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import {
  BsFillCameraVideoFill,
  BsFillCameraVideoOffFill,
} from "react-icons/bs";
import { MdCallEnd } from "react-icons/md";
import { AuthContext } from "../../context/AuthContex";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../../services/axios-client";
import { stages } from "../../utils/constants";
import { onFailure } from "../../utils/notifications/OnFailure";
import { LuLoader } from "react-icons/lu";
import { ApplicationContext } from "../../context/ApplicationContext";
import { IMAGE_URL } from "../../utils/base";

function You({ data, job, applicant, auth, exclusive }) {
  const micRef = useRef(null);
  const { authDetails } = useContext(AuthContext);
  const navigate = useNavigate();
  const { application, setApplication } = useContext(ApplicationContext);

  const { webcamStream, micStream, enableWebcam, webcamOn, micOn, isLocal } =
    useParticipant(data?.id);

  const { toggleMic, toggleWebcam, leave } = useMeeting();

  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [proceedUpdate, setProceedUpdate] = useState(false);

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    } else {
    }
  }, [webcamStream, webcamOn, enableWebcam]);

  // Handle mic audio
  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error("micRef.current.play() failed", error)
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  const updateApplication = async () => {
    setLoading(true);
    try {
      const client = axiosClient(authDetails.token);

      const payload = {
        candidate_id: applicant?.id ?? application?.candidate_id,
        job_id: job?.id ?? application?.job_id,
        status: stages[2].name,
      };

      const { data } = await client.post("/applicationRespond", payload);

      const updatedApplication = data?.job_application;
      setApplication(updatedApplication);

      // Leave and navigate only AFTER successful update
      leave();
      if (exclusive?.user) {
        navigate(
          `/admin-exclusives/applicants/detail/${updatedApplication?.id}`
        );
      } else {
        navigate(`/company/applicants/detail/${updatedApplication?.id}`);
      }
    } catch (error) {
      console.error("Application update error:", error);
      onFailure({
        message: "Application Error",
        error: "Application status not updated",
      });
      // even on failure, we can still leave or stay; here I'll just leave
      leave();
      navigate(-1);
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveWithoutUpdate = () => {
    setLoading(true);
    // If you want a small delay for UX, you can add setTimeout, but it's optional
    leave();
    navigate(-1);
    setLoading(false);
  };

  return (
    <>
      {/* Confirm modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[1000]">
          <div className="bg-white w-[90%] max-w-md rounded-lg shadow-lg p-6 relative">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Confirm Update
            </h2>
            <p className="text-gray-600 mb-6 font-semibold">
              You're about to leave. Are you satisfied with this candidate and
              would you like to update their status?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setProceedUpdate(true);
                  setIsModalOpen(false);
                  updateApplication();
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setProceedUpdate(false);
                  setIsModalOpen(false);
                  handleLeaveWithoutUpdate();
                }}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-200"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loader overlay */}
      {loading && (
        <div className="fixed flex text-white flex-col items-center justify-center left-0 top-0 h-screen w-screen z-[999] bg-primaryColor/80">
          <LuLoader className="animate-spin text-3xl" />
          <span className="text-lg animate-pulse">Please wait...</span>
          <span className="animate-pulse">
            {proceedUpdate
              ? "Updating candidate's application"
              : "Ending this interview session"}
          </span>
        </div>
      )}

      <div className="w-full h-full flex flex-col gap-2 md:gap-0 rounded-[10px] pb-28 md:pb-0">
        <audio ref={micRef} autoPlay playsInline muted={isLocal} />

        {/* Video / image area */}
        <div className="w-full h-96 overflow-hidden rounded-[10px]">
          {webcamOn && videoStream ? (
            <ReactPlayer
              playsinline
              pip={false}
              light={false}
              controls={false}
              muted={true}
              playing={true}
              url={videoStream}
              height="100%"
              width="100%"
              onError={(err) => {
                console.log(err, "participant video error");
              }}
            />
          ) : (
            <div className="flex flex-col relative md:h-full rounded-[10px]">
              <img
                src={
                  job?.featured_image
                    ? `${IMAGE_URL}/${job.featured_image}`
                    : applicant?.profile
                    ? `${IMAGE_URL}/${applicant.profile}`
                    : "https://images.pexels.com/photos/6325968/pexels-photo-6325968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                }
                className="w-full object-cover bg-gray-400/10"
              />
              <span className="bg-gray-500 absolute left-0 top-0 p-1 w-fit h-fit text-little text-white px-2">
                {applicant ? applicant?.full_name : job?.email}
              </span>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="fixed z-10 left-0 bottom-0 right-0 w-full p-1 bg-[rgba(0,0,0,.8)] text-white md:text-black md:bg-transparent md:relative flex justify-center gap-8 md:p-5">
          <div className="flex flex-col items-center">
            {micOn ? (
              <FaMicrophone
                className="text-sm h-[45px] w-[45px] cursor-pointer p-3 bg-gray-400 rounded-full"
                onClick={() => toggleMic()}
              />
            ) : (
              <FaMicrophoneSlash
                className="text-sm h-[45px] w-[45px] cursor-pointer p-3 bg-red-500 text-red-800 rounded-full"
                onClick={() => toggleMic()}
              />
            )}
            <span className="text-sm font-semibold">
              {micOn ? "Unmuted" : "Muted"}
            </span>
          </div>

          <div className="flex flex-col items-center">
            {webcamOn ? (
              <BsFillCameraVideoFill
                className="text-sm h-[45px] w-[45px] cursor-pointer p-3 bg-gray-400 rounded-full"
                onClick={() => toggleWebcam()}
              />
            ) : (
              <BsFillCameraVideoOffFill
                className="text-sm h-[45px] w-[45px] cursor-pointer p-3 bg-red-500 text-red-800 rounded-full"
                onClick={() => toggleWebcam()}
              />
            )}
            <span className="text-sm font-semibold w-max">
              {webcamOn ? "Cam On" : "Cam Off"}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <MdCallEnd
              className="text-sm h-[45px] w-[45px] cursor-pointer p-3 bg-red-500 text-red-800 rounded-full"
              onClick={() => {
                if (auth.user.role === "employer") {
                  setIsModalOpen(true);
                } else {
                  handleLeaveWithoutUpdate();
                }
              }}
            />
            <span className="text-sm font-semibold">Leave</span>
          </div>
        </div>

        {/* Sidebar details */}
        <div className="sticky bottom-0 w-full md:flex flex-col h-max p-4 rounded-md bg-gray-950">
          {!applicant && (
            <>
              <span className="text-white font-semibold">Job Details</span>

              <span className="text-white tracking-wider mt-3 flex justify-between w-full text-sm">
                Title
                <span>{application?.job_title}</span>
              </span>
              <span className="text-white tracking-wider mt-3 flex justify-between w-full text-sm">
                Employer <span>{application?.employer_name}</span>
              </span>
            </>
          )}

          {applicant && (
            <>
              <span className="sticky bottom-0 text-white font-semibold">
                Applicant Details
              </span>
              <span className="text-white tracking-wider mt-3 flex justify-between w-full text-sm">
                Fullname
                <span>{applicant.full_name}</span>
              </span>

              <span className="text-white tracking-wider mt-3 flex justify-between w-full text-sm">
                DOB <span>{applicant.date_of_birth}</span>
              </span>
              <span className="text-white tracking-wider mt-3 flex justify-between w-full text-sm">
                Country <span>{applicant.country}</span>
              </span>
              <span className="text-white tracking-wider mt-3 flex justify-between w-full text-sm">
                State <span>{applicant.state}</span>
              </span>
              <span className="text-white tracking-wider mt-3 flex justify-between w-full text-sm">
                Gender <span>{applicant.gender}</span>
              </span>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default You;
