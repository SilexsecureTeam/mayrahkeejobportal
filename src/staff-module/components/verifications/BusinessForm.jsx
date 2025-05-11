import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import FormButton from "../../../components/FormButton";
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
  const [filePreview, setFilePreview] = useState(null); // State for file preview
  const [fileError, setFileError] = useState(""); // State for file size error
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
    business_file: null, // Initially, the file is null
  });
  const client = axiosClient(authDetails?.token);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    message: "",
    error: "",
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file size (2MB)
      if (file.size > 2 * 1024 * 1024) {
        setFileError("File size exceeds 2MB.");
        setFilePreview(null);
        setFormData({ ...formData, business_file: null });
      } else {
        setFileError("");
        setFilePreview(URL.createObjectURL(file));
        setFormData({ ...formData, business_file: file }); // Update form data with file
      }
    }
  };

  const submitDetails = async () => {
    setIsLoading(true);

    // Create FormData object
    const submissionData = new FormData();

    // Append all fields to FormData
    Object.keys(formData).forEach((key) => {
      if (key === "business_file" && formData[key]) {
        submissionData.append(key, formData[key]); // Append the file
      } else {
        submissionData.append(key, formData[key]);
      }
    });

    // Add the domestic_staff_id as a string
    submissionData.append("domestic_staff_id", String(authDetails.user.id));

    try {
      const response = await client.post("/business", submissionData, {
        headers: {
          "Content-Type": "multipart/form-data", // Make sure to set the content type for FormData
        },
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
    submitDetails(); // Proceed with form submission
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
      setCurrentBusiness(data?.businesses);
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
                {currentKey === "business_file" ? (
                  <>
                    <input
                      className="p-1 border focus:outline-none border-gray-500 rounded-md"
                      type="file"
                      accept="image/*, .pdf"
                      onChange={handleFileChange}
                    />
                    {fileError && <span className="text-red-500 text-sm">{fileError}</span>}
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
                    {currentBusiness && currentBusiness.business_file && (
                      <div className="mt-2">
                        <a
                          href={currentBusiness.business_file} // Link to download or view
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500"
                        >
                          Download/View Uploaded File
                        </a>
                      </div>
                    )}
                  </>
                ) : (
                  <input
                    className="p-1 border focus:outline-none border-gray-500 rounded-md"
                    type={inputType}
                    value={formData[currentKey]}
                    onChange={(e) => setFormData({ ...formData, [currentKey]: e.target.value })}
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
              
