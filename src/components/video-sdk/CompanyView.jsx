function CompanyView() {
  return (
    <div className="flex w-[30%] flex-col justify-between p-2  ">
      <div className="w-[90%] flex flex-col h-[45%] p-2 rounded-md bg-black">
        <span className="text-white font-semibold">Interview Info</span>
        <span className="text-white tracking-wider mt-3 flex justify-between w-full text-little">
          Interviewer Name
          <span>Mary Magdalene</span>
        </span>
        <span className="text-white tracking-wider mt-3 flex justify-between w-full text-little">
          Time:
          <span>10:30pm</span>
        </span>
      </div>
      <div className="w-[90%] flex flex-col h-[45%] p-2 rounded-md bg-lightorange">
        <span className="text-white font-semibold">Comapany Info</span>
        <span className="text-white tracking-wider mt-3 flex justify-between w-full text-little">
          Company Name
          <span>Tech Hub</span>
        </span>
        <span className="text-white tracking-wider mt-3 flex justify-between w-full text-little">
          Role:
          <span>Software Developer</span>
        </span>
      </div>
    </div>
  );
}

export default CompanyView;
