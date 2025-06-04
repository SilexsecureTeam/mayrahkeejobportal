//Applicant icons import
import homeIcon from "../assets/pngs/home-icon.png";
import homeIconActive from "../assets/pngs/home-icon-active.png";
import messageIcon from "../assets/pngs/message-icon.png";
import messageIconActive from "../assets/pngs/message-icon-active.png";
import documentIcon from "../assets/pngs/document-icon.png";
import documentIconActive from "../assets/pngs/document-icon-active.png";
import searchIcon from "../assets/pngs/search-icon.png";
import searchIconActive from "../assets/pngs/search-icon-active.png";
import companyIcon from "../assets/pngs/company-icon.png";
import companyIconActive from "../assets/pngs/company-icon-active.png";
import profileIcon from "../assets/pngs/profile-icon.png";
import profileIconActive from "../assets/pngs/profile-icon-active.png";
import profileIconResume from "../assets/pngs/doc-resume.png";

//Company icons import
import multipleProfilesIcon from "../assets/pngs/multiple-profiles-icon.png";
import clipboardIcon from "../assets/pngs/clipboard-icon.png";
import calanderIcon from "../assets/pngs/calander-icon.png";

//utils icons import
import settingsIcon from "../assets/pngs/settings-icon.png";
import settingsIconActive from "../assets/pngs/settings-icon-active.png";
import helpIcon from "../assets/pngs/help-icon.png";
//Registration Details
import Person from "../assets/pngs/person.png";
import PersonActive from "../assets/pngs/person-active.png";
import Message from "../assets/pngs/message.png";
import MessageActive from "../assets/pngs/message-active.png";
import PersonCaptured from "../assets/pngs/person-captured.png";
import PersonWithBoard from "../assets/pngs/person-with-board.png";
import Camera from "../assets/pngs/camera.png";
import verify from "../assets/pngs/approved.png";
import upload from "../assets/pngs/document-icon.png";
import ApplyForJob from "../assets/JOB APPLIED FOR.png";

// Company Profile details
import fireIcon from "../assets/pngs/fire-icon.png";
import peopleIcon from "../assets/pngs/people-icon.png";
import locationIcon from "../assets/pngs/location-icon.png";
import companyIcon2 from "../assets/pngs/company-2-icon.png";

//Socials
import twitterIcon from "../assets/pngs/twitter-icon.png";
import facebookIcon from "../assets/pngs/facebook-icon.png";
import linkedinIcon from "../assets/pngs/linkedin-icon.png";
import mailIcon from "../assets/pngs/mail-icon.png";

//Tech Stack
import bubblesIcon from "../assets/pngs/bubbles-icon.png";
import loopIcon from "../assets/pngs/loop-icon.png";
import pathscriptIcon from "../assets/pngs/pathscript-icon.png";

//Admin Icons
import artisanIcon from "../assets/pngs/Admin-Dashboard/Artisan.png";
import domesticIcon from "../assets/pngs/Admin-Dashboard/domestic-work (1).png";
import domesticActiveIcon from "../assets/pngs/Admin-Dashboard/domestic-work.png";
import policeIcon from "../assets/pngs/Admin-Dashboard/police-report.png";
import jobsIcon from "../assets/pngs/Admin-Dashboard/Jobs.png";
import guarantorIcon from "../assets/pngs/Admin-Dashboard/guarantor.png";
import medicalIcon from "../assets/pngs/Admin-Dashboard/health-check.png";
import badgeIcon from "../assets/pngs/Admin-Dashboard/badge.png";
import todoIcon from "../assets/pngs/Admin-Dashboard/to-do-list.png";

import logout from "../assets/pngs/logout.png";
export const applicantOptions = [
  {
    type: "DASHBOARD",
    title: "Dashboard",
    route: "/applicant",
    icon: homeIcon,
    iconActive: homeIconActive,
  },
  {
    type: "MESSAGES",
    title: "Messages",
    route: "/applicant/messages",
    icon: messageIcon,
    iconActive: messageIconActive,
  },
  {
    type: "FIND-JOB",
    title: "Find A Job",
    route: "/applicant/find-job",
    icon: searchIcon,
    iconActive: searchIconActive,
  },
  {
    type: "APPLICATIONS",
    title: "My Applications",
    route: "/applicant/applications",
    icon: documentIcon,
    iconActive: documentIconActive,
  },
  {
    type: "COMPANIES",
    title: "Browse Companies",
    route: "/applicant/browse-companies",
    icon: companyIcon,
    iconActive: companyIconActive,
  },
  {
    type: "PROFILE",
    title: "My Public Profile",
    route: "/applicant/public-profile",
    icon: profileIcon,
    iconActive: profileIconActive,
  },
  {
    type: "RESUME",
    title: "My Resume",
    route: "/applicant/my-resume",
    icon: profileIconResume,
    iconActive: profileIconActive,
  },
  {
    type: "BLOG",
    title: "Blogs",
    route: "/applicant/blogs",
    icon: ApplyForJob,
    iconActive: ApplyForJob,
  }
];

