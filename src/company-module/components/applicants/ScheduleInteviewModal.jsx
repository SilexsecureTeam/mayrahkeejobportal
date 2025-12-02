import { IoMdCloseCircle } from "react-icons/io";
import { useEffect, useState, useContext } from "react";
import BasicInput from "../company-profile/BasicInput";
import FormButton from "../../../components/FormButton";
import Selector from "../../../components/Selector";
import { AuthContext } from "../../../context/AuthContex";
import useCompanyProfile from "../../../hooks/useCompanyProfile";
import { createMeeting } from "../../../components/video-sdk/Api";
import { FaSpinner } from "react-icons/fa";
import { SubscriptionContext } from "../../../context/SubscriptionContext";
const fields = [
  {
    id: 4,
    name: "interviewer_name",
    label: "Interview Name",
    required: true,
    type: "text",
    placeholder: "Add interview name",
  },
  {
    id: 1,
    name: "interview_date",
    label: "Interview Date",
    required: true,
    type: "date",
    placeholder: "Select interview date",
  },
  {
    id: 6,
    name: "interview_time",
    label: "Interview Time",
    required: true,
    type: "time",
    placeholder: "Select interview time",
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
  details = {},
  onTextChange,
  loading,
  handleOnSubmit,
  edit = false,
}) {
  const companyUtil = useCompanyProfile();
  const { isInterviewPackge } = useContext(SubscriptionContext);
  const { authDetails } = useContext(AuthContext);

  const options = isInterviewPackge ? interviewOptions : [interviewOptions[1]];

  const [selected, setSelected] = useState(interviewOptions[1]);
  const [meetingId, setMeetingId] = useState(null);
  const [generating, setGenerating] = useState(false);

  // Sync internal state when modal opens or details change
  useEffect(() => {
    if (!isOpen) return;

    if (edit) {
      // Fill from existing details
      setSelected(
        details?.meeting_id ? interviewOptions[0] : interviewOptions[1]
      );
      setMeetingId(details?.meeting_id || null);
    } else {
      // New schedule: reset
      setSelected(interviewOptions[1]);
      setMeetingId(null);
    }
  }, [isOpen, edit]);

  const handleMeeting = async () => {
    try {
      setGenerating(true);
      const roomId = await createMeeting(authDetails?.token);
      setMeetingId(roomId);
      onTextChange({ target: { name: "meeting_id", value: roomId } });
    } catch (error) {
      console.error(error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    isOpen && (
      <div className="h-full z-10 w-full flex justify-center items-center bg-gray-600/70 fixed top-0 left-0">
        <div className="w-[90%] md:w-[40%] h-fit p-3 flex flex-col rounded-[10px] bg-white border">
          <IoMdCloseCircle
            onClick={() => setIsOpen(false)}
            className="text-lg place-self-end cursor-pointer"
          />
          <h4 className="text-[16px] font-semibold border-b mb-2">
            Schedule Interview
          </h4>

          <form
            onSubmit={(e) => handleOnSubmit(e, selected, meetingId)}
            className="flex flex-col gap-2"
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
            <BasicInput
              data={fields[2]}
              details={details}
              onTextChange={onTextChange}
            />

            <div className="flex flex-col">
              <label className="text-sm font-semibold">Interview Type</label>
              <Selector
                data={options}
                selected={selected}
                setSelected={setSelected}
              />
            </div>

            <BasicInput
              data={fields[4]}
              details={details}
              onTextChange={onTextChange}
            />

            {selected?.name === "physical" && (
              <BasicInput
                data={fields[3]}
                details={details}
                onTextChange={onTextChange}
              />
            )}

            {selected?.name === "online" && (
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold">Meeting ID</label>
                <div className="flex justify-between border p-2 items-center">
                  <span>{meetingId || ""}</span>
                  <button
                    type="button"
                    onClick={handleMeeting}
                    disabled={generating}
                    className="px-2 py-1 bg-primaryColor rounded text-white flex items-center"
                  >
                    {generating ? (
                      <>
                        <FaSpinner className="animate-spin mr-1" />{" "}
                        Generating...
                      </>
                    ) : (
                      "Generate Meeting ID"
                    )}
                  </button>
                </div>
              </div>
            )}

            <FormButton loading={loading}>
              {edit ? "Reschedule" : "Schedule"}
            </FormButton>
          </form>
        </div>
      </div>
    )
  );
}

export default ScheduleInterviewModal;
