import JobTypeItem from "./JobTypeItem";
import RangeSlider from "react-range-slider-input";
import "../style.css";
import { useEffect, useState } from "react";
import { FormatPrice } from "../../../utils/formmaters";
import BasicJobInput from "./BasicJobInput";
import QualificationsForm from "./QualificationsForm";
import SelectorInput from "./SelectorInput";
import useJobManagement from "../../../hooks/useJobManagement";
import { Country, State } from "country-state-city";
import { resourceUrl } from "../../../services/axios-client";
import { toast } from "react-toastify";
import {
  stageOneBasicInputs,
  genderData,
  salaryTypeData,
} from "../../../utils/formFields";
import { useLocationService } from "../../../services/locationService";

function BasicInformation({ jobUtils, validateAndProceed, editJob }) {
  const { getEmployentTypes, getCurrencies, getSectors, getSubSectors } =
    useJobManagement();
  const { getStates } = useLocationService();

  const [states, setStates] = useState([]);
  const [jobSectorList, setJobSectorList] = useState([]);
  const [selectedType, setSelectedType] = useState(
    jobUtils?.details?.type && jobUtils?.details?.type
  );
  const [currentQualification, setCurrentQualification] = useState("");
  const [selectedGender, setSelectedGender] = useState(
    jobUtils?.details?.salary_type &&
      genderData?.find(
        (one) =>
          one.name?.toLowerCase() === jobUtils?.details?.gender?.toLowerCase()
      )
  );
  const [selectedSector, setSelectedSector] = useState();
  const [subSectorList, setSubSectorList] = useState(null);
  const [selectedSubSector, setSelectedSubSector] = useState(null);
  const [selectedSalary, setSelectedSalary] = useState(
    jobUtils?.details?.salary_type
      ? salaryTypeData?.find(
          (one) => one.name === jobUtils?.details?.salary_type
        )
      : salaryTypeData[1]
  );
  const [photoUrl, setPhotoUrl] = useState();
  const [minimumPrice, setMinimumPrice] = useState(0);
  const [employmentList, setEmploymentList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState();
  const [selectedLocation, setSelectedLocation] = useState();

  const toogleSelectedType = (selected) => {
    setSelectedType(selected);
    jobUtils.setDetails((prevDetails) => ({
      ...prevDetails,
      type: selected.name,
    }));
  };

  const getPhotoURL = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    if (file && file.size > 1 * 1024 * 1024) {
      toast.error("File size exceeds the file size limit of 1MB.");
      e.target.value = null;
      return;
    }
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const generatedUrl = URL.createObjectURL(file);
      setPhotoUrl(generatedUrl);
      jobUtils.setDetails((prevDetails) => ({
        ...prevDetails,
        [name]: file,
      }));
    } else {
      alert("Please select a valid JPEG or PNG file.");
    }
  };

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await getStates(true); // optional: pass true for full data
        setStates(response.data || []);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };

    fetchStates();
  }, []);

  useEffect(() => {
    const initData = async () => {
      const employmentListResult = await getEmployentTypes();
      const currencyResult = await getCurrencies();
      const sectors = await getSectors();
      setJobSectorList(
        sectors?.sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        )
      );
      setEmploymentList(employmentListResult);
      const currencyWithCountry = currencyResult?.map((item) => {
        const country = Country.getAllCountries().find((c) =>
          item.name?.startsWith(c.isoCode)
        );
        return {
          ...item,
          name: `${item?.name} ${country ? `(${country?.name})` : ""}`,
        };
      });
      setCurrencyList(currencyWithCountry);
      if (employmentListResult.length > 0) {
        setSelectedType(
          jobUtils.details?.type &&
            employmentListResult?.find(
              (one) => one?.name === jobUtils?.details?.type
            )
        );
      }
    };
    initData();
  }, []);

  useEffect(() => {
    let savedPhoto = null;
    if (savedPhoto === null && jobUtils.details?.featured_image) {
      // Check if the featured image is a Blob/File
      if (
        jobUtils.details?.featured_image instanceof Blob ||
        jobUtils.details?.featured_image instanceof File
      ) {
        savedPhoto = URL.createObjectURL(jobUtils.details?.featured_image);
      } else {
        // If it's not a Blob/File, assume it's already a URL
        savedPhoto = `${resourceUrl}${jobUtils.details?.featured_image}`;
      }
      setPhotoUrl(savedPhoto);
    }
    return () => {
      if (savedPhoto) {
        URL.revokeObjectURL(savedPhoto);
      }
    };
  }, [jobUtils.details?.featured_image]);

  useEffect(() => {
    if (jobUtils?.details?.location) {
      setSelectedLocation(
        states?.find((one) => one.name === jobUtils?.details.location)
      );
    }
  }, [jobUtils?.details?.location]);

  useEffect(() => {
    setSelectedType(
      jobUtils.details?.type &&
        employmentList?.find((one) => one?.name === jobUtils?.details?.type)
    );
  }, [employmentList]);

  useEffect(() => {
    setSelectedCurrency(
      jobUtils.details?.currency
        ? currencyList?.find((one) => one?.name === jobUtils?.details?.currency)
        : null
    );
  }, [currencyList]);
  useEffect(() => {
    if (jobSectorList && jobUtils?.details?.sector) {
      const sector = jobUtils?.details?.sector
        ? jobSectorList?.find((one) => one?.name === jobUtils?.details?.sector)
        : null;

      setSelectedSector(sector);
      // Set subsectors list based on the selected sector
      setSubSectorList(
        sector?.subsections?.sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        ) || []
      );
      // Find the selected subsector or default to the first one in the subsector list
      const subsector = jobUtils?.details?.subsector
        ? sector?.sub_sectors?.find(
            (one) => one?.name === jobUtils?.details?.subsector
          )
        : [];
      setSelectedSubSector(subsector);
    }
  }, [jobSectorList, jobUtils?.details?.sector]);

  useEffect(() => {
    if (selectedSector) {
      setSubSectorList(
        selectedSector?.sub_sectors?.sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        ) || []
      );
      const matchingSubsector = selectedSector?.sub_sectors?.find(
        (one) => one?.name === jobUtils?.details?.subsector
      );
      setSelectedSubSector(matchingSubsector);
    }
  }, [selectedSector]);

  useEffect(() => {
    if (selectedSubSector) {
      jobUtils.setDetails((prevDetails) => ({
        ...prevDetails,
        subsector: selectedSubSector?.name,
      }));
    }
  }, [selectedSubSector]);

  useEffect(() => {
    jobUtils.setDetails((prevDetails) => ({
      ...prevDetails,
      gender: selectedGender?.name || prevDetails.gender,
      salary_type: selectedSalary?.name || prevDetails.salary_type,
      currency: selectedCurrency?.name || prevDetails.currency,
      sector: selectedSector?.name || prevDetails.sector,
      subsector: selectedSubSector?.name || prevDetails.subsector,
      location: selectedLocation?.name || prevDetails.location,
    }));
  }, [
    selectedCurrency,
    selectedGender,
    selectedSalary,
    selectedSector,
    selectedSubSector,
    selectedLocation,
  ]);

  // Validation function before proceeding to the next step
  const handleValidateAndProceed = () => {
    // Add your validation logic here
    const isValid = validateForm();
    if (isValid) {
      validateAndProceed();
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const validateForm = () => {
    // Check if essential fields are filled. Modify as necessary.
    if (!selectedSector || !selectedSubSector || !selectedSalary) {
      return false;
    }
    return true;
  };

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
          <h3 className="text-gray-700 text-sm font-semibold flex gap-1">
            Featured Image <strong className="text-red-500">*</strong>
          </h3>
          {/* <span className="text-xs text-gray-400">
            Here you upload image for job
          </span> */}
        </div>

        <div className="flex flex-col gap-2 items-center">
          {!editJob && (
            <label
              htmlFor="photo_url"
              className="text-sm text-primaryColor hover:underline cursor-pointer"
            >
              Upload
            </label>
          )}
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
              accept=".png, .jpg, .jpeg"
              name="featured_image"
              type="file"
              className="hidden"
            />
          </div>
          {!editJob && (
            <small class="text-xs text-gray-400 max-w-40 text-center">
              File size should not exceed 1MB. Only *.jpeg, .png, .jpg* are
              allowed.
            </small>
          )}
        </div>
      </div>
      <SelectorInput
        data={{
          label: "Sector",
          prompt: "Here you input the job sector",
          name: "sector",
        }}
        listData={jobSectorList}
        jobUtils={jobUtils}
        selected={selectedSector}
        setSelected={(sector) => {
          setSelectedSector(sector);
          // Update job details only for the sector
          jobUtils.setDetails((prevDetails) => ({
            ...prevDetails,
            sector: sector?.name,
          }));
        }}
        disabled={editJob}
      />

      <SelectorInput
        data={{
          label: "Sub-Sector",
          prompt: "Here you select subsector based on the job sector",
          name: "subsector",
          required: true,
        }}
        listData={subSectorList}
        jobUtils={jobUtils}
        selected={selectedSubSector}
        setSelected={(subsector) => {
          setSelectedSubSector(subsector);
          // Update job details only for the subsector
          jobUtils.setDetails((prevDetails) => ({
            ...prevDetails,
            subsector: subsector?.name,
          }));
        }}
        disabled={editJob}
      />

      {/* Basic Inputs */}
      {stageOneBasicInputs.map((current) => (
        <BasicJobInput
          key={current.id}
          data={current}
          jobUtils={jobUtils}
          disabled={current?.name === "application_deadline_date" && editJob}
        />
      ))}
      {/* Employment Types */}
      <div className="flex flex-col sm:flex-row gap-4 border-b py-4">
        <div className="flex flex-col gap-2 w-full sm:max-w-[25%]">
          <h3 className="text-gray-700 text-sm font-semibold flex gap-1">
            Type of Employment <strong className="text-red-500">*</strong>
          </h3>
          {/* <span className="text-xs text-gray-400">
            You can select multiple types of employment
          </span> */}
        </div>

        <div className="flex flex-col gap-2">
          {employmentList.map((current) => (
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
      <SelectorInput
        key={134}
        data={{
          label: "Location",
          prompt: "Here you select job location",
          name: "location",
          required: true,
        }}
        listData={states}
        jobUtils={jobUtils}
        selected={selectedLocation}
        setSelected={setSelectedLocation}
      />

      <QualificationsForm jobUtils={jobUtils} />

      {/* Dropdown Options */}
      <SelectorInput
        key={1}
        data={{
          label: "Gender",
          prompt: "Here you select preferred Gender",
          name: "gender",
          required: true,
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
          required: true,
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
          required: true,
        }}
        listData={currencyList}
        jobUtils={jobUtils}
        selected={selectedCurrency}
        setSelected={setSelectedCurrency}
      />
      {/* Salary */}
      <div className="flex flex-col sm:flex-row gap-4 border-b py-4">
        <div className="flex flex-col gap-2 sm:max-w-[25%] w-full">
          <h3 className="text-gray-700 text-sm font-semibold flex gap-1">
            Salary<strong className="text-red-500">*</strong>
          </h3>
          {/* <span className="text-xs text-gray-400">
            Please specify the estimated salary range for the role. *You can
            leave this blank.
          </span> */}
        </div>
        <div className="flex flex-col w-full sm:w-[50%] gap-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Min Value</label>
              <div className="p-1 border border-gray-400">
                <span className="mx-1">{selectedCurrency?.code}</span>
                <input
                  type="number"
                  min="0"
                  className="w-24 ring-0 outline-0"
                  value={jobUtils.details?.min_salary || ""}
                  onChange={(e) => {
                    jobUtils.setDetails({
                      ...jobUtils.details,
                      min_salary: e.target.value,
                    });
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
                  min="0"
                  value={jobUtils.details?.max_salary || ""}
                  onChange={(e) => {
                    jobUtils.setDetails({
                      ...jobUtils.details,
                      max_salary: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={validateAndProceed}
        className="p-2 place-self-end mt-4 font-semibold w-fit text-sm bg-primaryColor text-white"
      >
        Next Step
      </button>
    </div>
  );
}

export default BasicInformation;
