import { Helmet } from "react-helmet";
import ApplicantRow from "../../components/applicants/ApplicantRow";
import useApplicationManagement from "../../../hooks/useApplicationManagement";
import { useContext, useEffect } from "react";
import { ApplicationContext } from "../../../context/ApplicationContext"; 
import { InterviewContext } from "../../../context/InterviewContext";

function Schedule() {
  const applicationUtils = useContext(ApplicationContext);
  const interviewUtils = useContext(InterviewContext);

  useEffect(() => {
    applicationUtils.getApplicantsByEmployee();
    interviewUtils.getAllInterviews(() => {});
  }, []);

  return (
    <>
      <Helmet>
        <title>Company Dashboard | My Schedules </title>
      </Helmet>
      <div className="h-full w-full flex flex-col px-4 md:px-12 py-2 gap-4 md:gap-[15px]">
        <div className="w-full flex flex-col md:flex-row justify-between items-center">
          <h2 className="font-semibold text-sm md:text-md mb-2 md:mb-0">
            Total Interviews: {interviewUtils.interviews.length}
          </h2>
          <div className="flex bg-gray-300 p-1 rounded text-primaryColor">
            <button className="text-xs md:text-sm p-1 bg-gray-300">
              Pipeline View
            </button>
            <button className="text-xs md:text-sm p-1 bg-white rounded">
              Table View
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="border bg-white text-gray-600 font-semibold">
              <tr className="text-xs md:text-sm divide-gray-200">
                <th className="px-2 md:px-4 py-1 text-center">Full Name</th>
                <th className="px-2 md:px-4 py-1 text-center">Email</th>
                <th className="px-2 md:px-4 py-1 text-center">Status</th>
                <th className="px-2 md:px-4 py-1 text-center">Applied Date</th>
                <th className="px-2 md:px-4 py-1 text-center">Job Role</th>
                <th className="px-2 md:px-4 py-1 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {/* {applicationUtils?.applicants &&
                applicationUtils?.applicants?.map((current) => (
                  <ApplicantRow key={current.id} data={current} />
                ))} */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Schedule;
