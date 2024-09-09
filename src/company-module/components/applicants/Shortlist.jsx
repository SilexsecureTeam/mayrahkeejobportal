import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { axiosClient } from "../../../services/axios-client";
import { AuthContext } from "../../../context/AuthContex";
import { FormatError } from "../../../utils/formmaters";
import { onFailure } from "../../../utils/notifications/OnFailure";
import { useNavigate } from "react-router-dom";

function Shortlist({ data }) {
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails.token);
  const [interview, setInterview] = useState();
  const [error, setError] = useState({
    message: "",
    error: "",
  });

  const navigate = useNavigate()

  const handleOnClick = () => {
    const interviewDate = new Date(interview.interview_date);
    const currentDate = new Date();
    // if (interviewDate === currentDate) {
    // } else {
    //   onFailure({
    //     message: "Interview Error",
    //     error: "This interview is not scheduled for this time",
    //   });
    // }
    
    navigate('/interview-room', {state: {meetingId: interview.meeting_id}})

  };

  useEffect(() => {
    const initInteview = async () => {
      try {
        const response = await client.get(`/interviews/${data.interview_id}`);
        setInterview(response.data.interview);
      } catch (error) {
        FormatError(error, setError, "Intervew Error");
      }
    };

    initInteview();
  }, []);

  useEffect(() => {
    if (error.message && error.error) {
      onFailure(error)
    }
  }, [error.message, error.error]);

  return (
    interview && (
      <>
        <h3 className="px-2 text-little">An Interview has been Schedule</h3>
        <div className="grid grid-cols-2 w-full gap-y-2 justify-between items-center px-2">
          <div className="flex flex-col">
            <span className="text-gray-400 text-sm">Interview Date</span>
            <span className="text-gray-700 font-semibold text-little">
              {new Date(interview.created_at).toLocaleDateString()}
            </span>
          </div>
          <div className="flex flex-col w-[40%]">
            <span className="text-gray-400 text-sm">Interviewer</span>
            <span className="text-gray-700 font-semibold text-little">
              {interview.interviewer_name}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-gray-400 text-sm">Interview Location</span>
            <span className="text-gray-700 font-semibold text-little">
              {interview.location}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-gray-400 text-sm">Interview Time</span>
            <span className="text-gray-700 font-semibold text-little">
              {new Date(interview.interview_date).toLocaleDateString()}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-400 text-sm">Meeting Id</span>
            <span className="text-gray-700 font-semibold text-little">
              {interview.meeting_id}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-400 text-sm">Add Ons</span>
            <span className="text-gray-700 font-semibold text-little">
              {interview.notes}
            </span>
          </div>
      
        </div>

        <button
          onClick={handleOnClick}
          className="ml-2 border w-fit hover:bg-primaryColor hover:text-white py-1 text-little px-2  border-primaryColor"
        >
          Proceed to Interview
        </button>
        {/* 
      <div className="w-full flex justify-between px-2">
        <h3 className="font-semibold text-sm px-2">Current S</h3>
        <button className="text-primaryColor font-semibold text-little">
          Add notes
        </button>
      </div>

      <ul className="flex flex-col gap-[10px] w-full px-2">
        <li className="w-full flex flex-col p-2 items-start justify-end border">
          <div className="flex justify-center items-center gap-[5px]">
            <div className="h-[30px] w-[30px] rounded-full bg-gray-400" />
            <span className="font-semibold text-sm">Maria Kelly</span>
          </div>

          <p className="text-little pl-8 text-gray-400">
            Please, do an interview stage immediately. The design division needs
            more new employee now
          </p>
        </li>
        <li className="w-full flex flex-col p-2 items-start justify-end border">
          <div className="flex justify-center items-center gap-[5px]">
            <div className="h-[30px] w-[30px] rounded-full bg-gray-400" />
            <span className="font-semibold text-sm">Maria Kelly</span>
          </div>

          <p className="text-little pl-8 text-gray-400">
            Please, do an interview stage immediately. The design division needs
            more new employee now
          </p>
        </li>
      </ul> */}
      </>
    )
  );
}

export default Shortlist;
