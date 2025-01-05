import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-icons/fa'; // You can use any spinner icon of your choice
// Simulate fetching interview data (Replace with your actual fetch)
import { interviewData } from './interviewData'; 

const Interviews = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  // Simulate API call
  const fetchInterviews = async () => {
    setLoading(true);
    setError(null); // Reset previous errors
    try {
      // Simulate an API call
      const response = await new Promise((resolve) => {
        setTimeout(() => resolve(interviewData), 2000); // Simulating a delay of 2s
      });
      setData(response);
    } catch (err) {
      setError('Failed to load interviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterviews(); // Fetch interviews when the component mounts
  }, []);

  return (
    <div className="p-8 min-h-max bg-gray-200 flex flex-col gap-y-2">
      <p className="sticky top-18 bg-transparent ml-auto my-2 flex items-center gap-2 font-medium">
        View Interviews
      </p>

      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner className="animate-spin text-2xl" />
        </div>
      ) : error ? (
        <div className="text-xl font-semibold text-red-500">{error}</div>
      ) : data.length === 0 ? (
        <div className="text-xl font-semibold">No Interviews</div>
      ) : (
        <div className="w-full grid grid-cols-responsive gap-4 pt-5 gap-y-6 px-3 sm:px-8 justify-center">
          {data.map((row) => (
            <div
              key={row.id}
              // onClick={() => {
              //   // Use navigate to redirect, make sure to implement your navigation logic
              //   navigate('/grade-assignment', { state: { assignment: row } });
              //   scrollTo(0, 0);
              // }}
              className="min-h-[300px] break-all cursor-pointer bg-white shadow-lg rounded-lg p-6 flex flex-col items-center"
            >
              {/* Add image logic if needed */}
              <h3 className="text-lg text-center font-semibold mt-auto">
                {/* {`${user.first_name} ${user.last_name}`} */}
              </h3>
              <p className="text-sm text-gray-600 my-[2px]">{row.title}</p>
              <p className="text-sm text-gray-600 my-[2px] text-center">{row?.interview}</p>

              <div className="flex justify-between items-center text-[10px]">
                <p className={`mt-1 ${row?.grade !== null ? 'text-green-500' : 'text-red-500'} font-semibold`}>
                  Status: {row?.status || 'Not Live'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Interviews;
