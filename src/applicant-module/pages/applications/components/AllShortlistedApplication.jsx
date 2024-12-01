import React , {useState, useEffect} from "react";
import newApplicant from "../../../../assets/pngs/applicant-logo1.png";
import { MdMoreHoriz } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useJobManagement from "../../../../hooks/useJobManagement";

const AllShortlistedApplicants = ({ app, index }) => {
  const dateCreated = new Date(app?.created_at);
  const [job, setJob] = useState(null);
  const { getJobById } = useJobManagement();
  const navigate = useNavigate();
  const getBorderColor = () => {
    switch (app.status) {
      case stages[0].name:
        return "text-lightorange border-lightorange";
      case stages[1].name:
        return "text-lightblue border-lightblue";
      case stages[2].name:
        return "text-darkblue border-darkblue";
      case stages[3].name.split("/")[0]:
        return "text-primaryColor border-primaryColor";
      case stages[3].name.split("/")[1]:
        return "text-red-600 border-red-600";
    }
  };

  useEffect(() => {
    getJobById(app.job_id, setJob);
  }, []);

  console.log('Job',job)

  return (
    <div
      onClick={() =>
        navigate(`/applicant/applications/${app.id}`, { state: { app: app } })
      }
      className="flex cursor-pointer recent_added items-center min-w-full"
    >
      <div className="flex justify-between py-3 px-2 w-[25%]">
        <span>{index + 1}</span>
        <div className="w-3/4 flex items-center">
          <div>
            <img src={newApplicant} width={"40px"} alt="" />
          </div>
          <p className="ml-2">Company</p>
        </div>
      </div>
      <div className="flex py-3 px-2 w-3/6">
        <p className="w-[60%]">{app.job_title}</p>
        <p className="w-[40%]">{dateCreated.toDateString()}</p>
      </div>
      <div className="flex justify-between py-3 px-2 w-[25%]">
        <div className="w-2/3">
          <button className="border border-lightblue  text-lightblue px-2 py-1 rounded-full">
            {app.status}
          </button>
        </div>
        <div className="w-1/3">
          <button className="hover:bg-gray-200 p-1 rounded-full">
            <MdMoreHoriz size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllShortlistedApplicants;
