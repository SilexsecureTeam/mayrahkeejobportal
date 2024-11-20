import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { IMAGE_URL } from "../../../utils/base";
import { Button } from "primereact/button";
import { FaEye, FaPencil } from "react-icons/fa6";
import UseAdminManagement from "../../../hooks/useAdminManagement";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const PoliceReportDialog = ({ fetchData, name }) => {
  const [visible, setVisible] = useState(false);
  const [fileDialogVisible, setFileDialogVisible] = useState(false);
  const [updateDialogVisible, setUpdateDialogVisible] = useState(false);
  const [policeReport, setPoliceReport] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
  const [status, setStatus] = useState("");
  const { updateStatus } = UseAdminManagement();
  const [isLoading, setIsLoading] = useState(false);

  const handleOpen = async () => {
    setVisible(true);
    setIsLoading(true);
    setPoliceReport([]);
    setTimeout(async () => {
      const data = await fetchData();
      setPoliceReport(data.PoliceReport);
      setIsLoading(false);
    }, 2000); // Simulate loading for 2 seconds
  };

  const handleFileOpen = (file) => {
    setSelectedFile(file);
    setFileDialogVisible(true);
  };

  const handleUpdateOpen = (report) => {
    setSelectedReport(report);
    setStatus(report.status || "");
    setUpdateDialogVisible(true);
  };

  const handleUpdateStatus = async () => {
    console.log("Selected status:", status);
    console.log("Report Id:", selectedReport.domestic_staff_id);

    if (!status) {
      console.error('selectedData is null or undefined');
      toast.error('An error occurred. Please try again');
      return;
    }

    const formData = {
      id: selectedReport.domestic_staff_id,
      status: status,
      type: 'police'
    };

    console.log("Form data being sent:", formData);

    try {
      const res = await updateStatus(formData);
      if (res) {
        setUpdateDialogVisible(false);
        toast.success('Status updated successfully');
         // Fetch the updated details
         const data = await fetchData();
         setPoliceReport(data.PoliceReport);
      } else {
        toast.error('An error occurred while updating status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      if (error.response && error.response.data) {
        console.error('Server response:', error.response.data);
      }
      toast.error('An error occurred while updating status');
    }
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

  const statusOptions = [
    { label: 'Pending', value: 'pending' },
    { label: 'Approved', value: 'approved' },
    { label: 'Rejected', value: 'rejected' },
    { label: 'Suspend', value: 'suspend' },
  ];

  return (
    <div className="card flex flex-col space-y-4">
      <button className="flex items-center justify-center space-x-2 bg-green-500 px-3 py-3 text-white" onClick={handleOpen}>
        View Police Report
        {isLoading && <ClipLoader size={20} color={"#ffffff"} loading={isLoading} className="ml-2"/>}
      </button>
      <Dialog header="Police Report" visible={visible} style={{ width: '90vw', maxWidth: '600px' }} onHide={() => setVisible(false)} modal>
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <ClipLoader size={50} color={"#000"} loading={isLoading} />
          </div>
        ) : (
          policeReport.length > 0 ? policeReport.map((report) => (
            <div key={report.id} className="p-3 border-b-2 border-gray-200 space-y-5">
              <p><strong>State:</strong> {report.state}</p>
              <p><strong>LGA:</strong> {report.lga}</p>
              <p><strong>Station Address:</strong> {report.station_address}</p>
              <p className="flex items-center gap-5"> <strong>Report File: </strong>
                <button onClick={() => handleFileOpen(report.police_report_file)}
                  type="button"
                  className="flex items-center gap-2 bg-green-500 px-4 py-2 rounded text-white"
                >View Doc
                </button>
              </p>
              <p><strong>Domestic Staff ID:</strong> {report.domestic_staff_id}</p>
              <p><strong>Status:</strong> {report.status ? report.status : "N/A"}</p>
              <button
                type="button"
                className="flex items-center gap-2 bg-green-500 px-4 py-2 rounded"
                onClick={() => handleUpdateOpen(report)}
              >
                <FaPencil className="ml-2 text-lg text-white" />
              </button>
            </div>
          )) : <p className="font-semibold">No police report available</p>
        )}
      </Dialog>
      <Dialog header="Police Report File" visible={fileDialogVisible} style={{ width: '90vw', maxWidth: '600px' }} onHide={() => setFileDialogVisible(false)} modal>
        {renderFileContent(selectedFile)}
      </Dialog>
      <Dialog header="Update Status" visible={updateDialogVisible} style={{ width: '90vw', maxWidth: '600px' }} onHide={() => setUpdateDialogVisible(false)} modal>
        <div className="p-4">
          <h3>Update Status</h3>
          <Dropdown value={status} options={statusOptions} onChange={(e) => setStatus(e.value)} placeholder="Select a Status" className="w-full mb-4" />
          <button
            type="button"
            className="flex items-center gap-2 bg-green-500 px-4 py-2 rounded text-white"
            onClick={handleUpdateStatus}
          >
            Update
          </button>
        </div>
      </Dialog>
    </div>
  );
};

export default PoliceReportDialog;