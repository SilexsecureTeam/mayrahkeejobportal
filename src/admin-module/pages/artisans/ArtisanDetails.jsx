import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { FaArrowLeftLong } from "react-icons/fa6";
import UseAdminManagement from "../../../hooks/useAdminManagement";
import PoliceReportDialog from "../../components/Dialog/PoliceReportDialogue";
import MedicalReportDialog from "../../components/Dialog/MedicalReportDialogue";
import GuarantorReportDialog from "../../components/Dialog/GuarantorReport";
import PreviousWorkExperienceDialog from "../../components/Dialog/PreviousWorkExperienceDialogue";

const ArtisanDetails = () => {
  const { id } = useParams();
  const { getStaffById, getStaffReportById } = UseAdminManagement();
  const [artisan, setArtisan] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getStaffById(id);
      console.log(data);
      
      if (data) {
        setArtisan(data);
      } else {
        console.error("No data received");
      }
    })();
  }, []);

  const fetchReport = async (type, id) => {
    const data = await getStaffReportById(type, id);
    return data;
  };

  if (!artisan) {
    return <div>Domestic Staff not found</div>;
  }

  const { data } = artisan;

  return (
    <div className="p-4">
      <Button
        label="Back"
        className="mb-4"
        outlined
        onClick={() => window.history.back()}
        icon={<FaArrowLeftLong className="me-4" />}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="shadow-lg px-4 py-4 md:col-span-1">
          <div className="flex space-x-4">
            <div className="">
              {data.profile_image ? (
                <img
                  src={"https://dash.mayrahkeeafrica.com/" + data.profile_image}
                  alt="Profile"
                  className="h-20 w-20 rounded-full border-4 border-white shadow-lg"
                />
              ) : (
                <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
                  <span>No Image</span>
                </div>
              )}
            </div>

            <div>
              <h2 className="text-gray-800 text-2xl font-bold mb-2">{data.name}</h2>
              <h1 className="text-gray-400 text-sm">{data.email}</h1>
            </div>
          </div>

          <div className="bg-gray-200 px-4 py-4 my-4">
            <div className="flex text-xs justify-between pb-3">
              <p>Member Since</p>  <p>{data.member_since}</p>
            </div>
            <h1 className="text-sm">Current Salary: {data.current_salary}</h1>
            <h1 className="text-sm">Expected Salary: {data.expected_salary}</h1>
          </div>
          <hr />
          <div className="text-md px-4 py-4">
            <h1 className="font-bold">Contact</h1>
            <div className="flex items-center space-x-2">
              <span>Phone Number: {data.phone_number}</span>
            </div>
          </div>
        </div>

        <div className="shadow-lg px-4 py-4 md:col-span-1.5">
          <div className="pb-4">
            <h1 className="font-bold">Details</h1>
            <div className="text-sm px-4 py-4 font-semibold">
              <h1>Staff Category: {data.staff_category}</h1>
              <h1>Subcategory: {data.subcategory}</h1>
              <h1>Employment Type: {data.employment_type}</h1>
              <h1>Work Type: {data.work_type}</h1>
              <h1>Work Days: {data.work_days}</h1>
              <h1>Religion: {data.religion}</h1>
              <h1>Location: {data.location}</h1>
              <h1>Job Type: {data.job_type}</h1>
              <h1>Years of Experience: {data.years_of_experience}</h1>
              <h1>Education Level: {data.education_level}</h1>
              <h1>Marital Status: {data.marital_status}</h1>
              <h1>Languages Spoken: {data.languages_spoken?.join(", ")}</h1>
              <h1>Status: {data.status}</h1>
            </div>
          </div>
          <hr />
          <h1 className="font-bold py-4">Reports</h1>
          <div className="text-sm px-4 py-4 mb-3 space-y-4">
            <PoliceReportDialog fetchData={() => fetchReport("police-report", data.id)} />
            <MedicalReportDialog fetchData={() => fetchReport("medical-history", data.id)} />
            <GuarantorReportDialog fetchData={() => fetchReport("guarantor", data.id)} />
            <PreviousWorkExperienceDialog fetchData={() => fetchReport("previous-work-experience", data.id)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanDetails;