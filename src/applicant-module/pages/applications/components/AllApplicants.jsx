import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useJobManagement from "../../../../hooks/useJobManagement";
import { resourceUrl } from "../../../../services/axios-client";
import { FormatTextToUppecase } from "../../../../utils/formmaters";
import { stages } from "../../../../utils/constants";
import { onPrompt } from "../../../../utils/notifications/onPrompt";
import { MdMoreHoriz } from "react-icons/md";
const AllApplicants = ({ app, index }) => {
  const dateCreated = new Date(app?.created_at);
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const { getJobById } = useJobManagement();

  const getBorderColor = () => {
    switch (app?.status) {
      case stages[0].name:
        return "text-orange-500 border-lightorange";
      case stages[1].name:
        return "text-yellow-500 border-lightblue";
      case stages[2].name:
        return "text-darkblue border-darkblue";
      case stages[3].name.split("/")[0]:
        return "text-primaryColor border-primaryColor";
      case stages[3].name.split("/")[1]:
        return "text-[#8B0A1A] border-[#8B0A1A]";
      default:
        return "";
    }
  };

  const handleClick = () => {
    if (app?.status === stages[1].name) {
      navigate(`/applicant/applications/${app.id}`, { state: { app: app } });
    } else if (app?.status === stages[3].name.split("/")[1]) {
      toast.error("Unfortunately your application was declined");
    } else if (app?.status === stages[3].name.split("/")[0]) {
      toast.success("Congratulation!! \nYou have been hired");
    } else {
      onPrompt("Awaiting Employer's action");
    }
  };

  useEffect(() => {
    getJobById(app.job_id, setJob);
  }, []);

  return (
    <div
      onClick={handleClick}
      className="grid grid-cols-12 items-center gap-2 border-b py-3 px-2 hover:bg-gray-50"
    >
      {/* Index */}
      <div className="col-span-1 text-center">{index + 1}</div>

      {/* Job Info */}
      <div className="col-span-3 flex items-center gap-3">
        {<img
          src={`${resourceUrl}/${job?.featured_image}`}
          alt="Job"
          className="w-10 h-10 object-cover rounded-full"
        />}
        <p>{app.job_title}</p>
      </div>

      {/* Office Address */}
     { <div className="col-span-4">
        <p className="truncate">{job?.office_address || "N/A"}</p>
      </div>}

      {/* Date Created */}
      <div className="col-span-2 text-center">
        {dateCreated.toDateString()}
      </div>

      {/* Status */}
      <div className="col-span-2 text-center">
        <button
          className={`border px-3 py-1 text-xs rounded-full uppercase ${getBorderColor()}`}
        >
          {FormatTextToUppecase(app.status)}
        </button>
      </div>
    </div>
  );
};

export default AllApplicants;
