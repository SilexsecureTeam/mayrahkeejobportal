import { useState } from "react";
import DefaultSwitch from "../../../components/DefaultSwitch";

function VerificationItem({ currentKey, profileDetails, updateTrackRecord }) {
  const detail = profileDetails[currentKey];
  const [enabled, setEnabled] = useState(detail == "1" ? true : false);
  const labelText = currentKey.replace(/_/g, " ").toUpperCase();

  const toogleIsOpen = () => {
    updateTrackRecord(currentKey, !enabled);
    setEnabled(!enabled);
  };

  return (
    <div key={currentKey} className="flex gap-1 w-[50%] justify-between">
      <label>{labelText}</label>
      <DefaultSwitch enabled={enabled} onClick={toogleIsOpen} />
    </div>
  );
}

export default VerificationItem;
