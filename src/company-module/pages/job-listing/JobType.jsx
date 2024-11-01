import { useEffect, useState } from "react";
import Header from "../../components/job-listing/Header";
import Applicants from "../../components/job-listing/Applicants";
import JobDetails from "../../components/job-listing/JobDetails";
import Analytics from "../../components/job-listing/Analytics";
import { useLocation, useParams } from "react-router-dom";
import useJobManagement from "../../../hooks/useJobManagement";
import DeleteDialog from "../../../components/DeleteDialog";
import { JobContext } from "../../../context/JobContext";
import { useContext } from "react";
import { ApplicationContext } from "../../../context/ApplicationContext";

const options = [
  {
    id: 1,
    name: "Applicants",
  },
  {
    id: 2,
    name: "Job Details",
  },
];

function JobType() {
  const [currentOption, setCurrentOption] = useState(options[0]);
  const jobUtils = useContext(JobContext);
  const { applicants } = useContext(ApplicationContext);
  const { id } = useParams();
  const [currentJob, setCurrentJob] = useState();
  const location = useLocation();
  const [allApplicants, setAllApplicants] = useState();

  const getComponent = () => {
    switch (currentOption.id) {
      case options[0].id:
        return <Applicants data={currentJob} applicants={applicants} />;
      case options[1].id:
        return <JobDetails data={currentJob} jobUtils={jobUtils} />;
    }
  };

  
  console.log(currentJob)
  useEffect(() => {
    if (location?.state?.data !== null) {
      setCurrentJob(location.state.data);
    } else {
      console.log(jobUtils.jobList);
      jobUtils.getJobById(id, setCurrentJob);
    }

    if (location?.state?.applicants) {
      setAllApplicants(location.state.applicants);
    } else {
      const currentApplicants = applicants.find(
        (current) => current.job_id === Number(id)
      );
      setAllApplicants(currentApplicants);
    }
  }, []);

  return (
    currentJob && (
      <>
        <div className="w-full md:px-5 lg:px-8 py-5 flex flex-col gap-[20px]">
          <Header
            options={options}
            currentOption={currentOption}
            setCurrentOption={setCurrentOption}
          />

          {allApplicants && getComponent()}
        </div>
      </>
    )
  );
}

export default JobType;
