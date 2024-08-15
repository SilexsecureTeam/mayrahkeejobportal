import { useLocation } from "react-router-dom";
import PrimaryDetail from "../../components/applicants/PrimaryDetail";
import SecondaryDetail from "../../components/applicants/SecondaryDetail";
import { useEffect, useState } from "react";
import useApplicationManagement from "../../../hooks/useApplicationManagement";

function SingleApplicant() {
  const location = useLocation();

  const applicationData = location?.state?.data;
  const { getApplicant } = useApplicationManagement();
  const [applicant, setApplicant] = useState();

  useEffect(() => {
     const initApplicant = async () => {
          const result = await getApplicant(applicationData.candidate_id)
          if(result){
            setApplicant(result)
          }
     }

     initApplicant()
  }, []);

  console.log(applicant)

  return (
    applicant && (
      <div className="flex flex-col p-2 h-full gap-[5px]">
        <div className="w-full flex justify-between ">
          <h2 className="font-semibold text-md">Applicant Details</h2>

          <button className="text-little py-1 px-2 bg-white border text-primaryColor border-primaryColor ">
            More Action
          </button>
        </div>

        <div className="flex justify-between h-full">
          <PrimaryDetail data={applicationData} applicant={applicant} />
          <SecondaryDetail data={applicationData} applicant={applicant} />
        </div>
      </div>
    )
  );
}

export default SingleApplicant;
