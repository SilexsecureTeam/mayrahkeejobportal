import React, { useEffect, useState } from "react";
import { TbBriefcase2 } from "react-icons/tb";
import Garantor from "./subcontents/Garantor";
import MedicalHistory from "./subcontents/MedicalHistory";
import PoliceRecord from "./subcontents/PoliceRecord";
import useStaff from "../../hooks/useStaff";

const MainContent = ({ staff }) => {
  // State to keep track of the active tab
  const [activeTab, setActiveTab] = useState("Guarantors");

  const [workExperience, setWorkExperience] = useState([])
  const { getWorkExperience } = useStaff();


  // Function to render the content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "Guarantors":
        return <Garantor staff={staff}/>;
      case "Medical History":
        return <MedicalHistory staff={staff}/>;
      case "Police Report":
        return <PoliceRecord staff={staff}/>;
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
  }, []);


  return (
    <main className="w-full shadow-[0_0_2px_#999] md:w-3/4 p-6">
      <div className="border-b mb-4">
        <nav className="flex space-x-8 text-gray-700 overflow-x-auto">
          {/* Update active tab when each link is clicked */}
          <a
            href="#"
            onClick={() => setActiveTab("Guarantors")}
            className={`pb-2 ${activeTab === "Guarantors" ? "font-semibold border-b-2 border-green-500" : ""
              }`}
          >
            Guarantors
          </a>
          <a
            href="#"
            onClick={() => setActiveTab("Medical History")}
            className={`pb-2 ${activeTab === "Medical History" ? "font-semibold border-b-2 border-green-500" : ""
              }`}
          >
            Medical History
          </a>
          <a
            href="#"
            onClick={() => setActiveTab("Police Report")}
            className={`pb-2 ${activeTab === "Police Report" ? "font-semibold border-b-2 border-green-500" : ""
              }`}
          >
            Police Report
          </a>
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
