import { useState } from "react";
import Header from "../../components/job-listing/Header";
import Applicants from "../../components/job-listing/Applicants";
import JobDetails from "../../components/job-listing/JobDetails";
import Analytics from "../../components/job-listing/Analytics";



const options = [
    {
        id:1,
        name: 'Applicants'
    },
    {
        id:2,
        name: 'Job Details'
    },
    {
        id:3,
        name: 'Settings'
    },
]

function JobType() {

    const [currentOption, setCurrentOption] = useState(options[0])


    const getComponent = () => {
        switch(currentOption.id){
            case options[0].id: return <Applicants/>
            case options[1].id: return <JobDetails/>
            case options[2].id: return <Analytics/>
        }
    }

  return (
    <div className="w-full p-2 flex flex-col gap-[20px]">
      <Header options={options} currentOption={currentOption} setCurrentOption={setCurrentOption} />

       {getComponent()}
    </div>
  );
}

export default JobType;
