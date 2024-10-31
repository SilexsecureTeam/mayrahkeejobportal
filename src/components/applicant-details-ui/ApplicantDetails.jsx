import ApplicantHeader from "./ApplicantHeader"
import ApplicantProfileCard from "./ApplicantProfileCard"
import MainContent from "./MainContent"

const ApplicantDetails = () => {

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
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Aliquet vehicula scelerisque est ornare.",
    },
    {
      title: "Associate UX designer",
      company: "Capital Inc.",
      startDate: "Jan 2020",
      endDate: "Aug 2023",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Aliquet vehicula scelerisque est ornare.",
    },
  ];


  return (
    <div className="p-5 bg-gray-50 min-h-scree text-gray-900">
      <ApplicantHeader username={userData.username} />
      <div className="flex gap-4 flex-col lg:flex-row">
        <ApplicantProfileCard userData={userData} />
        <MainContent workExperience={workExperience} />
      </div>
    </div>
  )
}

export default ApplicantDetails