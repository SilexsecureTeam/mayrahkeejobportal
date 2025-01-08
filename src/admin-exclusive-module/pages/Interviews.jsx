import React, { useState, useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa';
import useInterviewManagement from '../../hooks/useInterviewManagement';
import {resourceUrl } from "../../services/axios-client";

const Interviews = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [details, setDetails] = useState({});
  const [countdownTrigger, setCountdownTrigger] = useState(0);

  const { getAllExclusiveInterviews, getEmployerById, getCandidateById } = useInterviewManagement();

  const fetchInterviews = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllExclusiveInterviews();
      setData(response);
    } catch (err) {
      setError('Failed to load interviews');
    } finally {
      setLoading(false);
    }
  };

  const fetchDetails = async () => {
    try {
      const uniqueIds = new Set();
  
      // Collect all candidate and employer IDs
      data.forEach((row) => {
        if (!details[`candidate-${row.candidate_id}`]) uniqueIds.add(`candidate-${row.candidate_id}`);
        if (!details[`employer-${row.employer_id}`]) uniqueIds.add(`employer-${row.employer_id}`);
      });
  
      // Fetch details for missing IDs
      const promises = Array.from(uniqueIds).map((id) => {
        const stringId = String(id); // Ensure id is a string
  
        if (stringId.startsWith('candidate')) {
          return getCandidateById(stringId.split("-")[1]);  // Log candidate details
        } else if (stringId.startsWith('employer')) {
          return getEmployerById(stringId.split("-")[1]);  // Log employer details
        }
        return null;
      }).filter((promise) => promise !== null); // Remove any null promises
  
      const results = await Promise.all(promises);
  
      // Log results to see the fetched data
      console.log('Fetched details:', results);
  
      // Map results back to details
      const newDetails = results.reduce((acc, result, index) => {
        const id = Array.from(uniqueIds)[index];
        acc[id] = result;
        return acc;
      }, {});
  
      setDetails((prevDetails) => ({ ...prevDetails, ...newDetails }));
    } catch (err) {
      console.error('Failed to fetch details:', err);
    }
  };
  
  useEffect(() => {
    fetchInterviews();
  }, []);

  useEffect(() => {
    if (data.length > 0) fetchDetails();
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdownTrigger((prev) => prev + 1); // Trigger re-render for countdown updates
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatDateTime = (date, time) => {
    const combinedDateTime = new Date(`${date.split(' ')[0]}T${time}`);
    const now = new Date();

    const isLive =
      now >= combinedDateTime &&
      now <= new Date(combinedDateTime.getTime() + 60 * 60 * 1000);

    let countdown = null;
    if (!isLive && now < combinedDateTime) {
      const diff = combinedDateTime - now;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    const formattedDate = combinedDateTime.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const formattedTime = combinedDateTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

    return {
      isLive,
      formattedDate,
      formattedTime,
      countdown,
    };
  };

  return (
    <div className="p-8 min-h-max bg-gray-200 flex flex-col gap-y-2">
      <p className="sticky top-18 bg-transparent ml-auto my-2 flex items-center gap-2 font-medium">
        View Interviews
      </p>

      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <FaSpinner className="animate-spin text-2xl" />
        </div>
      ) : error ? (
        <div className="text-xl font-semibold text-red-500">{error}</div>
      ) : data?.length === 0 ? (
        <div className="text-xl font-semibold">No Interviews</div>
      ) : (
        <div className="w-full grid grid-cols-responsive gap-4 pt-5 gap-y-6 px-3 sm:px-8 justify-center">
          {data?.map((row) => {
            const { isLive, formattedDate, formattedTime, countdown } = formatDateTime(
              row?.interview_date,
              row?.interview_time
            );

            return (
              <div
                key={row?.id}
                className="min-h-[300px] cursor-pointer bg-white shadow-lg rounded-lg p-6 flex flex-col items-center"
              >
              <img className="w-full h-40" src={details[`employer-${row.employer_id}`]?.logo_image ? `${resourceUrl}${details[`employer-${row.employer_id}`]?.logo_image}` : "https://via.placeholder.com/800x400"} />
                <h3 className="text-lg text-center font-bold mt-auto text-green-800">
                  {row?.interviewer_name}
                </h3>
                {/* <p className="text-sm text-gray-600 my-[2px]">{row.interview}</p> */}
                <p className="text-sm text-gray-600 my-[2px]">
                  {formattedDate} at {formattedTime}
                </p>
                {isLive ? (
                  <p className="mt-1 text-green-500 font-semibold">Status: Live</p>
                ) : (
                  <p className="mt-1 text-red-700 font-semibold animate-pulse">
                    Starts In: {countdown}
                  </p>
                )}
                <div className="mt-4 text-sm">
                  <p><strong>Candidate:</strong> {details[`candidate-${row.candidate_id}`]?.full_name || '...'}</p>
                  <p><strong>Company:</strong> {details[`employer-${row.employer_id}`]?.company_name || '...'}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Interviews;
