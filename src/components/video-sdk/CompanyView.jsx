function CompanyView({ interview }) {
  return (
    <div className="flex w-full justify-between p-2  h-[15%] ">
      <div className="w-full flex flex-col h-full p-2 rounded-md bg-gray-950">
        {/* <span className="text-white font-semibold">Interview Info</span> */}

        <div className="flex items-center justify-center h-full">
          <span className="text-white tracking-wider justify-between font-semibold items-center flex flex-col h-[80%] w-[20%] text-sm">
            Interviewer Name
            <span className="text-sm text-gray-500 font-meduim">{interview.interviewer_name}</span>
          </span>

          <span className="text-white h-[80%] tracking-wider font-semibold items-center  flex flex-col justify-between w-[20%] text-sm">
            Date
            <span className="text-little text-gray-400 font-meduim">{new Date(interview.interview_date).toLocaleDateString()}</span>
          </span>

          <span className="text-white h-[80%] tracking-wider font-semibold items-center  flex flex-col justify-between w-[20%] text-sm">
            Time
            <span className="text-little text-gray-400 font-meduim">{interview.interview_time}</span>
          </span>

          <span className="text-white h-[80%] tracking-wider font-semibold items-center  flex flex-col justify-between w-[20%] text-sm">
            Meeting Id
            <span className="text-little text-gray-400 font-meduim">{interview.meeting_id}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default CompanyView;
