import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { axiosClient } from "../../../services/axios-client";
import { onSuccess } from "../../../utils/notifications/OnSuccess";
import { onFailure } from "../../../utils/notifications/OnFailure";
import { extractErrorMessage } from "../../../utils/formmaters";
import { AuthContext } from "../../../context/AuthContex";
import { StaffManagementContext } from "../../../context/StaffManagementModule";
import ProfileImageUpload from "./ProfileImageUpload";
import FieldSection from "./FieldSection";
import LanguagesSpokenSelector from "./LanguagesSpokenSelector";
import ArtisanIDSection from "./ArtisanIDSection";
import FormButton from "../../../components/FormButton";
import PopUpBox from "../../../components/PopUpBox";
import { MdClose } from "react-icons/md";

export default function ProfileFormData({
  setToMain = () => {},
  field_sections,
}) {
  const { authDetails } = useContext(AuthContext);
  const { profileDetails, getStaffProfile } = useContext(
    StaffManagementContext
  );
  const [selectedLanguages, setSelectedLanguages] = useState(
    profileDetails?.languages_spoken || []
  );
  const [isOpen, setIsOpen] = useState(false);
  const toogleIsOpen = () => setIsOpen(!isOpen);
  const [otherLanguage, setOtherLanguage] = useState("");

  const [file, setFile] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [loading, setLoading] = useState(false);
  const [idFile, setIdFile] = useState();

  const client = axiosClient(authDetails?.token, true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(imageFile.type)) {
        return onFailure({
          error: "Invalid Type",
          message: "Only JPG or PNG formats are allowed.",
        });
      }
      if (imageFile.size > 1024 * 1024) {
        return onFailure({
          error: "File too large",
          message: "Image must be under 1MB.",
        });
      }
      setFile(imageFile);
      setImageUrl(URL.createObjectURL(imageFile));
    }
  };

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    if (!file && !profileDetails?.profile_image) {
      return onFailure({
        error: "Missing Image",
        message: "Upload a profile image.",
      });
    }

    setLoading(true);

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
          id_upload: idFile,
        }
      );

      await getStaffProfile();
      onSuccess({
        message: "Profile updated",
        success: "Your profile has been updated.",
      });
      setToMain();
    } catch (err) {
      console.error("Submission Error:", err);
      onFailure({
        message: "Submission Error",
        error: extractErrorMessage(err) || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!profileDetails) return <span>Loading...</span>;

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-5 p-2 text-gray-600"
      >
        <ProfileImageUpload
          imageUrl={imageUrl}
          handleImageChange={handleImageChange}
        />

        <FieldSection
          title="Primary Information"
          fields={field_sections.primary}
          register={register}
          profileDetails={profileDetails}
        />
        {authDetails?.user?.staff_category === "artisan" && (
          <ArtisanIDSection register={register} setIdFile={setIdFile} />
        )}

        <FieldSection
          title="Professional Information"
          fields={field_sections.professional}
          register={register}
          profileDetails={profileDetails}
        />

        <LanguagesSpokenSelector
          selectedLanguages={selectedLanguages}
          setSelectedLanguages={setSelectedLanguages}
          toogleIsOpen={toogleIsOpen}
        />

        <FieldSection
          title="Secondary Information"
          fields={field_sections.secondary}
          register={register}
          profileDetails={profileDetails}
        />

        <FormButton loading={loading}>Update Profile</FormButton>
      </form>
      <PopUpBox isOpen={isOpen}>
        <div className="w-[300px] p-3 gap-3 rounded-lg  flex flex-col bg-white">
          <MdClose
            onClick={toogleIsOpen}
            className="place-self-end text-lg cursor-pointer"
          />
          <label className="text-sm font-semibold">Add Langauge</label>
          <input
            value={otherLanguage}
            onChange={(e) => setOtherLanguage(e.target.value)}
            className="p-2 border focus:outline-none"
            placeholder="Enter language..."
          />

          <FormButton
            onClick={() => {
              if (otherLanguage) {
                setSelectedLanguages([...selectedLanguages, otherLanguage]);
                toogleIsOpen();
              } else {
                onFailure({
                  error: "Input Error",
                  message: "Please enter a value",
                });
              }
              setOtherLanguage("za");
            }}
          >
            Add Language
          </FormButton>
        </div>
      </PopUpBox>
    </>
  );
}
