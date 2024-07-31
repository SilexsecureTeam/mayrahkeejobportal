function ApplicantCard() {
  return (
    <div className="w-full h-[120px] border p-2 flex flex-col justify-between items-center">
      <div className="flex w-[80%] gap-[15px] items-center">
        <div className="h-[50px] w-[50px] bg-gray-400 rounded-full" />
        <div className="flex flex-col ">
          <h3 className="text-sm font-semibold">Jerome Bell</h3>
          <span className="text-little  text-primaryColor">View Profile</span>
        </div>
      </div>

      <div className="flex justify-between w-[80%] gap-[20px] items-center">
        <span className="flex flex-col items-center text-gray-400  text-little ">
          Applied on
          <span className="text-gray-700">13, July 2021</span>
        </span>

        <span className="flex flex-col items-center text-gray-400  text-little ">
          Score
          <span className="text-gray-700">4.0</span>
        </span>
      </div>
    </div>
  );
}

export default ApplicantCard;
