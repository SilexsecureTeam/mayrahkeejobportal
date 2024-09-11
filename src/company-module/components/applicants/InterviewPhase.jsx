import { useContext } from "react";
import { axiosClient } from "../../../services/axios-client";
import { AuthContext } from "../../../context/AuthContex";
import { ApplicationContext } from "../../../context/ApplicationContext";

function InterviewPhase({data}) {

  const {authDetails} = useContext(AuthContext)
  const {setApplication} = useContext(ApplicationContext)
  
  const updateApplication = async (status) => {
      try {
        const client = axiosClient(authDetails.user.token)

        const response = await client.post('/applicationRespond', {
          candidate_id: data.candidate_id,
          job_id: data.job_id,
          status
        })

      setApplication(response.data.job_application)
        
      } catch (error) {
        
      }
  }
  

  return (
    <div className="w-full p-3 flex flex-col gap-3">
      <span className="text-sm flex flex-col gap-3 text-gray-600">
        Now that you've completed the interview process, it's time to make a
        critical decision regarding this candidate's future with your company.
        Please review their performance, qualifications, and overall fit for the
        role. You have two options:

        <span className="font-semibold text-black">
          * Hire: If you believe the candidate aligns with your team’s goals and
          can contribute positively to the company, choose to extend a job
          offer.
        </span>

        <span className="font-semibold text-black">
          * Decline: If the candidate doesn’t meet your expectations or the role
          requirements, choose to dismiss them from the hiring process.
        </span>
      </span>

      <div className="flex gap-5 mt-5">
        <button 
        onClick={() => updateApplication('hired')} 
        className="border w-fit hover:bg-primaryColor hover:text-white py-1 font-semibold text-sm px-5  border-primaryColor">
          Hire Applicant
        </button>
        <button 
        onClick={() => updateApplication('declined')} 
        
        className="border w-fit hover:bg-red-700 hover:text-white py-1 font-semibold text-sm px-5  border-red-700">
          Decline Applicant
        </button>
      </div>
    </div>
  );
}

export default InterviewPhase;
