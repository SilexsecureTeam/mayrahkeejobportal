import ApplicantRow from "./ApplicantRow";
import ListingRow from "./ListingRow";

function ApplicantsList({applicants}) {
    return ( 
        <table className="min-w-full overflow-x-auto bg-white border border-gray-200">
         <thead className="border bg-white  text-gray-600 font-semibold ">
          <tr className=" text-little  divide-gray-200">
            <th className="px-4 py-1 text-center">
              Full Name
            </th>
            <th className="px-4 py-1 text-center">
              Email
            </th>
            <th className="px-4 py-1 text-center">
              Status
            </th>
            <th className="px-4 py-1 text-center">
              Applied Date
            </th>
            <th className="px-4 py-1 text-center">
              Job Title
            </th>
            <th className="px-4 py-1 text-center">
              Action
            </th>
          </tr>
        </thead>

          <tbody>

            { applicants?.length > 0 ? applicants?.map(current => <ApplicantRow data={current} /> ) : <span>No applicants</span>}
          </tbody>
        </table> );
}

export default ApplicantsList;