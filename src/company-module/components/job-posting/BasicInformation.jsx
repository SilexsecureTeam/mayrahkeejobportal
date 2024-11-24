import JobTypeItem from "./JobTypeItem";
import RangeSlider from "react-range-slider-input";
import "../style.css";
import { useEffect, useState } from "react";
import { FormatPrice } from "../../../utils/formmaters";
import BasicJobInput from "./BasicJobInput";
import QualificationsForm from "./QualificationsForm";
import SelectorInput from "./SelectorInput";
import useJobManagement from "../../../hooks/useJobManagement";

const basic_inputs = [
  {
    id: 1,
    name: "email",
    label: "Contact Email",
    type: "text",
    placeholder: "e.g hr@example.com",
    prompt: "Here you input the company email",
  },
  {
    id: 3,
    name: "preferred_age",
    label: "Application Age Limit",
    type: "number",
    placeholder: "e.g 18",
    prompt: "Here you input preferred average age (years)",
    verification:"At least 18 years"
  },
  {
    id: 4,
    name: "application_deadline_date",
    label: "Application Deadline",
    type: "date",
    placeholder: "e.g some date",
    prompt: "Here you set an application deadline",
  },
  {
    id: 5,
    name: "office_address",
    label: "Office Address",
    type: "text",
    placeholder: "e.g victoria Island, Lagos street",
    prompt: "Here you insert the office address",
  },
  {
    id: 6,
    name: "location",
    label: "Location",
    type: "text",
    placeholder: "e.g wuse 11",
    prompt: "Here you insert the location",
    verification:"At least 10 characters"
  },
  {
    id: 7,
    name: "search_keywords",
    label: "Search Keywords",
    type: "text",
    placeholder: "e.g Tech",
    prompt: "Here you specify search keywords",
    verification:"At least 4 characters"
  },
  {
    id: 8,
    name: "experience",
    label: "Minimum years of Experience",
    type: "number",
    placeholder: "e.g 2 years",
    prompt: "Here you specify experience in years",
    verification:"At least 2 years"
  },
];

const job_types = [
  {
    id: 1,
    name: "Full Time",
  },
  {
    id: 2,
    name: "Part Time",
  },
  {
    id: 3,
    name: "Remote",
  },
  {
    id: 4,
    name: "Internship",
  },
  {
    id: 5,
    name: "Contract",
  },
  {
    id: 6,
    name: "Hybrid",
  }
];

