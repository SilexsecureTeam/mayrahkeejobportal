import { useState } from "react";
import DefaultSwitch from "../../../components/DefaultSwitch";
import { useEffect } from "react";
import { AuthContext } from "../../../context/AuthContex";
import { useContext } from "react";
import useStaffUser from "../../../hooks/useStaffUser";

function VerificationItem({ item, profileDetails, updateTrackRecord }) {
  const { updateAvailabilityStatus, getStyling, allStatus } = useStaffUser();
  const avaliabliltyDetail = profileDetails[item?.key];
  const { authDetails } = useContext(AuthContext);
 
  const detail =
    allStatus.find((current) => current === profileDetails[item?.key]) ||
    "Not Recorded";

  
  const [enabled, setEnabled] = useState(detail === "1" ? true : false);

  const labelText = item?.label?.toLowerCase();

  const [loading, setloading] = useState(false);


  const toogleIsOpen = () => {
    updateTrackRecord(currentKey, !enabled);
    setEnabled(!enabled);
  };

  useEffect(() => {
    if (item.key === "availability_status") {
      if (avaliabliltyDetail === "1") {
        setEnabled(true);
      } else {
        setEnabled(false);
      }
    }
  }, []);

  return (
    <>
      {item?.key === "availability_status" ? (
        <div key={item?.key} className="flex gap-1 w-[50%] justify-between">
          <label className="capitalize">{labelText}</label>
          <DefaultSwitch
            enabled={enabled}
            disabled={loading}
            loading={loading}
            onClick={async () => {
              setloading(true);
              const result = await updateAvailabilityStatus(
                authDetails.user.id,
                enabled ? "0" : "1"
              );
              if (result) {
                setEnabled(!enabled);
              }
              setloading(false);
            }}
          />
        </div>
      ) : (
        <div key={item?.key} className="flex gap-1 w-full max-w-[600px] justify-between">
          <label className="capitalize">{labelText}{item?.key !== "availability_status" && "Verification Status"}:</label>
          <span
            className={`${getStyling(
              detail
            )} text-black capitalize font-semibold"`}
          >
            {detail}
          </span>
        </div>
      )}
    </>
  );
}

export default VerificationItem;
