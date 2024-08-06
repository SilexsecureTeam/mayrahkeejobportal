import JobTypeItem from "./JobTypeItem";
import RangeSlider from "react-range-slider-input";
import "../style.css";
import { useState } from "react";
import { FormatPrice } from "../../../utils/formmaters";
import BasicJobInput from "./BasicJobInput";
import QualificationsForm from "./QualificationsForm";

// {
//   id: 4,
//   name: "introduction_video_url",
//   label: "Introduction Video url",
//   type: "text",
//   placeholder: "e.g https://writerposition.com",
//   prompt: 'Here you enter job video url'
// },

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
    id: 2,
    name: "sector",
    label: "Sector",
    type: "text",
    placeholder: "e.g IT",
    prompt: "Here you input the job sector",
  },
  {
    id: 3,
    name: "preferred_age",
    label: "Prefered Age",
    type: "number",
    placeholder: "e.g 18",
    prompt: "Here you input prefered average age (years)",
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
    placeholder: "e.g 11.023 20.345",
    prompt: "Here you insert the longitude and latitude",
  },
  {
    id: 7,
    name: "search_keywords",
    label: "Search Keywords",
    type: "text",
    placeholder: "e.g networks engineer",
    prompt: "Here you specify search keywords",
  },
];

const job_types = [
  {
    id: 1,
    name: "Full Name",
  },
  {
    id: 2,
    name: "Part Name",
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
];


function BasicInformation({ setCurrentStep, data, jobUtils }) {
  const [salaryRange, setSalaryRange] = useState([5000, 22000]);
  const [selectedType, setSelectedType] = useState();
  const [currentQualification, setCurrentQualification] = useState('');

  const toogleSelectedType = (selected) => {
    setSelectedType(selected);
    jobUtils.setDetails({ ...jobUtils.details, type: selected.name });
  };

 

  return (
    <div className="flex w-full flex-col p-2">
      {/* Basic Info */}
      <div className="flex flex-col gap-[15px] border-b pb-2">
        <h3 className="text-gray-700 text-sm font-semibold">
          Basic Information
        </h3>
        <span className="text-little text-gray-400">
          This Information will be displayed publicly
        </span>
      </div>

      {/* Basic Inputs */}
      {basic_inputs.map((current) => (
        <BasicJobInput data={current} jobUtils={jobUtils} />
      ))}

      {/* Employment Types */}
      <div className="flex gap-[30px] border-b py-2 ">
        <div className="flex flex-col gap-[10px] max-w-[25%]">
          <h3 className="text-gray-700 text-sm font-semibold">
            Type of Employment
          </h3>
          <span className="text-little text-gray-400">
            You can select multiple types of employment
          </span>
        </div>

        <div className="flex flex-col gap-[3px] ">
          {job_types.map((current, index) => (
            <JobTypeItem
              selectedType={selectedType}
              toogleSelectedType={toogleSelectedType}
              data={current}
              key={index}
              jobUtils={jobUtils}
            />
          ))}
        </div>
      </div>

      {/* Salary */}
      <div className="flex gap-[30px]  border-b py-2 ">
        <div className="flex flex-col max-w-[25%] gap-[10px]">
          <h3 className="text-gray-700 text-sm font-semibold">Salary</h3>
          <span className="text-little text-gray-400">
            Please specify the estimated salary range for the role. *You can
            leave this blank
          </span>
        </div>

        <div className="flex flex-col gap-[20px] justify-center w-[20%]">
          <div className="flex items-center text-little text-gray-700 justify-between">
            <span className="border p-1 ">
              {FormatPrice(jobUtils.details.min_salary)}
            </span>
            <span>to</span>
            <span className="border p-1 ">
              {FormatPrice(jobUtils.details.max_salary)}
            </span>
          </div>

          <RangeSlider
            min={0}
            max={100000}
            step={500}
            defaultValue={[
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
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-[30px] border-b py-2 ">
        <div className="flex flex-col gap-[10px] min-w-[25%]">
          <h3 className="text-gray-700 text-sm font-semibold">Categories</h3>
          <span className="text-little text-gray-400">
            You can select multiple categories types
          </span>
        </div>

        <div className="flex flex-col gap-[3px] ">
          {["Category One", "Category Two", "Category Three"].map(
            (current, index) => (
              <JobTypeItem data={current} key={index} />
            )
          )}
        </div>
      </div>

      {/* Job Title */}
      <QualificationsForm jobUtils={jobUtils}/>
    

      <button
        onClick={() => setCurrentStep(data[1])}
        className="p-2 place-self-end mt-[10px] font-semibold w-fit text-little bg-primaryColor text-white"
      >
        Next Step
      </button>
    </div>
  );
}

export default BasicInformation;
