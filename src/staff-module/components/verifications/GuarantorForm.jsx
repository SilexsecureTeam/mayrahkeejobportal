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
  const client = axiosClient(authDetails?.token);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ message: "", error: "" });

  const submitDetails = async (data) => {
    setIsLoading(true);
    try {
      const endpoint = currentGurantor
        ? `/domesticStaff/guarantor/${currentGurantor.id}`
        : "/domesticStaff/guarantor";
      const method = currentGurantor ? "put" : "post";
      
      const response = await client[method](endpoint, {
        ...data,
        domestic_staff_id: authDetails.user.id,
      });
      
      console.log("Data", response.data);
      getGarantor();
      onSuccess({
        message: "Guarantor details saved",
        success: currentGurantor ? "Updated successfully" : "Submitted successfully",
      });
    } catch (error) {
      FormatError(error, setError, currentGurantor ? "Update Failed" : "Upload Failed");
    } finally {
      setIsLoading(false);
    }
  };

  const getGarantor = async () => {
    setLoading(true);
    try {
      const { data } = await client.get(`/domesticStaff/guarantor/${authDetails.user.id}`);
      setCurrentGarantor(data.guarantor[0]);

      // Pre-fill the form if editing
      if (data.guarantor[0]) {
        formFields.forEach(field => setValue(field, data.guarantor[0][field]));
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

      {(!loading || currentGurantor) && (
        <form
          onSubmit={handleSubmit(submitDetails)}
          className="grid grid-cols-2 gap-x-3 gap-y-5 p-2 w-full text-gray-600"
        >
          <div className="flex flex-col gap-1">
            <label>TITLE</label>
            <select
              className="p-1 border focus:outline-none border-gray-900  rounded-md"
              required
              {...register("title")}
            >
              <option>MR</option>
              <option>MRS</option>
              <option>Others</option>
            </select>
          </div>
          
          {formFields.map((currentKey) => (
            <div className="flex flex-col gap-1" key={currentKey}>
              <label>{currentKey.replace(/_/g, " ").toUpperCase()}</label>
              <input
                className="p-1 border focus:outline-none border-gray-900  rounded-md"
                type={currentKey === "dob" ? "date" : "text"}
                required
                {...register(currentKey)}
              />
            </div>
          ))}
          
          <div className="flex flex-col gap-1">
            <label>Religion</label>
            <select
              required
              className="p-1 border focus:outline-none border-gray-900  rounded-md"
              {...register("religion")}
            >
              <option>Christianity</option>
              <option>Islam</option>
              <option>Traditional Religion</option>
              <option>Hinduism</option>
              <option>Buddhism</option>
              <option>Sikhism</option>
              <option>Judaism</option>
              <option>Baha'i</option>
              <option>Others</option>
            </select>
          </div>
          <div></div>
          <FormButton loading={isLoading}>
            {currentGurantor ? "Update Guarantor Details" : "Upload Guarantor Details"}
          </FormButton>
        </form>
      )}
    </div>
  );
}

export default GuarantorForm;
