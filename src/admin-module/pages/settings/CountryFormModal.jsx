import { useState, useEffect } from "react";

const CountryFormModal = ({ data, onClose, onSave }) => {
  const [form, setForm] = useState({ name: "", code: "" });

  useEffect(() => {
    if (data) setForm({ name: data.name || "", code: data.code || "" });
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      ...(data.id && { id: data.id }),
    };
    onSave(payload, !!data.id);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-md shadow-lg">
        <h3 className="text-lg font-semibold mb-4">
          {data.id ? "Edit Country" : "Add Country"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Code</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value })}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 text-gray-600"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {data.id ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CountryFormModal;
