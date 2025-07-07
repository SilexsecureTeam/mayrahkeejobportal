import { useState, useEffect } from "react";
import UseAdminManagement from "../../../hooks/useAdminManagement";
import DataTableComponent from "../../components/DataTable/DataTableComponent";
import { FaArrowLeftLong } from "react-icons/fa6";
import ToggleSwitch from "./Tools/ToggleBtn";
import { onFailure } from "../../../utils/notifications/OnFailure";
import { onSuccess } from "../../../utils/notifications/OnSuccess";

function AllJobs() {
  const { loading, getAllJobs, updateFeaturedJobs } = UseAdminManagement();
  const [jobs, setJobs] = useState([]);
  const [loadingToggles, setLoadingToggles] = useState({}); // Track toggle loading states

  useEffect(() => {
    (async () => {
      const data = await getAllJobs();
      const sortedData = data.sort((a, b) => b.id - a.id);
      if (data) {
        setJobs(sortedData);
      } else {
        console.error("No data received");
      }
    })();
  }, []);

  const handleToggle = async (job, isCurrentlyOn) => {
    const id = job.id;
    const updatedStatus = isCurrentlyOn ? "0" : "1";

    setLoadingToggles((prev) => ({ ...prev, [id]: true }));

    try {
      console.log("Updating job:", job, "to status:", updatedStatus);

      const response = await updateFeaturedJobs(job, updatedStatus);

      if (response) {
        setJobs((prevJobs) =>
          prevJobs.map((j) =>
            j.id === id ? { ...j, feature_jobs: updatedStatus } : j
          )
        );

        onSuccess({
          message: "Job Update Status",
          success: "Updated successfully",
        });
      }
    } catch (error) {
      onFailure({
        message: "Job Update Error",
        error: "Failed to update",
      });
    } finally {
      setLoadingToggles((prev) => ({ ...prev, [id]: false }));
    }
  };

  const heading = [
    "ID",
    "Title",
    "Salary Type",
    "Sector",
    "Type",
    "Status",
    "Featured Jobs",
  ];

  const data = jobs.map((job) => {
    const deadline = new Date(job.application_deadline_date);
    const today = new Date();
    deadline.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const isDeadlinePassed = deadline < today;
    const isFeatured = String(job.feature_jobs) === "1";

    return {
      [heading[0].toLowerCase()]: job.id,
      [heading[1].toLowerCase()]: job.job_title,
      [heading[2].toLowerCase()]: job.salary_type,
      [heading[3].toLowerCase()]: job.sector,
      [heading[4].toLowerCase()]: job.type,
      [heading[5].toLowerCase()]:
        String(job.status) === "1"
          ? "Approved"
          : String(job.status) === "0"
          ? "Pending"
          : job.status,
      [heading[6].toLowerCase()]: isDeadlinePassed ? (
        <span className="text-yellow-600 font-medium">Deadline Passed</span>
      ) : (
        <ToggleSwitch
          isOn={isFeatured}
          isLoading={loadingToggles[job.id]}
          onToggle={() => handleToggle(job, isFeatured)}
        />
      ),
    };
  });

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
        Jobs
      </h2>

      <DataTableComponent
        heading={heading}
        data={data}
        isLoading={loading}
        name="job"
        allowEdit={true}
        renderers={{
          "featured jobs": (rowData) => {
            const deadline = new Date(rowData.application_deadline_date);
            const today = new Date();
            deadline.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);

            const isDeadlinePassed = deadline < today;
            const isFeatured = String(rowData.feature_jobs) === "1";

            return isDeadlinePassed ? (
              <span className="text-yellow-600 font-medium">
                Deadline Passed
              </span>
            ) : (
              <ToggleSwitch
                isOn={isFeatured}
                isLoading={loadingToggles[rowData.id]}
                onToggle={() => handleToggle(rowData, isFeatured)}
              />
            );
          },
        }}
      />
    </div>
  );
}

export default AllJobs;
