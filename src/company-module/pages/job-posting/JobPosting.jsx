import { useEffect, useState } from "react";
import PostingHeader from "../../components/job-posting/PostingHeader";
import BasicInformation from "../../components/job-posting/BasicInformation";
import Descriptions from "../../components/job-posting/Descriptions";
import MoreInformation from "../../components/job-posting/MoreInformation";
import useJobManagement from "../../../hooks/useJobManagement";
import { onSuccess } from "../../../utils/notifications/OnSuccess";
import { useNavigate } from "react-router-dom";

const job_steps = [
  {
    id: 1,
    status: true,
    title: "Job Information",
  },
  {
    id: 2,
    status: false,
    title: "Job Description",
  },
];

function JobPosting() {
  const [currentStep, setCurrentStep] = useState(job_steps[0]);
  const jobUtils = useJobManagement()
  const navigate = useNavigate()


  const handleSuccess = () => {
       onSuccess({
        message: 'New Job',
        success: 'Job Created Successfully'
       })
       navigate('/company/job-listing')
  }

  useEffect(() => {
    console.log("Details", jobUtils.details);
  }, [jobUtils.details]);


  return (
    <div className="py-2 px-12 w-full h-full flex flex-col">
      <PostingHeader
        jobSteps={job_steps}
        setCurrentStep={setCurrentStep}
        currentStep={currentStep}
      />

      {currentStep.id === 1 && (
        <BasicInformation jobUtils={jobUtils} data={job_steps} setCurrentStep={setCurrentStep} />
      )}

      {currentStep.id === 2 && (
        <Descriptions jobUtils={jobUtils} data={job_steps} setCurrentStep={setCurrentStep} handleSuccess={handleSuccess} />
      )}
    </div>
  );
}

export default JobPosting;
