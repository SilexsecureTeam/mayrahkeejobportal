function TableHead({ children, isMarket = false }) {
  return (
    <div className="rounded-md bg-white border-gray-200 shadow-sm border overflow-x-auto">
      <table className="w-full">
        <thead className="bg-white border-b  text-gray-600 font-semibold">
          <tr className="text-xs md:text-little divide-gray-200">
            <th className="px-2 md:px-4 py-5 text-start">Name</th>
            <th className="px-2 md:px-4 py-1 text-start">Specialization</th>
            <th className="px-2 md:px-4 py-1 text-start">Email</th>
            <th className="px-2 md:px-4 py-1 text-start">Employment Type</th>
            <th className="px-2 md:px-4 py-1 text-start">Salary</th>
            {!isMarket && (
              <th className="px-2 md:px-4 py-1 text-start">Start Date</th>
            )}
            <th className="px-2 md:px-4 py-1 text-start">Action</th>
          </tr>
        </thead>

        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export default TableHead;
