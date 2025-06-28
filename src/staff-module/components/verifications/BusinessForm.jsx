import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import FormButton from "../../../components/FormButton";
import { axiosClient } from "../../../services/axios-client";
import { AuthContext } from "../../../context/AuthContex";
import { onFailure } from "../../../utils/notifications/OnFailure";
import { onSuccess } from "../../../utils/notifications/OnSuccess";
import { FormatError } from "../../../utils/formmaters";
import ConfirmationPopUp from "./ConfirmationPopUp";

const formFields = ["business_identification_no", "business_file"];

const labelMapping = {
  /*business_name: "Business Name",
  business_email: "Business Email",
  business_phone_no: "Business Phone Number",
  whatsapp_phone_no: "WhatsApp Phone Number",
  business_registration_no: "Business Registration No.",
  business_address: "Business Address",
  business_location: "Business Location",
  year_of_incorporation: "Year of Incorporation",*/
  business_identification_no: "Business ID",
  business_file: "Business Document",
};

function BusinessForm() {
  const { authDetails } = useContext(AuthContext);
  const [currentBusiness, setCurrentBusiness] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const [fileError, setFileError] = useState("");
  const [formData, setFormData] = useState({
    business_name: "",
    business_email: "",
    business_phone_no: "",
    whatsapp_phone_no: "",
    business_registration_no: "",
    business_address: "",
    business_location: "",
    year_of_incorporation: "",
    business_identification_no: "",
    business_file: null,
  });

  const client = axiosClient(authDetails?.token);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ message: "", error: "" });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setFileError("File size exceeds 2MB.");
        setFilePreview(null);
        setFormData({ ...formData, business_file: null });
      } else {
        setFileError("");
        setFilePreview(URL.createObjectURL(file));
        setFormData({ ...formData, business_file: file });
      }
    }
  };

  const submitDetails = async () => {
    setIsLoading(true);
    const submissionData = new FormData();
    if (!formData?.business_file) {
      FormatError(error, setError, "Retrieval Failed");
      return;
    }
    Object.keys(formData).forEach((key) => {
      if (key === "business_file" && formData[key]) {
        submissionData.append(key, formData[key]);
      } else {
        submissionData.append(key, formData[key]);
      }
    });
    submissionData.append("domestic_staff_id", String(authDetails.user.id));

    try {
      const response = await client.post("/business", submissionData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
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
    submitDetails();
  };

  const getBusinessDetails = async () => {
    setLoading(true);
    try {
      const { data } = await client.get(
        `/business/domestic/${authDetails.user.id}`
      );
      setCurrentBusiness(data?.businesses[0]);
    } catch (error) {
      const message = error?.response?.data?.message;
      if (message !== "No businesses found for this domestic staff") {
        FormatError(error, setError, "Retrieval Failed");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBusinessDetails();
  }, []);

  useEffect(() => {
    if (
      error.error &&
      error.message !== "No businesses found for this domestic staff"
    ) {
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
        <div className="grid grid-cols-2 gap-x-3 gap-y-5 p-2 w-full text-gray-700">
          {formFields.map((fieldKey) => {
            const labelText =
              labelMapping[fieldKey] || fieldKey.replace(/_/g, " ");
            const value =
              fieldKey === "business_file"
                ? currentBusiness["business_file_path"]
                : currentBusiness[fieldKey];
            return (
              <div key={fieldKey} className="flex flex-col">
                <label className="font-semibold text-gray-800">
                  {labelText}
                </label>
                {fieldKey === "business_file" && value ? (
                  <>
                    {value.endsWith(".pdf") ||
                    value.endsWith(".doc") ||
                    value.endsWith(".docx") ? (
                      <a
                        href={`${import.meta.env.VITE_IMAGE_URL}/${value}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View Document
                      </a>
                    ) : (
                      <img
                        src={`${import.meta.env.VITE_IMAGE_URL}/${value}`}
                        alt="Business File"
                        className="max-w-xs max-h-40 object-contain border border-gray-300 rounded"
                      />
                    )}
                    <a
                      href={`${import.meta.env.VITE_IMAGE_URL}/${value}`}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 underline text-sm mt-1"
                    >
                      Download File
                    </a>
                  </>
                ) : (
                  <p className="bg-gray-100 p-2 rounded border border-gray-200 overflow-hidden">
                    {value || "—"}
                  </p>
                )}
              </div>
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
            const labelText =
              labelMapping[currentKey] || currentKey.replace(/_/g, " ");
            const inputType =
              currentKey === "year_of_incorporation" ? "number" : "text";

            return (
              <div className="flex flex-col gap-1" key={currentKey}>
                <label className="capitalize font-medium">{labelText}</label>
                {currentKey === "business_file" ? (
                  <>
                    <input
                      className="p-1 border focus:outline-none border-gray-500 rounded-md"
                      type="file"
                      accept="image/*, .pdf"
                      onChange={handleFileChange}
                    />
                    {fileError && (
                      <span className="text-red-500 text-sm">{fileError}</span>
                    )}
                    {filePreview && (
                      <div className="mt-2">
                        <h3 className="font-medium">File Preview:</h3>
                        <img
                          src={filePreview}
                          alt="file preview"
                          className="max-w-xs max-h-40 object-contain"
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <input
                    className="p-1 border focus:outline-none border-gray-500 rounded-md"
                    type={inputType}
                    value={formData[currentKey]}
                    onChange={(e) =>
                      setFormData({ ...formData, [currentKey]: e.target.value })
                    }
                    required
                  />
                )}
              </div>
            );
          })}
          <div></div>
          <FormButton loading={isLoading}>Save Business Details</FormButton>
        </form>
      )}

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
