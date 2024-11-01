import { useState } from "react";
import ApplicantsList from "./ApplicantsList";
import ApplicantsGrid from "./ApplicantsGrid";

function Applicants({ applicants }) {
  const [view, setView] = useState("grid");

  return (
    <div className="py-2 flex flex-col w-full gap-2">
      <div className="w-full flex flex-wrap justify-between items-center gap-2">
        <span className="text-center w-full sm:w-auto">Total Applicants: {applicants.length || 0}</span>

        <div className="flex flex-wrap justify-center items-center gap-2 w-full sm:w-auto">
          <input
            className="py-2 px-2 border text-sm"
            placeholder="Search Applicant"
          />

          <div className="p-1 bg-primaryColor flex justify-between gap-2">
            <button
              onClick={() => setView("grid")}
              className={`h-full p-2 text-little ${
                view === "grid"
                 ? "bg-primaryColor text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              Pipeview
            </button>
            <button
              onClick={() => setView("table")}
              className={`h-full p-2 text-little ${
                view === "table"
                  ? "bg-primaryColor text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              Tableview
            </button>
          </div>
        </div>
      </div>

      {view === "table" ? (
        <ApplicantsList applicants={applicants} />
      ) : (
        <ApplicantsGrid applicants={applicants} />
      )}
    </div>
  );
}

export default Applicants;
