import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { IMAGE_URL } from "../../../utils/base";
import { Button } from "primereact/button";
import { FaEye } from "react-icons/fa6";

const PoliceReportDialog = ({ fetchData }) => {
  const [visible, setVisible] = useState(false);
  const [fileDialogVisible, setFileDialogVisible] = useState(false);
  const [policeReport, setPoliceReport] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");

  const handleOpen = async () => {
    const data = await fetchData();
    setPoliceReport(data.PoliceReport);
    setVisible(true);
  };

  const handleFileOpen = (file) => {
    setSelectedFile(file);
    setFileDialogVisible(true);
  };

  const renderFileContent = (file) => {
    const fileExtension = file.split('.').pop().toLowerCase();
    if (["jpg", "jpeg", "png", "gif"].includes(fileExtension)) {
      return <img src={`${IMAGE_URL}/${file}`} alt="Police Report" className="w-full h-auto" />;
    } else if (["pdf", "doc", "docx"].includes(fileExtension)) {
      return <iframe src={`${IMAGE_URL}/${file}`} title="Police Report" className="w-full h-96" />;
    } else {
      return <p>Unsupported file format</p>;
    }
  };

  return (
    <div className="card flex flex-col r space-y-4">
      {/* <Button label={buttonLabel} icon="pi pi-external-link" onClick={handleOpen} className="w-full bg-black" /> */}
      <button className="card flex flex-col justify-center items-center space-y-4 bg-blue-300 px-3 py-3" onClick={handleOpen}>
        View Police Report
      </button>
      <Dialog header="Police Report" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
        {policeReport.length > 0 ? policeReport.map((report) => (
          <div key={report.id} className="p-3 border-b-2 border-gray-200 space-y-5">
            <p><strong>State:</strong> {report.state}</p>
            <p><strong>LGA:</strong> {report.lga}</p>
            <p><strong>Station Address:</strong> {report.station_address}</p>
            <p className="flex items-center gap-5"> <strong>Report File: </strong> <Button size="small" icon={<FaEye className="me-2"/>}  onClick={() => handleFileOpen(report.police_report_file)}>View Doc</Button></p>
            <p><strong>Domestic Staff ID:</strong> {report.domestic_staff_id}</p>
            <p><strong>Status:</strong> {report.status ? report.status : "N/A"}</p>
          </div>
        )): <p>No police report available</p>}
      </Dialog>
      <Dialog header="Police Report File" visible={fileDialogVisible} style={{ width: '50vw' }} onHide={() => setFileDialogVisible(false)}>
        {renderFileContent(selectedFile)}
      </Dialog>
    </div>
  );
};

export default PoliceReportDialog;