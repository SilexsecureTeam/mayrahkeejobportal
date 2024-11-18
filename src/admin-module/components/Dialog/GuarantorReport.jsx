import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

const GuarantorReportDialog = ({ fetchData }) => {
  const [visible, setVisible] = useState(false);
  const [guarantors, setGuarantors] = useState([]);

  const handleOpen = async () => {
    const data = await fetchData();
    setGuarantors(data.guarantor);
    setVisible(true);
  };

  return (
    <div className="card flex flex-col r space-y-4">
      {/* <Button label={buttonLabel} icon="pi pi-external-link" onClick={handleOpen} className="w-full bg-black" /> */}
      <button className="card flex flex-col justofy-center items-center space-y-4  bg-blue-300 px-3 py-3" onClick={handleOpen}>View Guarantor Report</button>
      <Dialog header="Guarantor Report" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
        {guarantors.length > 0 ? guarantors.map((guarantor) => (
          <div key={guarantor.id} className="p-3 mb-3 border-b-2 space-y-5">
            <p><strong>Title:</strong> {guarantor.title}</p>
            <p><strong>Surname:</strong> {guarantor.surname}</p>
            <p><strong>First Name:</strong> {guarantor.first_name}</p>
            <p><strong>Date of Birth:</strong> {guarantor.dob}</p>
            <p><strong>Religion:</strong> {guarantor.religion}</p>
            <p><strong>Residential Address:</strong> {guarantor.residential_address}</p>
            <p><strong>Near Bus Stop:</strong> {guarantor.near_bus_stop}</p>
            <p><strong>Close Landmark:</strong> {guarantor.close_landmark}</p>
            <p><strong>Mobile Phone:</strong> {guarantor.mobile_phone}</p>
            <p><strong>Email:</strong> {guarantor.email}</p>
            <p><strong>Occupation:</strong> {guarantor.occupation}</p>
          </div>
        )): <p>No guarantor report available</p>}
      </Dialog>
    </div>
  );
};

export default GuarantorReportDialog;