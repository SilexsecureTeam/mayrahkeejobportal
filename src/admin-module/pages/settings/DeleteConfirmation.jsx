const DeleteConfirmation = ({ onConfirm, onCancel, label = "item" }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-sm shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Delete {label}?</h3>
        <p className="mb-4">Are you sure you want to delete this {label}?</p>
        <div className="flex justify-end space-x-2">
          <button className="px-4 py-2 text-gray-600" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
