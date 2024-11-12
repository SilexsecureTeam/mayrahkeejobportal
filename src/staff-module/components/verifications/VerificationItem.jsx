import { useState } from "react";
import DefaultSwitch from "../../../components/DefaultSwitch";
import { useEffect } from "react";
import useStaff from "../../../hooks/useStaff";
import { AuthContext } from "../../../context/AuthContex";
import { useContext } from "react";

function VerificationItem({ currentKey, profileDetails, updateTrackRecord }) {
  const detail = profileDetails[currentKey];
  const { authDetails } = useContext(AuthContext);
  const [enabled, setEnabled] = useState(detail == "1" ? true : false);
  const labelText = currentKey.replace(/_/g, " ").toUpperCase();
  const { updateAvailabilityStatus } = useStaff();
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
              console.log("clicked");
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
          {enabled ? (
            <span className="text-green-500 font-semibold">Verified</span>
          ) : (
            <span className="text-red-500 font-semibold">Unverified</span>
          )}
        </div>
      )}
    </>
  );
}

export default VerificationItem;
