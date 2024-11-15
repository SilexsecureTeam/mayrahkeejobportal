import { useState, useEffect } from "react";
import UseAdminManagement from "../../../hooks/useAdminManagement";
import DataTableComponent from "../../components/DataTable/DataTableComponent";
import { Button } from "primereact/button";
import { FaArrowLeftLong } from "react-icons/fa6";

function AllEmployers() {
  const { loading, getEmployers } = UseAdminManagement();
  const [employers, setEmployers] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getEmployers();
      if (data) {
        setEmployers(data);
      } else {
        console.error("No data received");
      }
    })();
  }, []);

  const heading = ["ID", "Name", "Profile", "Image", "Status",];
  
  const data = employers.map(employer => ({
    [heading[0].toLowerCase()]: employer.id,
    [heading[1].toLowerCase()]: employer.company_name,
    [heading[2].toLowerCase()]: employer.company_profile,
    [heading[3].toLowerCase()]: <img src={"https://dash.mayrahkeeafrica.com/"+employer.logo_image} alt="Logo" className="h-10 w-10 rounded-full" />,
    [heading[4].toLowerCase()]: employer.status,
  }));

  return (
    <div className="mx-14 mt-10">
      <Button label="Back" className="mb-4" outlined onClick={() => window.history.back()} icon={<FaArrowLeftLong className="me-4" />} />
      <h2 className="text-black border-b border-gray-500 text-2xl font-bold mt-10">Employers</h2>
      <DataTableComponent heading={heading} data={data} loading={loading} name="employer" allowEdit={true}/>
    </div>
  );
}

export default AllEmployers;