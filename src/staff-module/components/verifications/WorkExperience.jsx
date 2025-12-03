import { useForm } from "react-hook-form";
import FormButton from "../../../components/FormButton";
import { useContext, useEffect, useState } from "react";
import { axiosClient } from "../../../services/axios-client";
import { AuthContext } from "../../../context/AuthContex";
import { onFailure } from "../../../utils/notifications/OnFailure";
import { onSuccess } from "../../../utils/notifications/OnSuccess";
import { FormatError } from "../../../utils/formmaters";
import ConfirmationPopUp from "./ConfirmationPopUp"; // Import the popup

const formFields = [
  "company_name",
  "job_title",
  "start_date",
  "end_date",
  "work_description",
  "reason_for_leaving",
];

function WorkExperience() {
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails?.token);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    message: "",
    error: "",
  });
  const [workExperiences, setWorkExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const submitDetails = async (data) => {
    setIsLoading(true);
    try {
      const response = await client.post(
        "/domesticStaff/previous-work-experience",
        {
          ...data,
          domestic_staff_id: authDetails.user.id,
        }
      );
      getWorkExperiences();
      reset();
      onSuccess({
        message: "Experience Saved!",
        success: "Submitted succesfully, awaiting review",
      });
    } catch (error) {
      FormatError(error, setError, "Upload Failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProceed = () => {
    setIsPopupOpen(false);
    handleSubmit(submitDetails)(); // Proceed with form submission
  };

  const getWorkExperiences = async () => {
    setLoading(true);
    try {
      const { data } = await client.get(
        `/domesticStaff/previous-work-experience/${authDetails.user.id}`
      );
      setWorkExperiences(data.PreviousWorkExperience);
    } catch (error) {
      FormatError(error, setError, "Retrieval Failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWorkExperiences();
  }, []);

  useEffect(() => {
    if (error.error && error.message) {
      onFailure(error);
    }
  }, [error.error, error.message]);

  return (
    <div>
      <h1 className="text-xl font-semibold text-green-700">
        Previous Work Experience
      </h1>

      {
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsPopupOpen(true);
          }}
          className="grid grid-cols-2 gap-x-3 gap-y-5 p-2 w-full text-gray-600"
        >
          {formFields.map((currentKey) => {
            const detail = formFields[currentKey];
            let labelText;

            if (currentKey === "company_name") {
              labelText = currentKey.replace(/_/g, " ") + " / Employer's Name";
            } else {
              labelText = currentKey.replace(/_/g, " ");
            }

            const inputType =
              currentKey == "start_date" || currentKey == "end_date"
                ? "date"
                : "text";
            return (
              <div className="flex flex-col gap-1">
                <label className="capitalize font-medium">{labelText}</label>
                <input
                  className="p-1 border focus:outline-none border-gray-900  rounded-md"
                  type={inputType}
                  required
                  defaultValue={detail}
                  {...register(currentKey)}
                />
              </div>
            );
          })}

          <FormButton loading={isLoading}>Save Work Experience</FormButton>
        </form>
      }

      {typeof workExperiences == "undefined" && loading && (
        <div className="flex flex-col items-start justify-center h-full w-full">
          <span>Fetching data...</span>
        </div>
      )}

      {workExperiences.length > 0 && (
        <div className="flex flex-col mt-5">
          {workExperiences.map((current, index) => (
            <div
              key={current.id ?? index}
              className="flex flex-col gap-y-4 border-b pb-4 pt-2 w-full text-gray-700"
            >
              {/* Company + Job Title */}
              <div className="flex flex-col">
                <span className="font-semibold text-lg text-gray-900">
                  {index + 1}. {current.company_name}
                </span>

                <span className="pl-6 text-primaryColor font-medium tracking-wide">
                  {current.job_title}
                </span>
              </div>

              {/* Duration */}
              <div className="flex flex-col pl-6">
                <span className="font-semibold text-gray-800">Duration</span>
                <span className="text-gray-600">
                  {new Date(current.start_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}{" "}
                  —{" "}
                  {new Date(current.end_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}
                </span>
              </div>

              {/* Work Description */}
              <div className="flex flex-col pl-6">
                <span className="font-semibold text-gray-800">Description</span>
                <span className="text-gray-600 leading-relaxed">
                  {current.work_description}
                </span>
              </div>

              {/* Reason for Leaving */}
              <div className="flex flex-col pl-6">
                <span className="font-semibold text-gray-800">
                  Reason for Leaving
                </span>
                <span className="text-gray-600">
                  {current.reason_for_leaving}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Popup */}
      <ConfirmationPopUp
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onConfirm={handleProceed}
        message="Ensure your details are correct before proceeding. If you need to make changes later, contact the admin."
      />
    </div>
  );
}

export default WorkExperience;
