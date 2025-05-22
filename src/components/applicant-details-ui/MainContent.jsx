import React, { useEffect, useState } from "react";
import { TbBriefcase2 } from "react-icons/tb";
import Garantor from "./subcontents/Garantor";
import Business from "./subcontents/Business";
import MedicalHistory from "./subcontents/MedicalHistory";
import PoliceRecord from "./subcontents/PoliceRecord";
import Residence from "./subcontents/Residence";

import useStaff from "../../hooks/useStaff";
import { verificationOptions1, verificationOptions2 } from "../../utils/constants";

const MainContent = ({ staff }) => {
  const [activeTab, setActiveTab] = useState("Guarantor");
  const [workExperience, setWorkExperience] = useState([]);
  const { getWorkExperience } = useStaff();

  // Dynamically select verification options based on staff category
  const verificationOptions = staff?.staff_category === "artisan" 
    ? verificationOptions2 
    : verificationOptions1;

  // Function to render the content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "Guarantor":
        return <Garantor staff={staff} />;
      case "Medical History":
        return <MedicalHistory staff={staff} />;
      case "Residence":
        return <Residence staff={staff} />;
      case "Police Report":
        return <PoliceRecord staff={staff} />;
      case "Business":
        return <Business staff={staff} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const initData = async () => {
      const result = await getWorkExperience(staff.id);
      if (result) {
        setWorkExperience(result);
      }
    };

    initData();
  }, [staff.id]);

  return (
    <main className="w-full shadow-[0_0_2px_#999] md:w-3/4 p-6">
      <div className="border-b mb-4">
        <nav className="flex space-x-8 text-gray-700 overflow-x-auto">
          {/* Dynamically generate navigation based on verification options */}
          {verificationOptions?.filter(item=>item.label !== "Availability Status")?.map((option) => (
            <a
              href="#"
              key={option.key}
              onClick={() => setActiveTab(option.label)}
              className={`pb-2 ${activeTab === option.label ? "font-semibold border-b-2 border-green-500" : ""}`}
            >
              {option.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Display content based on active tab */}
      <section className="border p-6 rounded-lg mb-6 min-h-64">
        {renderContent()}
      </section>

      {/* Work experience section */}
      <section>
        <h4 className="text-xl font-semibold mb-4">Work experience</h4>
        <div className="flex space-x-4 text-gray-600 mb-4">
          <span className="border-b-2 border-black pb-1">All experience</span>
        </div>
        <div className="space-y-3">
          {workExperience.length > 0 ? workExperience.map((job, index) => (
            <div className={`${index !== 0 && "border-t border-gray-300"} flex gap-2 pt-3`} key={index}>
              <TbBriefcase2 size="24" className="flex-shrink-0 mr-2" />
              <section>
                <h5 className="font-semibold">{job.title}</h5>
                <p className="text-gray-500">
                  {job.company} • {job.startDate} - {job.endDate}
                </p>
                <p className="text-gray-600 mt-2">{job.description}</p>
                <button className="text-gray-800 underline font-medium mt-2">Show more</button>
              </section>
            </div>
          )) :
           <span>No work experience found</span>
        }
        </div>
      </section>
    </main>
  );
};

export default MainContent;
