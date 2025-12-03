import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { onFailure } from "../../../utils/notifications/OnFailure";
import { onSuccess } from "../../../utils/notifications/OnSuccess";
import { FormatError } from "../../../utils/formmaters";
import FormButton from "../../../components/FormButton";
import { axiosClient } from "../../../services/axios-client";
import ConfirmationPopUp from "./ConfirmationPopUp";
import { useLocationService } from "../../../services/locationService";

const formFields = ["station_address", "nin_number"];

function PoliceReportForm({ authDetails, onSuccess: onUploadSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { getCountries } = useLocationService();
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectState, setSelectState] = useState();
  const [selectCity, setSelectCity] = useState();

  const [policeFile, setPoliceFile] = useState(null);
  const [ninFile, setNinFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentPoliceReport, setCurrentPoliceReport] = useState(undefined);
  const client = axiosClient(authDetails?.token, true);

  const [formDataValues, setFormDataValues] = useState(null);

  const handlePreviewSubmit = (data) => {
    setFormDataValues(data);
    setShowConfirmation(true);
  };

  const getPoliceReport = async () => {
    setLoading(true);
    try {
      const { data } = await client.get(
        `/domesticStaff/police-report/${authDetails.user.id}`
      );
      setCurrentPoliceReport(data.policeReport ?? null);
    } catch (error) {
      FormatError(error, null, "Retrieval Failed");
      setCurrentPoliceReport(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPoliceReport();
  }, []);

  // 2. Fetch countries ONLY if no residence
  useEffect(() => {
    if (currentPoliceReport === null) {
      const fetchCountries = async () => {
        try {
          const response = await getCountries(true);
          setCountries(response.data || []);
        } catch (error) {
          console.error("Error fetching countries:", error);
        }
      };
      fetchCountries();
    }
  }, [currentPoliceReport]);

  const handleConfirmedSubmit = async () => {
    if (!policeFile) {
      return onFailure({
        error: "Missing Report",
        message: "Please upload a police report document.",
      });
    }

    if (!ninFile) {
      return onFailure({
        error: "Missing NIN",
        message: "Please upload your NIN slip or ID.",
      });
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("state", selectState?.name);
      formData.append("lga", selectCity);
      formData.append("station_address", formDataValues.station_address);
      formData.append("nin_number", formDataValues.nin_number);
      formData.append("police_report_file", policeFile);
      formData.append("nin_slip_file", ninFile);
      formData.append("domestic_staff_id", authDetails.user.id);

      await client.post("/domesticStaff/police-report", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onSuccess({
        message: "Details submitted",
        success: "Police and NIN records uploaded successfully",
      });
      onUploadSuccess();
    } catch (error) {
      FormatError(error, null, "Upload failed");
    } finally {
      setLoading(false);
      setShowConfirmation(false);
    }
  };

  // 🟢 If residence exists, don’t render the form at all
  if (currentPoliceReport && currentPoliceReport.id) {
    return (
      <div className="p-4 border rounded-md bg-gray-100 text-gray-700">
        <p>You already have a police report on file.</p>
      </div>
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handlePreviewSubmit)}
        className="grid grid-cols-2 gap-x-3 gap-y-5 p-2 w-full text-gray-600"
      >
        {/* Country */}
        <label className="flex flex-col gap-1">
          <span className="font-medium">Country</span>
          <select
            onChange={(e) => {
              const country = countries.find((c) => c.name === e.target.value);
              setSelectedCountry(country);
            }}
            className="p-1 border border-gray-500 rounded-md"
          >
            <option value="">-- select --</option>
            {countries?.map((country) => (
              <option key={country.id} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </label>

        {/* State */}
        <label className="flex flex-col gap-1">
          <span className="font-medium">State</span>
          <select
            onChange={(e) => {
              const state = selectedCountry?.states?.find(
                (c) => c.name === e.target.value
              );
              setSelectState(state);
            }}
            className="p-1 border border-gray-500 rounded-md"
          >
            <option value="">-- select --</option>
            {selectedCountry?.states?.map((state) => (
              <option key={state.id} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </label>

        {/* LGA */}
        <label className="flex flex-col gap-1">
          <span className="font-medium">Local Government</span>
          <select
            onChange={(e) => {
              const lga = selectState?.lgas?.find(
                (c) => c.name === e.target.value
              );
              setSelectCity(lga?.name);
            }}
            className="p-1 border border-gray-500 rounded-md"
          >
            <option value="">-- select --</option>
            {selectState?.lgas?.map((city) => (
              <option key={city.id} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </label>

        {/* Text Inputs */}
        {formFields.map((key) => (
          <div key={key} className="flex flex-col gap-1">
            <label className="capitalize font-medium">
              {key.replace(/_/g, " ")}
            </label>
            <input
              type="text"
              className="p-1 border border-gray-500 rounded-md"
              {...register(key)}
            />
          </div>
        ))}

        {/* Police Report Upload */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Upload Police Report</label>
          <input
            type="file"
            accept=".pdf,.jpeg,.jpg"
            onChange={(e) => setPoliceFile(e.target.files?.[0])}
            className="p-1 border border-gray-500 rounded-md"
          />
        </div>

        {/* NIN Slip Upload */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Upload NIN Slip / ID</label>
          <input
            type="file"
            accept=".pdf,.jpeg,.jpg"
            onChange={(e) => setNinFile(e.target.files?.[0])}
            className="p-1 border border-gray-500 rounded-md"
          />
        </div>

        <div></div>
        <FormButton loading={loading}>Upload Police Records</FormButton>
      </form>

      <ConfirmationPopUp
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmedSubmit}
        message="Ensure your details are correct before proceeding. If you need to make changes later, contact the admin."
      />
    </>
  );
}

export default PoliceReportForm;
