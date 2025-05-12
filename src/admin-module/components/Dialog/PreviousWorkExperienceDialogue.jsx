import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { FaPencil } from "react-icons/fa6";
import UseAdminManagement from "../../../hooks/useAdminManagement";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { formatDate } from "../../../utils/formmaters";

const PreviousWorkExperienceDialog = ({ staff, fetchData }) => {
  const [visible, setVisible] = useState(false);
  const [updateDialogVisible, setUpdateDialogVisible] = useState(false);
  const [workExperience, setWorkExperience] = useState([]);
  const [status, setStatus] = useState("");
  const { updateStatus } = UseAdminManagement();
  const [isLoading, setIsLoading] = useState(false);
  // In state
const [currentStatus, setCurrentStatus] = useState(staff?.previous_employer_verification_status || "");


  const handleOpen = async () => {
    setVisible(true);
    setIsLoading(true);
    setWorkExperience([]);
    try {
      const data = await fetchData();
      if (data?.PreviousWorkExperience?.length > 0) {
        setWorkExperience(data.PreviousWorkExperience);
      } else {
        toast.warn("No previous work experience found.");
      }
    } catch (error) {
      console.error("Failed to fetch work experience:", error);
      toast.error("An error occurred while loading the report.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateOpen = () => {
    setStatus(staff?.previous_employer_verification_status || "");
    setUpdateDialogVisible(true);
  };

  const handleUpdateStatus = async () => {
    if (!status) {
      toast.error("Please select a status");
      return;
    }

    const formData = {
      id: staff?.id,
      status,
      type: "experience",
    };

    try {
      const res = await updateStatus(formData);
      if (res) {
        toast.success("Status updated successfully");
        setUpdateDialogVisible(false);
        setCurrentStatus(status);
        const data = await fetchData();
        setWorkExperience(data.PreviousWorkExperience);
      } else {
        toast.error("An error occurred while updating status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("An error occurred while updating status");
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
        className="bg-green-500 px-20 py-20 rounded-lg text-white hover:cursor-pointer"
        onClick={handleOpen}
      >
        View Previous Work Experience
        {isLoading && (
          <ClipLoader size={20} color={"#ffffff"} loading={isLoading} className="ml-2" />
        )}
      </div>

      <Dialog
        header="Previous Work Experience Report"
        visible={visible}
        style={{ width: "90vw", maxWidth: "600px", overflowY: "auto", maxHeight: "90%" }}
        onHide={() => setVisible(false)}
        modal
      >
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <ClipLoader size={50} color={"#000"} loading={isLoading} />
          </div>
        ) : (
          <>
            {workExperience?.length > 0 ? (
              workExperience.map((experience, index) => (
                <div key={index} className="p-3 border-b-2 border-gray-200 space-y-2">
                  <p><strong>Company Name:</strong> {experience?.company_name}</p>
                  <p><strong>Job Title:</strong> {experience?.job_title}</p>
                  <p><strong>Start Date:</strong> {formatDate(experience?.start_date)}</p>
                  <p><strong>End Date:</strong> {formatDate(experience?.end_date)}</p>
                  <p><strong>Work Description:</strong> {experience?.work_description}</p>
                  <p><strong>Reason for Leaving:</strong> {experience?.reason_for_leaving}</p>
                </div>
              ))
            ) : (
              <p>No previous work experience available</p>
            )}

            {workExperience?.length > 0 &&
            <div className="mt-6 space-y-3">
              <p><strong>Status:</strong> {currentStatus || "Not set"}</p>
              <button
                type="button"
                className="flex items-center gap-2 bg-green-500 px-4 py-2 rounded text-white"
                onClick={handleUpdateOpen}
              >
                <FaPencil className="text-white" />
                Update Status
              </button>
            </div>}
          </>
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
          <h3 className="mb-3">Update Status</h3>
          <Dropdown
            value={status}
            options={statusOptions}
            onChange={(e) => setStatus(e.value)}
            placeholder="Select a Status"
            className="w-full mb-4"
          />
          <Button
            label="Update"
            icon="pi pi-check"
            onClick={handleUpdateStatus}
            className="bg-green-500 text-white w-full"
          />
        </div>
      </Dialog>
    </div>
  );
};

export default PreviousWorkExperienceDialog;
