import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContex";
import { axiosClient, resourceUrl } from "../../../services/axios-client";
import { FormatError } from "../../../utils/formmaters";
import { onFailure } from "../../../utils/notifications/OnFailure";
import PoliceReportForm from "./PoliceReportForm";

function PoliceReport() {
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails?.token, true);

  const [currentRecord, setCurrentRecord] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ message: "", error: "" });

  const getCurrentRecord = async () => {
    setLoading(true);
    try {
      const { data } = await client.get(
        `/domesticStaff/police-report/${authDetails.user.id}`
      );
      setCurrentRecord(data.PoliceReport[0]);
    } catch (error) {
      FormatError(error, setError, "Retrieval Failed");
    } finally {
      setLoading(false);
    }
  };

  const recordFields = () => {
    const fields = [];
    Object.keys(currentRecord || {})?.forEach((key) => {
      if (
        !["id", "domestic_staff_id", "created_at", "updated_at"].includes(key)
      ) {
        fields.push(key);
      }
    });
    return fields;
  };

  useEffect(() => {
    getCurrentRecord();
  }, []);

  useEffect(() => {
    if (error.error && error.message) {
      onFailure(error);
    }
  }, [error]);

  return (
    <div>
      <h1 className="text-xl font-semibold text-green-700">Police Report</h1>

      {typeof currentRecord === "undefined" && loading && (
        <div className="p-4">Fetching data...</div>
      )}

      {typeof currentRecord !== "undefined" && (
        <div className="grid grid-cols-2 gap-x-3 gap-y-5 p-2 w-full text-gray-600">
          {recordFields()?.map((key, idx) => {
            const labelText = key.replace(/_/g, " ");
            const value = currentRecord[key];
            return (
              <div key={idx} className="flex flex-col gap-1">
                <label className="capitalize font-bold">{labelText}</label>
                {["police_report_file", "nin_slip_file"].includes(key) ? (
                  <a
                    className="text-blue-500 underline"
                    href={`${resourceUrl}${value}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Document
                  </a>
                ) : (
                  <label>{value}</label>
                )}
              </div>
            );
          })}
        </div>
      )}

      {typeof currentRecord === "undefined" && !loading && (
        <PoliceReportForm
          authDetails={authDetails}
          onSuccess={getCurrentRecord}
        />
      )}
    </div>
  );
}

export default PoliceReport;
