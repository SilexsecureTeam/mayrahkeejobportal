import { useEffect, useState } from "react";
import CountryFormModal from "./CountryFormModal";
import DeleteConfirmation from "./DeleteConfirmation";
import { useLocationService } from "../../../services/locationService";

const CountryTable = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const { getCountries, createCountry, updateCountry, deleteCountry } =
    useLocationService();

  const fetchCountries = async () => {
    setLoading(true);
    try {
      const res = await getCountries(true);
      setCountries(res.data);
    } catch (err) {
      console.error("Error loading countries", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleCreateOrUpdate = async (data, isEdit) => {
    if (isEdit) {
      await updateCountry(data.id, data);
    } else {
      await createCountry(data);
    }
    setModalData(null);
    fetchCountries();
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deleteCountry(deleteId);
      setDeleteId(null);
      fetchCountries();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Countries</h3>
        <button
          onClick={() => setModalData({})}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Add Country
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">SN</th>
              <th className="p-2">Name</th>
              <th className="p-2">Code</th>
              <th className="p-2">States</th>
              <th className="p-2">LGAs</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((c, i) => (
              <tr key={c.id} className="border-t">
                <td className="p-2">{i + 1}</td>
                <td className="p-2">{c.name}</td>
                <td className="p-2">{c.code}</td>
                <td className="p-2">{c.states?.length || 0}</td>
                <td className="p-2">
                  {c.states?.reduce(
                    (total, s) => total + s.lgas?.length || 0,
                    0
                  )}
                </td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => setModalData(c)}
                    className="text-green-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteId(c.id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modals */}
      {modalData !== null && (
        <CountryFormModal
          data={modalData}
          onClose={() => setModalData(null)}
          onSave={handleCreateOrUpdate}
        />
      )}

      {deleteId && (
        <DeleteConfirmation
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
          label="country"
        />
      )}
    </div>
  );
};

export default CountryTable;