export const companyOptions = [
  {
    type: "DASHBOARD",
    title: "Dashboard",
    route: "/company",
    icon: homeIcon,
    iconActive: homeIconActive,
  },
  {
    type: "MESSAGES",
    title: "Messages",
    route: "/company/messages",
    icon: messageIcon,
    iconActive: messageIconActive,
  },
  {
    type: "APPLICANTS",
    title: "All Applicants",
    route: "/company/applicants",
    icon: multipleProfilesIcon,
    iconActive: documentIconActive,
  },
  {
    type: "COMPANY-PROFILE",
    title: "Company Profile",
    route: "/company/company-profile",
    icon: companyIcon,
    iconActive: companyIconActive,
  },
  {
    type: "JOB-LISTING",
    title: "Job Listing",
    route: "/company/job-listing",
    icon: clipboardIcon,
    iconActive: profileIconActive,
  },
  {
    type: "SCHEDULE",
    title: "My Schedule",
    route: "/company/schedule",
    icon: calanderIcon,
    iconActive: searchIconActive,
  },{
    type: "PACKAGES",
    title: "Subscriptions",
    route: "/company/subscription",
    icon: profileIconResume,
    iconActive: profileIconActive, 
  },
  {
    type: "BLOG",
    title: "Blogs",
    route: "/company/blogs",
    icon: ApplyForJob,
    iconActive: ApplyForJob,
  }
];

export const companyExclusiveOptions = [
  {
    type: "DASHBOARD",
    title: "Dashboard",
    route: "/company",
    icon: homeIcon,
    iconActive: homeIconActive,
  },
  {
    type: "APPLICANTS",
    title: "All Applicants",
    route: "/company/applicants",
    icon: multipleProfilesIcon,
    iconActive: documentIconActive,
  },
  {
    type: "COMPANY-PROFILE",
    title: "Company Profile",
    route: "/company/company-profile",
    icon: companyIcon,
    iconActive: companyIconActive,
  },
  {
    type: "JOB-LISTING",
    title: "Job Listing",
    route: "/company/job-listing",
    icon: clipboardIcon,
    iconActive: profileIconActive,
  },
  {
    type: "SCHEDULE",
    title: "My Schedule",
    route: "/company/schedule",
    icon: calanderIcon,
    iconActive: searchIconActive,
  },
  {
    type: "BLOG",
    title: "Blogs",
    route: "/company/blogs",
    icon: ApplyForJob,
    iconActive: ApplyForJob,
  }
];

export const exclusiveUtilOptions = [
  {
    type: "SETTINGS",
    title: "Settings",
    route: "/applicant/setting",
    icon: settingsIcon,
    iconActive: settingsIconActive,
  },
  {
    type: "HELP-CENTER",
    title: "Help Center",
    route: "/applicant/help-center",
    icon: helpIcon,
    iconActive: helpIcon,
  },
  {
    type: "LOG-OUT",
    title: "Log Out",
    route: "/login",
    icon: logout,
    iconActive: logout,
  },
];


export const extraOptions = [
  {
    type: "JOB-POSTING",
    title: "Job Posting"
    // icon: clipboardIcon,
    // iconActive: profileIconActive,
  },
]
export const utilOptions = [
  {
    type: "ARTISAN",
    title: "Artisan",
    route: "/applicant/artisan",
    icon: clipboardIcon,
    iconActive: profileIconActive,
  },
  {
    type: "STAFFS",
    title: "Domestic Staffs",
    route: "/applicant/domestic-staffs",
    icon: calanderIcon,
    iconActive: searchIconActive,
  },
  {
    type: "SETTINGS",
    title: "Settings",
    route: "/applicant/setting",
    icon: settingsIcon,
    iconActive: settingsIconActive,
  },
  {
    type: "HELP-CENTER",
    title: "Help Center",
    route: "/applicant/help-center",
    icon: helpIcon,
    iconActive: helpIcon,
  },
  {
    type: "LOG-OUT",
    title: "Log Out",
    route: "/login",
    icon: logout,
    iconActive: logout,
  },
];

