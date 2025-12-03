import { useContext, useState } from "react";
import { BASE_URL } from "../../../../utils/base";
import axios from "axios";
import { AuthContext } from "../../../../context/AuthContex";
import { onSuccess } from "../../../../utils/notifications/OnSuccess";
import { onFailure } from "../../../../utils/notifications/OnFailure";
import { Link, useNavigate } from "react-router-dom";
import { extractErrorMessage } from "../../../../utils/formmaters";
import SelectResume from "./SelectResume";

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
                    <SelectResume
                      item={item}
                      active={active}
                      handleActive={handleActive}
                      getCandidate={getCandidate}
                    />
                  );
                })
              ) : (
                <div className="flex flex-col gap-2 items-center justify-center mx-auto">
                  <p className="text-sm text-gray-700">
                    Please you need to create a resume
                  </p>
                  <Link
                    to="/applicant/my-resume"
                    state={{
                      redirectTo: "/applicant/find-job",
                      jobId: job.id,
                      from: "job-application",
                    }}
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
