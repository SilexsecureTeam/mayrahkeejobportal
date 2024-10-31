import { useNavigate } from "react-router-dom";

function TableRow({ data, applicants }) {
  return (
    <tr className="border-b cursor-pointer py-5 text-gray-700  text-little">
      <td className="text-center">
        <div className="flex justify-start  pl-5 py-3 font-semibold items-center gap-3">
          <img className="h-[50px] w-[50px] rounded-full" src="https://images.pexels.com/photos/935985/pexels-photo-935985.jpeg?auto=compress&cs=tinysrgb&w=600"/>
          <span>Example Acc</span>
        </div>
      </td>

      <td>
        <div className="flex w-full py-[10px] justify-start items-center">
          <button className="py-[2px] px-4 text-little text-center font-semibold">
            One
          </button>
        </div>
      </td>

      <td>
        <div className="flex w-full justify-start px-4 py-[10px] items-center">
          <span className="text-little font-semibold">dj</span>
        </div>
      </td>

      <td>
        <div className="flex w-full justify-start px-4 py-[10px] items-center">
          <span className="text-little font-semibold">jjd</span>
        </div>
      </td>

      <td>
        <div className="flex w-full justify-start px-4 py-[10px] items-center">
          <button className="py-[2px] px-[5px] text-little  text-center font-semibold">
            kds
          </button>
        </div>
      </td>

      <td>
        <div className="flex w-full justify-start px-4 py-[10px] items-center">
          <span className="text-little font-semibold">jsj</span>
        </div>
      </td>
    </tr>
  );
}

export default TableRow;