export const adminUtilOptions = [
  {
    type: "ARTISAN",
    title: "Artisan",
    route: "/company/artisan",
    icon: clipboardIcon,
    iconActive: profileIconActive,
  },
  {
    type: "STAFFS",
    title: "Domestic Staffs",
    route: "/company/domestic-staffs",
    icon: calanderIcon,
    iconActive: searchIconActive,
  },
  {
    type: "SETTINGS",
    title: "Settings",
    route: "/company/settings",
    icon: settingsIcon,
    iconActive: settingsIconActive,
  },
  {
    type: "HELP-CENTER",
    title: "Help Center",
    route: "/company/help-center",
    icon: helpIcon,
    iconActive: helpIcon,
  },
  {
    type: "LOG-OUT",
    title: "Log Out",
    route: "/login",
    icon: logout,
    iconActive: logout,
  },
];

export const staffOptions = [
  {
    type: "Home",
    title: "Dashboard",
    route: "/staff",
    icon: homeIcon,
    iconActive: homeIconActive,
  },
  {
    type: "profile",
    title: "Profile",
    route: "/staff/profile",
    icon: profileIcon,
    iconActive: profileIconActive,
  },
  {
    type: "verifications",
    title: "Verifications",
    route: "/staff/verifications",
    icon: clipboardIcon,
    iconActive: profileIconActive,
  },
  {
    type: "resume",
    title: "Resume",
    route: "/staff/resume",
    icon: profileIconResume,
    iconActive: profileIconActive,
  },
  {
    type: "blog",
    title: "Blogs",
    route: "/staff/blogs",
    icon: ApplyForJob,
    iconActive: ApplyForJob,
  }
];

export const staffUtilOptions = [
  {
    type: "SETTINGS",
    title: "Settings",
    route: "/staff/settings",
    icon: settingsIcon,
    iconActive: settingsIconActive,
  },
  // {
  //   type: "HELP-CENTER",
  //   title: "Help Center",
  //   route: "/staff/help-center",
  //   icon: helpIcon,
  //   iconActive: helpIcon,
  // },
  {
    type: "LOG-OUT",
    title: "Log Out",
    route: "/login",
    icon: logout,
    iconActive: logout,
  },
];

export const adminExclusiveOptions = [
  {
    type: "Dashboard",
    title: "Home",
    route: "/admin-exclusives",
    icon: homeIcon,
    iconActive: homeIconActive,
  },
  {
    type: "All Exclusives",
    title: "Exclusive Subscribers",
    route: "/admin-exclusives/lists",
    icon: peopleIcon,
    iconActive: peopleIcon,
  },
  {
    type: "Interviews",
    title: "Interviews",
    route: "/admin-exclusives/interviews",
    icon: policeIcon,
    iconActive: policeIcon,
  },
];

export const adminExclusiveUtil = [
  {
    type: "Back to main",
    title: "Back to main dasboard",
    route: "/admin",
    icon: helpIcon,
    iconActive: helpIcon,
  },
];

export const adminOptions = [
  {
    type: "Dashboard",
    title: "Home",
    route: "/admin",
    icon: homeIcon,
    iconActive: homeIconActive,
  },
  {
    type: "Employers",
    title: "Employers",
    route: "/admin/employers",
    icon: peopleIcon,
    iconActive: peopleIcon,
  },
  {
    type: "Artisan",
    title: "Artisan",
    route: "/admin/artisan",
    icon: artisanIcon,
    iconActive: artisanIcon,
  },
  {
    type: "Domestic Staff",
    title: "Domestic Staff",
    route: "/admin/domestic-staff",
    icon: domesticIcon,
    iconActive: domesticActiveIcon,
  },
  {
    type: "Candidates",
    title: "Candidates",
    route: "/admin/candidates",
    icon: todoIcon,
    iconActive: homeIconActive,
  },
  {
    type: "Job Listing",
    title: "Job Listing",
    route: "/admin/job-listing",
    icon: jobsIcon,
    iconActive: jobsIcon,
  },
  {
    type: "Guarantors",
    title: "Gurarantors",
    route: "/admin/guarantors",
    icon: guarantorIcon,
    iconActive: guarantorIcon,
  },
  {
    type: "Medical Histories",
    title: "Medical Histories",
    route: "/admin/medical-histories",
    icon: medicalIcon,
    iconActive: medicalIcon,
  },
  {
    type: "Police Reports",
    title: "Police Reports",
    route: "/admin/police-reports",
    icon: policeIcon,
    iconActive: policeIcon,
  },
  {
    type: "Blogs",
    title: "Blogs",
    route: "/admin/blogs",
    icon: ApplyForJob,
    iconActive: ApplyForJob,
  },{
    type: "Support",
    title: "Support",
    route: "/admin/support",
    icon: helpIcon,
    iconActive: helpIcon,
  },
];

