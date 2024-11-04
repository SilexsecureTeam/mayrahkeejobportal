import React from 'react'
import { useNavigate } from 'react-router-dom';

const JobCard = ({ newApplicant, job, getAllApplications }) => {

    const navigate = useNavigate();
    const hasApplied = getAllApplications?.some((app) => app.job_id === job.id)
    // console.log(hasApplied)
    return (
        <div
            onClick={() => navigate("/applicant/find-job/id", { state: { job: job, hasApplied: hasApplied } })}
            className="border cursor-pointer hover:shadow-inner my-4 p-4">
            <div className="flex justify-between">
                <div className="flex">
                    <div>
                        <img src={newApplicant} width={50} alt="" />
                    </div>
                    <div className="ml-3">
                        <p><b>{job.job_title}</b></p>
                        <p className="my-3"> · {job.location} · {job.type}</p>
                        <div className="flex">
                            <button className="mx-2 py-1 px-2 rounded-full hover:bg-white  bg-green-100 text-green-700 border">Full-Time</button>
                            <button className="mx-2 py-1 px-2 border-yellow-500 rounded-full hover:bg-yellow-100 text-yellow-500 border">{job.sector}</button>
                            <button className="mx-2 py-1 px-2 border-green-500 rounded-full hover:bg-green-100 text-green-500 border">Design</button>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <button disabled={hasApplied} className="w-[150px] text-white mb-2 py-2 bg-green-700 hover:bg-green-900">
                        {hasApplied ? "Applied" : "Apply"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default JobCard