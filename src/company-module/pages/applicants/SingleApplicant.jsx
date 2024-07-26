import PrimaryDetail from "../../components/applicants/PrimaryDetail";
import SecondaryDetail from "../../components/applicants/SecondaryDetail";

function SingleApplicant() {
  return (
    <div className="flex flex-col p-2 h-full gap-[5px]">
      <div className="w-full flex justify-between ">
        <h2 className="font-semibold text-md">Applicant Details</h2>

        <button className="text-little py-1 px-2 bg-white border text-primaryColor border-primaryColor ">
          More Action
        </button>
      </div>

      <div className="flex justify-between h-full">
        <PrimaryDetail/>
        <SecondaryDetail/>
      </div>
    </div>
  );
}

export default SingleApplicant;
