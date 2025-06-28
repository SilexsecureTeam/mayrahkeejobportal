import { useContext } from "react";
import FormData from "./FormData";
import { AuthContext } from "../../../context/AuthContex";
import { StaffManagementContext } from "../../../context/StaffManagementModule";
import { FaExclamationCircle } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { field_sections1, field_sections2 } from "../../../utils/constants";

const fields = [];

function ProfileForm({ setToMain }) {
  const { authDetails } = useContext(AuthContext);
  const userType = authDetails?.user?.staff_category;
  const { profileDetails } = useContext(StaffManagementContext);

  // Guard clause to prevent rendering before profileDetails is loaded
  if (!profileDetails) return null;

  return (
    <>
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

        <FormData
          setToMain={setToMain}
          field_sections={
            userType == "artisan" ? field_sections2 : field_sections1
          }
        />
      </div>
    </>
  );
}

export default ProfileForm;
