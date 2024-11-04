import { useNavigate } from "react-router-dom";

function DataItem({ data}) {
  const navigate = useNavigate();

  const navigateJobTypeDetails = () =>
    navigate(`/company/job-listing/type/${data.id}`, { state: { data:data, applicants: applicants } });

  return (
    <tr
      onClick={navigateJobTypeDetails}
      className="border-b cursor-pointer   hover:bg-primaryColor hover:text-white  text-little"
    >
      <td className="text-center py-[5px]">
        <div className="flex justify-center items-center gap-[5px]">
          <span>{data?.first_name}</span>
        </div>
      </td>

      <td>
        <div className="flex w-full justify-center py-[10px] items-center">
          <span className="py-[2px] px-[5px]  text-little  text-center font-semibold">
             {data?.subcategory}
          </span>
        </div>
      </td>

      <td>
        <div className="flex w-full justify-center py-[10px] items-center">
          <span className="text-little font-semibold">
            {data?.age}
          </span>
        </div>
      </td>

      <td>
        <div className="flex w-full justify-center py-[10px] items-center">
          <span className="text-little font-semibold">
            {data.location}
          </span>
        </div>
      </td>

    
    </tr>
  );
}

export default DataItem;
