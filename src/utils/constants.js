//Applicant icons import
import homeIcon from '../assets/pngs/home-icon.png';
import homeIconActive from '../assets/pngs/home-icon-active.png';
import messageIcon from '../assets/pngs/message-icon.png';
import messageIconActive from '../assets/pngs/message-icon-active.png';
import documentIcon from '../assets/pngs/document-icon.png';
import documentIconActive from '../assets/pngs/document-icon-active.png';
import searchIcon from '../assets/pngs/search-icon.png';
import searchIconActive from '../assets/pngs/search-icon-active.png';
import companyIcon from '../assets/pngs/company-icon.png';
import companyIconActive from '../assets/pngs/company-icon-active.png';
import profileIcon from '../assets/pngs/profile-icon.png';
import profileIconActive from '../assets/pngs/profile-icon-active.png';

//Company icons import
import multipleProfilesIcon from '../assets/pngs/multiple-profiles-icon.png';
import clipboardIcon from '../assets/pngs/clipboard-icon.png';
import calanderIcon from '../assets/pngs/calander-icon.png';


//utils icons import
import settingsIcon from '../assets/pngs/settings-icon.png';
import settingsIconActive from '../assets/pngs/settings-icon-active.png';
import helpIcon from '../assets/pngs/help-icon.png';



export const applicantOptions = [
  {
    type: "DASHBOARD",
    title: "Dashboard",
    route: "/applicant",
    icon: homeIcon,
    iconActive: homeIconActive
  },
  {
    type: "MESSAGES",
    title: "Messages",
    route: "/applicant/messages",
    icon: messageIcon,
    iconActive: messageIconActive
  },
  {
    type: "APPLICATIONS",
    title: "My Applications",
    route: "/applicant/applications",
    icon: documentIcon,
    iconActive: documentIconActive
  },
  {
    type: "FIND-JOB",
    title: "Find Job",
    route: "/applicant/find-job",
    icon: searchIcon,
    iconActive: searchIconActive
  },
  {
    type: "COMPANIES",
    title: "Browse Companies",
    route: "/applicant/browse-companies",
    icon: companyIcon,
    iconActive: companyIconActive
  },
  {
    type: "PROFILE",
    title: "My Public Profile",
    route: "/applicant/public-profile",
    icon: profileIcon,
    iconActive: profileIconActive
  },
];


export const companyOptions = [
  {
    type: "DASHBOARD",
    title: "Dashboard",
    route: "/company",
    icon: homeIcon,
    iconActive: homeIconActive
  },
  {
    type: "MESSAGES",
    title: "Messages",
    route: "/company/messages",
    icon: messageIcon,
    iconActive: messageIconActive
  },
  {
    type: "APPLICANTS",
    title: "All Applicants",
    route: "/company/applicants",
    icon: multipleProfilesIcon,
    iconActive: documentIconActive
  },
  {
    type: "COMPANY-PROFILE",
    title: "Company Profile",
    route: "/company/company-profile",
    icon: companyIcon,
    iconActive: companyIconActive
  },
  {
    type: "JOB-LISTING",
    title: "Job Listing",
    route: "/company/job-listing",
    icon: clipboardIcon,
    iconActive: profileIconActive
  },
  {
    type: "SCHEDULE",
    title: "My Schedule",
    route: "/company/schedule",
    icon: calanderIcon,
    iconActive: searchIconActive
  },
];


export const utilOptions = [
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
    route: "/",
    icon: helpIcon,
    iconActive: helpIcon
  },
]
