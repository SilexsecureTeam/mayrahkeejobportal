import { useLocation } from "react-router-dom";
import PrimaryDetail from "../../components/applicants/PrimaryDetail";
import SecondaryDetail from "../../components/applicants/SecondaryDetail";
import { useContext, useEffect, useState } from "react";
import useApplicationManagement from "../../../hooks/useApplicationManagement";
import ScheduleInterviewModal from "../../components/applicants/ScheduleInteviewModal";
import { ApplicationContext } from "../../../context/ApplicationContext";

function SingleApplicant() {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [applicationData, setApplicantData] = useState(location?.state?.data);
  const {
    getApplicant,
    interviewDetails,
    onTextChange,
    loading,
    scheduleInterview,
  } = useContext(ApplicationContext);
  
  const [applicant, setApplicant] = useState();

  const toogleInterview = () => setIsOpen(!isOpen);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    scheduleInterview(applicant, applicationData, setApplicantData, () => {
      toogleInterview();
    });
  };

  useEffect(() => {
    const initApplicant = async () => {
      const result = await getApplicant(applicationData.candidate_id);
      if (result) {
        setApplicant(result);
      }
    };

    initApplicant();
  }, []);

  console.log(applicationData);

  return (
    <>
      <ScheduleInterviewModal
        handleOnSubmit={handleOnSubmit}
        loading={loading}
        isOpen={isOpen}
        details={interviewDetails}
        onTextChange={onTextChange}
        setIsOpen={setIsOpen}
      />
      {applicant && (
        <div className="flex flex-col p-2 h-full gap-[5px]">
          <div className="w-full flex justify-between ">
            <h2 className="font-semibold text-md">Applicant Details</h2>

            <button className="text-little py-1 px-2 bg-white border text-primaryColor border-primaryColor ">
              More Action
            </button>
          </div>

          <div className="flex justify-between h-full">
            <PrimaryDetail
              data={applicationData}
              applicant={applicant}
              toogleInterview={toogleInterview}
            />
            <SecondaryDetail
              data={applicationData}
              applicant={applicant}
              toogleInterview={toogleInterview}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default SingleApplicant;
