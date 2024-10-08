import { useForm } from "react-hook-form";
import { FormatError, FormatPrice } from "../../../utils/formmaters";
import FormButton from "../../../components/FormButton";
import { useContext, useEffect, useState } from "react";
import { axiosClient } from "../../../services/axios-client";
import { AuthContext } from "../../../context/AuthContex";
import { StaffManagementContext } from "../../../context/StaffManagementModule";
import { onSuccess } from "../../../utils/notifications/OnSuccess";
import { FaExclamationCircle } from "react-icons/fa";
import { MdCheckBox, MdCheckBoxOutlineBlank, MdClose } from "react-icons/md";

const PROFILE_DETAILS_KEY = "Staff Profile Detaials Database";

const field_sections = {
  primary: [
    {
      name: "First Name",
      type: "text",
      field_name: "first_name",
    },
    {
      name: "Surname",
      type: "text",
      field_name: "surname",
    },
    {
      name: "Middlename",
      type: "text",
      field_name: "middle_name",
    },
    {
      name: "Email",
      type: "email",
      field_name: "email",
    },
    {
      name: "Age",
      type: "select",
      options: ["18 - 25", "26 - 30", "31 - 35", "36 - 40", "41 & Above"],
      field_name: "employment_type",
    },
    {
      name: "Religion",
      type: "select",
      options: ["Christian", "Muslim", "Others"],
      field_name: "religion",
    },
  ],

  professional: [
    {
      name: "Employment Type",
      type: "select",
      options: ["Live Out", "Live In"],
      field_name: "employment_type",
    },
    {
      name: "Work Type",
      type: "select",
      options: ["Live Out", "Live In"],
      field_name: "work_type",
    },
    {
      name: "Work Days",
      type: "select",
      options: [
        "1 Day",
        "2 Days",
        "3 Days",
        "4 Days",
        "5 Days",
        "6 Days",
        "7 Days",
      ],
      field_name: "work_days",
    },
    {
      name: "Rumuneration",
      type: "select",
      options: ["Daily Pay", "Weekly Pay", "Bi-Weekly Pay", "Monthly Pay"],
      field_name: "rumuneration",
    },
    {
      name: "Current Salary",
      type: "number",
      field_name: "current_salary",
    },
    {
      name: "Expected Salary",
      type: "number",
      field_name: "expected_salary",
    },
    {
      name: "Job Type",
      type: "text",
      field_name: "job_type",
    },
    {
      name: "Years Of Experience",
      type: "number",
      field_name: "years_of_experience",
    },

    {
      name: "Education Level",
      type: "select",
      options: [
        "Primary School Certificate",
        "Secondary School Certificate",
        "Diploma",
        "Degree",
        "None",
      ],
      field_name: "education_level",
    },
  ],
  secondary: [
    {
      name: "Marital Status",
      type: "select",
      options: ["Single", "Married", "Divorced", 'Widowed'],
      field_name: "marital_status",
    },
    {
      name: "Member Since",
      type: "date",
      field_name: "member_since",
    },
  ],
};

const fields = [];

