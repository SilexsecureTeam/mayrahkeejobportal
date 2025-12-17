import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthContex";
import { FaEdit } from "react-icons/fa";
import { BASE_URL } from "../../../../utils/base";
import { ResourceContext } from "../../../../context/ResourceContext";
import axios from "axios";
import { FcApproval } from "react-icons/fc";
import { onSuccess } from "../../../../utils/notifications/OnSuccess";
import UseModal from "../../../components/general/UseModal";
import { toast } from "react-toastify";
import { onFailure } from "../../../../utils/notifications/OnFailure";
import { extractErrorMessage } from "../../../../utils/formmaters";
import { qualificationOptions } from "../../../../utils/formFields";
import QualificationsSection from "./QualificationsSection";

const EditResume = ({ resume }) => {
  const { authDetails } = useContext(AuthContext);
  const { setGetResumeById } = useContext(ResourceContext);
  const user = authDetails?.user;

  const [loading, setLoading] = useState(false);
  const [resumePicker, setResumePicker] = useState(false);
  const [portfolioPicker, setPortfolioPicker] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // DETAILS - EXACTLY LIKE MYRESUME
  const [details, setDetails] = useState({
    title: resume?.title || "",
    company_name: resume?.company_name || "",
    work_description: resume?.work_description || "",
    position_held: resume?.position_held || "",
    start_date: resume?.start_date || "",
    end_date: resume?.end_date || "",
    resume: null,
    resumeFileName: "",
    portfolio: null,
    portfolioFileName: "",
  });

  // QUALIFICATIONS - EXACTLY LIKE MYRESUME
  const [qualifications, setQualifications] = useState(
    resume?.certificate && resume.certificate.length > 0
      ? resume.certificate
      : [
          {
            awarding_institution: "",
            qualification_title: "",
            year_attended: "",
            year_of_graduation: "",
            course_studied: "",
          },
        ]
  );

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

    // Append basic fields - EXACTLY LIKE MYRESUME
    formData.append("candidate_id", user.id);
    formData.append("title", details.title);
    formData.append("company_name", details.company_name);
    formData.append("position_held", details.position_held);
    formData.append("start_date", details.start_date);
    formData.append("end_date", details.end_date);
    formData.append("work_description", details.work_description);

    // Append files with correct field names for backend - EXACTLY LIKE MYRESUME
    if (details.resume) {
      formData.append("resume_file", details.resume);
    }

    if (details.portfolio) {
      formData.append("portfolio_file", details.portfolio);
    }

    // Append each certificate individually to FormData - EXACTLY LIKE MYRESUME
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
      const response = await axios.post(
        `${BASE_URL}/updateResumes/${resume.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authDetails.token}`,
            "Content-Type": "multipart/form-data",
          },
          timeout: 30000, // 30 seconds timeout
        }
      );

      onSuccess({
        message: "Resume Updated Successfully",
        success: response.data.message,
      });

      setIsOpen(false);

      // Refresh data
      setGetResumeById((prev) => ({ ...prev, isDataNeeded: true }));
    } catch (error) {
      console.error("Update error:", error);
      onFailure({
        message: "Failed to update resume",
        error: extractErrorMessage(error),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button className="p-3" onClick={() => setIsOpen(true)}>
        <FaEdit />
      </button>

      <UseModal isOpen={isOpen} setIsOpen={setIsOpen} header="Edit Resume">
        <form onSubmit={handleSubmit}>
          <div className="py-6">
            <div className="w-full">
              <p className="font-medium mb-5 text-2xl">Edit Resume</p>

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
                  className="mt-1 block p-2 border w-full rounded"
                />
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
                    {details.work_description.length}/{100}
                  </span>
                </div>
              </label>

              <label className="block mb-5">
                <span className="font-medium">Position Held</span>
                <input
                  name="position_held"
                  value={details.position_held}
                  onChange={handleInputChange}
                  className="mt-1 block p-2 border w-full rounded"
                />
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
                className="rounded prime_bg text-white px-4 py-2 w-full flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="size-5 mr-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Updating Resume...
                  </>
                ) : (
                  "Update Resume"
                )}
              </button>
            </div>
          </div>
        </form>
      </UseModal>
    </div>
  );
};

export default EditResume;
