import { useEffect, useState } from "react";
import useStaff from "../../../hooks/useStaff";

function Garantor({ staff }) {
  const [garantor, setGarantor] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const { getGarantorDetails } = useStaff();

  useEffect(() => {
    const initData = async () => {
      try {
        const result = await getGarantorDetails(staff.id);
        if (result[0]) {
          setGarantor({ ...result[0] });
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
          Loading guarantor details...
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 text-md">
            <h1 className="font-semibold">Status:</h1>
            {staff?.guarantor_verification_status?.toLowerCase() ===
            "approved" ? (
              <span className="text-green-500">Verified</span>
            ) : (
              <span className="text-gray-400">
                {staff?.guarantor_verification_status || "Pending"}
              </span>
            )}
          </div>

          {garantor ? (
            <div className="text-black divide-x *:pl-2 grid grid-cols-responsive2 gap-x-2 gap-y-3 border-t mt-2 pt-3">
              <div className="flex flex-col text-lg font-semibold text-gray-800">
                <h1>Title</h1>
                <p className="text-md font-normal">{garantor.title}</p>
              </div>

              <div className="flex flex-col text-lg font-semibold text-gray-800">
                <h1>First Name</h1>
                <p className="text-md font-normal">{garantor.first_name}</p>
              </div>

              <div className="flex flex-col text-lg font-semibold text-gray-800">
                <h1>Surname</h1>
                <p className="text-md font-normal">{garantor.surname}</p>
              </div>

              <div className="flex flex-col text-lg font-semibold text-gray-800">
                <h1>DOB</h1>
                <p className="text-md font-normal">{garantor.dob}</p>
              </div>

              <div className="flex flex-col text-lg font-semibold text-gray-800">
                <h1>Religion</h1>
                <p className="text-md font-normal">{garantor.religion}</p>
              </div>

              <div className="flex flex-col text-lg font-semibold text-gray-800">
                <h1>Home Address</h1>
                <p className="text-md font-normal">
                  {garantor.residential_address}
                </p>
              </div>

              <div className="flex flex-col text-lg font-semibold text-gray-800">
                <h1>Near Bus Stop</h1>
                <p className="text-md font-normal">{garantor.near_bus_stop}</p>
              </div>

              <div className="flex flex-col text-lg font-semibold text-gray-800">
                <h1>Close Landmark</h1>
                <p className="text-md font-normal">{garantor.close_landmark}</p>
              </div>

              <div className="flex flex-col text-lg font-semibold text-gray-800">
                <h1>Occupation</h1>
                <p className="text-md font-normal">{garantor.occupation}</p>
              </div>

              <div className="flex flex-col text-lg font-semibold text-gray-800">
                <h1>Mobile Phone</h1>
                <p className="text-md font-normal">{garantor.mobile_phone}</p>
              </div>

              <div className="flex flex-col text-lg font-semibold text-gray-800">
                <h1>Email</h1>
                <p className="text-md font-normal break-all">
                  {garantor.email}
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-10 w-full text-gray-500">
              <span>No guarantors found</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Garantor;
