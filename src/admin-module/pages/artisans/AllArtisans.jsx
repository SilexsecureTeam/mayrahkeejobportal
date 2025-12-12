import { useState, useEffect } from "react";
import UseAdminManagement from "../../../hooks/useAdminManagement";
import DataTableComponent from "../../components/DataTable/DataTableComponent";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Button } from "primereact/button";
import { formatDate } from "../../../utils/formmaters";
function AllArtisans() {
  const { getArtisans, loading } = UseAdminManagement();
  const [artisans, setArtisans] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getArtisans();
      const sortedData = data.sort((a, b) => b.id - a.id);
      if (data) {
        setArtisans(sortedData);
        console.log(data);
      } else {
        console.error("No data received");
      }
    })();
  }, []); // Dependency array ensures this runs only when getEmployers changes

  const heading = [
    "ID",
    "Name",
    "Registered",
    "Email",
    "Subcategory",
    "Years of Experience",
    "Location",
  ];
  const data = artisans.map((artisan) => ({
    [heading[0].toLowerCase()]: artisan.id,
    [heading[1].toLowerCase()]:
      artisan.first_name +
      " " +
      (artisan.middle_name === null || artisan.middle_name === "null"
        ? ""
        : artisan.middle_name) +
      " " +
      artisan.surname,
    [heading[2].toLowerCase()]: formatDate(artisan.created_at),
    [heading[3].toLowerCase()]: artisan.email,
    [heading[4].toLowerCase()]: artisan.subcategory,
    [heading[5].toLowerCase()]: artisan.years_of_experience,
    [heading[6].toLowerCase()]: artisan.location,
  }));

  return (
    <div className="mt-10">
      <button
        type="button"
        onClick={() => window.history.back()}
        className="flex items-center gap-2 outline outline-offset-5 outline-green-500 px-4 py-2 rounded text-green-500 hover:bg-green-100"
      >
        <FaArrowLeftLong className="me-4 text-green-500" />
        Back
      </button>
      <h2 className="text-black border-b border-gray-500 text-2xl font-bold mt-10">
        Artisans
      </h2>
      <DataTableComponent
        heading={heading}
        data={data}
        loading={loading}
        name="artisan"
      />
    </div>
  );
}

export default AllArtisans;
