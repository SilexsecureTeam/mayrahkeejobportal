import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { FaArrowLeftLong, FaTwitter, FaInstagram, FaGlobe, FaLinkedin } from "react-icons/fa6";
import { MdEmail, MdPhone } from "react-icons/md";
import UseAdminManagement from "../../../hooks/useAdminManagement";
import { format } from "date-fns";
import { BsEye, BsShieldLock } from "react-icons/bs";

const CandidateDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCandidateById } = UseAdminManagement();
  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getCandidateById(id);
      console.log(data.categories);
      if (data) {
        setCandidate(data);
      } else {
        console.error("No data received");
      }
    })();
  }, [id]);

  if (!candidate) {
    return <div>Candidate not found</div>;
  }

  const data = candidate;

  const handleViewContract = () => {
    navigate(`/admin/candidate/${id}/staffs`);
  };

  const renderSocialMedia = (socialMediaHandles) => {
    return socialMediaHandles.map((handle, index) => {
      if (!handle.network || !handle.url) return null;

      let icon;
      let label;

      switch (handle.network.toLowerCase()) {
        case 'twitter':
          icon = <FaTwitter className="text-blue-500" />;
          label = 'Twitter';
          break;
        case 'instagram':
          icon = <FaInstagram className="text-pink-500" />;
          label = 'Instagram';
          break;
        case 'linkedin':
          icon = <FaLinkedin className="text-blue-700" />;
          label = 'LinkedIn';
          break;
        case 'website':
          icon = <FaGlobe className="text-gray-600" />;
          label = 'Website';
          break;
        default:
          return null;
      }

      return (
        <div key={index} className="flex items-center space-x-2">
          {icon}
          <span>{label}: {handle.url}</span>
        </div>
      );
    });
  };

  const renderNinSlip = (ninSlip) => {
    if (!ninSlip) return null;

    const isPdf = ninSlip.toLowerCase().endsWith('.pdf');
    const url = `https://dash.mayrahkeeafrica.com/${ninSlip}`;

    return isPdf ? (
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
        View NIN Slip (PDF)
      </a>
    ) : (
      <img src={url} alt="NIN Slip" className="mt-2 w-40 h-40 rounded-xl" />
    );
  };

  return (
    <div className="p-4">
      <button
          type="button"
          onClick={() => window.history.back()}
          className="flex items-center gap-2 outline outline-offset-5 outline-green-500 px-4 py-2 rounded text-green-500 hover:bg-green-100"
        >
       <FaArrowLeftLong className="me-4 text-green-500" />Back
        </button>
      <Button label="View Contract" className="mb-4 ml-4" onClick={handleViewContract} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="shadow-lg px-4 py-4 md:col-span-1">
          <div className="flex space-x-4">
            <div className="">
              {data.profile ? (
                <img src={"https://dash.mayrahkeeafrica.com/" + data.profile} alt="Profile" className="h-20 w-20 rounded-full border-4 border-white shadow-lg" />
              ) : (
                <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
                  <span>No Image</span>
                </div>
              )}
            </div>

            <div>
              <h2 className="text-gray-800 text-2xl font-bold mb-2">{data.full_name.toUpperCase()}</h2>
              <h1 className="text-gray-400 text-sm">{data.preferred_job_role}</h1>
            </div>
          </div>

          <div className="bg-gray-200 px-4 py-4 my-4">
            <div className="flex text-xs justify-between pb-3">
              <p>Applied Jobs</p>  <p>{format(new Date(data.created_at), 'MMMM dd, yyyy')}</p>
            </div>
            <h1 className="text-sm">{data.categories}</h1>
            <h1 className="text-sm">Salary: {data.salary_type}</h1>
          </div>
          <hr />
          <div className="text-md px-4 py-4">
            <h1 className="font-bold">Contact</h1>
            <div className="flex items-center space-x-2">
              <MdEmail className="text-gray-600" />
              <span>{data.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MdPhone className="text-gray-600" />
              <span>{data.phone_number}</span>
            </div>
            {renderSocialMedia(data.social_media_handle)}
          </div>
        </div>

        <div className="shadow-lg px-4 py-4 md:col-span-1.5">
          <div className="pb-4">
            <BsShieldLock className="text-green-500 text-4xl" />
            <h1 className="font-bold">Skills</h1>
            <div className="text-sm px-4 py-4">
              <div dangerouslySetInnerHTML={{ __html: data.experience }} />
              <h2>{data.personal_profile}</h2>
            </div>
          </div>
          <hr />
          <h1 className="font-bold py-4">Details</h1>
          <div className="text-sm px-4 py-4">
            <h1>DOB: {data.date_of_birth}</h1>
            <h1>Gender: {data.gender}</h1>
            <h1>Qualification: {data.qualification}</h1>
            <h1>Country: {data.country}</h1>
            <h1>State: {data.state}</h1>
            <h1>Local government: {data.local_gov}</h1>
            <h1>Means of Identification: {data.means_of_identification}</h1>
            <h1>NIN: {data.nin}</h1>
            <h1>NIN Slip: {renderNinSlip(data.nin_slip)}</h1>
            <h1>Educational Qualification: {data.educational_qualification}</h1>
            <h1>Work Experience: {data.work_experience}</h1>
            <h1>Introduction Video:</h1>
            {data.introduction_video && (
              <video src={`https://dash.mayrahkeeafrica.com/${data.introduction_video}`} controls className="mt-2 w-full" />
            )}
            <h1>Status: {data.status}</h1>
          </div>
          <hr />
          <BsEye className="text-green-500 text-4xl"/>
          <h1 className="font-bold py-4">Languages spoken</h1>
          <div className="text-sm px-4 py-4">
            {data.languages}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetails;