import { useState } from "react";
import ViewVerifications from "../../components/verifications/ViewVerifications";

const options = ["Verification Records"];

function Verifications() {
  const [option, setOption] = useState(options[0]);

  return (
    <div className="h-fit w-full py-5 px-2 md:px-12 gap-[15px] flex flex-col">
      <div className="w-full h-[45px] border-b flex gap-3">
        {options.map((current) => (
          <button
            className={`h-full ${
              option == current
                ? "border-b border-primaryColor text-primaryColor"
                : "border-0 text-gray-400"
            }`}
            onClick={() => setOption(current)}
          >
            {current}
          </button>
        ))}
      </div>
      {option === options[0] ? (
        <ViewVerifications />
      ) : option === options[1] ? (
        <div></div>
      ) : (
        <span>Page not found</span>
      )}
    </div>
  );
}

export default Verifications;