export const adminnUtilOptions = [
  {
    type: "SETTINGS",
    title: "Settings",
    route: "/staff/settings",
    route: "/admin/settings",
    icon: settingsIcon,
    iconActive: settingsIconActive,
  },
  {
    type: "LOG-OUT",
    title: "Log Out",
    route: "/login",
    icon: logout,
    iconActive: logout,
  },
];

export const registration_steps_keys = {
  artisan: {
    create_account: {
      title: "User Registration",
      desc: "Enter your name, email and password.",
      activeIcon: PersonActive,
      inactiveIcon: Person,
    },
    email_verification: {
      title: "Email Verification",
      desc: "Verify your email address",
      activeIcon: MessageActive,
      inactiveIcon: Message,
    },
    person_details: {
      title: "Profile Update",
      desc: "Provide profile Pictures and job title",
      activeIcon: PersonCaptured,
      inactiveIcon: PersonCaptured,
    },
    complete_verification: {
      title: "Complete Verifications",
      desc: "Verify your details",
      activeIcon: verify,
      inactiveIcon: verify,
    },
    upload_resume: {
      title: "Upload Resume",
      desc: "Back up your profile with a standard resume",
      activeIcon: Camera,
      inactiveIcon: Camera,
    },
  },
  candidate: {
    create_account: {
      title: "User Registration",
      desc: "Enter your name, email and password.",
      activeIcon: PersonActive,
      inactiveIcon: Person,
    },
    email_verification: {
      title: "Email Verification",
      desc: "Verify your email address",
      activeIcon: MessageActive,
      inactiveIcon: Message,
    },
    person_details: {
      title: "Profile Update",
      desc: "Provide profile Pictures and job title",
      activeIcon: PersonCaptured,
      inactiveIcon: PersonCaptured,
    },
    upload_resume: {
      title: "Upload CV",
      desc: "Back up your profile with a standard resume",
      activeIcon: upload,
      inactiveIcon: upload,
    },
    apply_for_job: {
      title: "Apply For Job",
      desc: "Get a suitable job to invest your skill",
      activeIcon: ApplyForJob,
      inactiveIcon: ApplyForJob,
    },
  },
  employer: {
    create_account: {
      title: "User Registration",
      desc: "Enter your name, email and password.",
      activeIcon: PersonActive,
      inactiveIcon: Person,
    },
    email_verification: {
      title: "Email Verification",
      desc: "Verify your email address",
      activeIcon: MessageActive,
      inactiveIcon: Message,
    },
    person_details: {
      title: "Profile Update",
      desc: "Provide profile Pictures and job title",
      activeIcon: PersonCaptured,
      inactiveIcon: PersonCaptured,
    },
    subscribe_to_packages: {
      title: "Subscribe To Packages",
      desc: "choose a nice package",
      activeIcon: PersonWithBoard,
      inactiveIcon: PersonWithBoard,
    },
    post_jobs: {
      title: "Post Jobs",
      desc: "Post a job and get the best fit employee",
      activeIcon: Camera,
      inactiveIcon: Camera,
    },
  },
  staff: {
    create_account: {
      title: "User Registration",
      desc: "Enter your name, email and password.",
      activeIcon: PersonActive,
      inactiveIcon: Person,
    },
    email_verification: {
      title: "Email Verification",
      desc: "Verify your email address",
      activeIcon: MessageActive,
      inactiveIcon: Message,
    },
    person_details: {
      title: "Profile Update",
      desc: "Provide profile Pictures and job title",
      activeIcon: PersonCaptured,
      inactiveIcon: PersonCaptured,
    },
    complete_verification: {
      title: "Complete Verifications",
      desc: "Verify your details",
      activeIcon: verify,
      inactiveIcon: verify,
    },
    upload_resume: {
      title: "Upload Resume",
      desc: "Back up your profile with a standard resume",
      activeIcon: upload,
      inactiveIcon: upload,
    },
  },
};

