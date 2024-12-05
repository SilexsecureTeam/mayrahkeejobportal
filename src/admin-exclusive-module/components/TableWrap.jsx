
function TableWrap({children}) {
  return (
    <table className="min-w-full bg-white border border-gray-200">
      <thead className="border bg-white  text-gray-800 font-semibold  ">
        <tr className=" text-little  divide-gray-200 ">
          <th className="px-4 py-3 text-center">Full Name</th>
          <th className="px-4 py-3 hidden md:block text-center">Email</th>
          <th className="px-4 py-3 text-center">Status</th>
          <th className="px-4 py-3 hidden md:block text-center">
            Applied Date
          </th>
          <th className="px-4 py-3 text-center">Job Role</th>
          <th className="px-4 py-3 text-center">Action</th>
        </tr>
      </thead>

      <tbody>{children}</tbody>
    </table>
  );
}

export default TableWrap;
