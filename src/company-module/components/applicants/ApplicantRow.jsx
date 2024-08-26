import { useNavigate } from "react-router-dom";

function ApplicantRow({ data }) {
  const navigate = useNavigate();

  const navigateToApplicantDetails = () =>
    navigate(`/company/applicants/detail/${data.id}`, { state: { data } });

  return (
    <tr className="border-b odd:bg-primaryColor/70 odd:text-white hover:bg-primaryColor hover:scale-105 duration-100 text-little">
      <td className="text-center py-[5px]">
        <div className="flex justify-center items-center gap-[5px]">
          <span>{data.full_name}</span>
        </div>
      </td>
      <td>
        <div className="flex w-full justify-center py-[10px] items-center">
          {data.email}
        </div>
      </td>

      <td>
        <div className="flex items-center justify-center">
          <button className="py-[2px] px-[5px] border text-[10px] uppercase border-primaryColor rounded-[30px] text-center font-semibold">
            {data.status}
          </button>
        </div>
      </td>

      <td>
        <p className=" py-[5px] text-center font-semibold">
          {new Date(data.created_at).toLocaleDateString()}
        </p>
      </td>

      <td>
        <p className=" py-[5px] text-center">{data.job_title}</p>
      </td>

      <td>
        <div className="items-center flex justify-center py-[5px]">
          <button
            onClick={navigateToApplicantDetails}
            className="font-semibold text-white px-2 py-[3px] border  bg-primaryColor"
          >
            See Application
          </button>
        </div>
      </td>

      {/* <hr className={`h-[90%]  ${active ? 'bg-white w-[1%]' : 'bg-red-700 w-[1.5%]'} rounded-t-[10px] rounded-b-[10px]`}/>
    
        <div onClick={createAndSetNewNavBarOption} className={`w-[95%] flex flex-col h-[90%] justify-center gap-[10px] ${active ? 'text-white' : 'text-black'}`}>
              <div className="w-full flex justify-between items-center">
                <p className="font-semibold text-[13px]">{course?.title}</p>
                <button className={`${active ? ' text-red-700 bg-white ' : 'border border-red-700 ' } rounded-[30px] hover:scale-105 duration-100 px-[15px] text-[10px]`}>Join</button>
              </div>
              <p className="text-small font-semibold">{`Day: ${schedule?.day} `}</p>
              <p className="text-small">{`Time: ${schedule?.start_time} - ${schedule?.end_time} `}</p>
        </div> */}
    </tr>
  );
}

export default ApplicantRow;
