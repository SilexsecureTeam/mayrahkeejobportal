import React, { useContext, useEffect } from 'react';
import { BsShare } from 'react-icons/bs';
import { FaRegCheckCircle } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import headerImg from '../../../assets/pngs/detail-logo.png';
import JobApplicationForm from './components/JobApplicationForm';
import { ResourceContext } from '../../../context/ResourceContext';

const JobDetails = () => {
    const { state } = useLocation();
    const job = state?.job;

    const { getResumeById, setGetResumeById } = useContext(ResourceContext);

    useEffect(() => {
        setGetResumeById((prev) => ({
            ...prev,
            isDataNeeded: true,
        }));
    }, [setGetResumeById]);

    const postedDate = new Date(job.created_at);
    const keywordArr = job.search_keywords?.split(',');

    return (
        <div className="w-full h-full text-[#25324b]">
            {/* Header Section */}
            <div className="p-6 border-b mb-8">
                <div className="p-6 bg-white border rounded-md">
                    <div className="flex gap-2 flex-wrap justify-between items-center">
                        {/* Left Section: Job Info */}
                        <div className="flex items-start space-x-4">
                            <img src={headerImg} alt="Header Logo" className="w-20" />
                            <div>
                                <p className="text-lg font-bold mb-2">{job.job_title}</p>
                                <p className="text-sm mb-1">· {job.location} · {job.type}</p>
                                <p className="text-sm">
                                    <b>Address:</b> {job.office_address}
                                </p>
                            </div>
                        </div>

                        {/* Right Section: Share and Application */}
                        <div className="flex items-center space-x-3">
                            <button className="p-2 rounded-full border hover:bg-gray-100">
                                <BsShare />
                            </button>
                            <JobApplicationForm 
                                job={job} 
                                getResumeById={getResumeById.data} 
                                hasApplied={state?.hasApplied} 
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col md:flex-row px-6">
                {/* Left Column */}
                <div className="w-full md:w-4/5 pr-4">
                    <div className="mb-6">
                        <h4 className="font-bold mb-2">Description</h4>
                        <p dangerouslySetInnerHTML={{ __html: job.job_description }} />
                    </div>

                    <div className="mb-6">
                        <h4 className="font-bold mb-2">Experience</h4>
                        <p dangerouslySetInnerHTML={{ __html: job.experience }} />
                    </div>

                    <div className="mb-6">
                        <h4 className="font-bold mb-2">Qualifications</h4>
                        {job.qualification?.map((each, i) => (
                            <div key={i} className="flex items-center space-x-2 mb-2">
                                <FaRegCheckCircle className="text-green-500" />
                                <span>{each}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column */}
                <div className="w-full md:w-1/5">
                    <h4 className="font-bold mb-2">About this role</h4>
                    <div className="bg-gray-100 p-4 rounded-md mb-6">
                        <div className="relative h-2 bg-gray-300 rounded-full mb-2">
                            <div className="absolute top-0 left-0 h-2 bg-green-500 rounded-full" style={{ width: '50%' }}></div>
                        </div>
                        <p className="text-sm">
                            <b>5 applied</b> of 10 capacity
                        </p>
                    </div>

                    <div className="space-y-3 border-b pb-4">
                        <div className="flex justify-between">
                            <p>Apply Before</p>
                            <p className="font-medium">{job.application_deadline_date}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Job Posted On</p>
                            <p className="font-medium">{postedDate.toLocaleDateString()}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Email</p>
                            <p className="font-medium">{job.email}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Job Type</p>
                            <p className="font-medium">{job.type}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Salary Type</p>
                            <p className="font-medium">{job.salary_type}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Currency</p>
                            <p className="font-medium">{job.currency}</p>
                        </div>
                    </div>

                    <div className="my-6">
                        <h4 className="font-bold mb-2">Categories</h4>
                        <div className="flex flex-wrap gap-2">
                            {keywordArr?.map((each, index) => (
                                <button
                                    key={index}
                                    className="px-3 py-1 rounded-full bg-teal-50 text-teal-400 odd:bg-amber-100 odd:text-amber-500"
                                >
                                    {each}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;
