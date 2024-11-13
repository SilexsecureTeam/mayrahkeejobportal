import { useForm } from "react-hook-form";
import FormButton from "../../../components/FormButton";
import { useContext, useEffect, useState } from "react";
import { axiosClient } from "../../../services/axios-client";
import { AuthContext } from "../../../context/AuthContex";
import { onFailure } from "../../../utils/notifications/OnFailure";
import { onSuccess } from "../../../utils/notifications/OnSuccess";
import { FormatError } from "../../../utils/formmaters";
import { FaEdit } from "react-icons/fa";

const formFields = [
  "title",    
  "surname",
  "first_name",
  "mobile_phone",
  "dob",
  "email",
  "occupation",
  "residential_address",
  "near_bus_stop",
  "close_landmark",
  "religion",
];

function GuarantorForm() {
  const { authDetails } = useContext(AuthContext);
  const [currentGurantor, setCurrentGarantor] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const client = axiosClient(authDetails?.token);
  const { register, handleSubmit, setValue, watch } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ message: "", error: "" });

  const toggleEditMode = () => setIsEditMode(!isEditMode);

  const submitDetails = async (data) => {
    setIsLoading(true);
    try {
      const response = await client.post("/domesticStaff/guarantor", {
        ...data,
        domestic_staff_id: authDetails.user.id,
      });
      console.log("Data", response.data);
      getGarantor();
      onSuccess({
        message: "Guarantor updated",
        success: "Submitted successfully, awaiting review",
      });
      setIsEditMode(false);
    } catch (error) {
      FormatError(error, setError, "Upload Failed");
    } finally {
      setIsLoading(false);
    }
  };

  const garatorFields = () => {
    const fields = [];
    Object.keys(currentGurantor)?.forEach((current) => {
      if (!["id", "domestic_staff_id", "created_at", "updated_at"].includes(current)) {
        fields.push(current);
      }
    });
    return fields;
  };

  const getGarantor = async () => {
    setLoading(true);
    try {
      const { data } = await client.get(`/domesticStaff/guarantor/${authDetails.user.id}`);
      setCurrentGarantor(data.guarantor[0]);
      if (data.guarantor[0]) {
        formFields.forEach((field) => setValue(field, data.guarantor[0][field] || "")); // Set value for all fields, including 'title'
      }
    } catch (error) {
      FormatError(error, setError, "Retrieval Failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGarantor();
  }, []);

  useEffect(() => {
    if (error.error && error.message) {
      onFailure(error);
    }
  }, [error.error, error.message]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-green-700">Guarantor Details</h1>
        {!isEditMode && (
          <FaEdit
            onClick={toggleEditMode}
            className="text-blue-600 cursor-pointer"
            size={20}
          />
        )}
      </div>

      {loading && (
        <div className="flex flex-col items-start justify-center h-full w-full">
          <span>Fetching data...</span>
        </div>
      )}

      {currentGurantor && !isEditMode && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-5 p-2 w-full text-gray-600">
            {garatorFields().map((currentKey) => {
              const value = currentGurantor[currentKey];
              const labelText = currentKey.replace(/_/g, " ").toUpperCase();
              return (
                <div className="flex flex-col gap-1" key={currentKey}>
                  <label>{labelText}</label>
                  <label className="break-words">{value}</label> {/* Added break-words for email overflow */}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {isEditMode && (
        <form
          onSubmit={handleSubmit(submitDetails)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-5 p-2 w-full text-gray-600"
        >
          {formFields.map((currentKey) => {
            const labelText = currentKey.replace(/_/g, " ").toUpperCase();
            const inputType = currentKey === "dob" ? "date" : "text";

            return (
              <div className="flex flex-col gap-1" key={currentKey}>
                <label>{labelText}</label>
                {currentKey === "religion" ? (
                  <select
                    className="p-1 border focus:outline-none border-gray-900 rounded-md"
                    required
                    {...register(currentKey)}
                  >
                    <option value="Christianity">Christianity</option>
                    <option value="Islam">Islam</option>
                    <option value="Traditional Religion">Traditional Religion</option>
                    <option value="Hinduism">Hinduism</option>
                    <option value="Buddhism">Buddhism</option>
                    <option value="Sikhism">Sikhism</option>
                    <option value="Judaism">Judaism</option>
                    <option value="Baha'i">Baha'i</option>
                    <option value="Others">Others</option>
                  </select>
                ) : currentKey === "title" ? (
                  <select
                    className="p-1 border focus:outline-none border-gray-900 rounded-md"
                    required
                    {...register(currentKey)}
                  >
                    <option value="MR">MR</option>
                    <option value="MRS">MRS</option>
                    <option value="Others">Others</option>
                  </select>
                ) : (
                  <input
                    className="p-1 border focus:outline-none border-gray-900 rounded-md"
                    type={inputType}
                    required
                    {...register(currentKey)}
                  />
                )}
              </div>
            );
          })}
          <div className="flex gap-4 col-span-2 justify-between">
            <FormButton loading={isLoading}>Save Changes</FormButton>
            <button
              type="button"
              onClick={toggleEditMode}
              className="text-red-600 border border-red-600 rounded-md p-1"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default GuarantorForm;
