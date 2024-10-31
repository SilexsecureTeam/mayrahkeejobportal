import blueTickIcon from "../../../assets/pngs/blue-tick-icon.png";
import { job_dummies } from "../../../utils/dummies";
import { FormatPrice } from "../../../utils/formmaters";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useEffect, useState } from "react";
import Switch from "../../../components/DefaultSwitch";
import { useNavigate } from "react-router-dom";
import { onSuccess } from "../../../utils/notifications/OnSuccess";
import DeleteDialog from "../../../components/DeleteDialog";
import DefaultSwitch from "../../../components/DefaultSwitch";

function JobDetails({ data, jobUtils }) {
  const [enabled, setEnabled] = useState(true);
  const [isDeleteOpen, setIsDeleteOpened] = useState(false);

  const navigate = useNavigate();

  const handleDelete = () => {
    jobUtils.deleteJob(() => {
      onSuccess({
        message: "Delete Job",
        success: "Job deleted successfully",
      });
      navigate("/company/job-listing");
    }, data.id);
  };

  useEffect(() => {
    if (data?.status === "1") {
      setEnabled(true);
    } else {
      setEnabled(false);
    }
  }, [data?.status]);

  return (
    <>
      <DeleteDialog
        isOpen={isDeleteOpen}
        loading={jobUtils.loading}
        setIsOpen={setIsDeleteOpened}
        title={"Job"}
        handleDelete={handleDelete}
      />

      <div className="p-2 flex flex-col w-full gap-4">
        <div className="w-full border flex flex-wrap gap-2 justify-between px-2 py-2 items-center">
          <div className="flex gap-2 items-center">
            <div className="h-12 w-12 bg-gray-300" />

            <div className="flex flex-col">
              <h3 className="font-bold text-lg">{data.job_title}</h3>
              <span className="text-sm md:text-base">
                Mail to:{" "}
                <a
                  href={`mailto:${data.email}`}
                  className="text-sm md:text-base text-primaryColor cursor-pointer hover:underline"
                >
                  {data.email}
                </a>
              </span>
            </div>
          </div>

          <div className="flex gap-2 w-1/3 items-center">
            <button
              onClick={() => setIsDeleteOpened(true)}
              className="px-2 py-1 flex text-sm md:text-base border items-center justify-center gap-1"
            >
              <MdDeleteForever className="text-red-600" />
              Delete
            </button>
            <button className="px-2 py-1 flex text-sm md:text-base border items-center justify-center gap-1">
              <CiEdit className="text-primaryColor" />
              Edit
            </button>
            <DefaultSwitch
              enabled={enabled}
              setEnabled={setEnabled}
              onClick={() => {
                if (!enabled) {
                  jobUtils.deactivateJob(data, '1', () => {
                    onSuccess({
                      message: 'Status Updated',
                      success: 'Job is now open'
                    })
                  });
                } else {
                  jobUtils.deactivateJob(data, '2', () => {
                    onSuccess({
                      message: 'Status Updated',
                      success: 'Job is now closed'
                    })
                  });
                }
                setEnabled(!enabled);
              }}
            />
          </div>
        </div>

        <div className="w-full text-black">
          <div className="flex flex-col gap-5 md:flex-row justify-between">
            {/* Descriptions e.t.c */}
            <div className="md:w-2/3 flex flex-col gap-2">
              <div className="flex flex-col">
                <span className="font-bold text-md">Job Description</span>
                <div
                  dangerouslySetInnerHTML={{ __html: data?.job_description }}
                  className="text-sm border border-dotted p-2"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-md">Experience Needed</span>
                <div
                  dangerouslySetInnerHTML={{ __html: data?.experience }}
                  className="text-sm"
                />
              </div>

              <div className="flex flex-col">
                <span className="font-semibold text-md">
                  Qualifications and Skills
                </span>
                <ul className="flex flex-col gap-2 text-sm">
                  {data?.qualification?.map((current, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <img src={blueTickIcon} className="h-4" alt="Check icon" />
                      <span>{current}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap items-center justify-between pt-2 w-full border-t">
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">Office Address</span>
                  <span className="text-sm">
                    {data?.office_address}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">Intro Video Url</span>
                  <span className="text-sm hover:text-primaryColor hover:underline cursor-pointer">
                    {data?.introduction_video_url}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">External Url</span>
                  <a className="text-sm hover:text-primaryColor hover:underline cursor-pointer">
                    {data?.external_url}
                  </a>
                </div>
              </div>
            </div>

            {/* About the role */}
            <div className="flex flex-col justify-between gap-2 pr-2 md:w-1/3">
              <div className="flex flex-col">
                <span className="font-semibold text-md">About this role</span>
                <div className="text-sm gap-2 flex flex-col">
                  <span className="font-semibold text-md p-2 bg-gray-100 text-center">
                    5 applied out of 10 capacity
                  </span>
                  <span className="text-md flex justify-between border-b border-dashed">
                    Job Posted on{" "}
                    <span>
                      {new Date(data?.created_at).toLocaleDateString()}
                    </span>
                  </span>
                  <span className="text-md flex justify-between border-b border-dashed">
                    Job deadline{" "}
                    <span>
                      {new Date(
                        data?.application_deadline_date
                      ).toLocaleDateString()}
                    </span>
                  </span>

                  <span className="text-md flex justify-between border-b border-dashed">
                    Job Type<span>{data?.type}</span>
                  </span>

                  <span className="text-md flex justify-between border-b border-dashed">
                    Salary Type
                    <span>{data?.salary_type}</span>
                  </span>

                  <span className="text-md flex justify-between border-b border-dashed">
                    Salary Range
                    <span>{`${FormatPrice(
                      Number(data?.min_salary)
                    )} - ${FormatPrice(Number(data?.max_salary))}`}</span>
                  </span>
                  <span className="text-md flex justify-between border-b border-dashed">
                    Currency
                    <span>{data?.currency}</span>
                  </span>
                  <span className="text-md flex justify-between border-b border-dashed">
                    Sector
                    <span>{data?.sector}</span>
                  </span>
                  <span className="text-md flex justify-between border-b border-dashed">
                    Gender
                    <span>{data?.gender}</span>
                  </span>
                  <span className="text-md flex justify-between border-b border-dashed">
                    Age Range
                    <span>{data?.preferred_age}</span>
                  </span>
                </div>
              </div>

              <div className="h-px bg-gray-300 w-full" />

              <div className="flex flex-col">
                <span className="font-semibold text-md">Search Keywords</span>
                <div className="grid grid-cols-2 gap-2">
                  {data?.search_keywords?.split(",").map((current, index) => (
                    <span key={index} className="text-sm py-1 px-2 text-amber-500 rounded-2xl bg-amber-300 text-center">
                      {current}
                    </span>
                  ))}
                </div>
              </div>

              <div className="h-px bg-gray-300 w-full" />

              <div className="flex flex-col">
                <span className="font-semibold text-md">Socials</span>
                <div className="grid grid-cols-2 gap-2">
                  {data?.socials?.map((current, index) => (
                    <span key={index} className="text-sm py-1 px-2 text-green-400 bg-green-200 text-center rounded-2xl">
                      {current}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobDetails;
