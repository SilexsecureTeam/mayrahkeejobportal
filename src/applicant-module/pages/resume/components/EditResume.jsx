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

              {/* EDUCATIONAL INSTITUTION */}
              <label className="block mb-5">
                <span className="font-medium">Educational Institution</span>
                <input
                  name="educational_institution"
                  value={details.educational_institution}
                  onChange={handleInputChange}
                  className="mt-1 block p-2 border w-full rounded"
                  placeholder="e.g. University of Lagos"
                />
              </label>

              {/* ADD RESUME */}
              <div className="my-4 pt-5">
                <label className="cursor-pointer inline-block">
                  <span className="text-sm bg-green-100 rounded border p-4 font-medium hover:bg-green-200 transition">
                    {details.resumeFileName || "Add Resume (PDF/DOCX)"}
                  </span>
                  <input
                    type="file"
                    accept=".pdf,.docx,.doc"
                    name="resume"
                    onChange={handleFileChange}
                    className="invisible absolute"
                  />
                </label>
                {resumePicker && (
                  <div className="inline-flex items-center ml-3">
                    <FcApproval className="text-xl" />
                    <span className="text-sm text-green-600 ml-1">
                      {details.resumeFileName}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFile("resume")}
                      className="text-red-500 ml-2 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* QUALIFICATIONS */}
              <p className="font-medium text-lg my-6">Qualifications</p>

              {qualifications.map((q, index) => (
                <div
                  key={index}
                  className="border p-4 mb-5 rounded-lg bg-gray-50"
                >
                  <div className="flex justify-between">
                    <p className="font-medium text-sm">
                      Qualification #{index + 1}
                    </p>

                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeQualification(index)}
                        className="text-red-500 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <label className="block mt-3">
                    <span className="font-medium">Awarding Institution *</span>
                    <input
                      value={q.awarding_institution}
                      onChange={(e) =>
                        updateQualification(
                          index,
                          "awarding_institution",
                          e.target.value
                        )
                      }
                      className="mt-1 block p-2 border w-full rounded"
                      required
                    />
                  </label>

                  <label className="block mt-3">
                    <span className="font-medium">Qualification Title *</span>
                    <select
                      value={q.qualification_title}
                      onChange={(e) =>
                        updateQualification(
                          index,
                          "qualification_title",
                          e.target.value
                        )
                      }
                      className="mt-1 block p-2 border w-full rounded"
                      required
                    >
                      <option value="">Select Qualification</option>
                      {qualificationOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block mt-3">
                    <span className="font-medium">Year of Entry *</span>
                    <input
                      type="number"
                      value={q.year_attended}
                      onChange={(e) =>
                        updateQualification(
                          index,
                          "year_attended",
                          e.target.value
                        )
                      }
                      className="mt-1 block p-2 border w-full rounded"
                      min="1900"
                      max="2099"
                      required
                    />
                  </label>

                  <label className="block mt-3">
                    <span className="font-medium">Year of Graduation *</span>
                    <input
                      type="number"
                      value={q.year_of_graduation}
                      onChange={(e) =>
                        updateQualification(
                          index,
                          "year_of_graduation",
                          e.target.value
                        )
                      }
                      className="mt-1 block p-2 border w-full rounded"
                      min="1900"
                      max="2099"
                      required
                    />
                  </label>

                  <label className="block mt-3">
                    <span className="font-medium">Course Studied *</span>
                    <input
                      value={q.course_studied}
                      onChange={(e) =>
                        updateQualification(
                          index,
                          "course_studied",
                          e.target.value
                        )
                      }
                      className="mt-1 block p-2 border w-full rounded"
                      required
                    />
                  </label>
                </div>
              ))}

              <button
                type="button"
                onClick={addQualification}
                className="px-4 py-2 mb-6 bg-green-600 text-white rounded shadow hover:bg-green-700 transition"
              >
                + Add Another Qualification
              </button>

              {/* PORTFOLIO */}
              <div className="my-4 pt-5">
                <label className="cursor-pointer inline-block">
                  <span className="text-sm bg-green-100 rounded border p-4 font-medium hover:bg-green-200 transition">
                    {details.portfolioFileName || "Add Portfolio (PDF/DOCX)"}
                  </span>
                  <input
                    type="file"
                    accept=".pdf,.docx,.doc"
                    name="portfolio"
                    onChange={handleFileChange}
                    className="invisible absolute"
                  />
                </label>
                {portfolioPicker && (
                  <div className="inline-flex items-center ml-3">
                    <FcApproval className="text-xl" />
                    <span className="text-sm text-green-600 ml-1">
                      {details.portfolioFileName}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFile("portfolio")}
                      className="text-red-500 ml-2 text-sm"
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
