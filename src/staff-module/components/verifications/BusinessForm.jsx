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
  "business_name",
  "business_email",
  "business_phone_no",
  "whatsapp_phone_no",
  "business_registration_no",
  "business_address",
  "business_location",
  "year_of_incorporation",
  "business_identification_no",
  "business_file",
];

const labelMapping = {
  business_name: "Business Name",
  business_email: "Business Email",
  business_phone_no: "Business Phone Number",
  whatsapp_phone_no: "WhatsApp Phone Number",
  business_registration_no: "Business Registration No.",
  business_address: "Business Address",
  business_location: "Business Location",
  year_of_incorporation: "Year of Incorporation",
  business_identification_no: "Business Identification No.",
  business_file: "Business File",
};

function BusinessForm() {
  const { authDetails } = useContext(AuthContext);
  const [currentBusiness, setCurrentBusiness] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const client = axiosClient(authDetails?.token);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    message: "",
    error: "",
  });

  const submitDetails = async (data) => {
    setIsLoading(true);
    try {
      const response = await client.post("/business", {
        ...data,
        domestic_staff_id: authDetails.user.id,
      });
      console.log("Data", response.data);
      getBusinessDetails();
      onSuccess({
        message: "Business Saved",
        success: "Submitted successfully, awaiting review",
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

  const businessFields = () => {
    const fields = [];
    Object.keys(currentBusiness)?.forEach((current) => {
      if (
        current !== "id" &&
        current !== "domestic_staff_id" &&
        current !== "created_at" &&
        current !== "updated_at"
      ) {
        fields.push(current);
      }
    });
    return fields;
  };

  const getBusinessDetails = async () => {
    setLoading(true);
    try {
      const { data } = await client.get(`/business/domestic/${authDetails.user.id}`);
      setCurrentBusiness(data.Business);
    } catch (error) {
      FormatError(error, setError, "Retrieval Failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBusinessDetails();
  }, []);

  useEffect(() => {
    if (error.error && error.message) {
      onFailure(error);
    }
  }, [error.error, error.message]);

  return (
    <div>
      <h1 className="text-xl font-semibold text-green-700">Business Details</h1>
      {typeof currentBusiness === "undefined" && loading && (
        <div className="flex flex-col items-start justify-center h-full w-full">
          <span>Fetching data...</span>
        </div>
      )}

      {typeof currentBusiness !== "undefined" && (
        <div className="grid grid-cols-2 gap-x-3 gap-y-5 p-2 w-full text-gray-600">
          {businessFields()?.map((currentKey) => {
            const value = currentBusiness[currentKey];
            const labelText = labelMapping[currentKey] || null;

            return (
              labelText && (
                <div className="flex flex-col gap-1 break-all" key={currentKey}>
                  <label className="capitalize font-medium">{labelText}</label>
                  <label>{value}</label>
                </div>
              )
            );
          })}
        </div>
      )}

      {typeof currentBusiness === "undefined" && !loading && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsPopupOpen(true);
          }}
          className="grid grid-cols-2 gap-x-3 gap-y-5 p-2 w-full text-gray-600"
        >
          {formFields.map((currentKey) => {
            const labelText = labelMapping[currentKey] || currentKey.replace(/_/g, " ");
            const inputType =
              currentKey === "year_of_incorporation" ? "number" : "text";

            return (
              <div className="flex flex-col gap-1" key={currentKey}>
                <label className="capitalize font-medium">{labelText}</label>
                <input
                  className="p-1 border focus:outline-none border-gray-500 rounded-md"
                  type={inputType}
                  required
                  {...register(currentKey)}
                />
              </div>
            );
          })}

          <div></div>
          <FormButton loading={isLoading}>Save Business Details</FormButton>
        </form>
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

export default BusinessForm;