const genderData = [
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

const salaryTypeData = [
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

function BasicInformation({ setCurrentStep, data, jobUtils }) {
  const { getEmployentTypes, getCurrencies } = useJobManagement();
  const [salaryRange, setSalaryRange] = useState([5000, 22000]);
  const [selectedType, setSelectedType] = useState();
  const [currentQualification, setCurrentQualification] = useState("");
  const [selectedGender, setSelectedGender] = useState(genderData[0]);
  const [selectedSector, setSelectedSector] = useState(jobSectors[0]);
  const [subSectorList, setSubSectorList] = useState();
  const [selectedSubSector, setSelectedSubSector] = useState();
  const [selectedSalary, setSelectedSalary] = useState(salaryTypeData[1]);
  const [photoUrl, setPhotoUrl] = useState();
  const [minimumPrice, setMinimumPrice] = useState(0);
  const [employementList, setEmployementList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(jobUtils?.details?.currency);

  const toogleSelectedType = (selected) => {
    setSelectedType(selected);
    jobUtils.setDetails({ ...jobUtils.details, type: selected.name });
  };

  const getPhotoURL = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];

    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const generatedUrl = URL.createObjectURL(file);
      setPhotoUrl(generatedUrl);
      jobUtils.setDetails({ ...jobUtils.details, [name]: file });
    } else {
      alert("Please select a valid JPEG or PNG file.");
    }
  };

  useEffect(() => {
    const initData = async () => {
      const employementListResult = await getEmployentTypes();
      const currencyResult = await getCurrencies();
      setEmployementList(employementListResult);
      setCurrencyList(currencyResult);
    };
    initData();
  },[]);
  useEffect(() => {
    setSelectedSector(jobUtils?.details?.sector ? jobSectors?.find(one=> one?.name === jobUtils?.details?.sector) : jobSectors[0]);
  },[]);
  
    useEffect(() => {
      if(selectedSector){
    setSubSectorList(jobUtils?.details?.sector ? jobSectors?.find(one=> one?.name === jobUtils?.details?.sector)?.subsections : selectedSector?.subsections);
      }
      },[selectedSector]);
  useEffect(() => {
    if(subSectorList]){
setSelectedSubSector(jobUtils?.details?.subsector ? subSectorList?.find(one=>one.name === jobUtils?.details?.subsector): subSectorList[0]);
    }
    },[subSectorList]);

  useEffect(() => {
    console.log(selectedCurrency,currencyList);
    
    // Ensure selectedCurrency is updated only if the current one is found in the currencyList
    if (currencyList.length > 0) {
      const matchedCurrency = currencyList.find(
        (currency) => currency.name === selectedCurrency
      );
      if (matchedCurrency) {
        setSelectedCurrency(matchedCurrency);
      } else {
        // If no match is found, you could either set a default or reset
        setSelectedCurrency(currencyList[0]);
      }
    }
    
  }, [currencyList]);

  useEffect(() => {
    jobUtils.setDetails({
      ...jobUtils.details,
      ["gender"]: selectedGender.name,
      ["salary_type"]: selectedSalary.name,
      ["currency"]: selectedCurrency?.name,
      ["sector"]: selectedSector.name,
      ["subsector"]: selectedSubSector?.name,
    });
  }, [
    selectedCurrency,
    selectedGender,
    selectedSalary,
    selectedSector,
    selectedSubSector,
  ]);

  return (
    <div className="flex flex-col w-full p-4 gap-4">
      {/* Basic Info */}
      <div className="flex flex-col gap-4 border-b pb-2">
        <h3 className="text-gray-700 text-lg font-semibold">
          Basic Information
        </h3>
        <span className="text-sm text-gray-400">
          This Information will be displayed publicly
        </span>
      </div>
      {/* Featured Image */}
      <div className="flex flex-col sm:flex-row gap-4 items-center border-b py-4">
        <div className="flex flex-col w-full sm:max-w-[25%] gap-2">
          <h3 className="text-gray-700 text-sm font-semibold">
            Featured Image
          </h3>
          <span className="text-xs text-gray-400">
            Here you upload image for job
          </span>
        </div>

        <div className="flex flex-col gap-2 items-center">
          <label
            htmlFor="photo_url"
            className="text-sm text-primaryColor hover:underline cursor-pointer"
          >
            Upload
          </label>
          <div className="flex flex-col h-[80px] w-[80px] border border-dashed p-1 border-gray-400">
            {photoUrl && (
              <img
                src={photoUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            )}
            <input
              id="photo_url"
              onChange={getPhotoURL}
              name="featured_image"
              type="file"
              className="hidden"
            />
          </div>
          <span className="text-xs text-gray-400">Only JPEG or PNG</span>
        </div>
      </div>
      {/* Dropdown Options */}
      <SelectorInput
        key={1}
        data={{
          label: "Sector",
          prompt: "Here you input the job sector",
          name: "sector",
        }}
        listData={jobSectors}
        jobUtils={jobUtils}
        selected={selectedSector}
        setSelected={setSelectedSector}
      />

      {/* Dropdown Options */}
      <SelectorInput
        key={4}
        data={{
          label: "Sub-Sector",
          prompt: "Here you select subsector based on the job sector",
          name: "sector",
        }}
        listData={subSectorList}
        jobUtils={jobUtils}
        selected={selectedSubSector}
        setSelected={setSelectedSubSector}
      />
      {/* Basic Inputs */}
      {basic_inputs.map((current) => (
        <BasicJobInput key={current.id} data={current} jobUtils={jobUtils} />
      ))}
      {/* Employment Types */}
      <div className="flex flex-col sm:flex-row gap-4 border-b py-4">
        <div className="flex flex-col gap-2 w-full sm:max-w-[25%]">
          <h3 className="text-gray-700 text-sm font-semibold">
            Type of Employment
          </h3>
          <span className="text-xs text-gray-400">
            You can select multiple types of employment
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {employementList.map((current) => (
            <JobTypeItem
              key={current.id}
              selectedType={selectedType}
              toogleSelectedType={toogleSelectedType}
              data={current}
              jobUtils={jobUtils}
            />
          ))}
        </div>
      </div>
      {/* Job Title */}
      <QualificationsForm jobUtils={jobUtils} />
      {/* Dropdown Options */}
      <SelectorInput
        key={1}
        data={{
          label: "Gender",
          prompt: "Here you select preferred Gender",
          name: "gender",
        }}
        listData={genderData}
        jobUtils={jobUtils}
        selected={selectedGender}
        setSelected={setSelectedGender}
      />
      <SelectorInput
        key={2}
        data={{
          label: "Salary Type",
          prompt: "Here you select how the job pays",
          name: "salary_type",
        }}
        listData={salaryTypeData}
        jobUtils={jobUtils}
        selected={selectedSalary}
        setSelected={setSelectedSalary}
      />
      <SelectorInput
        key={3}
        data={{
          label: "Currency",
          prompt: "Here you select the currency",
          name: "currency",
        }}
        listData={currencyList}
        jobUtils={jobUtils}
        selected={selectedCurrency}
        setSelected={setSelectedCurrency}
      />
      {/* Salary */}
      <div className="flex flex-col sm:flex-row gap-4 border-b py-4">
        <div className="flex flex-col gap-2 sm:max-w-[25%] w-full">
          <h3 className="text-gray-700 text-sm font-semibold">Salary</h3>
          <span className="text-xs text-gray-400">
            Please specify the estimated salary range for the role. *You can
            leave this blank.
          </span>
        </div>
        <div className="flex flex-col w-full sm:w-[50%] gap-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Min Value</label>
              <div className="p-1 border border-gray-400">
                <span className="mx-1">{selectedCurrency?.code}</span>
                <input
                  type="number"
                  className="w-24 ring-0 outline-0"
                  value={jobUtils.details.min_salary || ""}
                  onChange={(e) => {
                    const minSalary = Number(e.target.value);
                    if (minSalary <= jobUtils.details.max_salary) {
                      jobUtils.setDetails({
                        ...jobUtils.details,
                        min_salary: minSalary,
                      });
                    }
                  }}
                />
              </div>
            </div>
            <span>to</span>
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Max Value</label>
              <div className="p-1 border border-gray-400">
                <span className="mx-1">{selectedCurrency?.code}</span>
                <input
                  type="number"
                  className="w-24 ring-0 outline-0"
                  value={jobUtils.details.max_salary || ""}
                  onChange={(e) => {
                    const maxSalary = Number(e.target.value);
                    if (maxSalary >= jobUtils.details.min_salary) {
                      jobUtils.setDetails({
                        ...jobUtils.details,
                        max_salary: maxSalary,
                      });
                    }
                  }}
                />
              </div>
            </div>
          </div>
          {/* 
          <RangeSlider
            min={minimumPrice}
            max={minimumPrice + 100000}
            step={500}
            value={[
              jobUtils.details.min_salary,
              jobUtils.details.max_salary,
            ]}
            onInput={(range) => {
              jobUtils.setDetails({
                ...jobUtils.details,
                min_salary: range[0],
                max_salary: range[1],
              });
            }}
          /> */}
        </div>

      </div>
      <button
        onClick={() => setCurrentStep(data[1])}
        className="p-2 place-self-end mt-4 font-semibold w-fit text-sm bg-primaryColor text-white"
      >
        Next Step
      </button>
    </div>
  );
}

export default BasicInformation;
