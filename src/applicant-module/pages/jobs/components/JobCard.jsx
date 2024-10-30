<<<<<<< HEAD
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
=======
import React from 'react';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ newApplicant, job, getAllApplications }) => {
    const navigate = useNavigate();
    const hasApplied = getAllApplications?.some((app) => app.job_id === job.id);

    return (
        <div
            onClick={() =>
                navigate("/applicant/find-job/id", { state: { job: job, hasApplied: hasApplied } })
            }
            className="border cursor-pointer hover:shadow-md rounded-lg p-4 my-4 transition-transform hover:scale-105"
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                {/* Left Section - Job Info */}
                <div className="flex items-start space-x-3">
                    <img src={newApplicant} alt="Applicant Logo" className="w-12 h-12 object-contain" />
                    <div>
                        <p className="font-bold text-lg">{job.job_title}</p>
                        <p className="text-sm text-gray-600">
                            · {job.location} · {job.type}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            <button className="py-1 px-2 rounded-full bg-green-100 text-green-700 border border-green-700 hover:bg-white">
                                Full-Time
                            </button>
                            <button className="py-1 px-2 rounded-full border border-yellow-500 text-yellow-500 hover:bg-yellow-100">
                                {job.sector}
                            </button>
                            <button className="py-1 px-2 rounded-full border border-green-500 text-green-500 hover:bg-green-100">
                                Design
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Section - Apply Button */}
                <div className="mt-4 md:mt-0 flex items-center">
                    <button
                        disabled={hasApplied}
                        className={`w-full md:w-[150px] p-2 text-white rounded-md transition-colors ${
                            hasApplied
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-green-700 hover:bg-green-900'
                        }`}
                    >
                        {hasApplied ? 'Applied' : 'Apply'}
>>>>>>> afowebdev
                    </button>
                </div>
            </div>
        </div>
<<<<<<< HEAD
    )
}

export default JobCard
=======
    );
};

export default JobCard;
>>>>>>> afowebdev
