import MultipleProgressBar from "./MultipleProgressBar";

function ApplicantSummary({ applicants }) {
  const totalApplicants = () => {
    let total = 0;

    applicants.map((current) => (total = total + current.applicants));

    return total;
  };

  return (
    <div className="h-[65%] w-full border p-3 justify-between flex flex-col">
      <h2 className="text-sm font-semibold">Applicants Summary</h2>

      <div className="flex gap-[5px] items-end">
        <span className="font-semibold text-2xl">{totalApplicants()}</span>
        <span className="text-little">Applicants</span>
      </div>

      <div className="w-full flex flex-col gap-[10px]">
        <MultipleProgressBar
          applicants={applicants}
          totalApplicants={totalApplicants}
        />
        <ul className="grid grid-cols-2">
          {applicants.map((current) => {
           
            return (
              <div
                className={`flex  h-full text-[11px] items-center gap-[5px]`}
              >
                  <div className={`h-[10px] w-[10px] rounded-[3px] ${current.bg_color}`}/>
                  <span className=" font-semibold">{current.category} :</span>
                  <span className="text-gray-400">{current.applicants}</span>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ApplicantSummary;
