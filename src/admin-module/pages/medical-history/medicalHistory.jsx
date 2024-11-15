import { useState, useEffect } from "react";
import useAdminManagement from "../../../hooks/useAdminManagement";
import DataTableComponent from "../../components/DataTable/DataTableComponent";
import { Button } from "primereact/button";
import { FaArrowLeftLong } from "react-icons/fa6";

function AllMedicalHistories() {
  const { getStaffReport, loading } = useAdminManagement();
  const [medicals, setMedicals] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const data = await getStaffReport("medical-history");
      console.log("Fetched Data:", data); // Log the fetched data
      
      if (data) {
        setMedicals(data.MedicalHistory); // Ensure the correct data structure is used
      } else {
        console.error("No data received");
      }
    };
    fetchReports();
  }, []);

  const heading = ["ID", "Hospital Name", "Contact", "Document", "Status", "StaffID"];
  
  const data = medicals.map(medical => ({
    [heading[0].toLowerCase()]: medical.id,
    [heading[1].toLowerCase()]: medical.hospital_name,
    [heading[2].toLowerCase()]: medical.contact_detail,
    [heading[3].toLowerCase()]: <img src={"https://dash.mayrahkeeafrica.com/"+medical.medical_report_docs} alt="document" className="w-28 h-28 rounded-lg"/>,
    [heading[4].toLowerCase()]: medical.status === null ? "Pending" : medical.status, // Check if status is null
    [heading[5].toLowerCase()]: medical.domestic_staff_id,
  }));

  return (
    <div className="mx-14 mt-10">
      <Button label="Back" className="mb-4" outlined onClick={() => window.history.back()} icon={<FaArrowLeftLong className="me-4" />} />
      <h2 className="text-black border-b border-gray-500 text-2xl font-bold mt-10">Medical Histories</h2>
      <DataTableComponent heading={heading} data={data} loading={loading} name="domestic-staff" allowEdit={false} />
    </div>
  );
}

export default AllMedicalHistories;