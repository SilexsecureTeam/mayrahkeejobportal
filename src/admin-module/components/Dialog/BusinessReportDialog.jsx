import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { FaPencil } from "react-icons/fa6";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import UseAdminManagement from "../../../hooks/useAdminManagement";
import { extractErrorMessage } from "../../../utils/formmaters";

const BusinessReportDialog = ({ fetchData }) => {
  const [visible, setVisible] = useState(false);
  const [updateDialogVisible, setUpdateDialogVisible] = useState(false);
  const [business, setBusiness] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { updateStatus } = UseAdminManagement();
  const handleOpen = async () => {
    setVisible(true);
    setIsLoading(true);
    setBusiness(null);

    try {
      const data = await fetchData();
      if (data?.businesses?.length > 0) {
        setBusiness(data.businesses[0]);
      } else {
        toast.warn("No business report found.");
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
      type: "business",
    };

    console.log("Form data being sent:", formData);

    try {
      const res = await updateStatus(formData);
      if (res) {
        setUpdateDialogVisible(false);
        toast.success("Status updated successfully");
        // Fetch the updated details
        const data = await fetchData();
        setBusiness(data.businesses[0]);
      } else {
        toast.error("An error occurred while updating status");
      }
    } catch (error) {
      toast.error(
        extractErrorMessage(error) || "An error occurred while updating status"
      );
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
        View Business Details
        {isLoading && (
          <ClipLoader
            size={20}
            color={"#ffffff"}
            loading={isLoading}
            className="ml-2"
          />
        )}
      </div>

      <Dialog
        header="Business Report"
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
        ) : business ? (
          <div className="p-3 border-b-2 border-gray-200 space-y-5">
            <p>
              <strong>Business Name:</strong> {business?.business_name}
            </p>
            <p>
              <strong>Business Email:</strong> {business?.business_email}
            </p>
            <p>
              <strong>Business Phone Number:</strong>{" "}
              {business?.business_phone_no}
            </p>
            <p>
              <strong>WhatsApp Phone Number:</strong>{" "}
              {business?.whatsapp_phone_no}
            </p>
            <p>
              <strong>Business Registration No.:</strong>{" "}
              {business?.business_registration_no}
            </p>
            <p>
              <strong>Business Address:</strong> {business?.business_address}
            </p>
            <p>
              <strong>Business Location:</strong> {business?.business_location}
            </p>
            <p>
              <strong>Year of Incorporation:</strong>{" "}
              {business?.year_of_incorporation}
            </p>
            <p>
              <strong>Business Identification No.:</strong>{" "}
              {business?.business_identification_no}
            </p>
            <p>
              <strong>Status:</strong> {business?.status}
            </p>

            {business?.business_file && (
              <p>
                <strong>Business File:</strong>{" "}
                <a
                  href={`${import.meta.env.VITE_IMAGE_URL}/${
                    business?.business_file
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View File
                </a>
              </p>
            )}

            <button
              type="button"
              className="flex items-center gap-2 bg-green-500 px-4 py-2 rounded text-white"
              onClick={() => handleUpdateOpen(business)}
            >
              <FaPencil className="text-lg" />
              Update Status
            </button>
          </div>
        ) : (
          <p>No business report available</p>
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

export default BusinessReportDialog;
