import React, { useContext, useEffect, useState } from "react";
import { BASE_URL, IMAGE_URL } from "../../../../utils/base";
import axios from "axios";
import { AuthContext } from "../../../../context/AuthContex";
import { ResourceContext } from "../../../../context/ResourceContext";
import { onSuccess } from "../../../../utils/notifications/OnSuccess";
import { onFailure } from "../../../../utils/notifications/OnFailure";
import { FcApproval } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { extractErrorMessage } from "../../../../utils/formmaters";
import {
  FaDownload,
  FaEnvelope,
  FaGraduationCap,
  FaPhone,
} from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
const JobForm = ({
  setIsOpen,
  getCandidate,
  job,
  resume,
  updateAllApplications,
}) => {
  const navigate = useNavigate();
  const { authDetails } = useContext(AuthContext);

  const [errorMsg, setErrorMsg] = useState(null);
  const [showMsg, setShowMsg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resumePicker, setResumePicker] = useState(false);
  const [activeResume, setActiveResume] = useState("");

  const [details, setDetails] = useState({
    candidate_id: getCandidate?.candidateAuth?.id,
    job_id: job.id,
    full_name: `${getCandidate?.candidateAuth?.first_name} ${getCandidate?.candidateAuth?.last_name}`,
    email: getCandidate?.candidateAuth?.email,
    phone_number: getCandidate?.details?.phone_number,
    job_title: job.job_title,
    employer_id: job.employer_id,
    resume_id: "",
    status: "in-review",
    // linkedin_url: "",
    // portfolio_url: "",
    additional_information: "",
    resume_path: "",
  });
  const user = authDetails?.user;

  function handleActive(id) {
    setActiveResume(id);
    setDetails((prev) => ({ ...prev, resume_id: id }));
  }

  const handleOnChange = (e) => {
    const { value, name, files, type, checked } = e.target;
    if (name === "resume") {
      setResumePicker(true);
    }
    setDetails((prev) => {
      return {
        ...prev,
        [name]:
          type === "checkbox" ? checked : type === "file" ? files[0] : value,
        // [name]: name === 'cv' ? files[0] : value,
      };
    });
    setErrorMsg(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateAllApplications((prev) => {
      return {
        ...prev,
        isDataNeeded: false,
      };
    });
    setErrorMsg(null);
    setLoading(true);
    axios
      .post(`${BASE_URL}/apply`, details, {
        headers: {
          Authorization: `Bearer ${authDetails.token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        onSuccess({
          message: "New Application",
          success: response.data.message,
        });
        updateAllApplications((prev) => {
          return {
            ...prev,
            isDataNeeded: true,
          };
        });
        setLoading(false);
        setIsOpen(false);
        navigate("/applicant/find-job");
      })
      .catch((error) => {
        console.log(error);
        onFailure({
          message: "Job Application Failed!",
          error: extractErrorMessage(error),
        });
        setLoading(false);
      });
  };

  const handleSuccess = () => {
    onSuccess({
      message: "New Job",
      success: "Job Created Successfully",
    });
  };
  return (
    <div className="text-[#515B6F]">
      <div className="my-4">
        <div className="update_form py-6">
          <div>
            <div className="grid md:grid-cols-2 gap-3 mb-4">
              {resume && resume.length > 0 ? (
                resume.map((item) => {
                  const active = activeResume === item.id;

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
                          <p className="text-gray-600 text-xs">
                            Professional Resume
                          </p>
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
                              <h4 className="font-bold text-gray-800">
                                Qualifications
                              </h4>
                            </div>
                            <div className="space-y-3">
                              {item.certificate.map((q, index) => (
                                <div
                                  key={index}
                                  className=" rounded-lg p-4 bg-amber-50"
                                >
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
                        {/* One Work Experience Row */}
                        {item.company_name && (
                          <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-green-500 mb-4">
                            <h4 className="font-semibold text-gray-800 text-sm">
                              Work Experience
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {item.company_name}
                            </p>
                            <p className="text-gray-700 font-medium">
                              {item.position_held}
                            </p>
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
                              <span className="text-sm font-medium">
                                Resume
                              </span>
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
                              <span className="text-sm font-medium">
                                Portfolio
                              </span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col gap-2 items-center justify-center mx-auto">
                  <p className="text-sm text-gray-700">
                    Please you need to create a resume
                  </p>
                  <Link
                    to="/applicant/my-resume"
                    className="rounded-md text-sm px-3 py-1 bg-green-600 text-white font-medium"
                  >
                    Create Resume
                  </Link>
                </div>
              )}
            </div>
            <form onSubmit={handleSubmit}>
              <div className=" md:w-">
                <div className="border-b py-6">
                  <div className="flex">
                    <div className="w-full">
                      {/* <div className="mb-4">
                                                <label className="block">
                                                    <span className="block text-sm font-medium text-slate-700">LinkedIn</span>
                                                    <input type="url" value={details.linkedin_url} name='linkedin_url' placeholder='url' onChange={handleOnChange}
                                                        className="mt-1 block p-1 focus:outline-none w-full border" />
                                                </label>
                                            </div> */}
                      {/* <div className="mb-4">
                                                <label className="block">
                                                    <span className="block text-sm font-medium text-slate-700">Portfolio</span>
                                                    <input type="url" value={details.portfolio_url} name='portfolio_url' placeholder='url' onChange={handleOnChange}
                                                        className="mt-1 block p-1 focus:outline-none w-full border" />
                                                </label>
                                            </div> */}
                      {/* <div className="my-4 pt-5">
                                                <label htmlFor='resume' className="cursor-pointer flex">
                                                    <span className="text-sm  bg-green-100 rounded border p-4 font-medium text-slate-700">Resume</span>
                                                    <span> {resumePicker && (<FcApproval />)}</span>
                                                    <input type="file" id='resume' name='resume' placeholder='url' onChange={handleOnChange}
                                                        className="mt-1 invisible p-1 focus:outline-none w-full border" />
                                                </label>
                                            </div> */}
                      <div className="mb-4">
                        <label className="block">
                          <span className="block text-sm font-medium text-slate-700">
                            Additional Information
                          </span>
                        </label>
                        <textarea
                          value={details.additional_information}
                          name="additional_information"
                          onChange={handleOnChange}
                          className="mt-1 block w-full focus:outline-green-400 border min-h-[100px]"
                          id=""
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                {/* {errorMsg?.stack && (
                                    <div className="py-4 border-b mb-8 text-center">
                                        {Object.keys(errorMsg.stack).map((field) => (
                                            <div key={field}>
                                                {errorMsg.stack[field].map((error, index) => (
                                                    <p className="text-red-700 text-base font-medium" key={index}> {error}</p>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                )} */}
                {errorMsg && (
                  <div className="py-4 border-b mb-8 text-center">
                    <p className="text-red-700 text-base font-medium">
                      {" "}
                      {errorMsg}
                    </p>
                  </div>
                )}
                <button className="rounded border prime_bg text-white px-4 flex justify-center py-2 w-[50%]">
                  Save Profile
                  {loading && (
                    <div className="size-[20px] ml-3 animate-spin rounded-full border-r-4  border- "></div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobForm;
