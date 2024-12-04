

function TableRow({ data }) {

  return (
    <tr
      className={`"border-b  odd:bg-gray-100 odd:text-black   hover:bg-green-200 duration-100 text-little`}
    >
      <td className="text-center py-[5px]">
        <div className="capitalize flex justify-center items-center gap-[5px]">
          <span>Example</span>
        </div>
      </td>
      <td className="hidden md:block py-[10px]">
        <div className="w-full flex h-full  justify-center items-center gap-[5px]">
          <span>Example</span>
        </div>
      </td>

      <td>
        <div className="flex items-center justify-center">
          <button
            className={`py-[2px] px-[5px] text-[10px] min-w-[80%] tracking-wider capitalize rounded-[30px] text-center font-semibold`}
          >
            Example
          </button>
        </div>
      </td>

      <td className="hidden md:block">
        <p className=" py-[5px] text-center font-semibold">
          Example
        </p>
      </td>

      <td>
        <p className=" py-[5px] text-center text-clip">Example</p>
      </td>

      <td>
        <div className="items-center flex justify-center py-[15px]">
          <button
            // onClick={navigateToApplicantDetails}
            className="  hover:text-primaryColor hover:underline  text-gray-800"
          >
            view
          </button>
        </div>
      </td>
    </tr>
  );
}

export default TableRow;
