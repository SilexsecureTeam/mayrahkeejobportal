import React from "react";

function StatusUpdateModal({
  isOpen,
  selectedStatus,
  setSelectedStatus,
  isUpdating,
  onClose,
  onConfirm,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-2xl">
        <div className="border-b border-slate-100 px-6 py-4">
          <h3 className="text-lg font-semibold text-slate-900">
            Update Application Status
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Set the final outcome of this application based on the interview.
          </p>
        </div>

        <div className="px-6 py-5">
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="hired"
                name="status"
                value="hired"
                checked={selectedStatus === "hired"}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="h-4 w-4 border-slate-300 text-primaryColor focus:ring-primaryColor"
              />
              <label
                htmlFor="hired"
                className="ml-3 text-sm font-medium text-slate-800"
              >
                Hired
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="radio"
                id="declined"
                name="status"
                value="declined"
                checked={selectedStatus === "declined"}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="h-4 w-4 border-slate-300 text-primaryColor focus:ring-primaryColor"
              />
              <label
                htmlFor="declined"
                className="ml-3 text-sm font-medium text-slate-800"
              >
                Declined
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="interview"
                name="status"
                value="interview"
                checked={selectedStatus === "interview"}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="h-4 w-4 border-slate-300 text-primaryColor focus:ring-primaryColor"
              />
              <label
                htmlFor="interview"
                className="ml-3 text-sm font-medium text-slate-800"
              >
                Interviewed
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isUpdating}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={!selectedStatus || isUpdating}
            className="inline-flex items-center gap-2 rounded-lg border border-transparent bg-primaryColor px-4 py-2 text-sm font-semibold text-white transition hover:bg-primaryColor/90 focus:outline-none focus:ring-2 focus:ring-primaryColor focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isUpdating && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-transparent" />
            )}
            {isUpdating ? "Updating..." : "Update Status"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default StatusUpdateModal;
