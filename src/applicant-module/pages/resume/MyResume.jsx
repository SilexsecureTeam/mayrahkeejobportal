import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContex";
import { BASE_URL } from "../../../utils/base";
import { ResourceContext } from "../../../context/ResourceContext";
import axios from "axios";
import { FcApproval } from "react-icons/fc";
import { onSuccess } from "../../../utils/notifications/OnSuccess";
import Resume from "./components/Resume";
import { toast } from "react-toastify";
import { onFailure } from "../../../utils/notifications/OnFailure";
import { extractErrorMessage, isValidYear } from "../../../utils/formmaters";
import { qualificationOptions } from "../../../utils/formFields";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import QualificationsSection from "./components/QualificationsSection";

const MyResume = () => {
  const { authDetails } = useContext(AuthContext);
  const { getResumeById, setGetResumeById, getCandidate, setGetCandidate } =
    useContext(ResourceContext);
  const user = authDetails?.user;
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from;
  const jobId = location.state?.jobId;

  const COMPANY_NAME_LIMIT = 50;
  const POSITION_LIMIT = 50;

  const [loading, setLoading] = useState(false);
  const [resumePicker, setResumePicker] = useState(false);
  const [portfolioPicker, setPortfolioPicker] = useState(false);
  const [fetching, setFetching] = useState(false);

  const [details, setDetails] = useState({
    title: "",
    educational_institution: "",
    company_name: "",
    work_description: "",
    position_held: "",
    start_date: "",
    end_date: "",
    resume: null,
    resumeFileName: "",
    portfolio: null,
    portfolioFileName: "",
  });

  const [qualifications, setQualifications] = useState([
    {
      awarding_institution: "",
      qualification_title: "",
      year_attended: "",
      year_of_graduation: "",
      course_studied: "",
    },
  ]);

  useEffect(() => {
    setGetCandidate((prev) => ({ ...prev, isDataNeeded: true }));
  }, []);

  useEffect(() => {
    setGetResumeById((prev) => ({ ...prev, isDataNeeded: true }));
    setFetching(true); // Start fetching
  }, []);

  // Detect when data arrives
  useEffect(() => {
    if (getResumeById.data) {
      setFetching(false);
    }
  }, [getResumeById.data]);

  const addQualification = () => {
    setQualifications((prev) => [
      ...prev,
      {
        awarding_institution: "",
        qualification_title: "",
        year_attended: "",
        year_of_graduation: "",
        course_studied: "",
      },
    ]);
  };

  const removeQualification = (index) => {
    if (qualifications.length === 1)
      return toast.error("At least one qualification is required");
    setQualifications((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQualification = (index, field, value) => {
    setQualifications((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (!file) return;

    // File size validation (1MB)
    if (file.size > 1 * 1024 * 1024) {
      toast.error("File size exceeds 1MB.");
      e.target.value = null;
      return;
    }

    // File type validation
    const allowedTypes = [".pdf", ".docx", ".doc"];
    const fileExtension = "." + file.name.split(".").pop().toLowerCase();

    if (!allowedTypes.includes(fileExtension)) {
      toast.error("Please upload only PDF or DOCX files.");
      e.target.value = null;
      return;
    }

    if (name === "resume") {
      setResumePicker(true);
      setDetails((prev) => ({
        ...prev,
        resume: file,
        resumeFileName: file.name,
      }));
    }

    if (name === "portfolio") {
      setPortfolioPicker(true);
      setDetails((prev) => ({
        ...prev,
        portfolio: file,
        portfolioFileName: file.name,
      }));
    }
  };

  const handleInputChange = (e) => {
    const { value, name, type, checked } = e.target;

    setDetails((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const removeFile = (fileType) => {
    if (fileType === "resume") {
      setDetails((prev) => ({
        ...prev,
        resume: null,
        resumeFileName: "",
      }));
      setResumePicker(false);
      // Reset the file input
      const fileInput = document.querySelector('input[name="resume"]');
      if (fileInput) fileInput.value = "";
    } else {
      setDetails((prev) => ({
        ...prev,
        portfolio: null,
        portfolioFileName: "",
      }));
      setPortfolioPicker(false);
      // Reset the file input
      const fileInput = document.querySelector('input[name="portfolio"]');
      if (fileInput) fileInput.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!details.title.trim()) return toast.error("Resume title is required");

    // Validate qualifications
    for (let i = 0; i < qualifications.length; i++) {
      const q = qualifications[i];
      if (
        !q.awarding_institution?.trim() ||
        !q.qualification_title?.trim() ||
        !q.year_attended ||
        !q.year_of_graduation ||
        !q.course_studied?.trim()
      ) {
        return toast.error(
          `Please complete all fields for Qualification #${i + 1}`
        );
      }
      // Year validation
      if (!isValidYear(Number(q.year_attended))) {
        toast.error(`Invalid Year of Entry for Qualification #${i + 1}`);
        return;
      }

      if (!isValidYear(Number(q.year_of_graduation))) {
        toast.error(`Invalid Year of Graduation for Qualification #${i + 1}`);
        return;
      }

      if (Number(q.year_of_graduation) < Number(q.year_attended)) {
        toast.error(
          `Year of Graduation cannot be earlier than Year of Entry (Qualification #${
            i + 1
          })`
        );
        return;
      }
    }

    // Validate dates
    if (details.start_date && details.end_date) {
      const startDate = new Date(details.start_date);
      const endDate = new Date(details.end_date);
      if (endDate < startDate) {
        return toast.error("End date cannot be before start date");
      }
    }

    const formData = new FormData();

    // Append basic fields
    formData.append("candidate_id", user.id);
    formData.append("title", details.title);
    formData.append("educational_institution", details.educational_institution);
    formData.append("company_name", details.company_name);
    formData.append("position_held", details.position_held);
    formData.append("start_date", details.start_date);
    formData.append("end_date", details.end_date);
    formData.append("work_description", details.work_description);

    // Append files with correct field names for backend
    if (details.resume) {
      formData.append("resume_file", details.resume);
    }

    if (details.portfolio) {
      formData.append("portfolio_file", details.portfolio);
    }

    // Append each certificate individually to FormData
    qualifications.forEach((qualification, index) => {
      formData.append(
        `certificate[${index}][awarding_institution]`,
        qualification.awarding_institution
      );
      formData.append(
        `certificate[${index}][qualification_title]`,
        qualification.qualification_title
      );
      formData.append(
        `certificate[${index}][year_attended]`,
        qualification.year_attended
      );
      formData.append(
        `certificate[${index}][year_of_graduation]`,
        qualification.year_of_graduation
      );
      formData.append(
        `certificate[${index}][course_studied]`,
        qualification.course_studied
      );
    });

    setLoading(true);

    setGetResumeById((prev) => ({ ...prev, isDataNeeded: false }));

    try {
      const response = await axios.post(`${BASE_URL}/resumes`, formData, {
        headers: {
          Authorization: `Bearer ${authDetails.token}`,
          "Content-Type": "multipart/form-data",
        },
        timeout: 30000, // 30 seconds timeout
      });

      onSuccess({
        message: "Resume Created Successfully",
        success: response.data.message,
      });

      // Reset form
      setDetails({
        title: "",
        educational_institution: "",
        company_name: "",
        position_held: "",
        start_date: "",
        end_date: "",
        resume: null,
        resumeFileName: "",
        portfolio: null,
        portfolioFileName: "",
      });

      setQualifications([
        {
          awarding_institution: "",
          qualification_title: "",
          year_attended: "",
          year_of_graduation: "",
          course_studied: "",
        },
      ]);

      setResumePicker(false);
      setPortfolioPicker(false);

      // Refresh data
      setGetResumeById((prev) => ({ ...prev, isDataNeeded: true }));
    } catch (error) {
      console.error("Upload error:", error);
      onFailure({
        message: "Failed to create resume",
        error: extractErrorMessage(error),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full text-[#25324b] w-full">
      <div className="px-5 mt-6">
        {from === "job-application" && jobId && (
          <div className="mb-4 flex justify-end">
            <button
              type="button"
              onClick={() => {
                if (getResumeById.data?.length < 1) {
                  onFailure({
                    message: "Application Error",
                    error: "Please add at least one resume to continue.",
                  });
                  return;
                }
                navigate(`/applicant/find-job/${jobId}`);
              }}
              className="px-4 py-2 rounded bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition"
            >
              Continue Job Application
            </button>
          </div>
        )}

        {fetching && (
          <div className="flex justify-center items-center h-[150px]">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-green-600 border-t-transparent"></div>
            <span className="ml-3 text-green-600 font-semibold">
              Loading Resumes...
            </span>
          </div>
        )}

        {!fetching && getResumeById.data?.length < 1 && (
          <p className="text-red-600">Resume Empty !!!</p>
        )}

        <div className="grid grid-cols-responsive gap-5">
          {!fetching &&
            getResumeById?.data?.map((resume) => (
              <Resume
                key={resume.id}
                resume={resume}
                getCandidate={getCandidate.data}
                setGetResumeById={setGetResumeById}
                authDetails={authDetails}
              />
            ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="border-b py-6">
            <div className="flex md:w-4/5">
              <div className="w-full">
                <p className="font-medium mb-5 text-2xl">Add Resume</p>

                {/* TITLE */}
                <label className="block mb-5">
                  <span className="font-medium">Resume Title *</span>
                  <input
                    name="title"
                    value={details.title}
                    onChange={handleInputChange}
                    className="mt-1 block p-2 border w-full rounded"
                    placeholder="e.g. Senior Developer Resume"
                    required
                  />
                </label>

                {/* ADD RESUME */}
                <div className="my-4 pt-5">
                  {!resumePicker ? (
                    <label className="cursor-pointer inline-flex items-center gap-3 rounded border bg-green-100 px-4 py-3 text-sm font-medium hover:bg-green-200 transition">
                      <span>Add Resume (PDF/DOCX)</span>
                      <input
                        type="file"
                        accept=".pdf,.docx,.doc"
                        name="resume"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="flex items-center justify-between rounded border bg-green-50 px-4 py-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <FcApproval className="text-xl shrink-0" />
                        <span className="text-sm text-green-700 truncate">
                          {details.resumeFileName}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFile("resume")}
                        className="text-red-500 text-sm hover:underline ml-3 shrink-0"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                {/* QUALIFICATIONS */}
                <QualificationsSection
                  qualifications={qualifications}
                  setQualifications={setQualifications}
                />

                {/* PORTFOLIO */}
                <div className="my-4 pt-5">
                  {!portfolioPicker ? (
                    <label className="cursor-pointer inline-flex items-center gap-3 rounded border bg-green-100 px-4 py-3 text-sm font-medium hover:bg-green-200 transition">
                      <span>Add Portfolio (PDF/DOCX)</span>
                      <input
                        type="file"
                        accept=".pdf,.docx,.doc"
                        name="portfolio"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="flex items-center justify-between rounded border bg-green-50 px-4 py-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <FcApproval className="text-xl shrink-0" />
                        <span className="text-sm text-green-700 truncate">
                          {details.portfolioFileName}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFile("portfolio")}
                        className="text-red-500 text-sm hover:underline ml-3 shrink-0"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                {/* WORK EXPERIENCE */}
                <p className="font-medium text-lg my-6">Work Experience</p>

                <label className="block mb-5">
                  <span className="font-medium">Company Name</span>
                  <input
                    name="company_name"
                    value={details.company_name}
                    onChange={handleInputChange}
                    maxLength={COMPANY_NAME_LIMIT}
                    className="mt-1 block p-2 border w-full rounded"
                  />
                  <div className="mt-1 text-xs text-gray-500">
                    Max {COMPANY_NAME_LIMIT} characters.{" "}
                    <span>
                      {details.company_name.length}/{COMPANY_NAME_LIMIT}
                    </span>
                  </div>
                </label>
                <label className="block mb-5">
                  <span className="font-medium">Work Description</span>
                  <textarea
                    name="work_description"
                    value={details.work_description}
                    onChange={handleInputChange}
                    maxLength={100}
                    className="mt-1 block p-2 border w-full rounded"
                  />
                  <div className="mt-1 text-xs text-gray-500">
                    Max {100} characters.{" "}
                    <span>
                      {details?.work_description?.length}/{100}
                    </span>
                  </div>
                </label>

                <label className="block mb-5">
                  <span className="font-medium">Position Held</span>
                  <input
                    name="position_held"
                    value={details.position_held}
                    onChange={handleInputChange}
                    maxLength={POSITION_LIMIT}
                    className="mt-1 block p-2 border w-full rounded"
                  />
                  <div className="mt-1 text-xs text-gray-500">
                    Max {POSITION_LIMIT} characters.{" "}
                    <span>
                      {details.position_held.length}/{POSITION_LIMIT}
                    </span>
                  </div>
                </label>

                <label className="block mb-5">
                  <span className="font-medium">Start Date</span>
                  <input
                    type="date"
                    name="start_date"
                    value={details.start_date}
                    onChange={handleInputChange}
                    className="mt-1 block p-2 border w-full rounded"
                  />
                </label>

                <label className="block mb-5">
                  <span className="font-medium">End Date</span>
                  <input
                    type="date"
                    name="end_date"
                    value={details.end_date}
                    onChange={handleInputChange}
                    className="mt-1 block p-2 border w-full rounded"
                  />
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="rounded prime_bg text-white px-4 py-2 w-full md:w-1/2 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="size-5 mr-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Saving Resume...
                    </>
                  ) : (
                    "Save Resume"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyResume;
