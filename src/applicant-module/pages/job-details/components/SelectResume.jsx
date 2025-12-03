import {
  FaDownload,
  FaEnvelope,
  FaGraduationCap,
  FaPhone,
} from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";

import { FcApproval } from "react-icons/fc";

import { IMAGE_URL } from "../../../../utils/base";
const SelectResume = ({ item, active, handleActive, getCandidate }) => {
  return (
    <div
      key={item.id}
      onClick={() => handleActive(item.id)}
      className={`cursor-pointer bg-white rounded-xl shadow-lg border overflow-hidden transition-all duration-300 relative
          ${active ? "ring-2 ring-green-500 shadow-xl" : "hover:shadow-xl"}`}
    >
      {/* Active Check Icon */}
      {active && (
        <span className="absolute top-3 right-3">
          <FcApproval size={26} />
        </span>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-400 px-4 py-3">
        <h2 className="text-white font-bold text-lg capitalize truncate">
          {item.title}
        </h2>
      </div>

      {/* Body */}
      <div className="px-5 py-4">
        {/* Candidate Info */}
        <div className="text-center mb-4">
          <img
            className="w-[90px] h-[90px] rounded-full mx-auto"
            src={`${IMAGE_URL}/${getCandidate?.details?.profile}`}
            alt="profile"
          />
          <h3 className="font-bold text-gray-800 text-lg mt-2">
            {getCandidate?.details?.full_name}
          </h3>
          <p className="text-gray-600 text-xs">Professional Resume</p>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1  gap-3 mb-4">
          <div className="flex items-center space-x-3">
            <span className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
              <FaPhone className="text-green-600 text-sm" />
            </span>
            <div>
              <p className="text-gray-600 text-xs">Phone</p>
              <p className="text-gray-800 text-sm font-medium">
                {getCandidate?.details?.phone_number}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
              <FaEnvelope className="text-green-600 text-sm" />
            </span>
            <div>
              <p className="text-gray-600 text-xs">Email</p>
              <p className="text-gray-800 text-sm font-medium break-all">
                {getCandidate?.details?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Qualifications */}
        {item.certificate && item.certificate.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex-shrink-0 w-6 h-6 bg-green-50 rounded flex items-center justify-center">
                <FaGraduationCap className="text-green-600 text-xs" />
              </div>
              <h4 className="font-bold text-gray-800">Qualifications</h4>
            </div>
            <div className="space-y-3">
              {item.certificate.map((q, index) => (
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
                        {q.year_attended} - {q.year_of_graduation || "Present"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* One Work Experience Row */}
        {item.company_name && (
          <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-green-500 mb-4">
            <h4 className="font-semibold text-gray-800 text-sm">
              Work Experience
            </h4>
            <p className="text-sm text-gray-600 mt-1">{item.company_name}</p>
            <p className="text-gray-700 font-medium">{item.position_held}</p>
            <p className="text-xs text-gray-500 mt-1">
              {item.start_date} - {item.end_date || "Present"}
            </p>
          </div>
        )}

        {/* Files */}
        <div className="flex flex-wrap gap-3 mb-6">
          {item.resume_path && (
            <a
              href={`${IMAGE_URL}/${item.resume_path}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-green-50 hover:bg-green-100 text-green-700 px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <FaDownload className="text-sm" />
              <span className="text-sm font-medium">Resume</span>
            </a>
          )}
          {item.portfolio_path && (
            <a
              href={`${IMAGE_URL}/${item.portfolio_path}`}
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
    </div>
  );
};

export default SelectResume;
