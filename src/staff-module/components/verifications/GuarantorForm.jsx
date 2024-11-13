import { useForm } from "react-hook-form";
import FormButton from "../../../components/FormButton";
import { useContext, useEffect, useState } from "react";
import { axiosClient } from "../../../services/axios-client";
import { AuthContext } from "../../../context/AuthContex";
import { onFailure } from "../../../utils/notifications/OnFailure";
import { onSuccess } from "../../../utils/notifications/OnSuccess";
import { FormatError } from "../../../utils/formmaters";

const formFields = [
  "surname",
  "first_name",
  "mobile_phone",
  "dob",
  "email",
  "occupation",
  "residential_address",
  "near_bus_stop",
  "close_landmark",
];

function GuarantorForm() {
  const { authDetails } = useContext(AuthContext);
  const [currentGurantor, setCurrentGarantor] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const client = axiosClient(authDetails?.token);
  const { register, handleSubmit, setValue } = useForm();
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
        formFields.forEach((field) => setValue(field, data.guarantor[0][field]));
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
      <h1 className="text-xl font-semibold text-green-700">Guarantor Details</h1>
      
      {loading && (
        <div className="flex flex-col items-start justify-center h-full w-full">
          <span>Fetching data...</span>
        </div>
      )}

      {currentGurantor && !isEditMode && (
        <div>
          <button onClick={toggleEditMode} className="mb-4 text-blue-600">Edit</button>
          <div className="grid grid-cols-2 gap-x-3 gap-y-5 p-2 w-full text-gray-600">
            {garatorFields().map((currentKey) => {
              const value = currentGurantor[currentKey];
              const labelText = currentKey.replace(/_/g, " ").toUpperCase();
              return (
                <div className="flex flex-col gap-1" key={currentKey}>
                  <label>{labelText}</label>
                  <label>{value}</label>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {isEditMode && (
        <form
          onSubmit={handleSubmit(submitDetails)}
          className="grid grid-cols-2 gap-x-3 gap-y-5 p-2 w-full text-gray-600"
        >
          {formFields.map((currentKey) => {
            const labelText = currentKey.replace(/_/g, " ").toUpperCase();
            const inputType = currentKey === "dob" ? "date" : "text";
            return (
              <div className="flex flex-col gap-1" key={currentKey}>
                <label>{labelText}</label>
                <input
                  className="p-1 border focus:outline-none border-gray-900 rounded-md"
                  type={inputType}
                  required
                  {...register(currentKey)}
                />
              </div>
            );
          })}
          <FormButton loading={isLoading}>Save Changes</FormButton>
          <button type="button" onClick={toggleEditMode} className="text-red-600">Cancel</button>
        </form>
      )}
    </div>
  );
}

export default GuarantorForm;
