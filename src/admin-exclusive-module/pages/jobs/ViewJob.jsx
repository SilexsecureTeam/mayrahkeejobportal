import JobType from "../../../company-module/pages/job-listing/JobType";

function ViewJob() {
  return (
    <div className="w-full h-full flex flex-col">
      <JobType test={true} />
    </div>
  );
}

export default ViewJob;
