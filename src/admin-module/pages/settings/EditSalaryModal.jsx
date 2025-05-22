import { useState } from "react";

const EditSalaryModal = ({ staff, onClose, onSave }) => {
  const [salary, setSalary] = useState(staff.salary_agreed);
  const [markupFee, setMarkupFee] = useState(staff.service_charge);
  const [serviceCharge, setServiceCharge] = useState(staff.markup_fee);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave({
        ...staff,
        salary_agreed: salary,
        service_charge: serviceCharge,
        markup_fee: markupFee
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
        <h3 className="text-xl font-bold mb-4">Edit {staff.name}</h3>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Salary :
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value))}
              className="w-full border p-2 rounded mt-1"
              disabled={saving}
            />
          </label>
          <label className="block mb-4">
            Service Markup:
            <input
              type="number"
              value={markupFee}
              onChange={(e) => setMarkupFee(Number(e.target.value))}
              className="w-full border p-2 rounded mt-1"
              disabled={saving}
            />
          </label>
          <label className="block mb-4">
            Service Charge:
            <input
              type="number"
              value={serviceCharge}
              onChange={(e) => setServiceCharge(Number(e.target.value))}
              className="w-full border p-2 rounded mt-1"
              disabled={saving}
            />
          </label>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded flex items-center gap-2"
              disabled={saving}
            >
              {saving ? (
                <>
                  <span className="loader w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSalaryModal;
