import { useEffect, useState } from "react";
import useStaff from "../../../hooks/useStaff";

function Business({ staff }) {
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const { getBusinessDetails } = useStaff();

  useEffect(() => {
    const initData = async () => {
      try {
        const result = await getBusinessDetails(staff.id);
        if (result[0]) {
          setBusiness({ ...result[0] });
        }
      } finally {
        setLoading(false); // Stop loading
      }
    };

    initData();
  }, []);

  return (
    <div className="flex flex-col">
      {loading ? (
        <div className="mt-10 text-center text-gray-500 animate-pulse">
          Loading business details...
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 text-md">
            <h1 className="font-semibold">Status:</h1>
            {staff?.business_verification_status.toLowerCase() === "approved" ? (
              <span className="text-green-500">Verified</span>
            ) : (
              <span className="text-gray-400">
                {staff?.business_verification_status || "Pending"}
              </span>
            )}
          </div>

          {business ? (
            <div className="text-black divide-x *:pl-2 grid grid-cols-responsive2 gap-x-2 gap-y-3 border-t mt-2 pt-3">
              <div className="flex flex-col text-lg font-semibold text-gray-800">
                <h1>Business Identification</h1>
                <p className="text-md font-normal">{business?.business_identification_no}</p>
              </div>

              
            </div>
          ) : (
            <div className="mt-10 w-full text-gray-500">
              <span>No business details found</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Business;
