import { useContext, useState } from "react";
import { stages } from "../../../utils/constants";
import InterviewPhase from "./InterviewPhase";
import Shortlist from "./Shortlist";
import { ApplicationContext } from "../../../context/ApplicationContext";
import { axiosClient } from "../../../services/axios-client";
import { AuthContext } from "../../../context/AuthContex";
import { SubscriptionContext } from "../../../context/SubscriptionContext";
import SubscriptionModalSpecific from "../../../components/subscription/SubscriptionModalSpecific";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaTimes } from "react-icons/fa";

function HiringProgress({
  data,
  applicant,
  toogleInterview,
  exclusive,
  setEdit,
}) {
  const { setApplication } = useContext(ApplicationContext);
  const { authDetails } = useContext(AuthContext);
  const { isInterviewPackge, interviewPackages, loading } =
    useContext(SubscriptionContext);

  const [isOpen, setIsOpen] = useState(false);
  const [isReopening, setIsReopening] = useState(false); // <-- loader state for reopen

  const toogleOpen = () => setIsOpen(!isOpen);

  const bgColor = (current) => {
    if (current.stage === "passed") {
      return "bg-primaryColor/80";
    } else if (current.stage === "current") {
      return "bg-primaryColor";
    } else {
      return "bg-gray-300";
    }
  };

  const getbgcolor = (current) => {
    switch (data.status) {
      case "pending":
        return current === stages[0].name
          ? "bg-primaryColor text-white"
          : "text-black bg-white";
      case stages[0].name:
        return current === stages[0].name
          ? "bg-primaryColor text-white"
          : "text-black bg-white";
      case stages[1].name:
        return current === stages[1].name || current === stages[0].name
          ? "bg-primaryColor text-white"
          : "bg-white text-black";
      case stages[2].name:
        return current === stages[2].name ||
          current === stages[0].name ||
          current === stages[1].name
          ? "bg-primaryColor text-white"
          : "bg-white text-black";
      case "hired":
        return current.includes(data.status) ||
          current === stages[0].name ||
          current === stages[1].name ||
          current === stages[2].name
          ? "bg-primaryColor text-white"
          : "bg-white text-black";
      case "declined":
        return current.includes(data.status) ||
          current === stages[0].name ||
          current === stages[1].name ||
          current === stages[2].name
          ? "bg-red-500 text-white"
          : "bg-white text-black";
      default:
        return "bg-white text-black";
    }
  };

  const updateApplication = async (status) => {
    try {
      const client = axiosClient(authDetails.user.token);

      const response = await client.post("/applicationRespond", {
        candidate_id: data.candidate_id,
        job_id: data.job_id,
        status,
      });

      setApplication(response.data.job_application);
    } catch (error) {
      // add toast/log if needed
    }
  };


  const handleReopen = async () => {

    const confirmReopen = window.confirm(
      "Are you sure you want to reopen this application? This will change the status back to 'In-Review'."
    );

    if (!confirmReopen) return;

    try {
      setIsReopening(true);
      await updateApplication("in-review");
    } catch (error) {
      console.error("Error reopening application:", error);
    } finally {
      setIsReopening(false);
    }
  };

  // With Interview Subscription – ACTIVE
  const InView = (
    <div className="flex w-full flex-col items-start gap-5 px-2">
      <span className="text-sm text-slate-700">
        This candidate is currently under review. You can schedule an interview
        or decline the application.
      </span>

      <div className="flex w-full gap-4">
        <button
          onClick={() => toogleInterview()}
          className="w-[40%] md:w-[20%] rounded-lg border border-primaryColor px-3 py-2 text-sm font-medium text-primaryColor transition hover:bg-primaryColor hover:text-white"
        >
          Schedule Interview
        </button>

        <button
          onClick={() => updateApplication("declined")}
          className="w-[40%] md:w-[20%] rounded-lg border border-red-500 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-500 hover:text-white"
        >
          Decline Application
        </button>
      </div>
    </div>
  );

  // With Interview Subscription – INACTIVE
  const InViewInactive = (
    <div className="flex w-full flex-col items-start gap-5 px-2">
      <SubscriptionModalSpecific
        specificPackages={interviewPackages}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      {loading ? (
        <div className="flex min-h-24 w-full items-center justify-center bg-gray-50">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-primaryColor/40 border-t-primaryColor" />
        </div>
      ) : (
        <div className="w-full rounded-lg bg-red-50 p-4">
          <span className="text-sm font-medium text-red-600">
            Your current subscription does not include access to our online
            interview feature.
          </span>
          <p className="mt-1 text-xs text-red-500">
            Upgrade your subscription to schedule and manage interviews directly
            from this dashboard.
          </p>
          <button
            onClick={toogleOpen}
            className="mt-3 rounded-lg border border-primaryColor px-3 py-2 text-xs font-semibold text-primaryColor transition hover:bg-primaryColor hover:text-white"
          >
            Upgrade Now
          </button>
        </div>
      )}
    </div>
  );

  const statusTexts = () => {
    switch (data.status) {
      case "pending":
        return isInterviewPackge ? InView : InViewInactive;
      case stages[0].name:
        return isInterviewPackge ? InView : InViewInactive;
      case stages[1].name:
        return (
          <Shortlist
            data={data}
            exclusive={exclusive}
            toogleInterview={toogleInterview}
            setEdit={setEdit}
          />
        );
      case stages[2].name:
        return <InterviewPhase data={data} />;

      case "hired":
        return (
          <div className="w-full px-2 pb-4">
            <div className="flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
              <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                <IoMdCheckmarkCircleOutline className="text-2xl text-emerald-700" />
              </div>
              <div className="flex flex-col">
                <span className="inline-flex w-fit items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-emerald-700">
                  Hired
                </span>
                <p className="mt-2 text-sm font-medium text-slate-900">
                  This candidate has been successfully hired.
                </p>
                {applicant?.full_name && (
                  <p className="mt-1 text-xs text-slate-600">
                    Candidate:{" "}
                    <span className="font-semibold">{applicant.full_name}</span>
                  </p>
                )}
                <p className="mt-2 text-xs text-slate-500">
                  You can review interview details or update records in the
                  candidate&apos;s profile if needed.
                </p>

                {/* Reopen / update status button with loader */}
                <div className="mt-3">
                  <button
                    onClick={handleReopen}
                    disabled={isReopening}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isReopening && (
                      <span className="h-3 w-3 animate-spin rounded-full border-2 border-slate-400 border-t-transparent" />
                    )}
                    {isReopening ? "Reopening..." : "Reopen Application"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "declined":
        return (
          <div className="w-full px-2 pb-4">
            <div className="flex items-start gap-3 rounded-xl border border-rose-100 bg-rose-50 p-4">
              <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-rose-500/10">
                <FaTimes className="text-2xl text-red-700" />
              </div>
              <div className="flex flex-col">
                <span className="inline-flex w-fit items-center rounded-full bg-rose-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-rose-700">
                  Application Declined
                </span>
                <p className="mt-2 text-sm font-medium text-slate-900">
                  This candidate has been declined for this role.
                </p>
                {applicant?.full_name && (
                  <p className="mt-1 text-xs text-slate-600">
                    Candidate:{" "}
                    <span className="font-semibold">{applicant.full_name}</span>
                  </p>
                )}
                <p className="mt-2 text-xs text-slate-500">
                  No further action is required. You can revisit this decision
                  from the application history if necessary.
                </p>

                {/* Reopen / update status button with loader */}
                <div className="mt-3">
                  <button
                    onClick={handleReopen}
                    disabled={isReopening}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isReopening && (
                      <span className="h-3 w-3 animate-spin rounded-full border-2 border-slate-400 border-t-transparent" />
                    )}
                    {isReopening ? "Reopening..." : "Reopen Application"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <h3 className="px-2 text-sm font-semibold text-slate-800">
        Current Stage
      </h3>

      <ul className="flex w-full justify-between px-2">
        {stages?.map((current, index) => (
          <li
            key={index}
            className={`min-w-[24%] flex items-center justify-center border py-2 text-[11px] font-semibold uppercase ${getbgcolor(
              current.name
            )}`}
          >
            {current?.label}
          </li>
        ))}
      </ul>

      <h3 className="mt-3 px-2 text-sm font-semibold text-slate-800">
        Stage Information
      </h3>

      {statusTexts()}
    </>
  );
}

export default HiringProgress;
