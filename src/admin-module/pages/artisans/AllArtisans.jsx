import { useState, useEffect } from "react";
import UseAdminManagement from "../../../hooks/useAdminManagement";
import DataTableComponent from "../../components/DataTable/DataTableComponent";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Button } from "primereact/button";

function AllArtisans() {
  const { getArtisans, loading } = UseAdminManagement();
  const [artisans, setArtisans] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getArtisans();
      if (data) {
        setArtisans(data);
        console.log(data);
      } else {
        console.error("No data received");
      }
    })();
  }, []); // Dependency array ensures this runs only when getEmployers changes

  const heading = ["ID", "Name", "Email", "Subcategory", "Job", "Status", "YOE", "Current Salary", "Expected Salary", "Location"];
  const data = artisans.map(artisan => ({
    [heading[0].toLowerCase()]: artisan.id,
    [heading[1].toLowerCase()]: artisan.first_name + " " + (artisan.middle_name === null || artisan.middle_name === 'null' ? '' : artisan.middle_name) + " " + artisan.surname,
    [heading[2].toLowerCase()]: artisan.email,
    [heading[3].toLowerCase()]: artisan.subcategory,
    [heading[4].toLowerCase()]: artisan.job_type,
    [heading[5].toLowerCase()]: artisan.status,
    [heading[6].toLowerCase()]: artisan.years_of_experience,
    [heading[7].toLowerCase()]: artisan.current_salary,
    [heading[8].toLowerCase()]: artisan.expected_salary,
    [heading[9].toLowerCase()]: artisan.location,
  }));

  return (
    <div className="mx-14 mt-10">
      <Button label="Back" className="mb-4" outlined onClick={() => window.history.back()} icon={<FaArrowLeftLong className="me-4" />} />
      <h2 className="text-black border-b border-gray-500 text-2xl font-bold mt-10">Artisans</h2>
      <DataTableComponent heading={heading} data={data} loading={loading} name="artisan" />
    </div>
  );
}

export default AllArtisans;