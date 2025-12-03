import { useLocation } from "react-router-dom";
import PrimaryDetail from "../../components/applicants/PrimaryDetail";
import SecondaryDetail from "../../components/applicants/SecondaryDetail";
import { useContext, useEffect, useState } from "react";
import ScheduleInterviewModal from "../../components/applicants/ScheduleInteviewModal";
import { ApplicationContext } from "../../../context/ApplicationContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SingleApplicant() {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  const {
    application,
    setApplication,
    getApplicant,
    interviewDetails,
    setInterviewDetails,
    onTextChange,
    loading,
    scheduleInterview,
    getApplication,
  } = useContext(ApplicationContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [applicationData, setApplicantData] = useState();
  const [applicant, setApplicant] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const exclusiveData = location?.state?.exclusiveData || null;

  useEffect(() => {
    const fetchApplication = async () => {
      if (id) {
        setIsLoading(true);
        try {
          await getApplication(id, setApplicantData);
        } finally {
          setIsLoading(false);
        }
      }
    };
    if (id) fetchApplication();
    else navigate(-1);
  }, [id]);

  // New unified function to open the modal
  const openInterviewModal = (isEdit = false, detailsData = null) => {
    setEdit(isEdit);

    if (isEdit && detailsData) {
      // Edit mode: prefill details
      setInterviewDetails(detailsData);
    } else {
      // New schedule: reset details
      setInterviewDetails({
        interviewer_name: "",
        interview_date: "",
        interview_time: "",
        notes: "",
        location: applicationData?.company_address || "",
        meeting_id: null,
      });
    }

    setIsOpen(true); // Open modal after setting details
  };

  const handleOnSubmit = (e, selectedOption, meetingId) => {
    e.preventDefault();
    scheduleInterview(
      applicant,
      applicationData,
      setApplicantData,
      () => setIsOpen(false),
      selectedOption,
      meetingId,
      exclusiveData,
      edit
    );
  };

  // Sync updated application
  useEffect(() => {
    if (application) setApplicantData(application);
    return () => setApplication(null);
  }, [application]);

  // Fetch applicant data
  useEffect(() => {
    const initApplicant = async () => {
      setIsLoading(true);
      try {
        const result = await getApplicant(
          applicationData?.candidate_id,
          setApplicant
        );
        if (result) setApplicant(result);
      } catch (error) {
        console.error("Error fetching applicant:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (applicationData) initApplicant();
  }, [applicationData]);

  return (
    <>
      <ScheduleInterviewModal
        handleOnSubmit={handleOnSubmit}
        loading={loading}
        isOpen={isOpen}
        details={interviewDetails}
        setDetails={setInterviewDetails}
        onTextChange={onTextChange}
        setIsOpen={setIsOpen}
        edit={edit}
      />

      {isLoading ? (
        <div className="w-full flex items-center justify-center h-screen">
          <div className="animate-spin border-4 border-gray-200 border-t-primaryColor rounded-full w-8 h-8"></div>
          <span className="ml-3 text-primaryColor font-semibold">
            Loading...
          </span>
        </div>
      ) : (
        applicant && (
          <div className="w-full flex flex-col h-full gap-4 p-4">
            <div className="w-full flex justify-between">
              <h2 className="font-semibold text-lg md:text-xl text-gray-800">
                Applicant's Details
              </h2>
            </div>

            <div className="flex flex-col lg:flex-row justify-between gap-4 min-h-[calc(100vh-150px)]">
              <PrimaryDetail data={applicationData} applicant={applicant} />
              <SecondaryDetail
                data={applicationData}
                applicant={applicant}
                toogleInterview={(details) =>
                  openInterviewModal(!!details, details)
                }
                exclusive={exclusiveData}
                setEdit={setEdit}
              />
            </div>
          </div>
        )
      )}
    </>
  );
}

export default SingleApplicant;
