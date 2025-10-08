import React, { useState, useEffect, useContext } from "react";
import { PiSpinnerGap } from "react-icons/pi";
import { AuthContext } from "../../context/AuthContex";
import { axiosClient } from "../../services/axios-client";
import { onFailure } from "../../utils/notifications/OnFailure";
import { extractErrorMessage } from "../../utils/formmaters";

const PickStaffModal = ({ onClose, onConfirm, contract }) => {
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails.token);

  const [availableStaff, setAvailableStaff] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false); // <-- new state

  const getFullName = (staff) =>
    [staff.first_name, staff.middle_name, staff.surname]
      .filter(Boolean)
      .join(" ") || "Unnamed Staff";

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const { data } = await client.get("/domesticStaff/get-staff");
        const filtered = data.domesticStaff?.filter(
          (staff) =>
            staff.staff_category === contract.staff_category &&
            staff.subcategory === contract.subcategory &&
            staff.id !== contract.domestic_staff_id &&
            staff.salary_agreed + (staff.markup_fee || 0) ===
              contract.salary_agreed + (contract.markup_fee || 0)
        );
        setAvailableStaff(filtered || []);
      } catch (error) {
        onFailure({
          message: "Failed to fetch staff",
          error: extractErrorMessage(error),
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  const handleConfirm = async () => {
    if (!selectedStaff) return;

    setSubmitting(true); // start loading
    try {
      await onConfirm(selectedStaff); // call parent recontract function
    } finally {
      setSubmitting(false); // stop loading regardless of success/failure
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[400px] max-w-[90vw]">
        <h3 className="font-bold mb-4 text-lg text-primaryColor">
          Pick a Staff for Recontract
        </h3>

        {!loading && availableStaff.length > 0 && (
          <p className="text-gray-600 mb-3 text-sm">
            We found <strong>{availableStaff.length}</strong> staff member
            {availableStaff.length > 1 ? "s" : ""} matching the contract price
            and category. Click on a staff to select them for recontract.
          </p>
        )}

        {loading ? (
          <div className="flex justify-center items-center gap-2 py-4 text-green-600">
            <PiSpinnerGap className="animate-spin text-green-600" />
            Loading staff...
          </div>
        ) : availableStaff.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            <p className="text-gray-700 text-sm">
              No available staff match the contract price or differ from the
              currently assigned staff. Please try again later or contact our
              support team for assistance.
            </p>

            <p className="mt-2">
              You can contact our <strong>Help Center</strong> for assistance.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={onClose}
                disabled={submitting} // disable cancel while submitting
              >
                Cancel
              </button>
              <a
                href={`/${
                  authDetails?.user?.role === "employer"
                    ? "company"
                    : "applicant"
                }/help-center`}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-center"
              >
                Go to Help Center
              </a>
            </div>
          </div>
        ) : (
          <ul className="space-y-2 max-h-60 overflow-y-auto border rounded-md p-2">
            {availableStaff.map((staff) => (
              <li
                key={staff.id}
                className={`p-3 border rounded cursor-pointer transition-colors ${
                  selectedStaff?.id === staff.id
                    ? "bg-blue-100 border-blue-500 text-blue-700"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => setSelectedStaff(staff)}
              >
                <div className="font-medium text-green-500">
                  {getFullName(staff)}
                </div>
                <div className="text-sm text-gray-600">
                  {staff.staff_category} - {staff.subcategory}
                </div>
                {staff.location && (
                  <div className="text-xs text-gray-500 mt-1">
                    Location: {staff.location}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}

        {availableStaff.length > 0 && (
          <div className="mt-6 flex justify-end gap-3">
            <button
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
              onClick={onClose}
              disabled={submitting} // disable cancel while submitting
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              onClick={handleConfirm}
              disabled={!selectedStaff || submitting} // disable while loading
            >
              {submitting && <PiSpinnerGap className="animate-spin" />}
              {submitting ? "Submitting..." : "Confirm Selection"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PickStaffModal;