export const company_profile_attributes = [
  {
    id: 1,
    title: "Founded",
    icon: fireIcon,
    content: "Jusly 31, 2011",
  },
  {
    id: 2,
    title: "Employees",
    icon: peopleIcon,
    content: "4000+",
  },
  {
    id: 3,
    title: "Location",
    icon: locationIcon,
    content: "20 Countries",
  },
  {
    id: 4,
    title: "Industry",
    icon: companyIcon2,
    content: "Social Media & Non-Profit",
  },
];

export const company_socials = [
  {
    id: 1,
    name: "twitter.com/Nomad",
    icon: twitterIcon,
  },
  {
    id: 2,
    name: "facebook.com/NomadHQ",
    icon: facebookIcon,
  },
  {
    id: 3,
    name: "linkedin.com/company/nomad",
    icon: linkedinIcon,
  },
  {
    id: 1,
    name: "nomad@gmail.com",
    icon: mailIcon,
  },
];

export const company_stack_socials = [
  {
    id: 1,
    name: "Bubbles",
    icon: bubblesIcon,
  },
  {
    id: 2,
    name: "Loop 3",
    icon: loopIcon,
  },
  {
    id: 3,
    name: "Pathscript",
    icon: pathscriptIcon,
  },
];

export const stages = [
  {
    name: "in-review",
    label: "Under-Review",
    stage: "passed",
  },
  {
    name: "shortlist",
    label: "Shortlisted",
    stage: "passed",
  },
  {
    name: "interview",
    label: "Interviewed",
    stage: "current",
  },
  {
    name: "hired/declined",
    label: "hired/declined",
    stage: null,
  },
];

export const verification_status = [
  "pending",
  "approved",
  "rejected",
  "suspend",
];



export const ethnicGroups = [
  "Hausa",
  "Yoruba",
  "Igbo",
  "Fulani",
  "Ijaw",
  "Kanuri",
  "Ibibio",
  "Tiv",
  "Nupe",
  "Edo",
  "Itsekiri",
  "Efik",
  "Igala",
  "Jukun",
  "Berom",
  "Gwari",
  "Idoma",
  "Ishoko",
  "Ebira",
  "Isoko",
  "Urhobo",
  "Ogoni",
  "Anang",
  "Kalabari",
  "Ekoi",
  "Ebirra",
  "Bini",
  "Shuwa Arab",
  "Zarma",
  "Kambari",
  "Kuteb",
  "Bajju",
  "Kadara",
  "Bwatiye",
  "Sayawa",
  "Mumuye",
  "Atyap"]

  
  export const convertDays=(days)=> {
    if (days < 7) {
        return `${days} day(s)`;
    } else if (days < 14) {
        return `1 week`;
    } else if (days < 30) {
        return `${Math.floor(days / 7)} weeks`;
    } else if (days < 365) {
        return `${Math.floor(days / 30)} month(s)`;
    } else {
        return `${Math.floor(days / 365)} year(s)`;
    }
}


export const field_sections1 = {
  primary: [
    {
      name: "First Name",
      type: "text",
      field_name: "first_name",
    },
    {
      name: "Middle name",
      type: "text",
      field_name: "middle_name",
    },
    {
      name: "Surname",
      type: "text",
      field_name: "surname",
    },
    {
      name: "Email",
      type: "email",
      field_name: "email",
    },
    {
      name: "Age",
      type: "number",
      field_name: "age",
    },
    {
      name: "Gender",
      type: "select",
      options: ["Male", "Female"],
      field_name: "gender",
    },
    {
      name: "Religion",
      type: "select",
      options: [
        "Christianity",
        "Islam",
        "Traditional"
      ],
      field_name: "religion",
    },
    {
      name: "Ethnicity",
      type: "select",
      options: [...ethnicGroups],
      field_name: "ethnicity",
    },
    {
      name: "Location",
      type: "text",
      field_name: "location",
    },
  ],

  professional: [
    {
      name: "Employment Type",
      type: "select",
      options: ["Full Time", "Part Time"],
      field_name: "employment_type",
    },
    {
      name: "Work Type",
      type: "select",
      options: ["Live Out", "Live In"],
      field_name: "work_type",
    },
    {
      name: "Work Days",
      type: "select",
      options: [
        "1 Day",
        "2 Days",
        "3 Days",
        "4 Days",
        "5 Days",
        "6 Days",
        "7 Days",
      ],
      field_name: "work_days",
    },
    {
      name: "Rumuneration",
      type: "select",
      options: ["Daily Pay", "Weekly Pay", "Bi-Weekly Pay", "Monthly Pay"],
      field_name: "rumuneration",
    },
    {
      name: "Agreed Salary",
      type: "number",
      field_name: "salary_agreed",
    },
    {
      name: "Years Of Experience",
      type: "number",
      field_name: "years_of_experience",
    },

    {
      name: "Education Level",
      type: "select",
      options: [
        "Primary School Certificate",
        "Secondary School Certificate",
        "Diploma",
        "Degree",
        "None",
      ],
      field_name: "education_level",
    },
  ],
  secondary: [
    {
      name: "Marital Status",
      type: "select",
      options: ["Single", "Married", "Divorced", "Widowed"],
      field_name: "marital_status",
    }
  ],
};

