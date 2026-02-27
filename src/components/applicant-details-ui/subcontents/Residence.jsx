import { useEffect, useState } from "react";
import useStaff from "../../../hooks/useStaff";

function Residence({ staff }) {
  const [resident, setResident] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const { getResidentialDetails } = useStaff();

  useEffect(() => {
    const initData = async () => {
      try {
        const result = await getResidentialDetails(staff.id);
        if (result[0]) {
          setResident(result[0]);
        }
      } finally {
        setLoading(false); // Stop loading whether successful or not
      }
    };

    initData();
  }, []);

  return (
    <div className="flex flex-col">
      {loading ? (
        <div className="mt-10 text-center text-gray-500 animate-pulse">Loading residence details...</div>
      ) : (
        <>
          <div className="flex items-center gap-2 text-md">
            <h1 className="font-semibold">Status:</h1>
            {resident?.status?.toLowerCase() ===
              "approved" ? (
              <span className="text-green-500">Verified</span>
            ) : (
              <span className="text-gray-400">
                {resident ? resident?.status || "Pending" : "Not Recorded"}
              </span>
            )}
          </div>

          {resident ? (
            <div className="text-black divide-x *:pl-2 grid grid-cols-responsive2 gap-x-2 gap-y-3 border-t mt-2 pt-3">
              <div className="flex flex-col text-lg font-semibold text-gray-800">
                <h1>State</h1>
                <p className="text-md font-normal">{resident.state}</p>
              </div>

              <div className="flex flex-col text-lg font-semibold text-gray-800">
                <h1>Local Govt</h1>
                <p className="text-md font-normal">{resident.local_gov}</p>
              </div>

              <div className="flex flex-col text-lg font-semibold text-gray-800">
                <h1>House Address</h1>
                <p className="text-md font-normal">{resident.house_address}</p>
              </div>

              <div className="flex flex-col text-lg font-semibold text-gray-800">
                <h1>Close Landmark</h1>
                <p className="text-md font-normal">{resident.close_landmark}</p>
              </div>
            </div>
          ) : (
            <div className="mt-10 w-full text-gray-500">
              <span>No residence details found</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Residence;
