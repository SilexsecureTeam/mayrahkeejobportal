import JobTypeItem from "./JobTypeItem";
import RangeSlider from "react-range-slider-input";
import "../style.css";
import { useState } from "react";
import { FormatPrice } from "../../../utils/formmaters";

function BasicInformation({setCurrentStep, data}) {
  const [salaryRange, setSalaryRange] = useState([5000, 22000]);

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

      {/* Job Title */}
      <div className="flex gap-[30px] border-b py-2 ">
        <div className="flex flex-col max-w-[25%] gap-[10px]">
          <h3 className="text-gray-700 text-sm font-semibold">Job Title</h3>
          <span className="text-little text-gray-400">
            Job titles must be described one position
          </span>
        </div>

        <div className="flex flex-col gap-[3px] ">
          <input
            className="border py-1 px-2 text-sm"
            placeholder="e.g software engineer"
          />

          <span className="text-[10px] text-gray-400">
            At least 80 characters
          </span>
        </div>
      </div>

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
          {["Full Time", "Part Time", "Remote", "Internship", "Contract"].map(
            (current, index) => (
              <JobTypeItem data={current} key={index} />
            )
          )}
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
            <span className="border p-1 ">{FormatPrice(salaryRange[0])}</span>
            <span>to</span>
            <span className="border p-1 ">{FormatPrice(salaryRange[1])}</span>
          </div>

          <RangeSlider
            min={0}
            max={100000}
            step={500}
            defaultValue={salaryRange}
            onInput={(range) => setSalaryRange(range)}
          />
        </div>
      </div>


       {/* Categories */}
       <div className="flex gap-[30px] border-b py-2 ">
        <div className="flex flex-col gap-[10px] min-w-[25%]">
          <h3 className="text-gray-700 text-sm font-semibold">
            Categories
          </h3>
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
       <div className="flex gap-[30px] border-b py-2 ">
        <div className="flex flex-col max-w-[25%] gap-[10px]">
          <h3 className="text-gray-700 text-sm font-semibold">Required Skill</h3>
          <span className="text-little text-gray-400">
            Add required skills for the job
          </span>
        </div>

        <div className="flex flex-col gap-[10px] ">
          <button className="border py-[3px] px-1 w-fit text-little border-primaryColor text-primaryColor">
            Add Skill
          </button>

          <ul className="text-[10px] flex text-gray-400">
            <li className="border py-[3px] px-1 text-little text-white bg-primaryColor/40">Graphics design</li>
            <li className="border py-[3px] px-1 text-little text-white bg-primaryColor/40">Ui/UX design</li>
            <li className="border py-[3px] px-1 text-little text-white bg-primaryColor/40">Programming</li>
          </ul>
        </div>
      </div>

       <button onClick={() => setCurrentStep(data[1])} className="p-2 place-self-end mt-[10px] font-semibold w-fit text-little bg-primaryColor text-white">Next Step</button>

    </div>
  );
}

export default BasicInformation;
