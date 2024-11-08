import { useState } from "react";
import useStaff from "../../hooks/useStaff";
import { onFailure } from "../../utils/notifications/OnFailure";
import { PiSpinnerGap } from "react-icons/pi";

const ApplicantHeader = ({ staff }) => {
  const { ContractStatus, updateContractStatus } = useStaff();
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);

  return (
    <header className="text-white p-4 flex flex-wrap gap-5 items-center justify-between">
      <section>
        <h2 className="text-xl font-bold text-blue-900">
          Good Evening, {staff.first_name}
        </h2>
        <nav className="flex my-2 space-x-4 font-medium">
          <a href="#" className="text-green-500">
            Offers
          </a>
          <a href="#" className="text-gray-800">
            Domestic Staff
          </a>
          <a href="#" className="text-green-500">
            Kunle Ademu
          </a>
        </nav>
      </section>

      <div className="flex space-x-4">
        <button
          onClick={async () => {
            setAcceptLoading(true);
            const result = await updateContractStatus(
              staff,
              ContractStatus.accept
            );
            setAcceptLoading(false);
            if (result) {
            } else {
              onFailure({ message: "Update Error", error: "Could not hire" });
            }
          }}
          className="bg-green-600 relative text-white px-4 py-1 rounded overflow-hidden"
        >
          Accepted
          {acceptLoading && (
            <div className="absolute left-0 top-0 z-[999] bg-gray-50/50 w-full h-full flex items-center justify-center">
              <PiSpinnerGap className="text-lg text animate-spin text-black" />
            </div>
          )}
        </button>
        <button
          onClick={async () => {
            setRejectLoading(true);
            const result = await updateContractStatus(
              staff.id,
              ContractStatus.reject
            );
            if (result) {
              setRejectLoading(false);
            } else {
              onFailure({ message: "Update Error", error: "Could not hire" });
            }
          }}
          className="bg-red-600 relative overflow-hidden text-white px-4 py-1 rounded"
        >
          Rejected
          {rejectLoading && (
            <div className="absolute left-0 top-0 z-[999] bg-gray-50/50 w-full h-full flex items-center justify-center">
              <PiSpinnerGap className="text-lg text animate-spin text-black" />
            </div>
          )}
        </button>
      </div>
    </header>
  );
};

export default ApplicantHeader;
