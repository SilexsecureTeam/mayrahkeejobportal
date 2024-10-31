function TableHead({children}) {
  return (
    <div className="rounded-md bg-white border-gray-200 shadow-sm border overflow-hidden">
    <table className="min-w-full">
      <thead className="bg-white border-b  text-gray-600 font-semibold">
        <tr className="text-xs md:text-little divide-gray-200">
          <th className="px-2 md:px-4 py-5 text-start">Name</th>
          <th className="px-2 md:px-4 py-1 text-start">Position</th>
          <th className="px-2 md:px-4 py-1 text-start">Age</th>
          <th className="px-2 md:px-4 py-1 text-start">Experience</th>
          <th className="px-2 md:px-4 py-1 text-start">Salary</th>
          <th className="px-2 md:px-4 py-1 text-start">Start Date</th>
        </tr>
      </thead>

      <tbody>
        {children}
      </tbody>
    </table>
    </div>
  );
}

export default TableHead;
