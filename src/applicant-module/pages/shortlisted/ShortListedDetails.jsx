import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../utils/base";
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
        setState(response.data.interview);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOnClick = () => {
    navigate("/interview-room", { state: { interview: newInterview } });
  };

  useEffect(() => {
    getInterviews(state.app?.interview_id, setNewInterview);
  }, []);

  const date = new Date(newInterview?.interview_date);

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="h-full w-full text-s text-primary">
        <h4 className="font-semibold text-lg sm:text-xl md:text-2xl mb-5">
          Your Interview Information
        </h4>

        <div className="rounded w-full sm:w-[90%] md:w-[80%] border">
          {[
            { label: "Interview Name:", value: newInterview?.interviewer_name },
            { label: "Interview Date:", value: date.toLocaleDateString() },
            {
              label: "Interview Time:",
              value: newInterview?.interview_time || "not available",
            },
            { label: "Location:", value: newInterview?.location },
            { label: "Note:", value: newInterview?.notes },
            { label: "Meeting Id:", value: newInterview?.meeting_id },
          ].map((item, index) => (
            <div className="flex flex-col sm:flex-row" key={index}>
              <div className="w-full sm:w-1/3 bg-lightorange p-4">
                <p className="font-bold">{item.label}</p>
              </div>
              <div className="w-full sm:w-2/3 p-4">
                <p>{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {state.interviewFinshed ? (
        <span className="text-sm font-semibold">Awaiting Candidate Response</span>
      ) : (
        <button
          onClick={handleOnClick}
          className="flex w-full sm:w-auto border mt-5 hover:bg-primaryColor hover:text-white border-primaryColor p-2 text-sm sm:text-little text-primaryColor"
        >
          Proceed to Interview
        </button>
      )}
    </div>
  );
};

export default ShortListedDetails;
