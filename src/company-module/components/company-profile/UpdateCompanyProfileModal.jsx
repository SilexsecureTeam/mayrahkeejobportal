import { IoMdCloseCircle } from "react-icons/io";
import { getImageURL } from "../../../utils/formmaters";
//import wheelIcon from "../../../assets/pngs/wheel-icon-black.png";
import {
  FaRegEdit,
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import BasicInput from "./BasicInput";
import SocialMediaInput from "./SocialMediaInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
//import useCompanyProfile from "../../../hooks/useCompanyProfile";
import FormButton from "../../../components/FormButton";
import { resourceUrl } from "../../../services/axios-client";
import Selector from "../../../components/Selector";
export const basic_inputs = [
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
    label: "Company Phone",
    required: true,
    type: "tel",
    placeholder: "Enter Company Phone",
  },
  {
    id: 4,
    name: "website",
    label: "Company Website",
    type: "text",
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
    label: "Intorduction video url",
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
    label: "Profile Url",
    type: "text",
    required: false,
    placeholder: "https://www.example.com/profile",
  },
];


const jobSectors = [
  {
    id: 1,
    name: "Agriculture",
    subsections: [
      { id: 1.1, name: "Crop Production" },
      { id: 1.2, name: "Animal Husbandry" },
      { id: 1.3, name: "Agricultural Technology" },
    ],
  },
  {
    id: 2,
    name: "Oil and gas",
    subsections: [
      { id: 2.1, name: "Exploration" },
      { id: 2.2, name: "Extraction" },
      { id: 2.3, name: "Refining" },
    ],
  },
  {
    id: 3,
    name: "Manufacturing",
    subsections: [
      { id: 3.1, name: "Textiles" },
      { id: 3.2, name: "Electronics" },
      { id: 3.3, name: "Automobiles" },
    ],
  },
  {
    id: 4,
    name: "Information and communications",
    subsections: [
      { id: 4.1, name: "Software Development" },
      { id: 4.2, name: "Network Administration" },
      { id: 4.3, name: "Cybersecurity" },
    ],
  },
  {
    id: 5,
    name: "Information Technology",
    subsections: [
      { id: 5.1, name: "Cloud Computing" },
      { id: 5.2, name: "Data Science" },
      { id: 5.3, name: "IT Support" },
    ],
  },
  {
    id: 6,
    name: "Construction",
    subsections: [
      { id: 6.1, name: "Residential" },
      { id: 6.2, name: "Commercial" },
      { id: 6.3, name: "Infrastructure" },
    ],
  },
  {
    id: 7,
    name: "Services",
    subsections: [
      { id: 7.1, name: "Hospitality" },
      { id: 7.2, name: "Consulting" },
      { id: 7.3, name: "Customer Support" },
    ],
  },
  {
    id: 8,
    name: "HealthCare",
    subsections: [
      { id: 8.1, name: "Clinical Services" },
      { id: 8.2, name: "Research" },
      { id: 8.3, name: "Public Health" },
    ],
  },
];

export const social_media_inputs = [
  {
    id: 1,
    icon: <FaFacebook className="text-lg" />,
    placeholder: "https://www.facebook.com/example",
  },
  {
    id: 2,
    icon: <FaTwitter className="text-lg" />,
    placeholder: "https://www.twitter.com/example",
  },
  {
    id: 3,
    icon: <FaLinkedin className="text-lg" />,
    placeholder: "https://www.linkedin.com/example",
  },
  {
    id: 4,
    icon: <FaInstagram className="text-lg" />,
    placeholder: "https://www.instagram.com/example",
  },
];

