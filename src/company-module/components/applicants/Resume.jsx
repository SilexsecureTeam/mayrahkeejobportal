import { useContext, useEffect, useState } from "react";
import { resourceUrl } from "../../../services/axios-client";
import { ApplicationContext } from "../../../context/ApplicationContext";
import { formatDate } from "../../../utils/formmaters";
import {
  FaDownload,
  FaEye,
  FaGraduationCap,
  FaBriefcase,
  FaUniversity,
  FaAward,
  FaUserGraduate,
  FaBuilding,
} from "react-icons/fa";

function Resume({ applicant }) {
  const [loading, setLoading] = useState(true);
  const [resume, setResume] = useState();
  const { getResume } = useContext(ApplicationContext);

  useEffect(() => {
    setLoading(true);
    getResume(applicant?.candidate_id, (response) => {
      setResume(response);
      setLoading(false);
    });
  }, [applicant?.candidate_id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
          <p className="text-green-600 font-semibold">Loading Resume...</p>
        </div>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center p-6">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <FaGraduationCap className="text-gray-400 text-2xl" />
        </div>
        <h3 className="text-gray-600 font-semibold text-lg mb-2">
          No Resume Submitted
        </h3>
        <p className="text-gray-500 text-sm">
          This candidate hasn't uploaded a resume yet.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-600 to-gray-600 rounded-xl p-6 text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">{resume.title}</h1>
          <p className="text-green-100 opacity-90">Professional Resume</p>
        </div>

        {/* File Actions */}
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {resume.resume_path && (
            <>
              <a
                href={`https://docs.google.com/viewer?url=${encodeURIComponent(
                  resourceUrl + resume.resume_path
                )}&embedded=true`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-white text-green-700 px-4 py-2 rounded-lg font-medium hover:bg-green-50 transition-all duration-200 shadow-sm"
              >
                <FaEye className="text-sm" />
                <span>View Resume</span>
              </a>
              <a
                href={`${resourceUrl}${resume.resume_path}`}
                download
                className="inline-flex items-center space-x-2 bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-800 transition-all duration-200 shadow-sm"
              >
                <FaDownload className="text-sm" />
                <span>Download Resume</span>
              </a>
            </>
          )}

          {resume.portfolio_path && (
            <a
              href={`${resourceUrl}${resume.portfolio_path}`}
              download
              className="inline-flex items-center space-x-2 bg-transparent border-2 border-white text-white px-4 py-2 rounded-lg font-medium hover:bg-white hover:text-green-700 transition-all duration-200"
            >
              <FaDownload className="text-sm" />
              <span>Download Portfolio</span>
            </a>
          )}
        </div>
      </div>

      {/* Certificates Section */}
      {resume.certificate && resume.certificate.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 px-6 py-4 border-b border-amber-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <FaAward className="text-amber-600 text-lg" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">
                  Certificates & Qualifications
                </h3>
                <p className="text-amber-600 text-sm">
                  Academic and professional credentials
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-4">
            {resume.certificate.map((cert, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-500 rounded-lg p-4 hover:shadow-md transition-all duration-200"
              >
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <FaUniversity className="text-amber-600 text-sm" />
                      <h4 className="font-semibold text-gray-800 text-base">
                        {cert.awarding_institution}
                      </h4>
                    </div>
                    <p className="font-bold text-gray-900 text-lg mb-1">
                      {cert.qualification_title}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {cert.course_studied}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center space-x-1 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                      <FaUserGraduate className="text-xs" />
                      <span>
                        {cert.year_attended} -{" "}
                        {cert.year_of_graduation || "Present"}
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs mt-2">Completed</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Section */}
      {resume.educational_institution && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-blue-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FaGraduationCap className="text-blue-600 text-lg" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">Education</h3>
                <p className="text-blue-600 text-sm">Academic background</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Institution
                  </p>
                  <p className="text-gray-800 font-semibold">
                    {resume.educational_institution}
                  </p>
                </div>
                {resume.academy_name && (
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Academy/Program
                    </p>
                    <p className="text-gray-800 font-semibold">
                      {resume.academy_name}
                    </p>
                  </div>
                )}
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Year of Entry
                  </p>
                  <p className="text-gray-800 font-semibold">
                    {resume.year_of_entry}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Year of Graduation
                  </p>
                  <p className="text-gray-800 font-semibold">
                    {resume.year_of_graduation || "Ongoing"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Work Experience Section */}
      {(resume.company_name || resume.position_held) && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-green-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <FaBriefcase className="text-green-600 text-lg" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">
                  Work Experience
                </h3>
                <p className="text-green-600 text-sm">
                  Professional background
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-5 border-l-4 border-green-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resume.company_name && (
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                      <FaBuilding className="text-green-600 text-sm" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        Company
                      </p>
                      <p className="text-gray-800 font-semibold">
                        {resume.company_name}
                      </p>
                    </div>
                  </div>
                )}

                {resume.position_held && (
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                      <FaUserGraduate className="text-green-600 text-sm" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        Position
                      </p>
                      <p className="text-gray-800 font-semibold">
                        {resume.position_held}
                      </p>
                    </div>
                  </div>
                )}

                {resume.start_date && (
                  <div className="md:col-span-2 flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                      <FaGraduationCap className="text-green-600 text-sm" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        Duration
                      </p>
                      <p className="text-gray-800 font-semibold">
                        {formatDate(resume.start_date)} -{" "}
                        {resume.end_date
                          ? formatDate(resume.end_date)
                          : "Present"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Resume;
