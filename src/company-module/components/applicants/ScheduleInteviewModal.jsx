import { IoMdCloseCircle } from "react-icons/io";
import { useEffect, useState } from "react";
import BasicInput from "../company-profile/BasicInput";
import { onTextChange } from "../../../utils/formmaters";
import FormButton from "../../../components/FormButton";
import Selector from "../../../components/Selector";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContex";
import useCompanyProfile from "../../../hooks/useCompanyProfile";

const fields = [
  {
    id: 4,
    name: "interviewer_name",
    label: "Interview Name",
    required: true,
    type: "text",
    placeholder: "Add inteview name",
  },
  {
    id: 1,
    name: "interview_date",
    label: "Interview Date",
    required: true,
    type: "date",
    placeholder: "Select inteview date",
  },
  {
    id: 2,
    name: "location",
    label: "Location",
    required: true,
    type: "text",
    placeholder: "Enter Location",
  },
  {
    id: 3,
    name: "notes",
    label: "Notes",
    required: true,
    type: "textarea",
    placeholder: "Tell the candidate what they need for preparations",
  },
];

export const interviewOptions = [
  { id: 1, name: "online" },
  { id: 2, name: "physical" },
];

function ScheduleInterviewModal({
  isOpen,
  setIsOpen,
  details,
  onTextChange,
  loading,
  handleOnSubmit,
}) {
  const companyUtil = useCompanyProfile()

  const [selected, setSelected] = useState(interviewOptions[0]);
  return (
    isOpen && (
      <div className="h-full z-10 w-full text-gray-400 text-little flex justify-center items-center bg-gray-600/70 fixed top-0 left-0">
        <div className="w-[40%] h-fit p-3 flex flex-col  rounded-[10px]  bg-white border">
          <IoMdCloseCircle
            onClick={() => setIsOpen(false)}
            className="text-lg place-self-end  cursor-pointer"
          />
          <div className="flex flex-col w-full  gap-[10px]">
            <h4 className="text-[16px] font-semibold border-b">
              Schedule Interview
            </h4>

            <form
              onSubmit={handleOnSubmit}
              className="flex flex-col  gap-[10px]"
            >
              <BasicInput
                data={fields[0]}
                details={details}
                onTextChange={onTextChange}
              />
              <BasicInput
                data={fields[1]}
                details={details}
                onTextChange={onTextChange}
              />

              <div className="flex flex-col">
                <label className="text-sm font-semibold">Inteview Type</label>
                <Selector
                  data={interviewOptions}
                  selected={selected}
                  setSelected={setSelected}
                />
              </div>

              {selected.name !== interviewOptions[0].name && (
                <BasicInput
                  data={fields[2]}
                  details={details}
                  onTextChange={onTextChange}
                  value={companyUtil.details.address}
                />
              )}
              <BasicInput
                data={fields[3]}
                details={details}
                onTextChange={onTextChange}
              />

              <FormButton loading={loading}>Schedule</FormButton>
            </form>
          </div>
        </div>
      </div>
    )
  );
}

export default ScheduleInterviewModal;
