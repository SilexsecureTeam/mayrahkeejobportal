import {
    MdAddCircle,
    MdCheckBox,
    MdCheckBoxOutlineBlank
} from 'react-icons/md'
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { axiosClient } from "../../../services/axios-client";
import { Country, State } from 'country-state-city'
const PROFILE_DETAILS_KEY = "Staff Profile Detaials Database";
import { ethnicGroups } from "../../../utils/constants";
import { options } from "less";
import { onSuccess } from "../../../utils/notifications/OnSuccess";
import { onFailure } from "../../../utils/notifications/OnFailure";
import { AuthContext } from "../../../context/AuthContex";
import { ImUpload2 } from "react-icons/im";
import FormButton from "../../../components/FormButton";
import { extractErrorMessage } from '../../../utils/formmaters';
import { StaffManagementContext } from "../../../context/StaffManagementModule";

export default function FormData({ setToMain, toogleIsOpen, field_sections }) {
    const { authDetails } = useContext(AuthContext);
    const { profileDetails, getStaffProfile } = useContext(
        StaffManagementContext
      );
    // Initialize selectedLanguages with an empty array if languages_spoken is undefined
    const [selectedLanguages, setSelectedLanguages] = useState(
        profileDetails?.languages_spoken || []
    );

    const client = axiosClient(authDetails?.token, true);
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

    const [file, setFile] = useState();
    const [imageUrl, setImageUrl] = useState();

    const onSubmit = async (data) => {

        if (!file && profileDetails?.profile_image == null) {
            onFailure({
                error: "Profile Image Required",
                message: "Please upload a profile image before submitting.",
            });
            return
        }
        setLoading(true);
        // Filter out placeholder values from select fields
        const filteredData = Object.fromEntries(
            Object.entries(data).filter(
                ([key, value]) => value && value !== `-- Select ${key} --`
            )
        );

        try {
            const response = await client.post(
                `/domesticStaff/update-profile/${authDetails.user.id}`,
                {
                    ...filteredData,
                    languages_spoken: selectedLanguages,
                    profile_image: file,
                    job_type: "something",
                }
            );
            getStaffProfile();
            onSuccess({
                message: "Profile Success",
                success: "Profile Info updated successfully",
            });
            setToMain();
        } catch (err) {
            console.log(err)
            onFailure({
                error: "Failed to update",
                message: extractErrorMessage(err) || "Something went wrong",
            });
            setLoading(false);
        }

    };


    const filterProfileDetails = profileDetails
        ? Object.keys(profileDetails)?.filter(
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
        )
        : [];


    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];

        if (imageFile) {
            // Validate file type
            const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
            if (!allowedTypes.includes(imageFile.type)) {
                onFailure({
                    error: "File Type Error",
                    message: "Only JPG and PNG images are allowed.",
                });
                return;
            }

            // Validate file size (should not exceed 1MB)
            if (imageFile.size > 1024 * 1024) { // 1MB limit
                alert("File size should not exceed 1MB.");
                onFailure({
                    error: "File Size Error",
                    message: "File size should not exceed 1MB.",
                });
                return;
            }

            setFile(imageFile);
            const url = URL.createObjectURL(imageFile);
            console.log("url", url);
            setImageUrl(url);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-x-3 gap-y-5 p-2 w-full text-gray-600"
        >
            {filterProfileDetails ? (
                <>
                    <div className="flex flex-col gap-5 border-b pb-4">
                        <h3 className="font-semibold text-lg">Primary Information</h3>
                        <div className="h-[100px] flex items-center overflow-hidden justify-center text-gray-500 border border-[#dee2e6] w-[100px] rounded-full">
                            {imageUrl ? (
                                <>
                                    <label
                                        htmlFor="profile-image"
                                        className="flex flex-col cursor-pointer items-center justify-center"
                                    >
                                        <span className="text-[12px]">Upload pic</span>
                                        <img src={imageUrl} className="h-full " />
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/jpeg, image/png, image/jpg"
                                        id="profile-image"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />

                                </>
                            ) : (
                                <div>
                                    {" "}
                                    <label
                                        htmlFor="profile-image"
                                        className="flex flex-col cursor-pointer items-center justify-center"
                                    >
                                        <ImUpload2 size={20} />
                                        <span className="text-[12px]">Upload pic</span>
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/jpeg, image/png, image/jpg"
                                        id="profile-image"
                                        onChange={(e) => handleImageChange(e)}
                                        className="hidden"
                                    />
                                </div>
                            )}
                        </div>
                        <small className="-mt-4 text-xs text-gray-500">
                            File size should not exceed 1MB. </small>
                        <div className="grid grid-cols-2 gap-x-3 gap-y-5">
                            {field_sections.primary?.map((currentKey) => {
                                const detail = profileDetails[currentKey.field_name];
                                // const labelText = currentKey.replace(/_/g, " ").toUpperCase();

                                const inputType =
                                    currentKey == "member_since" ? "date" : currentKey?.type;
                                return (
                                    <div className="flex flex-col gap-1">
                                        <label>
                                            {currentKey.name}
                                            <span className="text-red-500 ml-1 ">*</span>
                                        </label>
                                        {currentKey.type !== "select" ? (
                                            <input
                                                required
                                                className="p-1 border focus:outline-none border-gray-900  rounded-md"
                                                type={inputType}
                                                defaultValue={detail}
                                                {...register(currentKey.field_name)}
                                            />
                                        ) : (
                                            <select
                                                required
                                                className="p-1 border focus:outline-none border-gray-900  rounded-md"
                                                type={inputType}
                                                defaultValue={detail}
                                                {...register(currentKey.field_name)}
                                            >
                                                <option disabled value="">
                                                    -- Select {currentKey.name} --
                                                </option>
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
                            {field_sections.professional.map((currentKey, index) => {
                                const detail = profileDetails[currentKey.field_name];
                                const inputType =
                                    currentKey.field_name === "member_since"
                                        ? "date"
                                        : "text";
                                return (
                                    <div className="flex flex-col gap-1" key={index}>
                                        <label>
                                            {currentKey.name}
                                            <span className="text-red-500 ml-1">*</span>
                                        </label>
                                        {currentKey.type !== "select" ? (
                                            currentKey.type === "number" ? (
                                                <input
                                                    className="p-1 border focus:outline-none border-gray-900 rounded-md"
                                                    type="number"
                                                    defaultValue={detail}
                                                    {...register(currentKey.field_name)}
                                                />
                                            ) : (
                                                <input
                                                    className="p-1 border focus:outline-none border-gray-900 rounded-md"
                                                    type={inputType}
                                                    defaultValue={detail}
                                                    {...register(currentKey.field_name)}
                                                />
                                            )
                                        ) : (
                                            <select
                                                className="p-1 border focus:outline-none border-gray-900 rounded-md"
                                                defaultValue={detail}
                                                {...register(currentKey.field_name)}
                                            >
                                                <option disabled value="">
                                                    -- Select {currentKey.name} --
                                                </option>
                                                {currentKey.options &&
                                                    currentKey.options.map((current, optionIndex) => (
                                                        <option key={optionIndex} value={current}>
                                                            {current}
                                                        </option>
                                                    ))}
                                            </select>
                                        )}
                                    </div>
                                );
                            })}

                            <div className="flex flex-col gap-2 pl-2">
                                <label>
                                    Languages Spoken
                                    <span className="text-red-500 ml-1 ">*</span>
                                </label>
                                <div className="flex flex-col">
                                    <div className="flex flex-wrap w-full justify-start gap-3">
                                        {[
                                            "English",
                                            "Hausa",
                                            "Igbo",
                                            "Yoruba",
                                            "Pidgin",
                                            "Others",
                                        ].map((current) => {
                                            let index;
                                            const isSelected = selectedLanguages?.find(
                                                (currentSelected, i) => {
                                                    index = i;
                                                    return current == currentSelected;
                                                }
                                            );
                                            return (
                                                <div className="text-lg cursor-pointer flex items-center w-fit">
                                                    {isSelected && current !== "Others" ? (
                                                        <MdCheckBox
                                                            onClick={() => {
                                                                if (current !== "Others") {
                                                                    setSelectedLanguages((prev) => {
                                                                        const newList = [...prev];
                                                                        const filtered = newList.filter(
                                                                            (currentSelected) =>
                                                                                currentSelected != current
                                                                        );

                                                                        return filtered;
                                                                    });
                                                                }
                                                            }}
                                                        />
                                                    ) : !isSelected && current !== "Others" ? (
                                                        <MdCheckBoxOutlineBlank
                                                            onClick={() => {
                                                                if (current !== "Others") {
                                                                    setSelectedLanguages([
                                                                        ...selectedLanguages,
                                                                        current,
                                                                    ]);
                                                                }
                                                            }}
                                                        />
                                                    ) : (
                                                        <MdAddCircle onClick={toogleIsOpen} />
                                                    )}
                                                    <span>{current}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="flex flex-wrap w-full justify-start gap-3">
                                        {selectedLanguages
                                            .filter((current) => {
                                                const found = [
                                                    "English",
                                                    "Hausa",
                                                    "Igbo",
                                                    "Yoruba",
                                                    "Pidgin",
                                                    "Others",
                                                ].find((currentOne) => currentOne === current);

                                                if (found) {
                                                    return false;
                                                } else {
                                                    return true;
                                                }
                                            })
                                            .map((current, idx) => {
                                                let index;
                                                const isSelected = selectedLanguages?.find(
                                                    (currentSelected, i) => {
                                                        index = i;
                                                        return current == currentSelected;
                                                    }
                                                );
                                                return (
                                                    <div
                                                        key={idx}
                                                        className="text-lg cursor-pointer flex items-center w-fit"
                                                    >
                                                        <MdCheckBox
                                                            onClick={() => {
                                                                if (current !== "Others") {
                                                                    setSelectedLanguages((prev) => {
                                                                        const newList = [...prev];
                                                                        const filtered = newList.filter(
                                                                            (currentSelected) =>
                                                                                currentSelected != current
                                                                        );

                                                                        return filtered;
                                                                    });
                                                                }
                                                            }}
                                                        />

                                                        <span>{current}</span>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 border-b pb-4">
                        <h3 className="font-semibold text-lg">Secondary Information</h3>
                        <div className="grid grid-cols-2 gap-x-3 gap-y-5">
                            {field_sections.secondary.map((currentKey, index) => {
                                const detail = profileDetails[currentKey.field_name];
                                // const labelText = currentKey.replace(/_/g, " ").toUpperCase();

                                return (
                                    <div key={index} className="flex flex-col gap-1">
                                        <label>
                                            {currentKey.name}
                                            <span className="text-red-500 ml-1 ">*</span>
                                        </label>
                                        {currentKey.type !== "select" ? (
                                            <input
                                                className="p-1 border focus:outline-none border-gray-900  rounded-md"
                                                type={currentKey.type}
                                                defaultValue={detail}
                                                {...register(currentKey.field_name)}
                                            />
                                        ) : (
                                            <select
                                                className="p-1 border focus:outline-none border-gray-900  rounded-md"
                                                defaultValue={detail}
                                                {...register(currentKey.field_name)}
                                            >
                                                <option disabled value="">
                                                    -- Select {currentKey.name} --
                                                </option>
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
    )
}