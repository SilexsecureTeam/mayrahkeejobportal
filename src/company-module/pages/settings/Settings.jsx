import { useState } from "react";
import Header from "../../components/job-listing/Header";
import JobDetails from "../../components/job-listing/JobDetails";
import Analytics from "../../components/job-listing/Analytics";
import Overview from "../../components/settings/Overview";
import SocialLinks from "../../components/settings/SocialLinks";
import Team from "../../components/settings/Team";



const options = [
    {
        id:1,
        name: 'Overview'
    },
    {
        id:2,
        name: 'Social Links'
    },
    {
        id:3,
        name: 'Team'
    },
]

function Settings() {

    const [currentOption, setCurrentOption] = useState(options[0])


    const getComponent = () => {
        switch(currentOption.id){
            case options[0].id: return <Overview/>
            case options[1].id: return <SocialLinks/>
            case options[2].id: return <Team/>
        }
    }

  return (
    <div className="w-full p-2 flex flex-col gap-[20px]">
      <Header options={options} currentOption={currentOption} setCurrentOption={setCurrentOption} />

       {getComponent()}
    </div>
  );
}

export default Settings;
