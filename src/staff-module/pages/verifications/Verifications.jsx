import { useState, useEffect, useContext } from "react";
import ViewVerifications from "../../components/verifications/ViewVerifications";
import GuarantorForm from "../../components/verifications/GuarantorForm";
import ResidenceForm from "../../components/verifications/ResidenceForm";
import MedicalForm from "../../components/verifications/MedicalForm";
import NINForm from "../../components/verifications/NINForm";
import PoliceReport from "../../components/verifications/PoliceReport";
import WorkExperience from "../../components/verifications/WorkExperience";
import BusinessForm from "../../components/verifications/BusinessForm";
import { StaffManagementContext } from "../../../context/StaffManagementModule";
import {
  verificationOptions1,
  verificationOptions2,
} from "../../../utils/constants";
import { AuthContext } from "../../../context/AuthContex";

function Verifications() {
  const { getStaffProfile } = useContext(StaffManagementContext);
  const { authDetails } = useContext(AuthContext);
  const options =
    authDetails?.user?.staff_category == "artisan"
      ? verificationOptions2
      : verificationOptions1;
  const [option, setOption] = useState(options[0]);

  const renderComponent = () => {
    switch (option?.label) {
      case "Availability Status":
        return <ViewVerifications />;
      case "Guarantor":
        return <GuarantorForm />;
      case "Residence":
        return <ResidenceForm />;
      case "Medical History":
        return <MedicalForm />;
      case "Police Report":
        return <PoliceReport />;
      case "Work Experience":
        return <WorkExperience />;
      case "Business":
        return <BusinessForm />;
      case "NIN":
        return <NINForm />;
      default:
        return null;
    }
  };
  useEffect(() => {
    getStaffProfile();
  }, []);

  return (
    <div className="h-fit w-full py-5 px-2 md:px-12 gap-[15px] flex flex-col">
      <div className="w-full min-h-[45px] border-b grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 ">
        {options.map((current) => (
          <button
            className={`h-full p-2 ${
              option.label == current?.label
                ? "border-b bg-primaryColor font-semibold text-white text-bold"
                : "border-0 text-gray-400"
            }`}
            onClick={() => setOption(current)}
          >
            {current?.label}
          </button>
        ))}
      </div>
      {renderComponent()}
    </div>
  );
}

export default Verifications;
