import { useState, useEffect } from "react";
import UseAdminManagement from "../../../hooks/useAdminManagement";
import { Button } from "primereact/button";
import { Paginator } from "primereact/paginator";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { FaLinkedin, FaGlobe, FaFileAlt } from "react-icons/fa";
import { format } from "date-fns";

function JobsByEmployer() {
  const { loading, getJobsByEmployerId } = UseAdminManagement();
  const [employers, setEmployers] = useState([]);
  const { id } = useParams();
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(2);

  useEffect(() => {
    (async () => {
      const data = await getJobsByEmployerId(id);
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
    <div className="mx-auto mt-10 max-w-screen-lg px-4 sm:px-6 lg:px-8">
      <Button
        label="Back"
        className="mb-6"
        outlined
        onClick={() => window.history.back()}
        icon={<FaArrowLeftLong className="me-4" />}
      />
      {employers.length === 0 ? (
        <div className="text-center text-gray-500">
          <h2 className="text-2xl font-semibold">No posted jobs</h2>
        </div>
      ) : (
        <>
          <h2 className="text-3xl font-extrabold text-gray-800 mb-8">Jobs Posted by Employer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {employers.slice(first, first + rows).map((employer) => (
              <div
                key={employer.id}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
              >
                {/* Job Title and Description */}
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">{employer.job_title}</h3>
                  <p className="text-gray-500 mb-2">{employer.job_description}</p>
                </div>

                {/* Job Details Section */}
                <div className="mb-4 border-t pt-4">
                  <h4 className="text-lg font-semibold text-gray-700">Job Details</h4>
                  <p className="text-gray-600"><strong>Sector:</strong> {employer.sector}</p>
                  <p className="text-gray-600"><strong>Type:</strong> {employer.type}</p>
                  <p className="text-gray-600"><strong>Search Keywords:</strong> {employer.search_keywords}</p>
                  <p className="text-gray-600"><strong>Experience:</strong> {employer.experience}</p>
                  <p className="text-gray-600"><strong>Career Level:</strong> {employer.career_level}</p>
                  <p className="text-gray-600"><strong>Qualification:</strong> {employer.qualification}</p>
                  <p className="text-gray-600"><strong>Application Deadline:</strong> {format(new Date(employer.application_deadline_date), 'MMMM dd, yyyy')}</p>
                </div>

                {/* Salary and Location Section */}
                <div className="mb-4 border-t pt-4">
                  <h4 className="text-lg font-semibold text-gray-700">Compensation and Location</h4>
                  <p className="text-gray-600"><strong>Min Salary:</strong> {employer.min_salary}</p>
                  <p className="text-gray-600"><strong>Max Salary:</strong> {employer.max_salary} {employer.currency}</p>
                  <p className="text-gray-600"><strong>Office Address:</strong> {employer.office_address}</p>
                  <p className="text-gray-600"><strong>Location:</strong> {employer.location}</p>
                  <p className="text-gray-600"><strong>Maps Location:</strong> <a href={employer.maps_location} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View Map</a></p>
                </div>

                {/* Employer Information Section */}
                <div className="mb-4 border-t pt-4">
                  <h4 className="text-lg font-semibold text-gray-700">Employer Information</h4>
                  <p className="text-gray-600"><strong>Email:</strong> {employer.email}</p>
                  <p className="text-gray-600"><strong>Preferred Age:</strong> {employer.preferred_age}</p>
                  <p className="text-gray-600"><strong>Gender:</strong> {employer.gender}</p>
                  <p className="text-gray-600"><strong>Number of Participants:</strong> {employer.number_of_participants}</p>
                </div>

                {/* Social Media and Links */}
                <div className="mb-4 border-t pt-4">
                  <h4 className="text-lg font-semibold text-gray-700">Media and Links</h4>
                  <div className="flex space-x-4">
                    {employer.linkedin_url && (
                      <a
                        href={employer.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaLinkedin className="text-2xl" />
                      </a>
                    )}
                    {employer.portfolio_url && (
                      <a
                        href={employer.portfolio_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaGlobe className="text-2xl" />
                      </a>
                    )}
                    {employer.resume_path && (
                      <a
                        href={employer.resume_path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaFileAlt className="text-2xl" />
                      </a>
                    )}
                  </div>
                  {employer.introduction_video_url && (
                    <video src={employer.introduction_video_url} controls className="w-full max-w-md h-auto mt-2" />
                  )}
                </div>

                {/* Status and Dates */}
                <div className="border-t pt-4">
                  <h4 className="text-lg font-semibold text-gray-700">Status and Timestamps</h4>
                  <p className="text-gray-600"><strong>Status:</strong> {employer.status}</p>
                  <p className="text-gray-600"><strong>Created At:</strong> {format(new Date(employer.created_at), 'MMMM dd, yyyy')}</p>
                  <p className="text-gray-600"><strong>Updated At:</strong> {format(new Date(employer.updated_at), 'MMMM dd, yyyy')}</p>
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
            className="mt-6"
          />
        </>
      )}
    </div>
  );
}

export default JobsByEmployer;
