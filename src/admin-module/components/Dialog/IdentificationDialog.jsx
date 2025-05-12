import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { FaPencil } from "react-icons/fa6";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import UseAdminManagement from "../../../hooks/useAdminManagement";

const IdentificationDialog = ({ fetchData }) => {
  const [visible, setVisible] = useState(false);
  const [updateDialogVisible, setUpdateDialogVisible] = useState(false);
  const [identification, setIdentification] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { updateStatus } = UseAdminManagement();
  const handleOpen = async () => {
    setVisible(true);
    setIsLoading(true);
    setIdentification(null);
    try {
      const data = await fetchData();
      if (data?.identifications?.length > 0) {
        setIdentification(data.identifications[0]);
      } else {
        toast.warn("No identification report found.");
      }
    } catch (error) {
      console.error("Failed to fetch business report:", error);
      toast.error("An error occurred while loading the report.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateOpen = (report) => {
    setSelectedReport(report);
    setStatus(report?.status || "");
    setUpdateDialogVisible(true);
  };

  const handleUpdateStatus = async () => {
    if (!status || !selectedReport?.domestic_staff_id) {
      toast.error("Invalid data. Please try again.");
      return;
    }

   const formData = {
         id: selectedReport.domestic_staff_id,
         status: status,
         type: 'identification'
       };
   
       console.log("Form data being sent:", formData);
   
       try {
         const res = await updateStatus(formData);
         if (res) {
           setUpdateDialogVisible(false);
           toast.success('Status updated successfully');
           // Fetch the updated details
           const data = await fetchData();
           setIdentification(data.identifications[0]);
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

  const statusOptions = [
    { label: "Pending", value: "pending" },
    { label: "Approved", value: "approved" },
    { label: "Rejected", value: "rejected" },
    { label: "Suspend", value: "suspend" },
  ];

  return (
    <div className="card flex flex-col space-y-4">
      <div
        className="bg-green-500 px-20 py-20 rounded-lg text-white hover:cursor-pointer flex items-center justify-center"
        onClick={handleOpen}
      >
        View Identification Report
        {isLoading && (
          <ClipLoader size={20} color={"#ffffff"} loading={isLoading} className="ml-2" />
        )}
      </div>

      <Dialog
        header="Identification Report"
        visible={visible}
        style={{
          width: "90vw",
          maxWidth: "600px",
          overflowY: "auto",
          height: "max-content",
          maxHeight: "90%",
        }}
        onHide={() => setVisible(false)}
        modal
      >
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <ClipLoader size={50} color={"#000"} loading={isLoading} />
          </div>
        ) : identification ? (
          <div className="p-3 border-b-2 border-gray-200 space-y-5">
            <p><strong>Identity Name:</strong> {identification?.identity_name}</p>
            <p><strong>NIN Number:</strong> {identification?.identity_no}</p>
            {identification?.file_path && (
              <p>
                <strong>Uploaded File:</strong>{" "}
                <a
                  href={`${import.meta.env.VITE_IMAGE_URL}/${identification?.file_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View File
                </a>
              </p>
            )}
            <p><strong>Status:</strong> {identification?.status}</p>
            <button
              type="button"
              className="flex items-center gap-2 bg-green-500 px-4 py-2 rounded text-white"
              onClick={() => handleUpdateOpen(identification)}
            >
              <FaPencil className="text-lg" />
              Update Status
            </button>
          </div>
        ) : (
          <p>No identification report available</p>
        )}
      </Dialog>

      <Dialog
        header="Update Status"
        visible={updateDialogVisible}
        style={{ width: "90vw", maxWidth: "600px" }}
        onHide={() => setUpdateDialogVisible(false)}
        modal
      >
        <div className="p-4">
          <h3>Update Status</h3>
          <Dropdown
            value={status}
            options={statusOptions}
            onChange={(e) => setStatus(e.value)}
            placeholder="Select a Status"
            className="w-full mb-4"
          />
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

export default IdentificationDialog;
