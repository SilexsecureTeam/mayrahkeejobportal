import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { FaArrowLeftLong } from "react-icons/fa6";
import UseAdminManagement from "../../../hooks/useAdminManagement";

const ArtisanDetails = () => {
  const { id } = useParams();
  const { getStaffById } = UseAdminManagement();
  const [artisan, setArtisan] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getStaffById(id);
      if (data) {
        setArtisan(data);
      } else {
        console.error("No data received");
      }
    })();
  }, [id]);

  if (!artisan) {
    return <div>Artisan not found</div>;
  }

  const { data } = artisan;

  return (
    <div className="p-4">
      <Button label="Back" className="mb-4" outlined onClick={() => window.history.back()} icon={<FaArrowLeftLong className="me-4" />} />
      <Card title={`${data.first_name} ${data.middle_name} ${data.surname}`} subTitle={data.email} className="mb-4">
        <div className="flex justify-center mb-4">
          {data.profile_image ? (
            <img src={"https://dash.mayrahkeeafrica.com/"+data.profile_image} alt="Profile" className="h-20 w-20 rounded-full" />
          ) : (
            <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
              <span>No Image</span>
            </div>
          )}
        </div>
        <div className="mb-4">
          <strong>Staff Category:</strong> {data.staff_category}
        </div>
        <div className="mb-4">
          <strong>Subcategory:</strong> {data.subcategory}
        </div>
        <div className="mb-4">
          <strong>Employment Type:</strong> {data.employment_type}
        </div>
        <div className="mb-4">
          <strong>Work Type:</strong> {data.work_type}
        </div>
        <div className="mb-4">
          <strong>Work Days:</strong> {data.work_days}
        </div>
        <div className="mb-4">
          <strong>Religion:</strong> {data.religion}
        </div>
        <div className="mb-4">
          <strong>Location:</strong> {data.location}
        </div>
        <div className="mb-4">
          <strong>Current Salary:</strong> {data.current_salary}
        </div>
        <div className="mb-4">
          <strong>Expected Salary:</strong> {data.expected_salary}
        </div>
        <div className="mb-4">
          <strong>Job Type:</strong> {data.job_type}
        </div>
        <div className="mb-4">
          <strong>Years of Experience:</strong> {data.years_of_experience}
        </div>
        <div className="mb-4">
          <strong>Education Level:</strong> {data.education_level}
        </div>
        <div className="mb-4">
          <strong>Marital Status:</strong> {data.marital_status}
        </div>
        <div className="mb-4">
          <strong>Languages Spoken:</strong> {data?.languages_spoken?.join(", ")}
        </div>
        <div className="mb-4">
          <strong>Member Since:</strong> {data.member_since}
        </div>
        <div className="mb-4">
          <strong>Status:</strong> {data.status}
        </div>
      </Card>
    </div>
  );
};

export default ArtisanDetails;