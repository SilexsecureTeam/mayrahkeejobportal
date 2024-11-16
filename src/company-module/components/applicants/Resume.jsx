import { useContext, useEffect, useState } from "react";
import { resourceUrl } from "../../../services/axios-client";
import { ApplicationContext } from "../../../context/ApplicationContext";

const stages = [
  {
    name: "In-Review",
    stage: "passed",
  },
  {
    name: "Shortlist",
    stage: "passed",
  },
  {
    name: "Interview",
    stage: "current",
  },
  {
    name: "Hired/Declined",
    stage: null,
  },
];

function Resume({ data, applicant }) {
  const [resume, setResume] = useState();
  const { getResume } = useContext(ApplicationContext);

  const bgColor = (current) => {
    if (current.stage === "passed") {
      return "bg-primaryColor/80";
    } else if (current.stage === "current") {
      return "bg-primaryColor";
    } else {
      return "bg-gray-300";
    }
  };

  useEffect(() => {
    getResume(applicant?.candidate_id, setResume);
  }, []);
console.log(resume)
  return (
    resume && (
      <>
        <div className="flex w-full px-10 mt-[5px]">
          <div className="flex flex-col w-full items-center">
            <h3 className="mb-[10px] tracking-wide flex flex-col items-center text-smd font-semibold">
              {resume.title}
              {resume.resume_path ? <a href={`${resourceUrl}${resume.resume_path}`} className="text-little font-normal hover:underline text-primaryColor">link to file</a> : <p>No file Uploaded</p>}
            </h3>

            <ul className="flex flex-col text-black gap-[10px] text-sm w-full">
            
              <li className="flex flex-col gap-[5px] items-center bg-secondaryColor p-2 border-b">
                <span className="font-semibold text-black text-[15px]">
                  Education
                </span>
                <span className="text-black font-semibold flex w-full justify-between">
                Intitution
                  <span className="font-normal">{resume.educational_institution}</span>
                </span>
                <span className="text-black font-semibold flex w-full justify-between">
                  Academy Name
                  <span className="font-normal">{resume?.academy_name}</span>
                </span>
                <span className="text-black font-semibold flex w-full justify-between">
                  Year of Entry{" "}
                  <span className="font-normal">{resume.year_of_entry}</span>
                </span>
                <span className="text-black font-semibold flex w-full justify-between">
                  Year of Graduation{" "}
                  <span className="font-normal">
                    {resume.year_of_graduation}
                  </span>
                </span>
              </li>
              <li className=" flex flex-col gap-[5px] items-center border-b bg-secondaryColor p-2">
                <span className="font-semibold text-black text-[15px]">
                  Current Work Experience
                </span>
                <span className="text-black font-semibold flex w-full justify-between">
                  Company:{" "}
                  <span className="font-normal">{resume.company_name}</span>
                </span>
                <span className="text-black font-semibold flex w-full justify-between">
                  Position Held{" "}
                  <span className="font-normal">{resume.position_held}</span>
                </span>
                <span className="text-black font-semibold flex w-full justify-between">
                  Date Started{" "}
                  <span className="font-normal">
                    {" "}
                    {new Date(resume.start_date).toLocaleDateString()}
                  </span>
                </span>
                <span className="text-black font-semibold flex w-full justify-between">
                  Date Ended{" "}
                  <span className="font-normal">
                    {" "}
                    {new Date(resume.end_date).toLocaleDateString()}
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col justify-between px-10">
          {/* <div className="flex flex-col text-little justify-center items-start gap-[2px]">
          <span className="font-semibold ">Portfolio Url</span>
          <a href={data?.portfolio_url} className="font-semibold ">{data?.portfolio_url}</a>
        </div> */}

          <div className="flex flex-col text-little justify-center items-start gap-[2px]">
            <span className="font-semibold ">NIN</span>
            <img
              src={`${resourceUrl}/${applicant?.nin_slip}`}
              className="h-[100px] w-[100px] border border-dotted p-1 "
            />
          </div>
        </div>
      </>
    )
  );
}

export default Resume;
