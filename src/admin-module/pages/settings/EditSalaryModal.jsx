import { useState } from "react";

const EditSalaryModal = ({ staff, onClose, onSave }) => {
  const [salary, setSalary] = useState(staff.salary_agreed);
  const [markupFee, setMarkupFee] = useState(staff.service_charge);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...staff, salary_agreed:salary, salary_charge:markupFee });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
        <h3 className="text-xl font-bold mb-4">Edit {staff.name}</h3>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Salary:
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value))}
              className="w-full border p-2 rounded mt-1"
            />
          </label>
          <label className="block mb-4">
            Markup Fee (%):
            <input
              type="number"
              value={markupFee}
              onChange={(e) => setMarkupFee(Number(e.target.value))}
              className="w-full border p-2 rounded mt-1"
            />
          </label>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSalaryModal;
