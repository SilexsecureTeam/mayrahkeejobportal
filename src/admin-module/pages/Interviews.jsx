import React,{useState} from 'react'
import {interviewData} from './interviewData';

const Interviews = () => {
    const [loading, setLoading]=useState(false);
  return (
    <div className="p-8 min-h-max bg-gray-200 flex flex-col gap-y-2">
      <p className="sticky top-18 bg-transparent ml-auto my-2 flex items-center gap-2 font-medium">
        View Intervies
      </p>

      {loading ? (
        <p className="w-full h-full flex items-center justify-center"><Spinner /></p>
      ) : interviewData.length === 0 ? (
        <div className="text-xl font-semibold">No Submitted Assignments</div>
      ) : (
        <div className="w-full grid grid-cols-responsive gap-4 pt-5 gap-y-6 px-3 sm:px-0">
          {interviewData.map((row) => {
        
            return (
              <div
                key={row.id}
                onClick={() => {
                  navigate('/grade-assignment', { state: { assignment: row } });
                  scrollTo(0, 0);
                }}
                className="min-h-[300px] break-all cursor-pointer bg-white shadow-lg rounded-lg p-6 flex flex-col items-center"
              >
              {/* <img
                  src={`${IMAGE_URL}profile/${user.image}` || 'https://via.placeholder.com/100'}
                  alt={row?.user_id}
                  className="w-28 h-28 rounded-full mb-4"
                /> */}
                
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
            );
          })}
        </div>
      )}
    </div>
  )
}

export default Interviews