import React from "react";
import { FaEdit, FaTrash, FaEye, FaDownload } from "react-icons/fa";

const CurrencyDetails = ({ selectedCurrency, buttons }) => {
  return (
    <div className="card bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto my-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
        Currency Details
      </h2>

      {selectedCurrency ? (
        <div className="space-y-3 text-gray-700">
          <p>
            <strong>Code:</strong> {selectedCurrency.code}
          </p>
          <p>
            <strong>Name:</strong> {selectedCurrency.name}
          </p>
          <p>
            <strong>Country:</strong> {selectedCurrency.name}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {buttons.includes("delete") && (
              <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center gap-2">
                <FaTrash /> Delete
              </button>
            )}
          </div>
        </div>
      ) : (
        <p className="text-gray-500 italic">No currency selected.</p>
      )}
    </div>
  );
};

export default CurrencyDetails;
