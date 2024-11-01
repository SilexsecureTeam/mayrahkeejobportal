import { useNavigate } from "react-router-dom";
import { resourceUrl } from "../../../services/axios-client";

function ApplicantRow({data}) {

    const navigate = useNavigate()

    const navigateToApplicantDetails = () =>
      navigate(`/company/applicants/detail/${data.id}`, { state: { data } });
  

  return (
    <tr className="border-b odd:bg-primaryColor/50 odd:bg-black odd:text-white hover:text-white duration-100  text-little">
      <td className="text-center py-[5px]">
        <div className="flex justify-center items-center gap-[5px]">
          <span>{data?.full_name}</span>
        </div>
      </td>
      <td>
        <div className="flex w-full justify-center py-[10px] items-center">
          {data?.email}
        </div>
      </td>

      <td>
        <div className="flex items-center justify-center">
          <button className="py-[2px] uppercase text-[10px] px-[5px] border border-primaryColor rounded-[30px] text-center font-semibold">
            {data?.status}
          </button>
        </div>
      </td>

      <td>
        <p className=" py-[5px] text-center font-semibold">{(new Date(data?.created_at)).toLocaleDateString()}</p>
      </td>

      <td>
        <p className=" py-[5px] text-center">{data?.job_title}</p>
      </td>

      <td>
        <div className="items-center flex justify-center py-[5px]">
          <button onClick={navigateToApplicantDetails} className="text-xs md:text-inherit font-semibold border-white bg-gray-800 text-white px-2 border ">
            See Application
          </button>
        </div>
      </td>
    </tr>
  );
}

export default ApplicantRow;
