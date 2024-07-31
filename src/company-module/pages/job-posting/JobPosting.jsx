import { useState } from "react";
import PostingHeader from "../../components/job-posting/PostingHeader";
import BasicInformation from "../../components/job-posting/BasicInformation";
import Descriptions from "../../components/job-posting/Descriptions";
import MoreInformation from "../../components/job-posting/MoreInformation";

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
  {
    id: 3,
    status: false,
    title: "Perks and Benefits",
  },
];

function JobPosting() {
  const [currentStep, setCurrentStep] = useState(job_steps[0]);

  return (
    <div className="p-2 w-full h-full flex flex-col">
      <PostingHeader
        jobSteps={job_steps}
        setCurrentStep={setCurrentStep}
        currentStep={currentStep}
      />

      {currentStep.id === 1 && (
        <BasicInformation data={job_steps} setCurrentStep={setCurrentStep} />
      )}

      {currentStep.id === 2 && (
        <Descriptions data={job_steps} setCurrentStep={setCurrentStep} />
      )}

      {currentStep.id === 3 && (
        <MoreInformation data={job_steps} setCurrentStep={setCurrentStep} />
      )}
    </div>
  );
}

export default JobPosting;
