import { useState, useEffect } from "react";
import UseAdminManagement from "../../../hooks/useAdminManagement";
import { Button } from "primereact/button";
import { Paginator } from "primereact/paginator";
import { FaArrowLeftLong, FaGlobe, FaLinkedin } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { FaFileAlt } from "react-icons/fa";
import CardDetails from "../../components/Card/CardDetails";

function AppliedJobs() {
  const { loading, jobsAppliedToEmployerId } = UseAdminManagement();
  const [employers, setEmployers] = useState([]);
  const { id } = useParams();
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(2);

  useEffect(() => {
    (async () => {
      const data = await jobsAppliedToEmployerId(id);
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
              { label: "Name", value: employer.full_name },
              { label: "Email", value: employer.email },
              { label: "Phone number", value: employer.phone_number },
              { label: "Status", value: employer.status },
            ]}
            socialMedia={[
              employer.linkedin_url && {
                label: "LinkedIn",
                url: employer.linkedin_url,
                icon: <FaLinkedin className="inline mr-2 text-lg" />,
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

export default AppliedJobs;