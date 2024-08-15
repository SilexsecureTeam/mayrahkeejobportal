import { useEffect, useState } from "react";
import Header from "../../components/job-listing/Header";
import Applicants from "../../components/job-listing/Applicants";
import JobDetails from "../../components/job-listing/JobDetails";
import Analytics from "../../components/job-listing/Analytics";
import { useLocation, useParams } from "react-router-dom";
import useJobManagement from "../../../hooks/useJobManagement";
import DeleteDialog from "../../../components/DeleteDialog";

const options = [
  {
    id: 1,
    name: "Applicants",
  },
  {
    id: 2,
    name: "Job Details",
  },
  {
    id: 3,
    name: "Settings",
  },
];

function JobType() {
  const [currentOption, setCurrentOption] = useState(options[0]);
  const jobUtils = useJobManagement();
  const { id } = useParams();
  const [currentJob, setCurrentJob] = useState();
  const location = useLocation();

  const getComponent = () => {
    switch (currentOption.id) {
      case options[0].id:
        return <Applicants data={currentJob} />;
      case options[1].id:
        return <JobDetails data={currentJob} jobUtils={jobUtils} />;
      case options[2].id:
        return <Analytics data={currentJob} />;
    }
  };

  useEffect(() => {
    if (location.state.data) {
      setCurrentJob(location.state.data);
    } else {
      const job = jobUtils.jobList.find((current) => current.id === id);
      setCurrentJob(job);
    }
  }, []);



  return (
    <>
    <div className="w-full p-5 flex flex-col gap-[20px]">
      <Header
        options={options}
        currentOption={currentOption}
        setCurrentOption={setCurrentOption}
      />

      {getComponent()}
    </div>
    </>
  );
}

export default JobType;
