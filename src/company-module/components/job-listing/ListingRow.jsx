import { useNavigate } from "react-router-dom";

function ListingRow({ data, applicants }) {
  const navigate = useNavigate();

  const navigateJobTypeDetails = () =>
    navigate(`/company/job-listing/type/${data.id}`, { state: { data:data, applicants: applicants } });

  return (
    <tr
      onClick={navigateJobTypeDetails}
      className="border-b cursor-pointer hover:scale-[102%] odd:bg-primaryColor/70 hover:bg-primaryColor hover:text-white  text-little"
    >
      <td className="text-center py-[5px]">
        <div className="flex justify-center items-center gap-[5px]">
          <span>{data.job_title}</span>
        </div>
      </td>

      <td>
        <div className="flex w-full justify-center py-[10px] items-center">
          <button className="py-[2px] px-[5px] border w-[80%] text-little border-primaryColor rounded-[30px] text-center font-semibold">
            Live
          </button>
        </div>
      </td>

      <td>
        <div className="flex w-full justify-center py-[10px] items-center">
          <span className="text-little font-semibold">
            {new Date(data.created_at).toLocaleDateString()}
          </span>
        </div>
      </td>

      <td>
        <div className="flex w-full justify-center py-[10px] items-center">
          <span className="text-little font-semibold">
            {new Date(data.application_deadline_date).toLocaleDateString()}
          </span>
        </div>
      </td>

      <td>
        <div className="flex w-full justify-center py-[10px] items-center">
          <button className="py-[2px] px-[5px] w-[80%] text-little border border-primaryColor rounded-[30px] text-center font-semibold">
            {data?.type}
          </button>
        </div>
      </td>

      <td>
        <div className="flex w-full justify-center py-[10px] items-center">
          <span className="text-little font-semibold">{applicants.length > 0 ? applicants.length : 'None'}</span>
        </div>
      </td>
      <td>
        <div className="flex w-full justify-center py-[10px] items-center">
          <span className="text-little font-semibold">{data.gender}</span>
        </div>
      </td>
      {/* 
      <td>
        <div className="items-center flex justify-center py-[5px]">
          <button
            onClick={navigateToApplicantDetails}
            className="font-semibold text-white px-2 py-[3px] border  bg-primaryColor"
          >
            See Application
          </button>
        </div>
      </td> */}

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

export default ListingRow;
