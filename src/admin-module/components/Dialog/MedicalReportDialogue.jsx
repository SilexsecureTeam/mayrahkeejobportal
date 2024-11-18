import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { IMAGE_URL } from "../../../utils/base";
import { Button } from "primereact/button";
import { FaEye } from "react-icons/fa6";

const MedicalReportDialog = ({ fetchData }) => {
  const [visible, setVisible] = useState(false);
  const [fileDialogVisible, setFileDialogVisible] = useState(false);
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");

  const handleOpen = async () => {
    const data = await fetchData();
    setMedicalHistory(data.MedicalHistory);
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
      <button
        className="card flex flex-col justify-center items-center space-y-4  bg-blue-300 px-3 py-3"
        onClick={handleOpen}
      >
        View Medical Report
      </button>
      <Dialog
        header="Medical Report"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        {medicalHistory.length > 0 ? (
          medicalHistory.map((report) => (
            <div key={report.id} className="p-3 border-b-2 space-y-5">
              <p>
                <strong>Hospital Name: </strong>
                <span className="text-xl font-bold">
                  {report.hospital_name}
                </span>
              </p>
              <p>
                <strong>Contact: </strong> {report.contact_detail}
              </p>
              <p>
                <p className="flex items-center gap-5">
                  {" "}
                  <strong>Report File: </strong>{" "}
                  <Button
                    size="small"
                    icon={<FaEye className="me-2" />}
                    onClick={() => handleFileOpen(report.medical_report_docs)}
                  >
                    View Doc
                  </Button>
                </p>
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(report.created_at).toLocaleDateString()}
              </p>
              <p>
                <strong>Updated At:</strong>{" "}
                {new Date(report.updated_at).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p>No medical report available</p>
        )}
      </Dialog>
      <Dialog header="Police Report File" visible={fileDialogVisible} style={{ width: '50vw' }} onHide={() => setFileDialogVisible(false)}>
        {renderFileContent(selectedFile)}
      </Dialog>
    </div>
  );
};

export default MedicalReportDialog;
