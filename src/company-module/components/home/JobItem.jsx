import { useNavigate } from "react-router-dom";
import wheelIcon from "../../../assets/pngs/wheel-icon-black.png";
import { FormatPrice } from "../../../utils/formmaters";
import ProgressBar from "../shared/ProgressBar";
import { useContext } from "react";
import { CompanyRouteContext } from "../../../context/CompanyRouteContext";
function JobItem({ data, applicants}) {

  const navigate = useNavigate()
  const {setSideBar} = useContext(CompanyRouteContext)

  console.log('Applicants', applicants)

  const jobApplicants = applicants?.filter(
    (currentApplicant) => data.id === currentApplicant.job_id
  );

  return (
    <div 
    onClick={() => {
      setSideBar(4);
      navigate(`/company/job-listing/type/${data.id}`,{state:{data: data, applicants:jobApplicants}});
    }}
    className="flex flex-col  w-[180px] cursor-pointer hover:scale-105 duration-100  max-w-[180px]  border justify-between h-full p-2">
      <div className="flex justify-between  items-center">
        <img src={wheelIcon} className="h-[30px] w-[30px]" />
        <button className="bg-green-600/40 text-black text-little px-2 h-fit rounded-[20px]">
          {data.type}
        </button>
      </div>

      <div className="flex flex-col gap-[5px]">
        <h3 className="text-black font-semibold text-little">
          {data?.job_title}
        </h3>
        <span className="text-gray-400 font-semibold text-little truncate">
          Sector - {data?.sector}
        </span>
        <span className="text-gray-400 font-semibold text-little truncate">
          Type - {data?.job_apply_type}
        </span>
      </div>

      <div className="flex gap-[5px] justify-between">
        <button className="border border-[#ffb836] text-little px-2 h-fit  text-[#ffb836] rounded-[20px]">
          {FormatPrice(Number(data?.min_salary))}
        </button>

        <button className="border border-primaryColor text-little px-2 h-fit   text-primaryColor rounded-[20px]">
          {FormatPrice(Number(data?.max_salary))}
        </button>
      </div>

      <div className="flex flex-col">
        {/* <ProgressBar measured={data.applicants} total={data.capacity} /> */}

        <span className="font-semibold text-little text-gray-800">
          {/* {data.applicants}  */}
          Deadline:{" "}
          <span className="text-gray-400 font-normal">
            {data?.application_deadline_date}
          </span>
        </span>
      </div>
    </div>
  );
}

export default JobItem;
