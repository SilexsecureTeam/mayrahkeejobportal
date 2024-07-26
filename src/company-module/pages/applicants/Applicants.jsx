import { Helmet } from "react-helmet";
import ApplicantRow from "../../components/applicants/ApplicantRow";

function Applicants() {
  return (
    <>
      <Helmet>
        <title>Company Dashboard | All Applicants </title>
      </Helmet>
      <div className="h-full w-full flex flex-col p-2 gap-[15px]">
        <div className="w-full flex justify-between ">
            <h2 className="font-semibold text-md">Total Applicants: 19</h2>
            <div className="flex bg-gray-300 p-1 text-primaryColor">
               <button className="text-little p-1  bg-gray-300">Pipeline View</button>
               <button className="text-little p-1 bg-white ">Table View</button>
            </div>
        </div>

        <table className="min-w-full bg-white border border-gray-200">
        <thead className="border bg-white  text-gray-600 font-semibold ">
          <tr className=" text-little  divide-gray-200">
            <th className="px-4 py-1 text-center">
              Full Name
            </th>
            <th className="px-4 py-1 text-center">
              Score
            </th>
            <th className="px-4 py-1 text-center">
              Hiring Stage
            </th>
            <th className="px-4 py-1 text-center">
              Applied Date
            </th>
            <th className="px-4 py-1 text-center">
              Job Role
            </th>
            <th className="px-4 py-1 text-center">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          <ApplicantRow/>
          <ApplicantRow/>
          <ApplicantRow/>
          <ApplicantRow/>
          <ApplicantRow/>
          <ApplicantRow/>
          <ApplicantRow/>
          <ApplicantRow/>
          <ApplicantRow/>
          <ApplicantRow/>
          <ApplicantRow/>
          <ApplicantRow/>
          <ApplicantRow/>
          <ApplicantRow/>
          </tbody>
      </table>
      </div>
    </>
  );
}

export default Applicants;
