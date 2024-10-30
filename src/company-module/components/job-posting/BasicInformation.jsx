import JobTypeItem from "./JobTypeItem";
import RangeSlider from "react-range-slider-input";
import "../style.css";
import { useEffect, useState } from "react";
import { FormatPrice } from "../../../utils/formmaters";
import BasicJobInput from "./BasicJobInput";
import QualificationsForm from "./QualificationsForm";
import SelectorInput from "./SelectorInput";

function BasicInformation({ setCurrentStep, data, jobUtils }) {
  const [salaryRange, setSalaryRange] = useState([5000, 22000]);
  const [selectedType, setSelectedType] = useState();
  const [currentQualification, setCurrentQualification] = useState("");
  const [selectedGender, setSelectedGender] = useState(genderData[0]);
  const [selectedSalary, setSelectedSalary] = useState(salaryTypeData[1]);
  const [selectedCurrency, setSelectedCurrency] = useState(currencyData[0]);
  const [photoUrl, setPhotoUrl] = useState();

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
    jobUtils.setDetails({
      ...jobUtils.details,
      gender: selectedGender.name,
      salary_type: selectedSalary.name,
      currency: selectedCurrency.name,
    });
  }, [selectedCurrency, selectedGender, selectedSalary]);

  return (
    <div className="flex flex-col w-full p-4 gap-6">
      {/* Header Section */}
      <div className="flex flex-col gap-2 border-b pb-4">
        <h3 className="text-lg font-semibold text-gray-700">Basic Information</h3>
        <span className="text-sm text-gray-500">
          This information will be displayed publicly.
        </span>
      </div>

      {/* Featured Image */}
      <div className="flex flex-wrap gap-4 items-start border-b pb-4">
        <div className="w-full sm:w-1/3">
          <h3 className="text-sm font-semibold text-gray-700">Featured Image</h3>
          <span className="text-sm text-gray-500">
            Upload an image for the job.
          </span>
        </div>

        <div className="flex flex-col items-center">
          <label
            htmlFor="photo_url"
            className="text-primaryColor hover:underline cursor-pointer text-sm"
          >
            Upload
          </label>
          <div className="h-20 w-20 border border-dashed border-gray-400">
            {photoUrl && (
              <img
                src={photoUrl}
                alt="Preview"
                className="h-full w-full object-cover"
              />
            )}
            <input
              id="photo_url"
              type="file"
              name="featured_image"
              className="hidden"
              onChange={getPhotoURL}
            />
          </div>
          <span className="text-xs text-gray-500">Only JPEG or PNG.</span>
        </div>
      </div>

      {/* Basic Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {basic_inputs.map((current) => (
          <BasicJobInput key={current.id} data={current} jobUtils={jobUtils} />
        ))}
      </div>

      {/* Employment Types */}
      <div className="flex flex-wrap gap-4 border-b pb-4">
        <div className="w-full sm:w-1/3">
          <h3 className="text-sm font-semibold text-gray-700">
            Type of Employment
          </h3>
          <span className="text-sm text-gray-500">
            You can select multiple employment types.
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {job_types.map((current) => (
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

      {/* Qualifications Form */}
      <QualificationsForm jobUtils={jobUtils} />

      {/* Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectorInput
          data={{ label: "Gender", prompt: "Select preferred gender", name: "gender" }}
          listData={genderData}
          jobUtils={jobUtils}
          selected={selectedGender}
          setSelected={setSelectedGender}
        />
        <SelectorInput
          data={{ label: "Salary Type", prompt: "Select salary type", name: "salary_type" }}
          listData={salaryTypeData}
          jobUtils={jobUtils}
          selected={selectedSalary}
          setSelected={setSelectedSalary}
        />
        <SelectorInput
          data={{ label: "Currency", prompt: "Select currency", name: "currency" }}
          listData={currencyData}
          jobUtils={jobUtils}
          selected={selectedCurrency}
          setSelected={setSelectedCurrency}
        />
      </div>

      {/* Salary Range */}
      <div className="flex flex-wrap gap-4 border-b pb-4">
        <div className="w-full sm:w-1/3">
          <h3 className="text-sm font-semibold text-gray-700">Salary</h3>
          <span className="text-sm text-gray-500">
            Specify the estimated salary range. You can leave this blank.
          </span>
        </div>
        <div className="w-full sm:w-2/3">
          <div className="flex items-center justify-between gap-2">
            <span className="border p-2">{FormatPrice(jobUtils.details.min_salary)}</span>
            <span>to</span>
            <span className="border p-2">{FormatPrice(jobUtils.details.max_salary)}</span>
          </div>
          <RangeSlider
            min={0}
            max={100000}
            step={500}
            defaultValue={[
              jobUtils.details.min_salary,
              jobUtils.details.max_salary,
            ]}
            onInput={(range) =>
              jobUtils.setDetails({
                ...jobUtils.details,
                min_salary: range[0],
                max_salary: range[1],
              })
            }
          />
        </div>
      </div>

      <button
        onClick={() => setCurrentStep(data[1])}
        className="self-end mt-4 px-6 py-2 text-white bg-primaryColor font-semibold"
      >
        Next Step
      </button>
    </div>
  );
}

export default BasicInformation;
