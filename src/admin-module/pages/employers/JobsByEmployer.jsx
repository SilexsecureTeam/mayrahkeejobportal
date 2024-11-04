import { useState, useEffect } from "react";
import UseAdminManagement from "../../../hooks/useAdminManagement";
import { Button } from "primereact/button";
import { Paginator } from "primereact/paginator";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import CardDetails from "../../components/Card/CardDetails";
import { FaLinkedin, FaGlobe, FaFileAlt } from "react-icons/fa";

function JobsByEmployer() {
  const { loading, getJobsByEmployerId } = UseAdminManagement();
  const [employers, setEmployers] = useState([]);
  const { id } = useParams();
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(2);

  useEffect(() => {
    (async () => {
      const data = await getJobsByEmployerId(id);
      console.log(data);
      if (data) {
        setEmployers(data);
      } else {
        console.error("No data received");
      }
    })();
  }, [id]);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return (
    <div className="mx-14 mt-10">
      <Button
        label="Back"
        className="mb-4"
        outlined
        onClick={() => window.history.back()}
        icon={<FaArrowLeftLong className="me-4" />}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {employers.slice(first, first + rows).map((employer) => (
          <CardDetails
            key={employer.id}
            title={employer.job_title}
            description={employer.job_description}
            details={[
              { label: "Sector", value: employer.sector },
              { label: "Type", value: employer.type },
              { label: "Search Keywords", value: employer.search_keywords },
              { label: "External URL", value: <a href={employer.external_url} target="_blank" rel="noopener noreferrer">{employer.external_url}</a> },
              { label: "Gender", value: employer.gender },
              { label: "Email", value: employer.email },
              { label: "Min Salary", value: employer.min_salary },
              { label: "Max Salary", value: employer.max_salary },
              { label: "Experience", value: employer.experience },
              { label: "Career Level", value: employer.career_level },
              { label: "Currency", value: employer.currency },
              { label: "Preferred Age", value: employer.preferred_age },
              { label: "Number of Participants", value: employer.number_of_participants },
              { label: "Qualification", value: employer.qualification },
              { label: "Introduction Video", value: employer.introduction_video_url ? <video src={employer.introduction_video_url} controls className="w-full max-w-md h-auto mt-2" /> : "N/A" },
              { label: "Application Deadline Date", value: employer.application_deadline_date },
              { label: "Office Address", value: employer.office_address },
              { label: "Location", value: employer.location },
              { label: "Maps Location", value: <a href={employer.maps_location} target="_blank" rel="noopener noreferrer">View Map</a> },
              { label: "Status", value: employer.status },
              { label: "Created At", value: employer.created_at },
              { label: "Updated At", value: employer.updated_at },
            ]}
            socialMedia={[
              employer.linkedin_url && {
                label: "LinkedIn",
                url: employer.linkedin_url,
                icon: <FaLinkedin className="inline mr-2" />,
              },
              employer.portfolio_url && {
                label: "Portfolio",
                url: employer.portfolio_url,
                icon: <FaGlobe className="inline mr-2" />,
              },
              employer.resume_path && {
                label: "Resume",
                url: employer.resume_path,
                icon: <FaFileAlt className="inline mr-2" />,
              },
            ].filter(Boolean)}
          />
        ))}
      </div>
      <Paginator
        first={first}
        rows={rows}
        totalRecords={employers.length}
        rowsPerPageOptions={[2, 4, 6]}
        onPageChange={onPageChange}
        className="mt-4"
      />
    </div>
  );
}

export default JobsByEmployer;