export const field_sections2 = {
  primary: [
    {
      name: "First Name",
      type: "text",
      field_name: "first_name",
    },
    {
      name: "Middle name",
      type: "text",
      field_name: "middle_name",
    },
    {
      name: "Surname",
      type: "text",
      field_name: "surname",
    },
    {
      name: "Email",
      type: "email",
      field_name: "email",
    },
    {
      name: "Age",
      type: "number",
      field_name: "age",
    },
    {
      name: "Residential Address",
      type: "text",
      field_name: "residential_address",
    },
    {
      name: "Closest Landmark",
      type: "text",
      field_name: "closest_landmark",
    },
    {
      name: "Gender",
      type: "select",
      options: ["Male", "Female"],
      field_name: "gender",
    },
    {
      name: "Religion",
      type: "select",
      options: [
        "Christianity",
        "Islam",
        "Traditional"
      ],
      field_name: "religion",
    },
    {
      name: "Ethnicity",
      type: "select",
      options: [...ethnicGroups],
      field_name: "ethnicity",
    },
    {
      name: "Location",
      type: "text",
      field_name: "location",
    },
  ],
professional: [
    {
      name: "Business Name",
      type: "text",
      options: ["Full Time", "Part Time"],
      field_name: "business_name",
    },
    {
      name: "Business Email",
      type: "email",
      field_name: "business_email",
    },
    {
      name: "Business Phone No",
      type: "tel",
      field_name: "business_phone_no",
    },
    {
      name: "Business Registration No",
      type: "text",
      field_name: "business_registration_no",
    },
    {
      name: "Business Identification No",
      type: "text",
      field_name: "business_identification_no",
    },
    {
      name: "Business Address",
      type: "text",
      field_name: "business_address",
    },
    {
      name: "Business Location",
      type: "text",
      field_name: "business_location",
    },
    {
      name: "Years Of Incoporation",
      type: "number",
      field_name: "years_of_incorporation",
    },
    {
      name: "Years Of Experience",
      type: "number",
      field_name: "years_of_experience",
    },
    {
      name: "Highest Level of Education",
      type: "select",
      options: [
        "Primary School Certificate",
        "Secondary School Certificate",
        "Diploma",
        "Degree",
        "None",
      ],
      field_name: "education_level",
    },
    {
      name: "Whatsapp Number",
      type: "number",
      field_name: "whatsapp_phone_no",
    }
  ],
  secondary: [
    {
      name: "Marital Status",
      type: "select",
      options: ["Single", "Married", "Divorced", "Widowed"],
      field_name: "marital_status",
    }
  ],
};

export const verificationOptions1 = [
  { label: "Availability Status", key: "availability_status" },
  { label: "Guarantor", key: "guarantor_verification_status" },
  { label: "Residence", key: "residence_verification_status" },
  { label: "Medical History", key: "medical_history_verification_status" },
  { label: "Police Report", key: "police_report_verification_status" },
  { label: "Work Experience", key: "previous_employer_verification_status" }
];

export const verificationOptions2 = [
  { label: "Availability Status", key: "availability_status" },
  { label: "Guarantor", key: "guarantor_verification_status" },
  { label: "Residence", key: "residence_verification_status" },
  { label: "National Id", key: "nin_verification_status" },
  { label: "Business", key: "business_verification_status" },
];
