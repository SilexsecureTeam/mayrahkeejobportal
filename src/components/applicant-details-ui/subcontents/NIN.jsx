import { useEffect, useState } from "react";
import { axiosClient } from "../../../services/axios-client";
import { FormatError } from "../../../utils/formmaters";
import useStaff from "../../../hooks/useStaff";

const labelMapping = {
  identity_name: "Identity Name",
  identity_no: "NIN Number",
  status: "Verification Status",
  file_path: "Uploaded File",
};

function NIN({ staff }) {
  const [ninData, setNinData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { authDetails } = useStaff();
  const client = axiosClient(authDetails?.token);

  const fetchNin = async () => {
    try {
      const { data } = await client.get(`/identifications/domestic/${staff.id}`);
      setNinData(data?.identifications?.[0] || null);
    } catch (err) {
      if (err?.response?.data?.message !== "No nin found for this domestic staff") {
        FormatError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNin();
  }, []);

  return (
    <div className="flex flex-col mt-4">
      <div className="flex items-center gap-2 text-md">
        <h1 className="font-semibold">Status:</h1>
        {ninData?.status?.toLowerCase() ===
          "approved" ? (
          <span className="text-green-500">Verified</span>
        ) : (
          <span className="text-gray-400">
            {ninData ? ninData?.status || "Pending" : "Not Recorded"}
          </span>
        )}
      </div>

      {loading ? (
        <div className="mt-6 text-gray-500 animate-pulse">Fetching NIN details...</div>
      ) : ninData ? (
        <div className="grid grid-cols-responsive2 gap-x-4 gap-y-3 mt-3 text-gray-800">
          {Object.entries(ninData).map(([key, value]) => {
            if (["id", "domestic_staff_id", "created_at", "updated_at"].includes(key)) return null;

            const label = labelMapping[key] || key;

            return (
              <div key={key} className="flex flex-col">
                <label className="font-semibold">{label}</label>
                {key === "file_path" ? (
                  value?.endsWith(".pdf") ? (
                    <iframe
                      src={`${import.meta.env.VITE_IMAGE_URL}${value}`}
                      title="Uploaded PDF"
                      className="w-full h-64 border rounded"
                    />
                  ) : (
                    <img
                      src={`${import.meta.env.VITE_IMAGE_URL}/${value}`}
                      alt="NIN File"
                      className="max-w-xs max-h-40 object-contain border border-gray-300 rounded"
                    />
                  )
                ) : (
                  <p className="bg-gray-100 p-2 rounded border border-gray-300">{value}</p>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-6 text-gray-500">No NIN details found</div>
      )}
    </div>
  );
}

export default NIN;
