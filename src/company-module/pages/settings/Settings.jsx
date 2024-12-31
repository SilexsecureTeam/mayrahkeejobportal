import { useState } from "react";
import Header from "../../components/job-listing/Header";
import JobDetails from "../../components/job-listing/JobDetails";
import Analytics from "../../components/job-listing/Analytics";
import Overview from "../../components/settings/Notification";
import SocialLinks from "../../components/settings/SocialLinks";
import Team from "../../components/settings/Team";
import Notification from "../../components/settings/Notification";

const options = [
  {
    id: 1,
    name: "Overview",
  },
];

function Settings() {
  const [currentOption, setCurrentOption] = useState(options[0]);

  const getComponent = () => {
    switch (currentOption.id) {
      case options[0].id:
        return <Notification />;
    }
  };

  return (
    <div className="w-full py-2 flex flex-col gap-[20px]">
      <h1 className="font-semibold"> Notification Settings </h1>

      {getComponent()}
    </div>
  );
}

export default Settings;
