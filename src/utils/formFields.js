import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export const stageOneBasicInputs = [
  {
    id: 1,
    name: "email",
    label: "Contact Email",
    type: "text",
    placeholder: "e.g hr@example.com",
    prompt: "Here you input the company email",
    required: true,
  },
  {
    id: 2,
    name: "preferred_age",
    label: "Minimum Age Limit",
    type: "number",
    placeholder: "e.g 18",
    min: 18,
    max: 100,
    prompt: "Here you input preferred average age (years)",
    verification: "At least 18 years",
    required: true,
  },
  {
    id: 3,
    name: "application_deadline_date",
    label: "Application Deadline",
    type: "date",
    placeholder: "dd-mm-yyy",
    min: new Date().toISOString().split("T")[0],
    max: "4040-12-31",
    prompt: "Here you set an application deadline",
    required: true,
  },
  {
    id: 4,
    name: "office_address",
    label: "Office Address",
    type: "text",
    placeholder: "e.g victoria Island, Lagos street",
    prompt: "Here you insert the office address",
    required: true,
  },
  {
    id: 6,
    name: "search_keywords",
    label: "Search Keywords",
    type: "text",
    placeholder: "e.g Tech",
    prompt: "Here you specify search keywords",
    verification: "At least 4 characters",
    required: true,
  },
];

export const genderData = [
  {
    id: 1,
    name: "Not A Criteria",
  },
  {
    id: 2,
    name: "Male",
  },
  {
    id: 3,
    name: "Female",
  },
];

export const salaryTypeData = [
  {
    id: 1,
    name: "Weekly",
  },
  {
    id: 2,
    name: "Monthly",
  },
  {
    id: 3,
    name: "Yearly",
  },
];

export const descriptions = [
  {
    id: 1,
    title: "Responsibilities (required)",
    name: "job_description",
    desc: "Job responsibilities must be describe by one position",
    placeholder: "List out all Responsibilities",
    required: true,
  },
  {
    id: 2,
    title: "Qualifications",
    name: "experience",
    desc: "Outline the qualifications required for the Job",
    placeholder: "Begin to type...",
    required: true,
  },
];

export const stageTwoBasicInputs = [
  {
    id: 1,
    name: "job_title",
    label: "Job Title (required)",
    type: "text",
    placeholder: "e.g FrontEnd Dev",
    prompt: "Here you state the job title",
    required: true,
  },
  {
    id: 2,
    name: "external_url",
    label: "External URL ",
    type: "text",
    placeholder: "e.g https://externalurl.com",
    prompt: "Here you can add any external url",
  },
  {
    id: 3,
    name: " introduction_video_url",
    label: "Intro Video URL",
    type: "text",
    placeholder: "e.g https://introvideourl.com",
    prompt: "Here you add intro video url",
  },
];

export const careerData = [
  {
    id: 1,
    name: "Internship",
  },
  {
    id: 2,
    name: "Management Trainee ",
  },
  {
    id: 3,
    name: "Entry level",
  },
  {
    id: 4,
    name: "Intermediate level",
  },
  {
    id: 5,
    name: "Middle level",
  },
  {
    id: 6,
    name: "Senior level",
  },
  {
    id: 7,
    name: "Management level",
  },
  {
    id: 8,
    name: "Executive ",
  },
  {
    id: 9,
    name: "Board of Directors",
  },
];

export const companyBasicInputs = [
  {
    id: 1,
    name: "company_name",
    label: "Company Name",
    required: true,
    type: "text",
    placeholder: "Enter Company name",
  },
  {
    id: 2,
    name: "email",
    label: "Company Email",
    required: true,
    type: "email",
    placeholder: "Enter Company Email",
  },
  {
    id: 3,
    name: "phone_number",
    label: "Company Phone No",
    required: true,
    type: "tel",
    placeholder: "Enter Company Phone",
  },
  {
    id: 4,
    name: "website",
    label: "Company Website",
    type: "text",
    required: false,
    placeholder: "https://www.example.com",
  },
  {
    id: 5,
    name: "year_of_incorporation",
    label: "Year of Incorporation",
    type: "number",
    placeholder: "2000",
  },
  {
    id: 6,
    name: "rc_number",
    label: "RC Number",
    type: "text",
    placeholder: "RC123456",
  },
  {
    id: 7,
    name: "company_size",
    label: "Company Size",
    type: "number",
    placeholder: "7",
  },
  {
    id: 8,
    name: "sector",
    label: "Sector",
    type: "dropdown",
    placeholder: "technology",
  },
  {
    id: 9,
    name: "introduction_video_url",
    label: "Introduction video URL",
    type: "text",
    required: false,
    placeholder: "https://www.example.com/video.mp4",
  },
  // {
  //   id: 10,
  //   name: "network",
  //   label: "Network",
  //   type: "text",
  //   placeholder: "Local Network",
  // },
  {
    id: 11,
    name: "location",
    label: "Location",
    type: "text",
    placeholder: "123 Example Street, City, Country",
  },
  {
    id: 12,
    name: "address",
    label: "Address",
    type: "text",
    placeholder: "123 Example Street",
  },
  {
    id: 13,
    name: "profile_url",
    label: "Profile URL",
    type: "text",
    required: false,
    placeholder: "https://www.example.com/profile",
  },
];

export const social_media_inputs = [
  {
    id: 1,
    icon: FaFacebook,
    placeholder: "https://www.facebook.com/example",
  },
  {
    id: 2,
    icon: FaTwitter,
    placeholder: "https://www.twitter.com/example",
  },
  {
    id: 3,
    icon: FaLinkedin,
    placeholder: "https://www.linkedin.com/example",
  },
  {
    id: 4,
    icon: FaInstagram,
    placeholder: "https://www.instagram.com/example",
  },
];
