import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "primereact/button";
import { FaArrowLeftLong } from "react-icons/fa6";
import UseAdminManagement from "../../../hooks/useAdminManagement";
import DataTableComponent from "../../components/DataTable/DataTableComponent";

const EmployerStaff = () => {
  const { id } = useParams();
  const [staffDetails, setStaffDetails] = useState([]);
  const [error, setError] = useState(null);
  const { getEmployerDomesticStaff, loading } = UseAdminManagement();

  useEffect(() => {
    (() => {
      try {
        getEmployerDomesticStaff(id).then((data) => {
        if (data) {
          setStaffDetails(data);
        } else {
          console.error("No data received");
        }
      });
    } catch (error) {
      console.error("Error fetching staff details:", error);
      setError(error);
    }
  })();
}, []);

  if (!staffDetails.length) {
    return <div>No staff details found</div>;
  }

  const heading = ["ID", "Staff Name", "Start Date", "End Date", "Status", "StaffID"];
  
  
  const data = staffDetails.map(staff => ({
    [heading[0].toLowerCase()]: staff.id,
    [heading[1].toLowerCase()]: staff.staff_name, 
    [heading[2].toLowerCase()]: staff.start_date,
    [heading[3].toLowerCase()]: staff.end_date,
    [heading[4].toLowerCase()]: staff.status,
    [heading[5].toLowerCase()]: staff.domestic_staff_id,
  }));

  return (
    <div className="mx-14 mt-10 mb-24">
      <Button label="Back" className="mb-4" outlined onClick={() => window.history.back()} icon={<FaArrowLeftLong className="me-4" />} />
      <h2 className="text-black border-b border-gray-500 text-2xl font-bold mt-10">Domestic Staffs</h2>
      <DataTableComponent heading={heading} data={data} loading={loading} name="domestic-staff" />
    </div>
  );
};

export default EmployerStaff;