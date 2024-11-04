import { useState, useEffect } from "react";
import UseAdminManagement from "../../../hooks/useAdminManagement";
import { Button } from "primereact/button";
import { Paginator } from "primereact/paginator";
import { FaArrowLeftLong, FaGlobe, FaLinkedin } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { FaFileAlt } from "react-icons/fa";
import CustomDialog from "../../components/Dialog/CustomDialog";

const EmployerCandidates = () => {
  const { loading, jobsAppliedToEmployerId, getReportById } = UseAdminManagement();
  const [employers, setEmployers] = useState([]);
  const { id } = useParams();
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(2);

  useEffect(() => {
    (async () => {
      const data = await jobsAppliedToEmployerId(id);
      console.log(data);
      if (data) {
        // Filter out duplicate entries based on the 'candidate_id' field
        const uniqueEmployers = data.filter((employer, index, self) =>
          index === self.findIndex((e) => e.candidate_id === employer.candidate_id)
        );
        console.log(uniqueEmployers);
        
        setEmployers(uniqueEmployers);
      } else {
        console.error("No data received");
      }
    })();
  }, [id]);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const fetchReport = async (reportType, candidateId) => {
    const data = await getReportById(reportType, candidateId);
    return data;
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
          <div key={employer.candidate_id} className="shadow-lg bg-white p-6 rounded-lg">
            <h2 className="text-gray-800 text-2xl font-bold mb-2">{employer.job_title}</h2>
            <p className="text-gray-600 mb-4">{employer.job_description}</p>
            <div className="text-gray-800 mb-4">
              <strong>Name:</strong> {employer.full_name}
            </div>
            <div className="text-gray-800 mb-4">
              <strong>Email:</strong> {employer.email}
            </div>
            <div className="text-gray-800 mb-4">
              <strong>Phone number:</strong> {employer.phone_number}
            </div>
            <div className="text-gray-800 mb-4">
              <strong>Status:</strong> {employer.status}
            </div>
            {employer.linkedin_url && (
              <div className="text-gray-800 mb-4">
                <strong>LinkedIn:</strong>{" "}
                <a href={employer.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  <FaLinkedin className="inline mr-2 text-lg" />
                </a>
              </div>
            )}
            {employer.portfolio_url && (
              <div className="text-gray-800 mb-4">
                <strong>Portfolio:</strong>{" "}
                <a href={employer.portfolio_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  <FaGlobe className="inline mr-2" />
                </a>
              </div>
            )}
            {employer.resume_path && (
              <div className="text-gray-800 mb-4">
                <strong>Resume:</strong>{" "}
                <a href={employer.resume_path} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  <FaFileAlt className="inline mr-2" />
                </a>
              </div>
            )}
            <div className="mt-4 flex flex-col gap-4">
              <CustomDialog header="Police Report" fetchData={() => fetchReport("police", employer.candidate_id)} buttonLabel="View Police Report" />
              <CustomDialog header="Medical Report" fetchData={() => fetchReport("medical", employer.candidate_id)} buttonLabel="View Medical Report" />
              <CustomDialog header="Guarantor" fetchData={() => fetchReport("guarantor", employer.candidate_id)} buttonLabel="View Guarantor" />
              <CustomDialog header="Previous Employer" fetchData={() => fetchReport("previousEmployer", employer.candidate_id)} buttonLabel="View Previous Employer" />
            </div>
          </div>
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
};

export default EmployerCandidates;