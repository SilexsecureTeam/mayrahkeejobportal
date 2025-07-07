import React, { useContext, useEffect, useState } from "react";
import { TbPhoto } from "react-icons/tb";
import DynamicExperienceForm from "./DynamicExperienceForm";
import SocialsForm from "./SocialsForm";
import { BASE_URL, IMAGE_URL } from "../../../../utils/base";
// import UiSelect from '../../../components/general/UiSelect'
import axios from "axios";
import { IoCheckboxSharp } from "react-icons/io5";
import {
  MdCheck,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { AuthContext } from "../../../../context/AuthContex";
import { ResourceContext } from "../../../../context/ResourceContext";
import TextEditor from "./TextEditor";
import { onSuccess } from "../../../../utils/notifications/OnSuccess";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLocationService } from "../../../../services/locationService";

const BasicInfo = ({ setIsOpen }) => {
  const { getCandidate, setGetCandidate } = useContext(ResourceContext);
  const navigate = useNavigate();

  const candidate = getCandidate.data?.details;
  const { getCountries } = useLocationService();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await getCountries(true); // Fetch all countries
        setCountries(response.data || []);
      } catch (error) {
        console.error("Error fetching countries:");
      }
    };
    fetchCountries();
  }, []);

  const { authDetails, userUpdate, setUserUpdate } = useContext(AuthContext);
  const user = authDetails?.user;
  const [errorMsg, setErrorMsg] = useState(null);
  const [showMsg, setShowMsg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectId, setSelectId] = useState(null);
  const [selectStates, setSelectStates] = useState(
    candidate?.country
      ? countries?.find((one) => one.name === candidate.country)?.states || []
      : []
  );
  const [selectState, setSelectState] = useState();
  const [selectCity, setSelectCity] = useState(
    candidate?.state
      ? selectStates?.find((one) => one.name === candidate.state)?.lgas || []
      : []
  );
  const [countryInfo, setCountryInfo] = useState();
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const [socialHandles, setSocialHandles] = useState([
    { network: "", url: "" },
  ]);

  useEffect(() => {
    setGetCandidate((prev) => {
      return {
        ...prev,
        isDataNeeded: true,
      };
    });
  }, []);

  const toggleAccept = () => {
    setDetails((prev) => {
      return {
        ...prev,
        show_my_profile: !details.show_my_profile,
      };
    });
  };
  useEffect(() => {
    if (candidate?.languages) {
      setSelectedLanguages(candidate?.languages?.split(","));
    }
  }, [candidate?.languages]);
  const [profileImageUrl, setProfileImageUrl] = useState(
    user.image ? user.image : null
  );
  const [details, setDetails] = useState({
    candidate_id: user.id ? user.id : "",
    // full_name: user.full_name ? user.full_name : "",
    profile: candidate?.profile || null,
    full_name: candidate?.full_name
      ? candidate?.full_name
      : user?.first_name
      ? ` ${user.first_name} ${user.last_name}`
      : "",
    date_of_birth: candidate?.date_of_birth ? candidate?.date_of_birth : "",
    gender: candidate?.gender ? candidate?.gender : "",
    phone_number: candidate?.phone_number ? candidate?.phone_number : "",
    email: candidate?.email ? candidate?.email : "",
    background_profile: null,
    password: user?.password ? user.password : "",
    means_of_identification: candidate?.means_of_identification
      ? candidate?.means_of_identification
      : "",
    nin: candidate?.nin ? candidate?.nin : "",
    nin_slip: null,
    educational_qualification: candidate?.educational_qualification
      ? candidate?.educational_qualification
      : "",
    work_experience: candidate?.work_experience
      ? candidate?.work_experience
      : "",
    languages: selectedLanguages,
    salary_type: candidate?.salary_type ? candidate?.salary_type : "",
    salary: candidate?.salary ? candidate?.salary : "",
    categories: candidate?.categories ? candidate?.categories : "",
    // show_my_profile: true,
    preferred_job_role: candidate?.preferred_job_role
      ? candidate?.preferred_job_role
      : "",
    personal_profile: candidate?.personal_profile
      ? candidate?.personal_profile
      : "",
    network: candidate?.network ? candidate?.network : "",
    contact_address: candidate?.contact_address
      ? candidate?.contact_address
      : "",
    country: candidate?.country ? candidate?.country : "",
    state: candidate?.state ? candidate?.state : "",
    local_gov: candidate?.local_gov ? candidate?.local_gov : "",
    address: candidate?.address ? candidate?.address : "",
    experience: candidate?.experience ? candidate?.experience : "",
    introduction_video: null,
    social_media_handle: [],
  });

  useEffect(() => {
    updateFirstLetter(details?.means_of_identification);
  }, [details]);
  function updateFirstLetter(word) {
    if (word) {
      return setSelectId(word[0]?.toUpperCase() + word.slice(1));
    } else {
      return setSelectId(null);
    }
  }

  useEffect(() => {
    if (details?.country) {
      const selectedCountry = countries?.find(
        (one) => one.name === details?.country
      );
      if (selectedCountry) {
        setCountryInfo(selectedCountry);

        const states = selectedCountry?.states || [];
        setSelectStates(states);
        setSelectCity([]); // Reset cities when country changes
      }
    }
  }, [details?.country, countries]);

  useEffect(() => {
    if (details?.state && details?.country) {
      const selectedCountry = countries?.find(
        (one) => one.name === details?.country
      );
      if (selectedCountry) {
        const states = selectedCountry?.states || [];
        const selectedState = states?.find(
          (one) => one.name === details?.state
        );

        if (selectedState) {
          const cities = selectedState?.lgas || [];

          setSelectCity(cities);
        }
      }
    }
  }, [details?.state, details?.country, countries]);

  const handleOnChange = (e) => {
    const { value, name, files, type, checked } = e.target;
    // Define the dynamic file size limits for different files
    const FILE_SIZE_LIMITS = {
      introduction_video: 2 * 1024 * 1024, // 2 MB for introduction video
      nin_slip: 1 * 1024 * 1024, // 1 MB for NIN slip
      background_profile: 3.8 * 1024 * 1024, // 3.8 MB for background profile
      // Add other files as needed
    };

    if (name === "means_of_identification") {
      updateFirstLetter(value);
    }

    if (name === "country") {
      const countryInfoDetails = countries?.find((one) => one.name === value);
      setCountryInfo(countryInfoDetails);
      const states = countryInfoDetails?.states || [];
      setSelectStates(states);
    } else if (name === "state") {
      const selectedState = countryInfo?.states?.find(
        (one) => one.name === value
      );
      setSelectState(selectedState);
      const cities = selectedState?.lgas || [];
      setSelectCity(cities);

      setDetails((prev) => {
        return {
          ...prev,
          [name]:
            type === "checkbox"
              ? checked
              : type === "file"
              ? files[0]
              : cities.name,
        };
      });
    }

    // Handle file size validation with dynamic limits
    if (type === "file" && files.length > 0) {
      const file = files[0];
      const fileSizeLimit = Object.keys(FILE_SIZE_LIMITS).find((key) =>
        name.toLowerCase().includes(key)
      )
        ? FILE_SIZE_LIMITS[name]
        : 1 * 1024 * 1024; // Default to 1 MB if no specific limit is found

      if (file.size > fileSizeLimit) {
        const maxSizeMB = (fileSizeLimit / (1024 * 1024)).toFixed(2); // Convert file size limit to MB
        const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2); // Convert uploaded file size to MB

        // Truncate long file names to 20 characters for better UI readability
        const truncatedFileName =
          file.name.length > 10
            ? `${file.name.substring(0, 10)}...`
            : file.name;

        toast.error(
          `File size of "${truncatedFileName}" exceeds the limit of ${maxSizeMB} MB. The uploaded file is ${fileSizeMB} MB. Please select a smaller file.`
        );
        setDetails((prev) => {
          // Reset the file input if it's too large
          return {
            ...prev,
            [name]: null, // Prevent the file from being added to state
          };
        });
        e.target.value = null;
        return; // Exit the function if the file is too large
      } else {
        setDetails((prev) => {
          return {
            ...prev,
            [name]: file, // Add the file to state if the size is valid
          };
        });
      }
    } else {
      setDetails((prev) => {
        return {
          ...prev,
          [name]:
            type === "checkbox" ? checked : type === "file" ? files[0] : value,
        };
      });
    }

    if (name === "languages") {
      const selectedLanguageOptions = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      if (!languageState(...selectedLanguageOptions)) {
        setDetails((prevDetails) => ({
          ...prevDetails,
          languages: [...selectedLanguages, ...selectedLanguageOptions].join(
            ","
          ),
        }));
        setSelectedLanguages([
          ...selectedLanguages,
          ...selectedLanguageOptions,
        ]);
      } else {
        const newList = selectedLanguages.filter(
          (current) => current !== selectedLanguageOptions[0]
        );
        setSelectedLanguages([...newList]);
      }
    }

    // Reset error message once everything is processed
    setErrorMsg(null);
  };

  const handleOutline = (event) => {
    setDetails((prev) => {
      return {
        ...prev,
        experience: event,
      };
    });
    setErrorMsg("");
  };

  const languageState = (language) =>
    selectedLanguages?.find((current) => current === language) ? true : false;

  useEffect(() => {
    setDetails((details) => {
      return {
        ...details,
        social_media_handle: socialHandles,
      };
    });
  }, [socialHandles]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);
    setGetCandidate((prev) => {
      return {
        ...prev,
        isDataNeeded: false,
      };
    });

    const formData = new FormData();

    // Loop through the details object and append each field to formData only if it's not null, undefined, or empty string
    for (let key in details) {
      if (details.hasOwnProperty(key)) {
        const value = details[key];

        // Check for fields that must be files
        if (key === "profile") {
          if (value instanceof File) {
            formData.append(key, value); // Append the file if it's a file
          }
        } else if (
          key === "background_profile" ||
          key === "nin_slip" ||
          key === "introduction_video"
        ) {
          // Check for file fields
          if (value instanceof File) {
            formData.append(key, value);
          }
        }
        // Handle social_media_handle if it's an array
        else if (key === "social_media_handle" && Array.isArray(value)) {
          value.forEach((item, index) => {
            formData.append(`${key}[]`, item); // Append each item as an array element
          });
        }
        // For other fields, append normally
        else if (value !== null && value !== undefined && value !== "") {
          formData.append(key, value);
        }
      }
    }

    // Additional fields like country and state can be appended if needed
    // formData.append("country", countryInfo?.name);
    // formData.append("state", selectState);

    axios
      .post(`${BASE_URL}/candidate/UpdateCandidate/${user.id}`, formData, {
        headers: {
          Authorization: `Bearer ${authDetails.token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        onSuccess({
          message: "Profile",
          success: response.data.message,
        });
        setIsOpen(false);
        localStorage.setItem(
          "userDetails",
          JSON.stringify(response.data.candidate)
        );
        setLoading(false);

        navigate("/applicant/public-profile");
        setGetCandidate((prev) => {
          return {
            ...prev,
            isDataNeeded: true,
          };
        });
      })
      .catch((error) => {
        if (error.response) {
          setErrorMsg({ stack: error.response.data.message });
          setShowMsg(true);
          setLoading(false);
        } else {
          setErrorMsg({ network: error.message });
          setShowMsg(true);
          setLoading(false);
        }
      });
  };

  const getImageURL = (e) => {
    const { name } = e.target;
    const file = e.target.files[0]; //filelist is an object carrying all details of file, .files[0] collects the value from key 0 (not array), and stores it in file
    if (file && file.size > 1 * 1024 * 1024) {
      toast.error("File size exceeds the file size limit of 1MB.");
      e.target.value = null;
      return;
    }
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      // You can also perform additional actions with the valid file
      const generatedUrl = URL.createObjectURL(file);
      setProfileImageUrl(generatedUrl);
      setDetails({ ...details, [name]: file });
    } else {
      // Handle invalid file type
      alert("Please select a valid JPEG or PNG file.");
    }
  };

  const findLanguage = (lang) =>
    selectedLanguages.find((current) => current === lang) ? true : false;

  const handleLanguageSelect = (lang) => {
    let newList = [];
    if (findLanguage(lang)) {
      newList = selectedLanguages.filter((current) => current !== lang);
      setSelectedLanguages([...newList]);
      return;
    }

    newList = [...selectedLanguages, lang];
    setSelectedLanguages([...newList]);
  };

  useEffect(() => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      languages: [...selectedLanguages].join(","),
    }));
  }, [selectedLanguages]);

  return (
    <div className="max-w-full text-[#515B6F] text-base overflow-x-hidden">
      <div className="my-4">
        <div className="max-w-full flex flex-wrap lg:flex-nowrap gap-4 items-center pb-6 border-b">
          {/* Left Section */}
          <div className="w-full lg:w-1/3 pr-0 lg:pr-5 text-center lg:text-left">
            <p className="font-medium mb-2 text-slate-950">Profile Photo</p>
            <p>
              This image will be shown publicly as your profile picture, it will
              help recruiters recognize you!
            </p>
          </div>

          {/* Right Section */}
          <div className="w-full flex flex-col lg:flex-row justify-center items-center flex-wrap gap-4">
            {/* Profile Image */}
            <div className="ring-green-200 ring-4 rounded-full bg-gray-300">
              <img
                className="w-[100px] h-[100px] rounded-full"
                src={
                  profileImageUrl
                    ? profileImageUrl
                    : `${IMAGE_URL}/${candidate?.profile}`
                }
                alt="Profile"
              />
            </div>

            {/* Upload Section */}
            <label
              htmlFor="image"
              className="min-h-32 w-full lg:w-[90%] lg:min-w-[24rem] cursor-pointer bg-green-50 border-2 border-green-500 border-dashed p-3 lg:p-5 rounded"
            >
              <div className="text-center">
                <div className="flex justify-center">
                  <span className="text-green-500 mb-3 text-2xl">
                    <TbPhoto />
                  </span>
                </div>
                <p>
                  <span className="text-green-500 font-medium">
                    Click to replace
                  </span>{" "}
                  or Drag and Drop
                </p>
                <p>PNG, JPG (max. File size 1MB)</p>
                <input
                  type="file"
                  accept=".jpeg, .png, .jpg,"
                  name="profile"
                  onChange={getImageURL}
                  id="image"
                  className="hidden"
                />
              </div>
            </label>
          </div>
        </div>

        <div className="update_form py-6">
          <div>
            <form onSubmit={handleSubmit}>
              <div className=" lg:w-">
                <div className="border-b py-6">
                  <div className="flex flex-col lg:flex-row gap-2">
                    <div className="font-medium w-full lg:w-2/6 text-slate-900">
                      <p>Personal Information</p>
                    </div>
                    <div className="w-full lg:w-4/6">
                      <div className="mb-4">
                        <label className="block">
                          <span className="block text-sm font-medium text-slate-700 flex gap-1">
                            Full Name{" "}
                            <strong className="text-red-500">*</strong>
                          </span>
                          <input
                            type="text"
                            value={details?.full_name}
                            name="full_name"
                            onChange={handleOnChange}
                            className="mt-1 block p-1 focus:outline-none w-full border"
                          />
                        </label>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="">
                          <label className="block">
                            <span className="text-sm font-medium text-slate-700 flex gap-1">
                              Phone Number{" "}
                              <strong className="text-red-500">*</strong>
                            </span>
                            <input
                              type="text"
                              value={details?.phone_number}
                              name="phone_number"
                              onChange={handleOnChange}
                              placeholder="+44 1245 572 135"
                              className="mt-1 block p-1 focus:outline-none w-full border"
                            />
                          </label>
                        </div>
                        <div className="">
                          <label className="block">
                            <span className="block text-sm font-medium text-slate-700 flex gap-1">
                              Email <strong className="text-red-500">*</strong>
                            </span>
                            <input
                              type="email"
                              value={details?.email}
                              name="email"
                              onChange={handleOnChange}
                              placeholder="Jakegyll@gmail.com"
                              className="mt-1 block p-1 focus:outline-none w-full border"
                            />
                          </label>
                        </div>
                        <div className="">
                          <label className="block">
                            <span className="block text-sm font-medium text-slate-700">
                              Date of Birth
                            </span>
                            <input
                              type="date"
                              value={details?.date_of_birth}
                              name="date_of_birth"
                              onChange={handleOnChange}
                              className="mt-1 block p-1 focus:outline-none w-full border"
                            />
                          </label>
                        </div>
                        <div className="">
                          <label className="block">
                            <span className="block text-sm font-medium text-slate-700 mb-1">
                              Gender
                            </span>
                            <select
                              value={details?.gender}
                              name="gender"
                              onChange={handleOnChange}
                              id=""
                              className="border w-full focus:outline-none p-2 pb-1"
                            >
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                            </select>
                          </label>
                        </div>
                        <div className="">
                          <label className="block">
                            <span className="block text-sm font-medium text-slate-700 mb-1 flex gap-1">
                              Select Type of ID{" "}
                              <strong className="text-red-500">*</strong>
                            </span>
                            <select
                              value={details?.means_of_identification}
                              name="means_of_identification"
                              onChange={handleOnChange}
                              id=""
                              className="border w-full focus:outline-none p-2 pb-1"
                            >
                              <option value="">-- Select --</option>
                              <option value="nin">
                                National Identity Card (NIN)
                              </option>
                              <option value="license">Drivers License </option>
                              <option value="passport">
                                International Passport{" "}
                              </option>
                            </select>
                          </label>
                        </div>

                        {selectId && (
                          <div className="">
                            <label className="block">
                              <span className="block text-sm font-medium text-slate-700">
                                Input{" "}
                                {selectId.toLowerCase() == "nin"
                                  ? selectId.toUpperCase()
                                  : selectId ?? ""}{" "}
                                No:
                              </span>
                              <input
                                type="text"
                                value={details?.nin}
                                name="nin"
                                onChange={handleOnChange}
                                className="mt-1 block p-1 focus:outline-none w-full border"
                              />
                            </label>
                          </div>
                        )}
                        {selectId && (
                          <div className="">
                            <label className="block">
                              <span className="block text-sm font-medium text-slate-700">
                                Upload{" "}
                                {selectId.toLowerCase() == "nin"
                                  ? selectId.toUpperCase()
                                  : selectId ?? ""}
                              </span>
                              <input
                                type="file"
                                accept=".jpeg, .png, .jpg,"
                                name="nin_slip"
                                onChange={handleOnChange}
                                className="mt-1 block p-1 focus:outline-none w-full border"
                              />
                            </label>
                            <small class="text-sm text-gray-500">
                              File size should not exceed 1MB. Only accepts
                              .jpeg, .png, .jpg.
                            </small>
                          </div>
                        )}
                        <div className="">
                          <label className="block">
                            <span className="block text-sm font-medium text-slate-700">
                              Background Image
                            </span>
                            <input
                              type="file"
                              accept=".jpeg, .png, .jpg,"
                              name="background_profile"
                              onChange={handleOnChange}
                              className="mt-1 block p-1 focus:outline-none w-full border"
                            />
                          </label>
                          <small class="text-sm text-gray-500">
                            File size should not exceed 1MB. Only accepts .jpeg,
                            .png, .jpg.
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-b py-6">
                  <div className="flex flex-col lg:flex-row gap-2">
                    <div className="font-medium w-full lg:w-2/6 text-slate-900">
                      <p>Professional Details</p>
                    </div>
                    <div className="w-full lg:w-4/6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="">
                          <label className="block">
                            <span className="block text-sm font-medium text-slate-700 mb-1">
                              Educational Qualification
                            </span>
                            <select
                              value={details?.educational_qualification}
                              name="educational_qualification"
                              onChange={handleOnChange}
                              id=""
                              className="border w-full focus:outline-none p-2 pb-1"
                            >
                              <option value="">-- select --</option>
                              <option value="ond">OND</option>
                              <option value="hnd">HND</option>
                              <option value="diploma">DIPLOMA</option>
                              <option value="bsc">Bachelor's Degree</option>
                              <option value="msc">Master's Degree</option>
                            </select>
                          </label>
                        </div>
                        <div className="">
                          <label className="block">
                            <span className="block text-sm font-medium text-slate-700 mb-1">
                              Work Experience
                            </span>
                            <input
                              value={details.work_experience}
                              name="work_experience"
                              placeholder="3 years"
                              onChange={handleOnChange}
                              className="border w-full focus:outline-none p-2 pb-1"
                            />
                          </label>
                        </div>
                        <div className="flex flex-col">
                          {/* <label className="block">
                            <span className="block text-sm font-medium text-slate-700 mb-1">
                              {" "}
                              Language{" "}
                            </span>
                            <select
                              multiple
                              value={selectedLanguages}
                              name="languages"
                              onChange={handleOnChange}
                              className="border aria-selected:bg-red-100 w-full focus:outline-none p-2 pb-1"
                            >
                              <option
                                className={
                                  selectedLanguages.find(
                                    (current) => current === "english"
                                  )
                                    ? "bg-black"
                                    : ""
                                }
                                value="english"
                              >
                                English
                              </option>
                              <option value="french">French</option>
                              <option value="hausa">Hausa </option>
                              <option value="Yaruba">Yaruba</option>
                              <option value="igbo">Igbo</option>
                            </select>
                          </label> */}
                          <label className="block">
                            <span className="block text-sm font-medium text-slate-700 mb-1">
                              {" "}
                              Language{" "}
                            </span>
                            <div
                              multiple
                              value={selectedLanguages}
                              name="languages"
                              onChange={handleOnChange}
                              className="border flex flex-wrap gap-2 w-full p-2 pb-1"
                            >
                              {[
                                "English",
                                "Hausa",
                                "French",
                                "Yoruba",
                                "Igbo",
                              ].map((current) => (
                                <div className="flex items-center gap-1">
                                  {findLanguage(current.toLocaleLowerCase()) ? (
                                    <MdCheckBox
                                      className="cursor-pointer flex-shrink-0"
                                      onClick={() =>
                                        handleLanguageSelect(
                                          current.toLocaleLowerCase()
                                        )
                                      }
                                    />
                                  ) : (
                                    <MdCheckBoxOutlineBlank
                                      className="cursor-pointer flex-shrink-0"
                                      onClick={() =>
                                        handleLanguageSelect(
                                          current.toLocaleLowerCase()
                                        )
                                      }
                                    />
                                  )}
                                  {current}
                                </div>
                              ))}
                              {/* <div value="french">French</div>
                              <div value="hausa">Hausa </div>
                              <div value="yaruba">Yaruba</div>
                              <div value="igbo">Igbo</div> */}
                            </div>
                          </label>
                        </div>
                        <div className="">
                          <label className="block">
                            <span className="block text-sm font-medium text-slate-700 mb-1">
                              Salary Type
                            </span>
                            <select
                              value={details.salary_type}
                              name="salary_type"
                              onChange={handleOnChange}
                              className="border w-full focus:outline-none p-2 pb-1"
                            >
                              <option value="">-- select --</option>
                              <option value="annual">Annual</option>
                              <option value="monthly">Monthly</option>
                              <option value="weekly">Weekly</option>
                              <option value="hourly">Hourly</option>
                              <option value="contract">Contract</option>
                            </select>
                          </label>
                        </div>
                        <div className="mb-4">
                          <label className="block">
                            <span className="block text-sm font-medium text-slate-700">
                              Salary (₦)
                            </span>
                            <input
                              type="numbber"
                              value={details.salary}
                              name="salary"
                              onChange={handleOnChange}
                              className="mt-1 block p-1 focus:outline-none w-full border"
                            />
                          </label>
                        </div>
                        <div className="mb-4">
                          <label className="block">
                            <span className="block text-sm font-medium text-slate-700">
                              Preferred Job Role
                            </span>
                            <input
                              type="text"
                              value={details.preferred_job_role}
                              name="preferred_job_role"
                              onChange={handleOnChange}
                              className="mt-1 block p-1 focus:outline-none w-full border"
                            />
                          </label>
                        </div>{" "}
                        <div className="mb-4 col-span-2">
                          <label className="block">
                            <span className="block text-sm font-medium text-slate-700">
                              Personal Profile
                            </span>
                          </label>
                          <textarea
                            value={details.personal_profile}
                            name="personal_profile"
                            onChange={handleOnChange}
                            className="mt-1 min-h-[100px] block w-full focus:outline-green-400 p-2 border"
                            id=""
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-5">
                    <label>
                      <p className="font-bold mb-5">Experience</p>
                      <TextEditor
                        textValue={details.experience}
                        handleText={handleOutline}
                      />
                    </label>
                  </div>
                  {/* <div className="mb-5">
                                        <label>
                                            <p className="font-bold mb-5">Education</p>
                                            <TextEditor
                                                textValue={details.educational_qualification}
                                                handleText={handleEducation} />
                                        </label>
                                    </div> */}
                </div>
                <div className="w-full border-b mb-8 py-6">
                  <div className="flex flex-col lg:flex-row">
                    <div className="font-medium w-full lg:w-2/6 text-slate-900">
                      <p>Contact Details</p>
                    </div>
                    <div className="w-full lg:w-4/6">
                      <div className="mb-4">
                        <label className="block">
                          <span className="block text-sm font-medium text-slate-700">
                            Contact Address
                          </span>
                          <input
                            type="text"
                            value={details.contact_address}
                            name="contact_address"
                            onChange={handleOnChange}
                            className="mt-1 block p-1 focus:outline-none w-full border"
                          />
                        </label>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="">
                          <label className="block">
                            <span className="block text-sm font-medium text-slate-700 mb-1">
                              Country
                            </span>
                            <select
                              value={details.country}
                              name="country"
                              onChange={handleOnChange}
                              className="border w-full focus:outline-none p-2 pb-1"
                            >
                              <option value="">-- select --</option>
                              {countries.map((country) => (
                                <option
                                  selected={country?.name === details?.country}
                                  key={country.isoCode}
                                  value={country.name}
                                >
                                  {country.name}
                                </option>
                              ))}
                            </select>
                          </label>
                        </div>
                        <div className="">
                          <label className="block">
                            <span className="block text-sm font-medium text-slate-700 mb-1">
                              State
                            </span>
                            <select
                              value={details.state}
                              name="state"
                              onChange={handleOnChange}
                              className="border w-full focus:outline-none p-2 pb-1"
                            >
                              <option value="">-- select --</option>

                              {selectStates?.map((each) => (
                                <option
                                  selected={each?.name === details?.state}
                                  key={each.isoCode}
                                  value={each.name}
                                >
                                  {each.name}
                                </option>
                              ))}
                            </select>
                          </label>
                        </div>
                        <div className="">
                          <label className="block">
                            <span className="block text-sm font-medium text-slate-700 mb-1">
                              Local Governmennt
                            </span>
                            <select
                              value={details.local_gov}
                              name="local_gov"
                              onChange={handleOnChange}
                              className="border w-full focus:outline-none p-2 pb-1"
                            >
                              <option value="">-- select --</option>
                              {selectCity?.map((city) => (
                                <option key={city.isoCode} value={city.name}>
                                  {city.name}
                                </option>
                              ))}
                            </select>
                          </label>
                        </div>
                        <div className="mb-4">
                          <label className="block">
                            <span className="block text-sm font-medium text-slate-700">
                              Address
                            </span>
                            <input
                              type="text"
                              value={details.address}
                              name="address"
                              onChange={handleOnChange}
                              className="mt-1 block p-1 focus:outline-none w-full border"
                            />
                          </label>
                        </div>

                        <div className="col-span-2">
                          <SocialsForm
                            experiences={socialHandles}
                            setExperiences={setSocialHandles}
                          />
                        </div>

                        <div className="col-span-2">
                          <label class="block">
                            <span class="block text-sm font-medium text-slate-700">
                              My Introduction Video
                            </span>
                            <input
                              type="file"
                              accept=".mp4"
                              name="introduction_video"
                              value={details?.introduction_video}
                              class="mt-1 block p-1 focus:outline-none w-full border"
                              onChange={handleOnChange}
                            />
                            <small class="text-sm text-gray-500">
                              File size should not exceed 2MB. Only MP4 files
                              are allowed.
                            </small>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {errorMsg?.stack && (
                  <div className="py-4 border-b mb-8 text-center">
                    {Object.keys(errorMsg.stack).map((field) => (
                      <div key={field}>
                        {errorMsg.stack[field].map((error, index) => (
                          <p
                            className="text-red-700 text-base font-medium"
                            key={index}
                          >
                            {" "}
                            {error}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
                {errorMsg?.network && (
                  <div className="py-4 border-b mb-8 text-center">
                    <p className="text-red-700 text-base font-medium">
                      {" "}
                      {errorMsg.network}
                    </p>
                  </div>
                )}

                <button className="rounded border prime_bg text-white px-4 flex justify-center py-2 w-[50%]">
                  Save Profile
                  {loading && (
                    <div className="size-[20px] ml-3 animate-spin rounded-full border-r-4  border- "></div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
