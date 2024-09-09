import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../utils/base";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContex";

const ShortListedDetails = () => {
  const { state } = useLocation();
  const { authDetails } = useContext(AuthContext);
  const [newInterview, setNewInterview] = useState();
  const navigate = useNavigate();

  const getInterviews = (id, setState) => {
    axios
      .get(`${BASE_URL}/interviews/${id}`, {
        headers: {
          Authorization: `Bearer ${authDetails.token}`,
        },
      })
      .then((response) => {
        // console.log(response)
        setState(response.data.interview);
        // onSuccess({
        //     message: 'New Application',
        //     success: response.data.message
        // })
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          setErrorMsg(error.response.data.message);
        } else {
          console.log(error);
          setErrorMsg(error.message);
        }
      });
  };

  const handleOnClick = () => {
    // const interviewDate = new Date(interview.interview_date);
    // const currentDate = new Date();
    // if (interviewDate === currentDate) {
    // } else {
    //   onFailure({
    //     message: "Interview Error",
    //     error: "This interview is not scheduled for this time",
    //   });
    // }

    navigate("/interview-room", { state: { interview: newInterview } });
  };

  useEffect(() => {
    getInterviews(state.app?.interview_id, setNewInterview);
  }, []);

  console.log("Interview", newInterview);

  const date = new Date(newInterview?.interview_date);
  return (
    <div className="p-8">
      <div className="h-full  w-full text-s text-primary">
        <h4 className=" font-semibold text-2xl mb-5">
          Your Interview Information
        </h4>

        <div className=" rounded w-[80%] border">
          <div className="flex">
            <div className="w-1/3 bg-lightorange p-4">
              <p className="font-bold">Interviewer's Name:</p>
            </div>
            <div className="w-2/3 p-4">
              <p>{newInterview?.interviewer_name}</p>
            </div>
          </div>
          <div className="flex">
            <div className="w-1/3 bg-lightorange p-4">
              <p className="font-bold">Interview Date:</p>
            </div>
            <div className="w-2/3 p-4">
              <p>{date.toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex">
            <div className="w-1/3 bg-lightorange p-4">
              <p className="font-bold">Interview Time:</p>
            </div>
            <div className="w-2/3 p-4">
              <p>
                {newInterview?.interview_time
                  ? newInterview.interview_time
                  : "not available"}
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="w-1/3 bg-lightorange p-4">
              <p className="font-bold">Location:</p>
            </div>
            <div className="w-2/3 p-4">
              <p>{newInterview?.location}</p>
            </div>
          </div>
          <div className="flex">
            <div className="w-1/3 bg-lightorange p-4">
              <p className="font-bold">Note:</p>
            </div>
            <div className="w-2/3 p-4">
              <p>{newInterview?.notes}</p>
            </div>
          </div>
          <div className="flex">
            <div className="w-1/3 bg-lightorange p-4">
              <p className="font-bold">Meeting Id:</p>
            </div>
            <div className="w-2/3 p-4 text-black">
              <p>{newInterview?.meeting_id}</p>
            </div>
          </div>
        </div>
      </div>

      {state.interviewFinshed ? (
        <span className="text-sm font-semibold">Awaiting Candidate Response</span>
      ) : (
        <button
          onClick={handleOnClick}
          className=" flex border mt-5 hover:bg-primaryColor hover:text-white border-primaryColor p-2 text-little text-primaryColor"
        >
          Proceed to Inteview
        </button>
      )}
    </div>
  );
};

export default ShortListedDetails;
