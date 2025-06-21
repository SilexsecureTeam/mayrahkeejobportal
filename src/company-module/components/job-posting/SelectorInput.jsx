import { useEffect } from "react";
import Selector from "../../../components/Selector";

function SelectorInput({
  data,
  listData,
  jobUtils,
  selected,
  setSelected,
  disabled = false,
}) {
  return (
    <div className="flex flex-col md:flex-row gap-[15%] border-b py-2 text-little ">
      <div className="flex flex-col w-[80%] md:w-[25%] gap-[10px]">
        <h3 className="text-gray-700 text-sm font-semibold flex gap-1">
          {data.label}{" "}
          {data?.required && <strong className="text-red-500">*</strong>}
        </h3>
        {/* <span className="text-little text-gray-600">{data.prompt}</span> */}
      </div>

      <div className="flex flex-col gap-[3px] ">
        <div
          className={`md:min-w-[300px] ${
            disabled
              ? "cursor-not-allowed pointer-events-none opacity-70"
              : "cursor-pointer pointer-events-auto opacity-100"
          }`}
        >
          <Selector
            data={listData}
            selected={selected}
            setSelected={setSelected}
          />
        </div>

        <span className="text-xs text-gray-500">Select an option</span>
      </div>
    </div>
  );
}

export default SelectorInput;
