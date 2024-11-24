import { useState } from "react";
import DefaultSwitch from "../../../components/DefaultSwitch";
import { useEffect } from "react";
import { AuthContext } from "../../../context/AuthContex";
import { useContext } from "react";
import useStaffUser from "../../../hooks/useStaffUser";

function VerificationItem({ currentKey, profileDetails, updateTrackRecord }) {
  const { updateAvailabilityStatus, getStyling, allStatus } = useStaffUser();
  const avaliabliltyDetail = profileDetails[currentKey];

  const detail =
    allStatus.find((current) => current === profileDetails[currentKey]) ||
    "Not Recorded";

  const { authDetails } = useContext(AuthContext);

  const [enabled, setEnabled] = useState(detail == "1" ? true : false);

  const labelText = currentKey.replace(/_/g, " ").toUpperCase();

  const [loading, setloading] = useState(false);


  const toogleIsOpen = () => {
    updateTrackRecord(currentKey, !enabled);
    setEnabled(!enabled);
  };

  useEffect(() => {
    if (labelText === "AVAILABILITY STATUS") {
      if (detail === "1") {
        setEnabled(true);
      } else {
        setEnabled(false);
      }
    }
  }, []);

  return (
    <>
      {labelText === "AVAILABILITY STATUS" ? (
        <div key={currentKey} className="flex gap-1 w-[50%] justify-between">
          <label>{labelText}</label>
          <DefaultSwitch
            enabled={enabled}
            disabled={loading}
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
        <div key={currentKey} className="flex gap-1 w-[50%] justify-between">
          <label>{labelText}</label>
          <span
            className={`${getStyling(
              detail
            )} text-black uppercase font-semibold"`}
          >
            {detail}
          </span>
        </div>
      )}
    </>
  );
}

export default VerificationItem;
