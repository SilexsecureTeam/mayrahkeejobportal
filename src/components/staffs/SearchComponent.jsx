import { useForm } from "react-hook-form";
import FormButton from "../FormButton";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { useState } from "react";

function SearchComponent({ subCategories }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  return (
    <div className="w-full p-4 bg-gray-50 h-fit flex flex-col gap-5">
      <div className="w-full grid grid-cols-2 text-gray-500 gap-x-3 gap-y-5">
        <div className="flex flex-col">
          <label>Select Category</label>
          <select
            className="p-1 border focus:outline-none border-gray-900  rounded-md"
            {...register("subcategory")}
          >
            <option>-- Select Subcategory --</option>
            {subCategories.map((current) => (
              <option>{current.name}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label>Select Education Level</label>
          <select
            className="p-1 border focus:outline-none border-gray-900  rounded-md"
            {...register("subcatagory")}
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

        <div className="flex flex-col">
          <label>Select Religion</label>
          <select
            className="p-1 border focus:outline-none border-gray-900  rounded-md"
            {...register("subcatagory")}
          >
            <option>-- Select Religion --</option>
            {["Christian", "Muslim", "Others"].map((current) => (
              <option>{current}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2 pl-2">
          <label>Select Languages Spoken</label>
          <div className="flex w-full justify-start gap-3">
            {["English", "Hausa", "Igbo", "Yoruba", "Pidgin", "Others"].map(
              (current) => {
                let index;
                const isSelected = selectedLanguages?.find(
                  (currentSelected, i) => {
                    index = i;
                    return current == currentSelected;
                  }
                );
                return (
                  <div className="text-lg cursor-pointer flex items-center w-fit">
                    {isSelected ? (
                      <MdCheckBox
                        onClick={() =>
                          setSelectedLanguages((prev) => {
                            const newList = [...prev];
                            const filtered = newList.filter(
                              (currentSelected) => currentSelected != current
                            );

                            return filtered;
                          })
                        }
                      />
                    ) : (
                      <MdCheckBoxOutlineBlank
                        onClick={() =>
                          setSelectedLanguages([...selectedLanguages, current])
                        }
                      />
                    )}
                    <span>{current}</span>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>

      <div className="w-[50%]">
        <FormButton loading={false}>Start Search</FormButton>
      </div>
    </div>
  );
}

export default SearchComponent;
