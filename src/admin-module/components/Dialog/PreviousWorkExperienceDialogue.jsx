import React, { useState } from "react";
import { Dialog } from "primereact/dialog";

const PreviousWorkExperienceDialog = ({ fetchData }) => {
  const [visible, setVisible] = useState(false);
  const [workExperience, setWorkExperience] = useState([]);


  const handleOpen = async () => {
    const data = await fetchData();
    setWorkExperience(data.PreviousWorkExperience);
    setVisible(true);
  };

  return (
    <div className="card flex flex-col r space-y-4">
      {/* <Button label={buttonLabel} icon="pi pi-external-link" onClick={handleOpen} className="w-full bg-black" /> */}
      <button className="card flex flex-col justofy-center items-center space-y-4  bg-green-500 px-3 py-3 text-white" onClick={handleOpen}>View Previous Work Experience Report</button>
      <Dialog header="Previous Work Experience Report" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
        {workExperience.length > 0 ? workExperience.map((experience, index) => (
          <div key={index} className="p-3 mb-3 border-b-2 rounded space-y-5">
            <p><strong>Hospital Name: </strong><span className="text-xl font-bold">{experience.company_name}</span></p>
            <p><strong>Job Title:</strong> {experience.job_title}</p>
            <p><strong>Start Date:</strong> {experience.start_date}</p>
            <p><strong>End Date:</strong> {experience.end_date}</p>
            <p><strong>Work Description:</strong> {experience.work_description}</p>
            <p><strong>Reason for Leaving:</strong> {experience.reason_for_leaving}</p>
          </div>
        )): <p>No previous work experience available</p>}
      </Dialog>
    </div>
  );
};

export default PreviousWorkExperienceDialog;