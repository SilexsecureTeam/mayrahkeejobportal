import { useEffect, useState } from "react";
import BasicJobInput from "./BasicJobInput";
import DescriptionItem from "./DescriptionItem";
import SelectorInput from "./SelectorInput";
import FormButton from "../../../components/FormButton";
import {
  stageTwoBasicInputs,
  careerData,
  descriptions,
} from "../../../utils/formFields";

function Descriptions({
  data,
  setCurrentStep,
  jobUtils,
  handleSuccess,
  exclusive,
  editJob,
}) {
  const [selectedCareerLevel, setSelectedCareerLevel] = useState(
    jobUtils.details.career_level
      ? careerData.find((one) => one.name === jobUtils.details.career_level)
      : careerData[1]
  );

  useEffect(() => {
    jobUtils.setDetails({
      ...jobUtils.details,
      ["career_level"]: selectedCareerLevel?.name,
    });
  }, [selectedCareerLevel]);

  return (
    <div className="flex w-full flex-col p-2">
      {/* Descriptions */}
      <div className="flex flex-col gap-[15px] border-b pb-2">
        <h3 className="text-gray-700 text-sm font-semibold">Details</h3>
        <span className="text-little text-gray-600">
          Add the description of the job, responsibilities, who you are, and
          nice-to-haves.{" "}
        </span>
      </div>

      {/* Basic Inputs */}
      {stageTwoBasicInputs.map((current) => (
        <BasicJobInput
          key={current.id}
          data={current}
          jobUtils={jobUtils}
          disabled={current?.name === "job_title" && editJob}
        />
      ))}

      {/* Job Description */}
      <>
        {descriptions.map((current, index) => (
          <DescriptionItem key={index} data={current} jobUtils={jobUtils} />
        ))}
      </>

      {/*  */}
      <SelectorInput
        key={1}
        data={{
          label: "Career Level",
          prompt: "Here you select prefered career level",
          name: "career_level",
          required: true,
        }}
        listData={careerData}
        jobUtils={jobUtils}
        selected={selectedCareerLevel}
        setSelected={setSelectedCareerLevel}
      />

      <div className="w-full flex  mt-[10px] justify-between">
        <button
          onClick={() => setCurrentStep(data[0])}
          className="p-2 place-self-end  font-semibold w-fit text-little bg-primaryColor text-white"
        >
          Previous Step
        </button>

        <FormButton
          width="w-[100px]"
          height="h-fit p-2"
          onClick={() => {
            if (exclusive?.id) {
              console.log("Exclusive");
              jobUtils.addJobForExclusive(() => {
                handleSuccess();
              }, exclusive.id);
            } else {
              console.log("Normal");
              if (editJob) {
                jobUtils.editCurrentJob(() => {
                  handleSuccess();
                });
              } else {
                jobUtils.addJob(() => {
                  handleSuccess();
                });
              }
            }
          }}
          loading={jobUtils.loading}
        >
          {editJob ? "Edit Job" : "Add Job"}
        </FormButton>
      </div>
    </div>
  );
}

export default Descriptions;
