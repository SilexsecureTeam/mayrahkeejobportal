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
  const [isLoading, setIsLoading] = useState(false); // for fetch
  const [isUpdating, setIsUpdating] = useState(false); // for update call
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
    setStatus(report?.status ?? "");
    setUpdateDialogVisible(true);
  };

  const handleUpdateStatus = async () => {
    const domesticId = selectedReport?.domestic_staff_id;
    if (!status || !domesticId) {
      toast.error("Invalid data. Please try again.");
      return;
    }

    const formData = {
      id: domesticId,
      status,
      type: "business",
    };

    setIsUpdating(true);
    try {
      const res = await updateStatus(formData);
      if (res) {
        setUpdateDialogVisible(false);
        toast.success("Status updated successfully");
        const data = await fetchData();
        setBusiness(data?.businesses?.[0] ?? null);
      } else {
        toast.error("An error occurred while updating status");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(
        extractErrorMessage(error) || "An error occurred while updating status"
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const statusOptions = [
    { label: "Pending", value: "pending" },
    { label: "Approved", value: "approved" },
    { label: "Rejected", value: "rejected" },
    { label: "Suspend", value: "suspend" },
  ];

  // Helper to build file URL from business_file_path
  const getFileUrl = (path) => {
    if (!path) return null;
    const base = import.meta.env.VITE_IMAGE_URL || "";
    return `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
  };

  const isImageFile = (path) => {
    if (!path) return false;
    return /\.(png|jpe?g|gif|webp|svg)$/i.test(path);
  };

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
          <div className="flex justify-center items-center h-48">
            <ClipLoader size={40} color={"#000"} loading={isLoading} />
          </div>
        ) : business ? (
          <div className="p-3 space-y-4">
            <p>
              <strong>Business Identification No.:</strong>{" "}
              {business.business_identification_no ?? "—"}
            </p>

            <p>
              <strong>Status:</strong> {business.status ?? "—"}
            </p>

            {/* Display file inline for images, otherwise show a link */}
            {business.business_file_path ? (
              isImageFile(business.business_file_path) ? (
                <div>
                  <strong>Business File:</strong>
                  <div className="mt-2">
                    <img
                      src={getFileUrl(business.business_file_path)}
                      alt="Business file"
                      className="max-w-full max-h-72 object-contain rounded-md border"
                    />
                  </div>
                </div>
              ) : (
                <p>
                  <strong>Business File:</strong>{" "}
                  <a
                    href={getFileUrl(business.business_file_path)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View File
                  </a>
                </p>
              )
            ) : null}

            <div className="mt-4">
              <button
                type="button"
                className="flex items-center gap-2 bg-green-500 px-4 py-2 rounded text-white"
                onClick={() => handleUpdateOpen(business)}
              >
                <FaPencil className="text-lg" />
                Update Status
              </button>
            </div>
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

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex items-center gap-2 bg-green-500 px-4 py-2 rounded text-white disabled:opacity-60"
              onClick={handleUpdateStatus}
              disabled={isUpdating}
            >
              {isUpdating ? (
                <>
                  <ClipLoader size={14} color="#ffffff" loading={isUpdating} />
                  <span>Updating...</span>
                </>
              ) : (
                "Update"
              )}
            </button>

            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-200"
              onClick={() => setUpdateDialogVisible(false)}
              disabled={isUpdating}
            >
              Cancel
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default BusinessReportDialog;
