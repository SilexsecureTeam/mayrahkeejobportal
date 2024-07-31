import ApplicantRow from "./ApplicantRow";
import ListingRow from "./ListingRow";

function ApplicantsList() {
    return ( 
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
            <ApplicantRow />
        
          </tbody>
        </table> );
}

export default ApplicantsList;