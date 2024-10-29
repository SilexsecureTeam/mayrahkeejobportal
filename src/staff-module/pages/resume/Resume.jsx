import { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { StaffManagementContext } from "../../../context/StaffManagementModule";
import FormButton from "../../../components/FormButton";
import "react-quill/dist/quill.snow.css";
import { onSuccess } from "../../../utils/notifications/OnSuccess";
import { onFailure } from "../../../utils/notifications/OnFailure";
import { AuthContext } from "../../../context/AuthContex";
import { axiosClient } from "../../../services/axios-client";
import { getDocument, getImageURL } from "../../../utils/formmaters";

const options = ["Upload Resume"];

function Resume() {
  const [option, setOption] = useState(options[0]);
  const { authDetails } = useContext(AuthContext);
  const { profileDetails, getStaffProfile } = useContext(
    StaffManagementContext
  );
  const [loading, setLoading] = useState(false);
  const client = axiosClient(authDetails?.token, true);

  const [resumeDoc, setResumeDoc] = useState();

  const onSubmit = async () => {
    setLoading(true);
    try {
      if(!resumeDoc) throw new Error("Upload a file");
      
      const response = await client.post(
        `/domesticStaff/update-profile/${authDetails.user.id}`,
        { resume: resumeDoc }
      );
      getStaffProfile();
      onSuccess({
        message: "Verifications Success",
        success: "Track record updated succesfully",
      });
    } catch (error) {
      console.log(error);
      onFailure({
        message: "Verifications Error",
        error: "Update failed",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (profileDetails) {
      setResumeDoc(profileDetails["resume"]);
    }
  }, []);

  return (
    <div className="h-fit w-full py-5 px-2 md:px-12 gap-[15px] flex flex-col">
      <div className="w-full h-[45px] border-b flex gap-3">
        {options.map((current) => (
          <button
            className={`h-full ${
              option == current
                ? "border-b border-primaryColor text-primaryColor"
                : "border-0 text-gray-400"
            }`}
            onClick={() => setOption(current)}
          >
            {current}
          </button>
        ))}
      </div>
      {option === options[0] ?  (
        <div className=" gap-2  flex flex-col">
          <input
            type="file"
            accept=".doc,.pdf,.docx"
            onChange={(e) => {
              getDocument(e,  setResumeDoc);
            }}
          />
          <span className="text-little text-gray-500">
            The resume must be a file of type: pdf, doc, docx.
          </span>
          <FormButton
            loading={loading}
            onClick={onSubmit}
            width="w-[30%] bg-primaryColor text-white"
          >
            Upload Resume
          </FormButton>
        </div>
      ) : (
        <span>Page not found</span>
      )}
    </div>
  );
}

export default Resume;