function UpdateCompanyProfileModal({
  isOpen,
  setIsOpen,
  onInit = false,
  companyHookProps,
}) {
  const [displayPic, setDisplayPic] = useState("");
  const [socials, setSocials] = useState(["", "", "", ""]);
  const [companyProfile, setCompanyProfile] = useState();
  const {
    details,
    setDetails,
    loading,
    onTextChange,
    updateCompanyProfile,
    retrievalState,
  } = companyHookProps;
  const [campaignPhotos, setCampaignPhotos] = useState([...details?.company_campaign_photos || []]);

  const getCampaignPhotoURL = (e) => {
  const { name } = e.target; // Get input name
  const files = e.target.files; // Access all selected files

  // Validate files
  const validFiles = Array.from(files).filter(
    (file) => file.type === "image/jpeg" || file.type === "image/png"
  );

  if (validFiles.length > 0) {
    // Generate a temporary URL for each valid file
    const updatedList = validFiles.map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));

    // Add the new files to the existing list of campaign photos
    const updatedPhotos = [
      ...details?.company_campaign_photos,
      ...updatedList, // Append the entire object (with both url and file)
    ];
    
    // Update details state with only the file objects (no URL)
    const updatedFiles = [
  ...details?.company_campaign_photos, 
  ...validFiles.map((item) => item.file) // Spread the file objects into the updatedFiles array
];

    // Update state
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: updatedFiles, // Update details with the file objects
    }));
    setCampaignPhotos(updatedList); // Update campaignPhotos with the objects (url + file)

    console.log("Updated Campaign Photos:", updatedList);
  } else {
    alert("Please select a valid JPEG or PNG file."); // Handle invalid file type
  }
};

  
  useEffect(() => {
    if (details?.company_campaign_photos?.length > 0) {
      const newPhotos = details.company_campaign_photos
        .filter((file) => typeof file === "string" || file instanceof File) // Filter invalid entries
        .map((file) => ({
          url: typeof file === "string" ? `${resourceUrl}${file}` : URL.createObjectURL(file),
          file: typeof file === "string" ? null : file, // Set file to null if it's a string
        }));
  
      setCampaignPhotos(newPhotos);
    }
  }, [details?.company_campaign_photos]);
  
  const handleSubmit = (e) => {
    e.preventDefault();

    updateCompanyProfile(() => {
      setIsOpen(false);
    });
  };

  useEffect(() => {
    setTimeout(() => {
      if (
        details?.beenRetreived === retrievalState?.notRetrieved &&
        onInit
      ) {

        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    }, 1000);
  }, [details?.beenRetreived]);

  return (
    isOpen && (
      <div className="h-full z-10 w-full text-gray-600 text-little flex justify-center items-center bg-gray-600/70 fixed top-0 left-0">
        <div className="w-[90%] sm:max-w-[600px] h-[90%] p-2 flex flex-col  rounded-[10px]  bg-white border">
          <IoMdCloseCircle
            onClick={() => setIsOpen(false)}
            className="text-lg place-self-end  cursor-pointer"
          />
          <div className="w-full px-2 flex gap-[10px] flex-col h-[90%] ">
            <h3 className="font-semibold text-lg border-b pb-2 text-gray-600">{`Update Company Profile`}</h3>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-full gap-[10px] h-[95%] overflow-x-auto"
            >
              {/* Logo Input */}
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Company Icon</span>
                <div className="w-[20%] mt-[5px] flex items-start justify-start relative">
                  <img
                    className="h-[50px] w-[50px] rounded-full"
                    src={
                      displayPic
                        ? displayPic
                        : `${resourceUrl}/${details?.logo_image}`
                    }
                  />
                  <input
                    id="displayPic"
                    name="logo_image"
                    type="file"
                    onChange={(e) => {
                      getImageURL(e, setDisplayPic, setDetails);
                    }}
                    className="hidden"
                  />
                  <label
                    htmlFor="displayPic"
                    className="absolute right-12  top-0 cursor-pointer text-primaryColor text-lg"
                  >
                    <FaRegEdit />
                  </label>
                </div>
              </div>

              {/* Basic Form inputs */}
              {basic_inputs?.map((current) => (
                current?.type !== "dropdown" ?
                  <BasicInput
                    data={current}
                    details={details}
                    onTextChange={onTextChange}
                    key={current.id}
                    required={current?.required}
                  /> : <label>
                    <strong>{current.label}</strong>
                    <Selector
                      data={jobSectors}
                      selected={jobSectors?.find(one => one.name === details?.sector)}
                      setSelected={({ name }) => setDetails({ ...details, "sector": name })}
                    />
                  </label>
              ))}

              {/* Company Profile Text Editor */}
              <div className="flex flex-col gap-[5px]">
                <span className="text-sm font-semibold">Company Profile</span>

                <div className="flex flex-col gap-[3px] mb-[30px] w-full text-gray-600 justify-between ">
                  <ReactQuill
                    placeholder="Enter company details...."
                    value={details?.company_profile}
                    onChange={(text) =>
                      setDetails({ ...details, company_profile: text })
                    }
                  />
                </div>
              </div>

              {/* Campaign Photos */}
              <div className="w-full flex flex-col gap-[3px] mt-10">
                <label
                  htmlFor="currentCampaignPhoto"
                  className="text-sm font-semibold flex w-full justify-between items-center"
                >
                  Capaign Photos <FaRegEdit size="24" className="cursor-pointer" />
                </label>
                <input
                  name="company_campaign_photos"
                  onChange={getCampaingPhotoURL}
                  id="currentCampaignPhoto"
                  className="hidden"
                  type="file"
                  multiple // Allows multiple file selection
                />

                <div className="w-full min-h-[100px] flex gap-[3px] items-start border-dashed p-2 border overflow-x-auto">
                  {campaignPhotos?.map((current, idx) => (
                    <img key={idx}
                      className="h-[80px] w-[80px] border"
                      src={current.url}
                    />
                  ))}
                </div>
              </div>

              {/* Social Media Inputs */}
              <div className="w-full flex flex-col gap-[3px]">
                <label
                  htmlFor="currentCampaignPhoto"
                  className="text-sm font-semibold flex w-full justify-between items-center"
                >
                  Social Media Links
                </label>
                <div className="w-full border border-dashed p-2 grid grid-cols-3 gap-[3px]">
                  {social_media_inputs?.map((current) => (
                    <SocialMediaInput
                      key={current?.id}
                      id={current?.id}
                      data={current}
                      socials={details?.social_media}
                      setSocials={setDetails}
                    />
                  ))}
                </div>
              </div>

              <FormButton
                width="w-[50%] bg-primaryColor text-gray-200"
                height="min-h-[30px] mb-[10px]"
                loading={loading}
              >
                Update
              </FormButton>
            </form>
          </div>
        </div>
      </div>
    )
  )
}

export default UpdateCompanyProfileModal;
