// StateTable.jsx
import { useEffect, useState } from "react";
import { useLocationService } from "../../../services/locationService";
import DeleteConfirmation from "./DeleteConfirmation";

const StateTable = ({ filterByCountryId }) => {
  const { getStates, createState, updateState, deleteState, getCountries } =
    useLocationService();

  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statesRes, countriesRes] = await Promise.all([
        getStates(true),
        getCountries(),
      ]);
      const filtered = filterByCountryId
        ? statesRes.data.filter((s) => s.country_id === filterByCountryId)
        : statesRes.data;
      setStates(filtered);
      setCountries(countriesRes.data);
    } catch (err) {
      console.error("Error fetching states", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterByCountryId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.id) {
      await updateState(formData.id, formData);
    } else {
      await createState(formData);
    }
    setFormData(null);
    fetchData();
  };

  const handleDelete = async () => {
    await deleteState(deleteId);
    setDeleteId(null);
    fetchData();
  };

  return (
    <div className="bg-white shadow rounded p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">States</h3>
        <button
          onClick={() =>
            setFormData({ name: "", country_id: filterByCountryId || "" })
          }
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          + Add State
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading states...</p>
      ) : states.length === 0 ? (
        <p className="text-gray-500">No states available for this country.</p>
      ) : (
        <div className="overflow-auto max-h-[400px]">
          <table className="w-full min-w-[700px] border text-sm">
            <thead className="bg-gray-100 sticky top-0 text-left">
              <tr>
                <th className="p-2">SN</th>
                <th className="p-2">Name</th>
                <th className="p-2">Country</th>
                <th className="p-2">LGAs</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {states.map((state, i) => (
                <tr key={state.id} className="border-t">
                  <td className="p-2">{i + 1}</td>
                  <td className="p-2">{state.name}</td>
                  <td className="p-2">{state.country?.name || "-"}</td>
                  <td className="p-2">{state.lgas?.length || 0}</td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => setFormData(state)}
                      className="text-green-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteId(state.id)}
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

      {/* Modal */}
      {formData && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white rounded p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              {formData.id ? "Edit State" : "Add State"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  State Name
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
                <label className="block text-sm font-medium mb-1">
                  Country
                </label>
                <select
                  value={formData.country_id}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      country_id: parseInt(e.target.value),
                    })
                  }
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  <option value="">-- Select Country --</option>
                  {countries.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
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
          label="state"
        />
      )}
    </div>
  );
};

export default StateTable;
