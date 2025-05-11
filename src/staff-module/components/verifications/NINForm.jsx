import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContex";
import { axiosClient } from "../../../services/axios-client";
import { FormatError } from "../../../utils/formmaters";
import { onSuccess } from "../../../utils/notifications/OnSuccess";
import { onFailure } from "../../../utils/notifications/OnFailure";
import FormButton from "../../../components/FormButton";
import ConfirmationPopUp from "./ConfirmationPopUp";

const labelMapping = {
  identity_name: "Identity Name",
  identity_no: "NIN Number",
  status: "Verification Status",
  file: "Uploaded File",
};

function NINForm() {
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails?.token);

  const [ninData, setNinData] = useState(undefined);
  const [formData, setFormData] = useState({
    identity_name: "NIN",
    identity_no: "",
    file: null,
  });

  const [filePreview, setFilePreview] = useState(null);
  const [fileError, setFileError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [error, setError] = useState({ message: "", error: "" });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setFileError("File size exceeds 2MB.");
        setFormData({ ...formData, file: null });
        setFilePreview(null);
      } else {
        setFileError("");
        setFormData({ ...formData, file });
        setFilePreview(URL.createObjectURL(file));
      }
    }
  };

  const fetchNin = async () => {
    try {
      const { data } = await client.get(`/nin/domestic/${authDetails.user.id}`);
      setNinData(data?.nin);
    } catch (err) {
      if (err?.response?.data?.message !== "No nin found for this domestic staff") {
        FormatError(err, setError, "Retrieval Failed");
      }
    }
  };

  const submitNin = async () => {
    setIsLoading(true);
    const submissionData = new FormData();
    submissionData.append("identity_name", formData.identity_name);
    submissionData.append("identity_no", formData.identity_no);
    submissionData.append("file", formData.file);
    submissionData.append("domestic_staff_id", String(authDetails.user.id));

    try {
      const { data } = await client.post("/nin", submissionData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onSuccess({
        message: "NIN Submitted",
        success: "Submitted successfully, awaiting verification",
      });
      fetchNin();
    } catch (err) {
      FormatError(err, setError, "Upload Failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProceed = () => {
    setIsPopupOpen(false);
    submitNin();
  };

  useEffect(() => {
    fetchNin();
  }, []);

  useEffect(() => {
    if (error.error && error.message) {
      onFailure(error);
    }
  }, [error.error, error.message]);

  return (
    <div className="w-full">
      <h1 className="text-xl font-semibold text-green-700">NIN Details</h1>

      {typeof ninData !== "undefined" ? (
        <div className="grid grid-cols-2 gap-4 mt-4 text-gray-700">
          {Object.entries(ninData).map(([key, value]) => {
            if (["id", "domestic_staff_id", "created_at", "updated_at"].includes(key))
              return null;

            const label = labelMapping[key] || key;

            return (
              <div key={key} className="flex flex-col">
                <label className="font-semibold">{label}</label>
                {key === "file" ? (
                  <>
                    {value.endsWith(".pdf") ? (
                      <a
                        href={value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View Uploaded PDF
                      </a>
                    ) : (
                      <img
                        src={value}
                        alt="NIN file"
                        className="max-w-xs max-h-40 object-contain border border-gray-300 rounded"
                      />
                    )}
                    <a
                      href={value}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 underline text-sm mt-1"
                    >
                      Download File
                    </a>
                  </>
                ) : (
                  <p className="bg-gray-100 p-2 rounded border border-gray-300">
                    {value}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsPopupOpen(true);
          }}
          className="grid grid-cols-2 gap-4 mt-4 text-gray-700"
        >
          <div className="flex flex-col">
            <label className="font-semibold">NIN Number</label>
            <input
              type="text"
              value={formData.identity_no}
              onChange={(e) => setFormData({ ...formData, identity_no: e.target.value })}
              required
              className="border border-gray-400 rounded p-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">Upload NIN File</label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              className="border border-gray-400 rounded p-2"
              required
            />
            {fileError && <span className="text-red-500 text-sm">{fileError}</span>}
            {filePreview && (
              <img
                src={filePreview}
                alt="Preview"
                className="mt-2 max-w-xs max-h-40 border rounded object-contain"
              />
            )}
          </div>

          <div></div>
          <FormButton loading={isLoading}>Submit NIN</FormButton>
        </form>
      )}

      <ConfirmationPopUp
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onConfirm={handleProceed}
        message="Ensure your NIN and file are correct before submission. You may not be able to edit later."
      />
    </div>
  );
}

export default NINForm;
        
