import { useState, useEffect } from "react";
import UseAdminManagement from "../../../hooks/useAdminManagement";
import DataTableComponent from "../../components/DataTable/DataTableComponent";
import { Button } from "primereact/button";
import { FaArrowLeftLong } from "react-icons/fa6";

function AllJobs() {
  const { loading, getAllJobs } = UseAdminManagement();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getAllJobs();
      console.log(data);
      if (data) {
        setJobs(data);
      } else {
        console.error("No data received");
      }
    })();
  }, []);

  const heading = ["ID", "Title","Salary Type","Sector","Type","Status"];
  
  const data = jobs.map(job => ({
    [heading[0].toLowerCase()]: job.id,
    [heading[1].toLowerCase()]: job.job_title,
    [heading[2].toLowerCase()]: job.salary_type,
    [heading[3].toLowerCase()]: job.sector,
    [heading[4].toLowerCase()]: job.type,
    [heading[5].toLowerCase()]: job.status,
  }));

  return (
    <div className="mx-14 mt-10">
      <button
          type="button"
          onClick={() => window.history.back()}
          className="flex items-center gap-2 outline outline-offset-5 outline-green-500 px-4 py-2 rounded text-green-500 hover:bg-green-100"
        >
       <FaArrowLeftLong className="me-4 text-green-500" />Back
        </button>
      <h2 className="text-black border-b border-gray-500 text-2xl font-bold mt-10">Jobs</h2>
      <DataTableComponent heading={heading} data={data} loading={loading} name="job" allowEdit={true}/>
    </div>
  );
}

export default AllJobs;