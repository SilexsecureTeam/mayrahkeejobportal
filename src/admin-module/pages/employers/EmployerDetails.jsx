import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { FaArrowLeftLong } from "react-icons/fa6";
import { TabMenu } from "primereact/tabmenu";
import UseAdminManagement from "../../../hooks/useAdminManagement";

const EmployerDetails = () => {
  const { id } = useParams();
  const { getEmployerById } = UseAdminManagement();
  const [employer, setEmployer] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getEmployerById(id);
      if (data) {
        setEmployer(data);
      } else {
        console.error("No data received");
      }
    })();
  }, [id]);

  if (!employer) {
    return <div>Employer not found</div>;
  }

  const { candidateAuth, details } = employer;

  const items = [
    { label: 'Candidates', icon: 'pi pi-user', command: () => window.location.href = `/admin/employer/${id}/candidates` },
    { label: 'Contracts', icon: 'pi pi-briefcase', command: () => window.location.href = `/admin/employer/${id}/staffs` },
    { label: 'Posted Jobs', icon: 'pi pi-briefcase', command: () => window.location.href = `/admin/employer/jobs/${id}` },
    { label: 'Applied Jobs', icon: 'pi pi-briefcase', command: () => window.location.href = `/admin/employer/applied-jobs/${id}` }
  ];

  return (
    <div className="p-4">
       <button
          type="button"
          onClick={() => window.history.back()}
          className="flex items-center gap-2 outline outline-offset-5 outline-green-500 px-4 py-2 rounded text-green-500 hover:bg-green-100"
        >
       <FaArrowLeftLong className="me-4 text-green-500" />Back
        </button>
      <div className="card mb-4">
        <TabMenu model={items} className="w-full" activeIndex={-1} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="shadow-lg px-4 py-4 md:col-span-1">
          <div className="flex space-x-4">
            <div className="">
              {details?.logo_image ? (
                <img src={"https://dash.mayrahkeeafrica.com/" + details.logo_image} alt="Company Logo" className="h-20 w-20 rounded-full border-4 border-white shadow-lg" />
              ) : (
                <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
                  <span>No Image</span>
                </div>
              )}
            </div>

            <div>
              <h2 className="text-gray-800 text-2xl font-bold mb-2">{details?.company_name}</h2>
              <h1 className="text-gray-400 text-sm">{candidateAuth.email}</h1>
            </div>
          </div>

          <div className="bg-gray-200 px-4 py-4 my-4">
            <div className="flex text-xs justify-between pb-3">
              <p>Year of Incorporation</p>  <p>{details?.year_of_incorporation}</p>
            </div>
            <h1 className="text-sm">RC Number: {details?.rc_number}</h1>
            <h1 className="text-sm">Company Size: {details?.company_size}</h1>
            <h1 className="text-sm">Sector: {details?.sector}</h1>
          </div>
          <hr />
          <div className="text-md px-4 py-4">
            <h1 className="font-bold">Contact</h1>
            <div className="flex items-center space-x-2">
              <span>Phone Number: {details?.phone_number}</span>
            </div>
          </div>
        </div>

        <div className="shadow-lg px-4 py-4 md:col-span-1.5">
          <div className="pb-4">
            <h1 className="font-bold">Company Profile</h1>
            <div className="text-sm px-4 py-4">
              <div dangerouslySetInnerHTML={{ __html: details?.company_profile }} />
            </div>
          </div>
          <hr />
          <h1 className="font-bold py-4">Details</h1>
          <div className="text-sm px-4 py-4">
            <h1>Location: {details?.location}</h1>
            <h1>Address: {details?.address}</h1>
            <h1>Status: {candidateAuth.status}</h1>
          </div>
          <hr />
          <h1 className="font-bold py-4">Social Media</h1>
          <div className="text-sm px-4 py-4">
            <ul>
              {details?.social_media?.map((link, index) => (
                <li key={index}>
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDetails;