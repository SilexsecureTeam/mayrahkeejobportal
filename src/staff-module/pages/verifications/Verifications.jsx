import { useState } from "react";
import ViewVerifications from "../../components/verifications/ViewVerifications";
import GuarantorForm from "../../components/verifications/GuarantorForm";
import ResidenceForm from "../../components/verifications/ResidenceForm";
import MedicalForm from "../../components/verifications/MedicalForm";
import PoliceReport from "../../components/verifications/PoliceReport";
import WorkExperience from "../../components/verifications/WorkExperience";

const options = [
  "Verification Status",
  "Guarantor",
  "Residence",
  "Medical History",
  "Police Report",
  "Work Experience"
];

function Verifications() {
  const [option, setOption] = useState(options[0]);

  const renderComponent = () => {
    switch (option) {
      case options[0]:
        return <ViewVerifications />;
      case options[1]:
        return <GuarantorForm />;
      case options[2]:
        return <ResidenceForm />;
      case options[3]:
        return <MedicalForm />;
      case options[4]:
        return <PoliceReport />;
      case options[5]:
        return <WorkExperience />;
    }
  };

  return (
    <div className="h-fit w-full py-5 px-2 md:px-12 gap-[15px] flex flex-col">
      <div className="w-full h-[45px] border-b flex ">
        {options.map((current) => (
          <button
            className={`h-full first:font-semibold first:tracking-wider px-3 border-r ${
              option == current
                ? "border-b border-primaryColor  text-primaryColor"
                : "border-b-0 text-gray-400 border-gray-200"
            }`}
            onClick={() => setOption(current)}
          >
            {current}
          </button>
        ))}
      </div>
      {renderComponent()}
    </div>
  );
}

export default Verifications;
