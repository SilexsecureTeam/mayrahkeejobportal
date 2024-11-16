function CompanyView({ interview }) {
  return (
    <div className="flex w-full justify-between md:p-2 h-max flex-col md:flex-row">
      <div className="w-full flex flex-col min-h-full p-2 rounded-md bg-gray-950">
        <div className="flex flex-wrap gap-2 items-center justify-around h-max">
          <span className="text-white tracking-wider font-semibold items-center flex flex-col min-w-[20%] text-sm">
            Interviewer Name
            <span className="text-sm text-gray-500 font-medium">{interview.interviewer_name}</span>
          </span>

          <span className="text-white tracking-wider font-semibold items-center flex flex-col min-w-[20%] text-sm">
            Date
            <span className="text-little text-gray-400 font-medium">{new Date(interview.interview_date).toLocaleDateString()}</span>
          </span>

          <span className="text-white tracking-wider font-semibold items-center flex flex-col min-w-[20%] text-sm">
            Time
            <span className="text-little text-gray-400 font-medium">{interview.interview_time}</span>
          </span>

          <span className="text-white tracking-wider font-semibold items-center flex flex-col min-w-[20%] text-sm">
            Meeting Id
            <span className="text-little text-gray-400 font-medium">{interview.meeting_id}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
export default CompanyView;