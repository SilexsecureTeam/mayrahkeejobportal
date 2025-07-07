import { useEffect, useState } from "react";
import { useLocationService } from "../../../services/locationService";
import DeleteConfirmation from "./DeleteConfirmation";

const LGATable = ({ filterByStateId }) => {
  const { getLGAs, createLGA, updateLGA, deleteLGA, getStates } =
    useLocationService();

  const [lgas, setLGAs] = useState([]);
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [lgasRes, statesRes] = await Promise.all([
        getLGAs(true),
        getStates(true),
      ]);
      const allLGAs = lgasRes.data;
      const filtered = filterByStateId
        ? allLGAs.filter((lga) => lga.state_id === filterByStateId)
        : allLGAs;

      setLGAs(filtered);
      setStates(statesRes.data);
    } catch (err) {
      console.error("Error fetching LGAs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterByStateId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.id) {
      await updateLGA(formData.id, formData);
    } else {
      await createLGA(formData);
    }
    setFormData(null);
    fetchData();
  };

  const handleDelete = async () => {
    await deleteLGA(deleteId);
    setDeleteId(null);
    fetchData();
  };

  return (
    <div className="bg-white shadow rounded p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Local Government Areas</h3>
        <button
          onClick={() =>
            setFormData({ name: "", state_id: filterByStateId || "" })
          }
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          + Add LGA
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading LGAs...</p>
      ) : lgas.length === 0 ? (
        <div className="text-gray-500 py-10 text-center">
          <p className="text-lg">No LGAs available for this state.</p>
          <p className="text-sm">Use the button above to add a new LGA.</p>
        </div>
      ) : (
        <div className="overflow-auto max-h-[400px]">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100 sticky top-0 text-left">
              <tr>
                <th className="p-2">SN</th>
                <th className="p-2">Name</th>
                <th className="p-2">State</th>
                <th className="p-2">Country</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {lgas.map((lga, i) => (
                <tr key={lga.id} className="border-t">
                  <td className="p-2">{i + 1}</td>
                  <td className="p-2">{lga.name}</td>
                  <td className="p-2">{lga.state?.name || "-"}</td>
                  <td className="p-2">{lga.state?.country?.name || "-"}</td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => setFormData(lga)}
                      className="text-green-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteId(lga.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Form Modal */}
      {formData && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              {formData.id ? "Edit LGA" : "Add LGA"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  LGA Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">State</label>
                <select
                  value={formData.state_id}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      state_id: parseInt(e.target.value),
                    })
                  }
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  <option value="">-- Select State --</option>
                  {states.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.country?.name})
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setFormData(null)}
                  className="px-4 py-2 border rounded text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  {formData.id ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteId && (
        <DeleteConfirmation
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
          label="LGA"
        />
      )}
    </div>
  );
};

export default LGATable;
