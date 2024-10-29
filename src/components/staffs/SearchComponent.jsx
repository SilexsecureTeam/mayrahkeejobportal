import { useForm } from "react-hook-form";
import FormButton from "../FormButton";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { useState } from "react";

function SearchComponent({ subCategories, handleQuerySubmit }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [byCategory, setByCategory] = useState(false);
  const [byReligion, setByReligion] = useState(false);
  const [byEducationalLevel, setByEducationalLevel] = useState(false);
  const [byAge, setByAge] = useState(false);
  const [byMaritalStatus, setByMaritalStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  const toogleCategory = () => setByCategory(!byCategory);
  const toogleReligion = () => setByReligion(!byReligion);
  const toogleAge = () => setByAge(!byAge);
  const toogleMaritalStatus = () => setByMaritalStatus(!byMaritalStatus);
  const toogleEducationalLevel = () =>
    setByEducationalLevel(!byEducationalLevel);

  const handleSearch = async () => {
    let queryParams = "";
    handleSubmit((data, event) => console.log("submitted", data));
    console.log("submitted");
    // handleQuerySubmit(queryParams);
  };

  return (
    <div className="w-full p-4 bg-[#AFB6AE1A] h-fit flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <span className="text-sm md:text-md font-semibold">
          Select the queries you will want to search by
        </span>
        <div className="flex flex-wrap items-stretch justify-start gap-3 border-b pb-2 text-gray-700 w-full mt-2">
          <div className="flex items-center gap-2 text-sm md:text-xl leading-none">
            {byCategory ? (
              <MdCheckBox className="cursor-pointer flex-shrink-0" onClick={toogleCategory} />
            ) : (
              <MdCheckBoxOutlineBlank
                className="cursor-pointer flex-shrink-0"
                onClick={toogleCategory}
              />
            )}
            Category
          </div>

          <div className="flex items-center gap-2 text-sm md:text-xl leading-none">
            {byEducationalLevel ? (
              <MdCheckBox
                className="cursor-pointer flex-shrink-0"
                onClick={toogleEducationalLevel}
              />
            ) : (
              <MdCheckBoxOutlineBlank
                className="cursor-pointer flex-shrink-0"
                onClick={toogleEducationalLevel}
              />
            )}
            Education Level
          </div>

          <div className="flex items-center gap-2 text-sm md:text-xl leading-none">
            {byAge ? (
              <MdCheckBox className="cursor-pointer flex-shrink-0" onClick={toogleAge} />
            ) : (
              <MdCheckBoxOutlineBlank
                className="cursor-pointer flex-shrink-0"
                onClick={toogleAge}
              />
            )}
            Age Range
          </div>
          <div className="flex items-center gap-2 text-sm md:text-xl leading-none">
            {byReligion ? (
              <MdCheckBox className="cursor-pointer flex-shrink-0" onClick={toogleReligion} />
            ) : (
              <MdCheckBoxOutlineBlank
                className="cursor-pointer flex-shrink-0"
                onClick={toogleReligion}
              />
            )}
            Religion
          </div>

          <div className="flex items-center gap-2 text-sm md:text-xl leading-none">
            {byMaritalStatus ? (
              <MdCheckBox
                className="cursor-pointer flex-shrink-0"
                onClick={toogleMaritalStatus}
              />
            ) : (
              <MdCheckBoxOutlineBlank
                className="cursor-pointer flex-shrink-0"
                onClick={toogleMaritalStatus}
              />
            )}
            Marital Status
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-2 text-gray-500 gap-x-3 gap-y-5">
        {byCategory && (
          <div className="flex flex-col">
            <label>Select Category</label>
            <select
              className="p-1 border focus:outline-none border-gray-900  rounded-md"
              {...register("subcategory")}
            >
              <option>-- Select Subcategory --</option>
              {subCategories?.map((current) => (
                <option>{current.name}</option>
              ))}
            </select>
          </div>
        )}
        {byEducationalLevel && (
          <div className="flex flex-col truncate">
            <label>Select Education Level</label>
            <select
              className="p-1 border focus:outline-none border-gray-900  rounded-md"
              {...register("education")}
            >
              <option>-- Select Education Level--</option>
              {[
                "Primary School Certificate",
                "Secondary School Certificate",
                "Diploma",
                "Degree",
                "None",
              ].map((current) => (
                <option>{current}</option>
              ))}
            </select>
          </div>
        )}

        {byAge && (
          <div className="flex flex-col">
            <label>Age Range</label>
            <select
              className="p-1 border focus:outline-none border-gray-900  rounded-md"
              {...register("age")}
            >
              <option>-- Select Age Range--</option>
              {["18 - 25", "26 - 30", "31 - 35", "36 - 40", "41 & Above"].map(
                (current) => (
                  <option>{current}</option>
                )
              )}
            </select>
          </div>
        )}

        {byReligion && (
          <div className="flex flex-col">
            <label>Select Religion</label>
            <select
              className="p-1 border focus:outline-none border-gray-900  rounded-md"
              {...register("religion")}
            >
              <option>-- Select Religion --</option>
              {["Christian", "Muslim", "Others"].map((current) => (
                <option>{current}</option>
              ))}
            </select>
          </div>
        )}

        {byMaritalStatus && (
          <div className="flex flex-col">
            <label>Select Marital Status</label>
            <select
              className="p-1 border focus:outline-none border-gray-900  rounded-md"
              {...register("marital_status")}
            >
              <option>-- Select Marital Status --</option>
              {["Single", "Married", "Divorced", "Widowed"].map((current) => (
                <option>{current}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {!byCategory &&
      !byEducationalLevel &&
      !byReligion &&
      !byAge &&
      !byMaritalStatus ? (
        <div className="w-full text-center text-red-300">
          Please select atleast one query method
        </div>
      ) : (
        <div className="w-[50%]">
          <FormButton
            onClick={handleSubmit(async (data, event) => {
              setLoading(true);
              console.log(data);
              let queryParams = "";
              if (data.age) {
                queryParams += `age=${data.age}&`;
              }
              if (data.education) {
                queryParams += `education_level=${data.education}&`;
              }
              if (data.marital_status) {
                queryParams += `marital_status=${data.marital_status}&`;
              }
              if (data.subcategory) {
                queryParams += `subcategory=${data.subcategory}&`;
              }
              if (data.religion) {
                queryParams += `religion=${data.religion}`;
              }

              reset({
                age: "",
                education: "",
                marital_status: "",
                subcategory: "",
                religion: "",
              });
              await handleQuerySubmit(
                queryParams,
                data.subcategory ? true : false
              );
              setLoading(false);
            })}
            loading={loading}
          >
            Start Search
          </FormButton>
        </div>
      )}
    </div>
  );
}

export default SearchComponent;
