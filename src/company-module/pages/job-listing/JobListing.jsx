import { Helmet } from "react-helmet";
import Header from "../../components/job-listing/Header";
import ListingRow from "../../components/job-listing/ListingRow";
import useJobManagement from "../../../hooks/useJobManagement";

function JobListing() {
  const jobUtils = useJobManagement();
  return (
    <>
      <Helmet>
        <title>Company Dashboard | Job Listing </title>
      </Helmet>
      <div className="h-full w-full flex flex-col p-5 gap-[15px]">
        <div className="w-full flex justify-between ">
          <div className="flex flex-col">
            <h2 className="font-semibold text-md">Job Listing</h2>
            <span className="text-little text-gray-400">
              Here is your jobs listing status from July 19 - July 25.
            </span>
          </div>
          {/* <div className="flex bg-gray-300 p-1 text-primaryColor">
               <button className="text-little p-1  bg-gray-300">Pipeline View</button>
               <button className="text-little p-1 bg-white ">Table View</button>
            </div> */}
        </div>

        <table className="min-w-full bg-white border border-gray-200">
          <thead className="border bg-white  text-gray-600 font-semibold ">
            <tr className=" text-little  divide-gray-200">
              <th className="px-4 py-1 text-center">Roles</th>
              <th className="px-4 py-1 text-center">Status</th>
              <th className="px-4 py-1 text-center">Date Posted</th>
              <th className="px-4 py-1 text-center">Due Date</th>
              <th className="px-4 py-1 text-center">Job Type</th>
              <th className="px-4 py-1 text-center">Applicants</th>
              <th className="px-4 py-1 text-center">Gender</th>
            </tr>
          </thead>

          <tbody>
            {
              jobUtils?.jobList.map( current => <ListingRow data={current} key={current.id}/>).reverse()
            }
          </tbody>
        </table>
      </div>
    </>
  );
}

export default JobListing;
