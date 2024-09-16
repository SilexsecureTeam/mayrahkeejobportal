import { useNavigate } from "react-router-dom";
import { stages } from "../../../utils/constants";

function ApplicantRow({ data }) {
  const navigate = useNavigate();

  const navigateToApplicantDetails = () =>
    navigate(`/company/applicants/detail/${data.id}`, { state: { data } });

  const getBorderColor = () => {
    switch(data.status){
      case stages[0].name: return 'text-lightorange border-lightorange'
      case stages[1].name: return 'text-lightblue border-lightblue'
      case stages[2].name: return 'text-darkblue border-darkblue'
      case stages[3].name.split('/')[0]: return 'text-primaryColor border-primaryColor'
      case stages[3].name.split('/')[1]: return 'text-red-600 border-red-600'
    }
 }

  return (
    <tr className={`"border-b odd:bg-black/50 odd:text-white even:hover:text-white hover:bg-gray-800 duration-100 text-little`}>
      <td className="text-center py-[5px]">
        <div className="flex justify-center items-center gap-[5px]">
          <span>{data.full_name}</span>
        </div>
      </td>
      <td className="hidden md:block">
        <div className="flex w-full justify-center py-[10px] items-center">
          {data.email}
        </div>
      </td>

      <td>
        <div className="flex items-center justify-center">
          <button className={`py-[2px] px-[5px] border text-[10px] tracking-wider uppercase ${getBorderColor()} rounded-[30px] text-center font-semibold`}>
            {data.status}
          </button>
        </div>
      </td>

      <td className="hidden md:block">
        <p className=" py-[5px] text-center font-semibold">
          {new Date(data.created_at).toLocaleDateString()}
        </p>
      </td>

      <td>
        <p className=" py-[5px] text-center text-clip">{data.job_title}</p>
      </td>

      <td>
        <div className="items-center flex justify-center py-[5px]">
          <button
            onClick={navigateToApplicantDetails}
            className="font-semibold hidden md:block bg-gray-800 text-white px-2 py-[3px] border"
          >
            See Application
          </button>
          <button
            onClick={navigateToApplicantDetails}
            className="font-semibold md:hidden bg-gray-800 text-white px-2 py-[3px] border"
          >
            Application
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
