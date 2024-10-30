import { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

function QualificationsForm({ jobUtils }) {
  const [currentQualification, setCurrentQualification] = useState("");

  const addQualification = () => {
    if (currentQualification) {
      const newList = [
        ...jobUtils.details.qualification,
        currentQualification,
      ];
      jobUtils.setDetails({ ...jobUtils.details, qualification: newList });
    }
    setCurrentQualification('');
  };

  const removeQualification = (index) => {
    const newList = [...jobUtils.details.qualification];
    newList.splice(index, 1);
    jobUtils.setDetails({ ...jobUtils.details, qualification: newList });
  };

  const qualificationList = jobUtils?.details?.qualification?.map((current, index) => (
    <li
      key={index}
      className="border py-1 flex justify-between items-center gap-2 px-2 text-little text-white bg-primaryColor/80"
    >
      {current}
      <IoIosCloseCircleOutline
        onClick={() => removeQualification(index)}
        className="text-lg cursor-pointer text-red-800"
      />
    </li>
  ));

  useEffect(() => console.log(jobUtils.details.qualification), [jobUtils.details.qualification]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 border-b py-2">
      <div className="flex flex-col max-w-[25%] w-full gap-2">
        <h3 className="text-gray-700 text-sm font-semibold">Required Qualifications</h3>
        <span className="text-little text-gray-400">
          Add required qualifications for the job
        </span>
      </div>

      <div className="flex flex-col gap-2 w-full sm:max-w-[70%]">
        <div className="flex gap-2">
          <input
            value={currentQualification}
            onChange={(e) => setCurrentQualification(e.target.value)}
            placeholder="e.g masters degree"
            className="flex-grow p-1 outline-none border text-little"
          />
          <button
            onClick={addQualification}
            className="border p-1 w-fit text-little hover:bg-primaryColor hover:text-white border-primaryColor text-primaryColor"
          >
            Add Qualification
          </button>
        </div>

        <ul className="text-[10px] text-gray-400">
          {qualificationList}
        </ul>
      </div>
    </div>
  );
}

export default QualificationsForm;
