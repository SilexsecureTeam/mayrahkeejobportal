function TableWrap({ children, rows }) {
  return (
    <table className="min-w-full bg-white border border-gray-200">
      <thead className="border bg-white  text-gray-800 font-semibold  ">
        <tr className=" text-little  divide-gray-200 ">
          {rows.map((current) => (
            <th className="px-4 py-3 text-center">{current}</th>
          ))}
        </tr>
      </thead>

      <tbody>{children}</tbody>
    </table>
  );
}

export default TableWrap;
