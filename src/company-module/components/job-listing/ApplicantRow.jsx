import { useNavigate } from "react-router-dom";

function ApplicantRow() {

    const navigate = useNavigate()

    const navigateToApplicantDetails = () => navigate('/company/applicants/detail/1')

  return (
    <tr className="border-b odd:bg-gray-200  text-little">
      <td className="text-center py-[5px]">
        <div className="flex justify-center items-center gap-[5px]">
          <img src="h-[30px] w-[30px] rounded-full bg-black" />
          <span>Jake Sully</span>
        </div>
      </td>
      <td>
        <div className="flex w-full justify-center py-[10px] items-center">
          0.00
        </div>
      </td>

      <td>
        <div className="flex items-center justify-center">
          <button className="py-[2px] px-[5px] border border-primaryColor rounded-[30px] text-center font-semibold">
            Interview
          </button>
        </div>
      </td>

      <td>
        <p className=" py-[5px] text-center font-semibold">{`13, July 2024`}</p>
      </td>

      <td>
        <p className=" py-[5px] text-center">{`Javascript`}</p>
      </td>

      <td>
        <div className="items-center flex justify-center py-[5px]">
          <button onClick={navigateToApplicantDetails} className="font-semibold text-white px-2 py-[3px] border  bg-primaryColor">
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
