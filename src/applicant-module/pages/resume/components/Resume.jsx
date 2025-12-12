import React, { useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaDownload,
  FaBuilding,
  FaGraduationCap,
  FaUserTie,
  FaCalendar,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import EditResume from "./EditResume";
import { BASE_URL, IMAGE_URL } from "../../../../utils/base";
import axios from "axios";
import { onSuccess } from "../../../../utils/notifications/OnSuccess";
import { formatDate } from "../../../../utils/formmaters";

const Resume = ({ resume, setGetResumeById, authDetails, getCandidate }) => {
  const [errorMsg, setErrorMsg] = useState(false);
  const [loading, setLoading] = useState(null);

  const deleteUser = async () => {
    setErrorMsg(null);
    setLoading(true);

    setGetResumeById((prev) => ({ ...prev, isDataNeeded: false }));

    await axios
      .delete(`${BASE_URL}/resumes/${resume.id}`, {
        headers: {
          Authorization: `Bearer ${authDetails?.token}`,
        },
      })
      .then((response) => {
        setLoading(false);
        setGetResumeById((prev) => ({ ...prev, isDataNeeded: true }));

        onSuccess({
          message: "Delete Resume",
          success: response.data.message,
        });
      })
      .catch((error) => {
        if (error.response) {
          setErrorMsg(error.response.data.error);
        } else {
          setErrorMsg(error.message);
        }
        setLoading(false);
      });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-400 px-6 py-4">
        <div className="flex justify-between items-center">
          <h2 className="text-white font-bold text-xl truncate capitalize">
            {resume.title}
          </h2>
          <EditResume resume={resume} />
        </div>
      </div>

      {/* Candidate Info */}
      <div className="px-3 py-5">
        <section className="h-64 overflow-y-auto">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-3">
              <FaUserTie className="text-green-600 text-2xl" />
            </div>
            <h3 className="font-bold text-gray-800 text-lg">
              {getCandidate?.details?.full_name}
            </h3>
            <p className="text-gray-600 text-sm mt-1">Professional Resume</p>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {getCandidate.details?.address && (
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                  <FaMapMarkerAlt className="text-green-600 text-sm" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="text-gray-800 font-medium text-sm">
                    {getCandidate.details.address}
                  </p>
                </div>
              </div>
            )}
            {getCandidate.details?.phone_number && (
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                  <FaPhone className="text-green-600 text-sm" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-800 font-medium text-sm">
                    {getCandidate.details.phone_number}
                  </p>
                </div>
              </div>
            )}
            {getCandidate.details?.email && (
              <div className="flex items-center space-x-3 md:col-span-2">
                <div className="flex-shrink-0 w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                  <FaEnvelope className="text-green-600 text-sm" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-800 font-medium text-sm">
                    {getCandidate.details.email}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Qualifications */}
          {resume.certificate && resume.certificate.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex-shrink-0 w-6 h-6 bg-green-50 rounded flex items-center justify-center">
                  <FaGraduationCap className="text-green-600 text-xs" />
                </div>
                <h4 className="font-bold text-gray-800">Qualifications</h4>
              </div>
              <div className="space-y-3">
                {resume.certificate.map((q, index) => (
                  <div key={index} className=" rounded-lg p-4 bg-amber-50">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 space-x-2">
                        <h5 className="font-semibold text-gray-800 text-sm">
                          {q.qualification_title}
                        </h5>
                        <p className="text-gray-600 text-xs mt-1">
                          {q.course_studied}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-700 text-sm">
                          {q.awarding_institution}
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                          {q.year_attended} -{" "}
                          {q.year_of_graduation || "Present"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Work Experience */}
          {(resume.company_name || resume.position_held) && (
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex-shrink-0 w-6 h-6 bg-green-50 rounded flex items-center justify-center">
                  <FaBuilding className="text-green-600 text-xs" />
                </div>
                <h4 className="font-bold text-gray-800">Work Experience</h4>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-green-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resume.company_name && (
                    <div>
                      <p className="text-sm text-gray-500">Company</p>
                      <p className="font-semibold text-gray-800">
                        {resume.company_name}
                      </p>
                    </div>
                  )}

                  {resume.position_held && (
                    <div>
                      <p className="text-sm text-gray-500">Position</p>
                      <p className="font-semibold text-gray-800">
                        {resume.position_held}
                      </p>
                    </div>
                  )}

                  {resume.start_date && (
                    <div className="md:col-span-2">
                      <div className="flex items-center space-x-2">
                        <FaCalendar className="text-gray-400 text-sm" />
                        <p className="text-sm text-gray-500">Duration</p>
                      </div>
                      <p className="font-medium text-gray-800 text-sm mt-1">
                        {formatDate(resume.start_date)} -{" "}
                        {resume.end_date
                          ? formatDate(resume.end_date)
                          : "Present"}
                      </p>
                    </div>
                  )}

                  {resume.description && (
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-500">Work Description</p>
                      <p className="text-gray-800 text-sm mt-1 leading-relaxed max-h-20 overflow-y-auto border border-gray-200 p-2 rounded">
                        {resume.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Files */}
        <div className="flex flex-wrap gap-3 mb-6">
          {resume.resume_path && (
            <a
              href={`${IMAGE_URL}/${resume.resume_path}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-green-50 hover:bg-green-100 text-green-700 px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <FaDownload className="text-sm" />
              <span className="text-sm font-medium">Resume</span>
            </a>
          )}
          {resume.portfolio_path && (
            <a
              href={`${IMAGE_URL}/${resume.portfolio_path}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-green-50 hover:bg-green-100 text-green-700 px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <FaDownload className="text-sm" />
              <span className="text-sm font-medium">Portfolio</span>
            </a>
          )}
        </div>
      </div>

      {/* Delete Button */}
      <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
        {errorMsg && (
          <div className="mb-3">
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-700 text-sm text-center">{errorMsg}</p>
            </div>
          </div>
        )}
        <div className="flex justify-center">
          <button
            onClick={deleteUser}
            disabled={loading}
            className="inline-flex items-center space-x-2 bg-red-50 hover:bg-red-100 text-red-700 px-6 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaTrash className="text-sm" />
            <span className="font-medium">
              {loading ? "Deleting..." : "Delete Resume"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Resume;
