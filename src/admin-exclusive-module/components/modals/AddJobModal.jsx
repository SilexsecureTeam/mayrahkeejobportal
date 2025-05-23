import { MdClose } from "react-icons/md";
import JobPosting from "../../../company-module/pages/job-posting/JobPosting";
import PopUpBox from "../../../components/PopUpBox";

function AddJobModal({ toogleJobModal, isOpen, exclusive }) {

  return (
    <PopUpBox isOpen={isOpen}>
      <div className="bg-white w-[90%] h-[95%] p-3">
        <button
          onClick={toogleJobModal}
          className="flex gap-1 border px-1 rounded-lg py-1 items-center bg-red-500 text-white font-semibold"
        >
          <MdClose /> Close Form
        </button>
        <div className="overflow-y-auto h-[95%]">
          <JobPosting exclusive={exclusive} />
        </div>
      </div>
    </PopUpBox>
  );
}

export default AddJobModal;
