import { useEffect, useState } from "react";
import isEqual from "lodash.isequal";
import PostingHeader from "../../components/job-posting/PostingHeader";
import BasicInformation from "../../components/job-posting/BasicInformation";
import Descriptions from "../../components/job-posting/Descriptions";
import useJobManagement from "../../../hooks/useJobManagement";
import { onSuccess } from "../../../utils/notifications/OnSuccess";
import { onFailure } from "../../../utils/notifications/OnFailure";
import { useLocation, useNavigate } from "react-router-dom";


// Function to omit specific fields from an object, like number_of_participants
const omitFieldsFromObject = (obj, keysToOmit) => {
  const result = { ...obj };
  for (const key of keysToOmit) {
    delete result[key];
  }
  return result;
};

// Normalize values to handle empty values correctly for comparison
const normalizeValue = (value, key) => {
  // Treat `0` salary fields as default
  if ((key === "min_salary" || key === "max_salary") && value === 0) {
    return undefined;  // Ignore salary of 0 as no change
  }
  // Treat other empty values as undefined
  if (value === "" || value === null || (Array.isArray(value) && value.length === 0)) {
    return undefined;
  }
  return value;
};

// Adjust the comparison logic to pass the key to normalizeValue
const isEffectivelyEqual = (a, b) => {
  const omitFields = ["number_of_participants"];
  const aClean = omitFieldsFromObject(a, omitFields);
  const bClean = omitFieldsFromObject(b, omitFields);

  for (const key in aClean) {
    const aValue = normalizeValue(aClean[key], key);
    const bValue = normalizeValue(bClean[key], key);

    if (aValue !== bValue) {
      return false;  // If any field has a meaningful change, return false
    }
  }

  return true;  // All fields are effectively the same, return true
};




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
  const [initialDetails, setInitialDetails] = useState(null);

  const [hasChanges, setHasChanges] = useState(false);
  const [readyToTrackChanges, setReadyToTrackChanges] = useState(false);

  const handleSuccess = () => {
    onSuccess({
      message: editJob ? "Update Job" : "New Job",
      success: editJob ? "Job Updated Successfully" : "Job Created Successfully",
    });
    localStorage.removeItem("job_post_draft");
    navigate(exclusive ? -2 : "/company/job-listing");



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


  // Load from location or draft
  useEffect(() => {
    const savedDraft = localStorage.getItem("job_post_draft");

    if (location.state?.details) {
      jobUtils.setDetails(location.state.details);
      setEditJob(true);
      setInitialDetails(location.state.details);
      setReadyToTrackChanges(true);
    } else if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        if (parsedDraft && typeof parsedDraft === "object") {
          const isDefault = isEffectivelyEqual(parsedDraft, jobUtils.details);
          if (!isDefault) {
            setDraftToLoad(parsedDraft);
            setShowDraftPrompt(true);
          } else {
            setInitialDetails(jobUtils.details);
            setReadyToTrackChanges(true);
          }
        }
      } catch {
        // If corrupted draft
        localStorage.removeItem("job_post_draft");
        setInitialDetails(jobUtils.details);
        setReadyToTrackChanges(true);
      }
    } else {
      setInitialDetails(jobUtils.details);
      setReadyToTrackChanges(true);
    }
  }, [location.state]);

  
// Use the isEffectivelyEqual to track changes in the form
useEffect(() => {
  if (!readyToTrackChanges || !initialDetails) return;

  // Check if there are actual changes
  const changed = !isEffectivelyEqual(jobUtils.details, initialDetails);

  // Track whether there are changes
  setHasChanges(changed);

  // Check if the current form is not in the "default" state
  const isDefault = isEffectivelyEqual(jobUtils.details, jobUtils.defaultDetails);

  // Only update localStorage if there are changes and it's not the default value
  if (changed && !isDefault) {
    localStorage.setItem("job_post_draft", JSON.stringify(jobUtils.details));
  } else {
    // Remove from localStorage if the draft is the same as the default (i.e., no changes)
    localStorage.removeItem("job_post_draft");
  }
}, [jobUtils.details, initialDetails, readyToTrackChanges]);


  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasChanges]);

  const handleLoadDraft = () => {
    if (draftToLoad) {
      jobUtils.setDetails(draftToLoad);
      setInitialDetails(draftToLoad);
      setReadyToTrackChanges(true);
      setShowDraftPrompt(false);
    }
=======

  useEffect(() => {
    const savedDraft = localStorage.getItem("job_post_draft");
    const wasReloaded = performance.getEntriesByType("navigation")[0]?.type === "reload";

    if (location.state?.details) {
      jobUtils.setDetails(location.state.details);
      setEditJob(true);
      setInitialDetails(location.state.details);
    } else {
      const defaultDetails = jobUtils.defaultJobDetails;
      jobUtils.setDetails(defaultDetails);
      setInitialDetails(defaultDetails);

      if (wasReloaded && savedDraft) {
        const parsedDraft = JSON.parse(savedDraft);
        setDraftToLoad(parsedDraft);
        setShowDraftPrompt(true);
      }
    }
  }, [location.state, jobUtils]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      const currentDetails = jobUtils.details;
      if (JSON.stringify(currentDetails) !== JSON.stringify(initialDetails)) {
        localStorage.setItem("job_post_draft", JSON.stringify(currentDetails));
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [jobUtils.details, initialDetails]);

  const handleLoadDraft = () => {
    if (draftToLoad) {
      jobUtils.setDetails(draftToLoad);
      setShowDraftPrompt(false);
    }

  };

  const handleDismissDraft = () => {
    localStorage.removeItem("job_post_draft");

    const defaultDetails = jobUtils.defaultDetails;
    jobUtils.setDetails(defaultDetails);
    setInitialDetails(defaultDetails);
    setReadyToTrackChanges(true);
=======

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
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center h-screen w-screen">

          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md h-max mt-3">
            <h2 className="text-lg font-semibold">Resume Your Draft?</h2>
            <p className="text-sm text-gray-600 mt-2">
              We found a saved draft from your previous session. Would you like to continue from where you left off?
              If you reload after this, your unsaved changes may be lost.
=======
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] h-max mt-3">
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
                className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
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
