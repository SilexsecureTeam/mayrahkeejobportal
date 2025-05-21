import { useEffect, useState } from "react";
import axios from "axios";
import EditSalaryModal from "./EditSalaryModal";

const SalaryManagement = () => {
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStaff = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/domesticStaff/get-staff`);
      setStaffList(res.data?.domesticStaff);
    } catch (err) {
      console.error("Error fetching staff", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleUpdate = async (updatedStaff) => {
    try {
      await axios.put(`${import.meta.env.VITE_BASE_URL}/salary/update`, {
        domestic_staff_id: updatedStaff?.id,
        salary_agreed: updatedStaff?.salary_agreed,
        service_charge: updatedStaff?.service_charge,
      });
      setStaffList((prev) =>
        prev.map((s) => (s.id === updatedStaff.id ? updatedStaff : s))
      );
    } catch (err) {
      console.error("Error updating staff", err);
    }
    setSelectedStaff(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Salary Management</h2>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th>Name</th>
            <th>Agreed Salary</th>
            <th>Service Charge</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((staff) => (
            <tr key={staff.id} className="border-t">
              <td>{staff.name}</td>
              <td>₦{staff?.salary_agreed?.toLocaleString()}</td>
              <td>{staff?.service_charge}</td>
              <td>
                <button
                  className="text-blue-600 underline"
                  onClick={() => setSelectedStaff(staff)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedStaff && (
        <EditSalaryModal
          staff={selectedStaff}
          onClose={() => setSelectedStaff(null)}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
};

export default SalaryManagement;
