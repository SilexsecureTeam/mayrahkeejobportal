import { useState, useEffect } from "react";
import UseAdminManagement from "../../../hooks/useAdminManagement";
import DataTableComponent from "../../components/DataTable/DataTableComponent";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Button } from "primereact/button";

function AllCandidate() {
  const { getCandidates, loading } = UseAdminManagement();
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getCandidates();
      if (data) {
        setCandidates(data);
        console.log(data);
      } else {
        console.error("No data received");
      }
    })();
  }, []); // Dependency array ensures this runs only when getEmployers changes

  const heading = ["ID", "Name", "Email",  "Status", "Gender" ];
  const data = candidates.map(candidate => ({
    [heading[0].toLowerCase()]: candidate.id,
    [heading[1].toLowerCase()]: candidate.first_name + " " + (candidate.middle_name === null || candidate.middle_name === 'null' ? '' : candidate.middle_name) + " " + candidate.last_name,
    [heading[2].toLowerCase()]: candidate.email,
    [heading[3].toLowerCase()]: candidate.status,
    [heading[4].toLowerCase()]: candidate.gender,
  }));

  return (
    <div className="mx-14 mt-10">
      <Button label="Back" className="mb-4" outlined onClick={() => window.history.back()} icon={<FaArrowLeftLong className="me-4" />} />
      <h2 className="text-black border-b border-gray-500 text-2xl font-bold mt-10">Candidates</h2>
      <DataTableComponent heading={heading} data={data} loading={loading} name="candidate" allowEdit={true} />
    </div>
  );
}

export default AllCandidate;