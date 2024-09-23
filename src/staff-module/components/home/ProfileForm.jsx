import { useForm } from "react-hook-form";
import { FormatPrice } from "../../../utils/formmaters";
import FormButton from "../../../components/FormButton";
import { useContext, useState } from "react";
import { axiosClient } from "../../../services/axios-client";
import { AuthContext } from "../../../context/AuthContex";
import { IoMdAddCircle } from "react-icons/io";

function ProfileForm() {
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails?.token);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    massage: "",
    error: "",
  });
  const [contactInformations, setContactInformations] = useState([]);
  const [workExperience, setWorkExperience] = useState([]);
  const [currentExperience, setCurrentExperience] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await client.post(
        `/domesticStaff/update-profile/${authDetails.user.id}`,
        { ...data, work_experience: workExperience }
      );
    } catch (error) {}
  };

  return (
    <div className="w-full flex flex-col gap-10">
      <h1 className="text-xl font-semibold">Update Your Profile</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-x-3 gap-y-5 p-2 w-full text-gray-600"
      >
        <div className="flex flex-col gap-1">
          <label>First Name</label>
          <input
            className="p-1 border focus:outline-none border-gray-900  rounded-md"
            type="text"
            defaultValue={"First Name"}
            {...register("first_name")}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>Middle Name</label>
          <input
            className="p-1 border focus:outline-none border-gray-900  rounded-md"
            type="text"
            defaultValue={"Middle Name"}
            {...register("middle_name")}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>Surname</label>
          <input
            className="p-1 border focus:outline-none border-gray-900  rounded-md"
            type="text"
            defaultValue={"Surname"}
            {...register("surname")}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>Email</label>
          <input
            className="p-1 border focus:outline-none border-gray-900  rounded-md"
            type="email"
            defaultValue={"Email"}
            {...register("email", { disabled: true })}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>Age</label>
          <input
            className="p-1 border focus:outline-none border-gray-900  rounded-md"
            type="text"
            defaultValue={"12"}
            {...register("age")}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>Location</label>
          <input
            className="p-1 border focus:outline-none border-gray-900  rounded-md"
            type="text"
            defaultValue={"location"}
            {...register("location")}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>Current Salary</label>
          <input
            className="p-1 border focus:outline-none border-gray-900  rounded-md"
            type="number"
            defaultValue={1000}
            {...register("current_salary")}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>Expected Salary</label>
          <input
            className="p-1 border focus:outline-none border-gray-900  rounded-md"
            type="text"
            defaultValue={"10000"}
            {...register("expected_salary")}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>Job Type</label>
          <input
            className="p-1 border focus:outline-none border-gray-900  rounded-md"
            type="text"
            defaultValue={"Something"}
            {...register("job_type")}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>Years if experience</label>
          <input
            className="p-1 border focus:outline-none border-gray-900  rounded-md"
            type="number"
            defaultValue={3}
            {...register("years_of_experience")}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>Education Level</label>
          <input
            className="p-1 border focus:outline-none border-gray-900  rounded-md"
            type="text"
            defaultValue={"PHD"}
            {...register("education_level")}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>Marital Status</label>
          <input
            className="p-1 border focus:outline-none border-gray-900  rounded-md"
            type="text"
            defaultValue={"Single"}
            {...register("marital_status")}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>Residential Address</label>
          <input
            className="p-1 border focus:outline-none border-gray-900  rounded-md"
            type="text"
            defaultValue={"Address"}
            {...register("residential_address")}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>Previous Salary</label>
          <input
            className="p-1 border focus:outline-none border-gray-900  rounded-md"
            type="number"
            defaultValue={2000}
            {...register("previous_salary")}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>Work Experience</label>
          <div className="w-full flex justify-between border p-1 border-gray-900  rounded-md">
            <input
              className="p-1  w-[70%] focus:outline-none "
              type="text"
              value={currentExperience}
              onChange={(e) => setCurrentExperience(e.target.value)}
              placeholder="Add experience"
            />
            <button
              onClick={() => {
                setWorkExperience([...workExperience, currentExperience]);
                setCurrentExperience("");
              }}
              className="flex items-center border-primaryColor rounded-md border px-2"
            >
              Add <IoMdAddCircle />
            </button>
          </div>
        </div>

        <div className="h-full flex gap-2 items-end justify-center">
          {workExperience.length > 0 ? (
            workExperience.map((current) => (
              <span className="text-sm font-semibold">{current}</span>
            ))
          ) : (
            <span>No experiences added</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label>Contact Information</label>

          <input
            className="p-1 border focus:outline-none border-gray-900  rounded-md"
            type="text"
            defaultValue={"contact"}
            {...register("contact_information")}
          />
        </div>
        <FormButton>Update Profile</FormButton>
      </form>
    </div>
  );
}

export default ProfileForm;
