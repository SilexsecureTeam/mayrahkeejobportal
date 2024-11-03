import { useLocation, useParams } from "react-router-dom";
import ApplicantHeader from "./ApplicantHeader";
import ApplicantProfileCard from "./ApplicantProfileCard";
import MainContent from "./MainContent";
import { useContext, useEffect, useState } from "react";
import { axiosClient } from "../../services/axios-client";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContex";
import { PiSpinnerGap } from "react-icons/pi";

const ApplicantDetails = () => {
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails.token);
  const { id } = useParams();
  const [staff, setStaff] = useState(null);

  // Static data as if coming from storage
  const userData = {
    username: "Jake",
    name: "Jerome Bell",
    jobTitle: "Domestic Staff",
    rating: 4.0,
    appliedTime: "2 days ago",
    appliedJob: {
      title: "Product Development",
      category: "Marketing",
      type: "Full-Time",
    },
    email: "jeromeBell45@email.com",
    phone: "+44 1245 572 135",
    social: {
      instagram: "instagram.com/jeromebell",
      twitter: "twitter.com/jeromebell",
    },
    website: "www.jeromebell.com",
  };

  const workExperience = [
    {
      title: "Associate UX designer",
      company: "Capital Inc.",
      startDate: "Jan 2020",
      endDate: "Aug 2023",
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Aliquet vehicula scelerisque est ornare.",
    },
    {
      title: "Associate UX designer",
      company: "Capital Inc.",
      startDate: "Jan 2020",
      endDate: "Aug 2023",
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Aliquet vehicula scelerisque est ornare.",
    },
  ];

  useEffect(() => {
    const initData = async () => {
      try {
        const { data } = await client.get(`/domesticStaff/get-staff/${id}`);
        if (data.data) {
          setStaff(data.data);
        }
      } catch (error) {
        toast.error("Unable to retrieve staff data");
      }
    };

    initData();
  }, []);

  return (
    <div className="p-5 bg-white min-h-screen text-gray-900">
      {staff ? (
        <>
          <ApplicantHeader username={staff.first_name} />
          <div className="flex gap-4 flex-col lg:flex-row">
            <ApplicantProfileCard userData={staff} />
            <MainContent workExperience={workExperience} />
          </div>
        </>
      ) : (
        <div className="h-full w-full flex text-3xl text-primaryColor flex-col items-center justify-center gap-3">
          <PiSpinnerGap />
          <span className="text-sm">Fetching data....</span>
        </div>
      )}
    </div>
  );
};

export default ApplicantDetails;
