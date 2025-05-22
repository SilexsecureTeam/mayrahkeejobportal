import React, { useEffect, useState, useContext } from "react";
import { axiosClient } from "../../../services/axios-client";
import { AuthContext } from "../../../context/AuthContex";
import { ClipLoader } from "react-spinners";
import { FaArrowLeftLong } from 'react-icons/fa6';
const ManageCharges = () => {
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails?.token, true);

  const [charges, setCharges] = useState({
    service_charge: "",
    vat_percent: "",
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchCharges = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await client.get("/staff-price");
      setCharges({
        service_charge: res.data.service_charge || "",
        vat_percent: res.data.vat_percent || "",
      });
    } catch {
      setError("Failed to fetch charges.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Allow clearing input
    if (value === "") {
      return setCharges((prev) => ({ ...prev, [name]: "" }));
    }

    const numericValue = parseFloat(value);

    // For percentage fields, restrict to 0–100
    if (
      (name === "vat_percent") &&
      (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 100)
    ) {
      setCharges((prev) => ({ ...prev, [name]: value }));
    }

    // For service_fee (not percentage), just allow non-negative values
    if (name === "service_charge" && !isNaN(numericValue) && numericValue >= 0) {
      setCharges((prev) => ({ ...prev, [name]: value }));
    }
  };


  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccessMessage("");
    try {
      await client.post("/staff-price", charges);
      setSuccessMessage("Charges updated successfully.");
    } catch {
      setError("Failed to update charges.");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchCharges();
  }, []);

  return (
    <>
    <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="flex items-center gap-2 outline outline-offset-5 outline-green-500 px-4 py-2 rounded text-green-500 hover:bg-green-100"
                >
                    <FaArrowLeftLong className="me-4 text-green-500" />Back
                </button>
    
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Company Charges
      </h2>

      {loading ? (
        <div className="flex justify-center py-8">
          <ClipLoader color="#10B981" />
        </div>
      ) : (
        <>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Service Charge (₦)
              </label>
              <input
                type="number"
                name="service_charge"
                value={charges?.service_charge}
                onChange={handleChange}
                min="0"
                step="any"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="e.g. 1000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                VAT Rate (%)
              </label>
              <input
                type="number"
                name="vat_percent"
                value={charges.vat_percent}
                onChange={handleChange}
                min="0"
                max="100"
                step="any"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="e.g. 7.5"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className={`px-6 py-2 font-medium text-white rounded-lg transition ${saving
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
                }`}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
          )}
          {successMessage && (
            <p className="text-green-600 text-sm mt-4 text-center">
              {successMessage}
            </p>
          )}
        </>
      )}
    </div>
    </>
  );
};

export default ManageCharges;
