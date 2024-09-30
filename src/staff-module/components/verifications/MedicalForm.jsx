import { useForm } from "react-hook-form";
import FormButton from "../../../components/FormButton";
import { useState } from "react";
import { FaRegFileLines } from "react-icons/fa6";

const formFields = ["hospital_name", "contact_detail"];

function MedicalForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    message: "",
    error: "",
  });

  const [medicalFiles, setMedicalFiles] = useState([]);

  const getMedicalRecords = (e) => {
    const { name } = e.target;
    const file = e.target.files[0]; //filelist is an object carrying all details of file, .files[0] collects the value from key 0 (not array), and stores it in file

    if (
      file &&
      [
        "image/jpeg",
        "image/png",
        "application/pdf",
        "application/msword",
      ].includes(file.type)
    ) {
      // You can also perform additional actions with the valid file
      const generatedUrl = URL.createObjectURL(file);
      const list = [...medicalFiles,  {file: file} ];
    
      // const files = list.map((current) => current.file);
      setMedicalFiles(list);
    } else {
      // Handle invalid file type
      alert("Please select a valid JPEG or PNG file.");
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold">Medical Reports</h1>

      <form
        onSubmit={handleSubmit()}
        className="grid grid-cols-2 gap-x-3 gap-y-5 p-2 w-full text-gray-600"
      >
        {formFields.map((currentKey) => {
          const detail = formFields[currentKey];
          const labelText = currentKey.replace(/_/g, " ").toUpperCase();

          const inputType = currentKey == "member_since" ? "date" : "text";
          return (
            <div className="flex flex-col gap-1">
              <label>{labelText}</label>
              <input
                className="p-1 border focus:outline-none border-gray-900  rounded-md"
                type={inputType}
                defaultValue={detail}
                {...register(currentKey)}
              />
            </div>
          );
        })}
        <div className="flex flex-col gap-1">
          <label>Add File</label>
          <input
            className="p-1 border focus:outline-none border-gray-900  rounded-md"
            type="file"
            accept=".pdf, .doc, .jpeg, .jpg"
            onChange={getMedicalRecords}
          />
        </div>

        <div></div>
        <div className="h-[150px] grid grid-cols-5 border border-dashed p-3">
          {medicalFiles?.map((current) => (
            <div className="p-1">
              <FaRegFileLines className="text-3xl" />
              <span className="truncate block ">{current?.file?.name}</span>
            </div>
          ))}
        </div>
        <div></div>
        <FormButton loading={loading}>Upload Medical Details</FormButton>
      </form>
    </div>
  );
}

export default MedicalForm;
