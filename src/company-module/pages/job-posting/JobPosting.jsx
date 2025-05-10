import { useEffect, useState } from "react";
import PostingHeader from "../../components/job-posting/PostingHeader";
import BasicInformation from "../../components/job-posting/BasicInformation";
import Descriptions from "../../components/job-posting/Descriptions";
import useJobManagement from "../../../hooks/useJobManagement";
import { onSuccess } from "../../../utils/notifications/OnSuccess";
import { onFailure } from "../../../utils/notifications/OnFailure";
import { useLocation, useNavigate } from "react-router-dom";

const job_steps = [
  { id: 1, status: true, title: "Job Information" },
  { id: 2, status: false, title: "Job Description" },
];

function JobPosting({ exclusive = null }) {
  const location = useLocation();
  const navigate = useNavigate();
  const jobUtils = useJobManagement();

  const [currentStep, setCurrentStep] = useState(job_steps[0]);
  const [editJob, setEditJob] = useState(false);
  const [showDraftPrompt, setShowDraftPrompt] = useState(false);
  const [draftToLoad, setDraftToLoad] = useState(null);

  const handleSuccess = () => {
    onSuccess({
      message: editJob ? 'Update Job' : 'New Job',
      success: editJob ? 'Job Updated Successfully' : 'Job Created Successfully',
    });
    localStorage.removeItem("job_post_draft");
    navigate(exclusive ? -2 : '/company/job-listing');
  };

  const validateAndProceed = () => {
    try {
      const validationError = jobUtils.validateJobDetails(currentStep);
      if (validationError) throw new Error(validationError);

      const nextStep = job_steps.find((step) => step.id === currentStep.id + 1);
      if (nextStep) setCurrentStep(nextStep);
    } catch (error) {
      onFailure({ message: "Complete this stage", error: error.message });
    }
  };

  // Handle loading a saved draft
  useEffect(() => {
    const savedDraft = localStorage.getItem("job_post_draft");

    if (location.state?.details) {
      jobUtils.setDetails(location.state.details);
      setEditJob(true);
    } else if (savedDraft) {
      setDraftToLoad(JSON.parse(savedDraft));
      setShowDraftPrompt(true);
    }
  }, [location.state]);

  // Save to localStorage on change
  useEffect(() => {
    const details = jobUtils?.details;
    if (details && Object.keys(details)?.length > 0) {
      localStorage.setItem("job_post_draft", JSON.stringify(details));
    }
  }, [jobUtils.details]);

  const handleLoadDraft = () => {
    if (draftToLoad) {
      jobUtils.setDetails(draftToLoad);
      setShowDraftPrompt(false);
    }
  };
i
  const handleDismissDraft = () => {
    localStorage.removeItem("job_post_draft");
    setShowDraftPrompt(false);
  };

  return (
    <div className="py-2 w-full h-full flex flex-col">
      <PostingHeader
        jobSteps={job_steps}
        setCurrentStep={setCurrentStep}
        currentStep={currentStep}
      />

      {!showDraftPrompt && (
  <>
    {currentStep.id === 1 && (
      <BasicInformation
        jobUtils={jobUtils}
        data={job_steps}
        setCurrentStep={setCurrentStep}
        validateAndProceed={validateAndProceed}
        editJob={editJob}
      />
    )}
    {currentStep.id === 2 && (
      <Descriptions
        jobUtils={jobUtils}
        data={job_steps}
        setCurrentStep={setCurrentStep}
        handleSuccess={handleSuccess}
        exclusive={exclusive}
        editJob={editJob}
      />
    )}
  </>
)}


      {showDraftPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-sm">
            <h2 className="text-lg font-semibold">Resume Your Draft?</h2>
            <p className="text-sm text-gray-600 mt-2">
              We found a saved draft from your previous session. Would you like to continue from where you left off?
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={handleDismissDraft}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Start Fresh
              </button>
              <button
                onClick={handleLoadDraft}
                className="px-4 py-2 bg-green-700 text-white rounded hover:bg-blue-700"
              >
                Resume Draft
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobPosting;
