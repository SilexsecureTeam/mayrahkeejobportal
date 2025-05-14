import React from 'react';
import { useNavigate } from 'react-router-dom';
import { resourceUrl } from '../../../../services/axios-client';

const JobGridCard = ({ newApplicant, job,getAllApplications }) => {
    const navigate = useNavigate();
    const keywordArr = job.search_keywords?.split(',');
const hasApplied = getAllApplications?.some((app) => app.job_id === job.id);
    
    return (
        <div
            onClick={() => navigate("/applicant/find-job/id", { state: { job: job } })}
            className="border cursor-pointer hover:shadow-inner transition-transform  rounded-lg">
            <div className="p-3 h-full">
                <div className="flex justify-between items-start my-3">
                    <img src={`${resourceUrl}/${job?.featured_image}`} className='w-12 h-12 object-contain' alt="job" />
                    <button className="mx-2 py-1 px-2 rounded-full hover:bg-white bg-green-100 text-green-700 border">
                        {job.type}
                    </button>
                </div>

                <div>
                    <p className="font-bold">{job.job_title}</p>
                    <p className="mb-3 text-sm text-gray-600">· {job.location} ·</p>
                    <div className="flex flex-wrap gap-1 my-4">
                        <button className="py-1 px-2 rounded-full border text-yellow-500 border-yellow-500 hover:bg-yellow-100">
                            {job.sector}
                        </button>
                    </div>
                </div>

                <div>
                    {/* <div className="flex my-4 bg-gray-100 h-2 rounded">
                        <div className="bg-[#56CDAD] w-[50%] h-full rounded"></div>
                    </div> 
                    <p className="text-sm">
                        <b>{job?.number_of_participants} Expected Applicants</b> 
                    </p>*/}
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
                    </button>
                </div>
                </div>
            </div>
        </div>
    );
};

export default JobGridCard;
