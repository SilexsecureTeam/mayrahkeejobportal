import { useLocation } from "react-router-dom";
function TableHead({ children, isMarket = false }) {
  const location = useLocation();
  const info = location?.state?.data;
  return (
    <div className="rounded-md bg-white border-gray-200 shadow-sm border overflow-x-auto">
      <table className="w-full min-w-[800px] text-sm md:text-base">
        <thead className="bg-white border-b  text-gray-600 font-semibold">
          <tr className="text-xs md:text-little divide-gray-200">
            <th className="px-2 md:px-4 py-5 text-start">Name</th>
            <th className="px-2 md:px-4 py-1 text-start">Specialization</th>
            <th className="px-2 md:px-4 py-1 text-start">Email</th>
            {info?.type !== "artisan" && (
              <th className="px-2 md:px-4 py-1 text-start">Employment Type</th>
            )}
            {info?.type !== "artisan" && (
              <th className="px-2 md:px-4 py-1 text-start">Salary</th>
            )}
            {!isMarket && info?.type !== "artisan" && (
              <th className="px-2 md:px-4 py-1 text-start">Start Date</th>
            )}
            {!isMarket && info?.type !== "artisan" && (
              <th className="text-left py-3 px-2">Contract Status</th>
            )}

            <th className="px-2 md:px-4 py-1">Action</th>
          </tr>
        </thead>

        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export default TableHead;