function ProfileForm() {
  const { authDetails } = useContext(AuthContext);
  const { profileDetails, getStaffProfile } = useContext(
    StaffManagementContext
  );
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const client = axiosClient(authDetails?.token);
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

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await client.post(
        `/domesticStaff/update-profile/${authDetails.user.id}`,
        { ...data }
      );
      getStaffProfile();
      onSuccess({
        message: "Profile Success",
        success: "Profile Info updated succesfully",
      });
    } catch (error) {}
    setLoading(false);
  };

  const filterProfileDetails =
    profileDetails &&
    Object.keys(profileDetails).filter(
      (currentKey) =>
        currentKey !== "created_at" &&
        currentKey !== "updated_at" &&
        currentKey !== "id" &&
        currentKey !== "staff_category" &&
        currentKey !== "staff_category" &&
        currentKey !== "guarantor_verification_status" &&
        currentKey !== "residence_verification_status" &&
        currentKey !== "medical_history_verification_status" &&
        currentKey !== "police_report_verification_status" &&
        currentKey !== "previous_employer_verification_status" &&
        currentKey !== "family_verification_status" &&
        currentKey !== "contact_information" &&
        currentKey !== "subcategory" &&
        currentKey !== "resume" &&
        currentKey !== "availability_status" &&
        currentKey !== "employment_type"
    );

  return (
    <div className="w-full flex flex-col gap-2">
      <h1 className="text-xl font-semibold">Update Your Profile</h1>

      <div className="flex flex-col gap-2 bg-green-100 pr-5 p-2 w-fit">
        <div className="flex w-full justify-between items-center">
          <span className="flex gap-2 uppercase items-center text-green-700">
            Important Note <FaExclamationCircle />
          </span>

          <button className=" group hover:bg-red-500 hover:text-white p-1 text-red-600 text-md flex justify-between items-center ">
            Close
            <MdClose className="" />
          </button>
        </div>

        <p>
          All details below are required to be filled. Our algorithms
          automatically hides users who's profile have not been updated, this
          means you will go unnoticed with an incomplete profile
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-x-3 gap-y-5 p-2 w-full text-gray-600"
      >
        {filterProfileDetails ? (
          <>
            <div className="flex flex-col gap-5 border-b pb-4">
              <h3 className="font-semibold text-lg">Primary Information</h3>
              <div className="grid grid-cols-2 gap-x-3 gap-y-5">
                {field_sections.primary.map((currentKey) => {
                  const detail = profileDetails[currentKey.field_name];
                  // const labelText = currentKey.replace(/_/g, " ").toUpperCase();

                  const inputType =
                    currentKey == "member_since" ? "date" : "text";
                  return (
                    <div className="flex flex-col gap-1">
                      <label>{currentKey.name}</label>
                      {currentKey.type !== "select" ? (
                        <input
                          className="p-1 border focus:outline-none border-gray-900  rounded-md"
                          type={inputType}
                          defaultValue={detail}
                          {...register(currentKey.field_name)}
                        />
                      ) : (
                        <select
                          className="p-1 border focus:outline-none border-gray-900  rounded-md"
                          type={inputType}
                          defaultValue={detail}
                          {...register(currentKey.name)}
                        >
                          <option>-- Select {currentKey.name} --</option>
                          {currentKey.options.map((current) => (
                            <option>{current}</option>
                          ))}
                        </select>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-5 border-b pb-4">
              <h3 className="font-semibold text-lg">
                Professional Information
              </h3>
              <div className="grid grid-cols-2 gap-x-3 gap-y-5">
                {field_sections.professional.map((currentKey) => {
                  const detail = profileDetails[currentKey.field_name];
                  // const labelText = currentKey.replace(/_/g, " ").toUpperCase();

                  const inputType =
                    currentKey == "member_since" ? "date" : "text";
                  return (
                    <div className="flex flex-col gap-1">
                      <label>{currentKey.name}</label>
                      {currentKey.type !== "select" ? (
                        <input
                          className="p-1 border focus:outline-none border-gray-900  rounded-md"
                          type={inputType}
                          defaultValue={detail}
                          {...register(currentKey.field_name)}
                        />
                      ) : (
                        <select
                          className="p-1 border focus:outline-none border-gray-900  rounded-md"
                          type={inputType}
                          defaultValue={detail}
                          {...register(currentKey.name)}
                        >
                          <option>-- Select {currentKey.name} --</option>
                          {currentKey.options.map((current) => (
                            <option>{current}</option>
                          ))}
                        </select>
                      )}
                    </div>
                  );
                })}
                <div className="flex flex-col gap-2 pl-2">
                  <label>Languages Spoken</label>
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
                                      (currentSelected) =>
                                        currentSelected != current
                                    );

                                    return filtered;
                                  })
                                }
                              />
                            ) : (
                              <MdCheckBoxOutlineBlank
                                onClick={() =>
                                  setSelectedLanguages([
                                    ...selectedLanguages,
                                    current,
                                  ])
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
           
            </div>

            <div className="flex flex-col gap-5 border-b pb-4">
              <h3 className="font-semibold text-lg">Secondary Information</h3>
              <div className="grid grid-cols-2 gap-x-3 gap-y-5">
                {field_sections.secondary.map((currentKey) => {
                  const detail = profileDetails[currentKey.field_name];
                  // const labelText = currentKey.replace(/_/g, " ").toUpperCase();

                  const inputType =
                    currentKey == "member_since" ? "date" : "text";
                  return (
                    <div className="flex flex-col gap-1">
                      <label>{currentKey.name}</label>
                      {currentKey.type !== "select" ? (
                        <input
                          className="p-1 border focus:outline-none border-gray-900  rounded-md"
                          type={inputType}
                          defaultValue={detail}
                          {...register(currentKey.field_name)}
                        />
                      ) : (
                        <select
                          className="p-1 border focus:outline-none border-gray-900  rounded-md"
                          type={inputType}
                          defaultValue={detail}
                          {...register(currentKey.name)}
                        >
                          <option>-- Select {currentKey.name} --</option>
                          {currentKey.options.map((current) => (
                            <option>{current}</option>
                          ))}
                        </select>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <FormButton loading={loading}>Update Profile</FormButton>
          </>
        ) : (
          <span>Loading Data</span>
        )}
      </form>
    </div>
  );
}

export default ProfileForm;
