import { useEffect } from "react";
import ApplicantCard from "./ApplicantCard";

function GridRow({ data, applicants }) {
  const currentApplicants = applicants?.filter(
    (current) => current.status === data.name
  );

  return (
    <div className="flex min-h-32 flex-col border px-2 py-1 gap-[20px] h-fit">
      <div
        className={`"w-full items-center border border-t-[2px] ${data.border_color}  justify-between text-little flex p-1`}
      >
        <div className="h-[8px] bg-gray-400  w-[8px] rounded-full" />
        <span className="uppercase">{data.name}</span>
        <span className="h-[20px] w-[20px] items-center justify-center flex bg-gray-300">
          {currentApplicants?.length}
        </span>
        <span>...</span>
      </div>

      <ul className="flex flex-col w-full gap-[10px] items-center justify-between">
        {currentApplicants.length > 0 ? currentApplicants?.map((current) => (
          <ApplicantCard data={current} />
        )) : <span className="text-little"> No Applicants</span>}
      </ul>
    </div>
  );
}

export default GridRow;
