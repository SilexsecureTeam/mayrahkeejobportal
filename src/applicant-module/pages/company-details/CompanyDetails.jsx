import React from 'react';
import headerImg from "../../../assets/pngs/detail-logo.png";
import { BsShare } from 'react-icons/bs';
import { FaRegCheckCircle } from 'react-icons/fa';
import healthIcon from "../../../assets/pngs/perks-n-benefits/tethoscope.png";
import vacation from "../../../assets/pngs/perks-n-benefits/vacation.png";
import cam from "../../../assets/pngs/perks-n-benefits/cam.png";
import arrowUp from "../../../assets/pngs/perks-n-benefits/kite-up.png";
import coffee from "../../../assets/pngs/perks-n-benefits/coffee-cup.png";
import trainIcon from "../../../assets/pngs/perks-n-benefits/vehicle.png";
import unity from "../../../assets/pngs/perks-n-benefits/unity.png";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";

const CompanyDetails = () => {
    const { state } = useLocation();
    const job = state?.company;
    const navigate = useNavigate();
    const postedDate = new Date(job.created_at);
    const keywordArr = job.search_keywords?.split(',');

    return (
        <div className="w-full min-h-full text-[#25324b]">
            {/* Header Section */}
            <div className="sticky top-0 bg-white z-10 p-4 md:p-6 border-b mb-4 md:mb-8 shadow-md">
                <div className="p-4 md:p-6 bg-white border rounded-md">
                    <div className="flex gap-2 flex-wrap justify-between items-center">
                        <div className="flex items-start space-x-4">
                            <img src={headerImg} alt="Header Logo" className="w-16 md:w-20" />
                            <div>
                                <div className="ml-3">
                                    <p className="text-sm md:text-base mb-2 md:mb-4 font-bold">{job.company_name}</p>
                                    <p className="text-xs md:text-base mb-3">· {job.location} · {job.type}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <button className="p-2 rounded-full border hover:bg-gray-100">
                                <BsShare />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col md:flex-row md:justify-between px-4 md:px-6 min-h-full">
                {/* Left Column */}
                <div className='w-full'>
                    <button
                        onClick={() => navigate("/applicant/browse-companies")}
                        className='mt-4'>
                        <FaArrowLeft size={20} />
                    </button>
                    <div className="my-6 md:my-10">
                        <div className="flex flex-col md:flex-row px-4 md:px-10">
                            <div className="w-full md:w-[80%] pr-0 md:pr-4">
                                <div className="mb-6">
                                    <h4 className='font-bold mb-2 md:mb-4'>Address:</h4>
                                    <p>{job.address}</p>
                                </div>
                                <div className="mb-6">
                                    <h4 className='font-bold mb-2 md:mb-4'>Description</h4>
                                    <p dangerouslySetInnerHTML={{ __html: job.company_profile }} />
                                </div>
                            </div>
                            <div className="w-full md:w-1/3">
                                <h4 className="font-bold mb-2 md:mb-4">More Information</h4>
                                <div className="text-sm p-2 bg-gray-100">
                                    <div className="flex my-4 bg-gray-300">
                                        <div className="pt-1 bg-[#56CDAD] w-[50%]"></div>
                                    </div>
                                    <p><b>5 applied</b> of 10 capacity</p>
                                </div>
                                <div className="my-6 border-b">
                                    {[
                                        { label: 'Website', value: job.profile_url },
                                        { label: 'Ref No', value: job.rc_number },
                                        { label: 'Network', value: job.network },
                                        { label: 'Founded', value: job.year_of_incorporation },
                                        { label: 'Email', value: job.email },
                                        { label: 'Sector', value: job.sector },
                                        { label: 'Currency', value: job.currency },
                                    ].map((item, index) => (
                                        <div key={index} className="flex gap-2 flex-wrap my-3 justify-between">
                                            <p>{item.label}:</p>
                                            {
                                                item.label === "Website" 
                                                ?<a href={item.value} className="font-medium break-words underline cursor-pointer">{item.value}</a>
                                                :<p className="font-medium break-words">{item.value}</p>
                                            }
                                            
                                        </div>
                                    ))}
                                    <div className="flex flex-wrap my-3 justify-between">
                                        <p>Socials:</p>
                                        {job.social_media?.map((social, index) => (
                                            <Link key={index}>
                                                <p className="font-medium">{social}</p>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                <div className="my-6 border-b pb-6">
                                    <h4 className="font-bold mb-2 md:mb-4">Categories</h4>
                                    <div className="flex flex-wrap gap-1 text-xs">
                                        {keywordArr?.map((each, index) => (
                                            <button key={index} className="px-3 py-1 rounded-full odd:bg-amber-100 text-amber-500 even:bg-teal-50 even:text-teal-400">{each}</button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
             
                {/* Perks & Benefits Section */}
                <div className="p-4 md:p-6 border-b">
                    <h4 className="font-bold text-lg md:text-xl">Perks & Benefits</h4>
                    <p className="text-sm">This job comes with several perks and benefits</p>
                    <div className="my-4 md:my-5 pb-4 flex flex-wrap text-sm">
                        {[{ icon: healthIcon, title: "Full Healthcare", text: "We believe in thriving communities..." }, 
                          { icon: vacation, title: "Unlimited Vacation", text: "We believe you should have a flexible..." },
                          { icon: cam, title: "Skill Development", text: "We believe in always learning..." },
                          { icon: arrowUp, title: "Team Summit", text: "Every 6 months we have a full team summit..." },
                          { icon: coffee, title: "Remote Working", text: "We believe in thriving communities..." },
                          { icon: trainIcon, title: "Commuter Benefits", text: "We’re grateful for all the time..." },
                          { icon: unity, title: "We give back", text: "We anonymously match any donation..." }
                        ].map((perk, index) => (
                            <div key={index} className="p-2 w-full sm:w-1/2 md:w-1/4">
                                <div className="hover:shadow p-2 h-full transition-all hover:scale-105">
                                    <div className="my-2">
                                        <img src={perk.icon} alt="" />
                                    </div>
                                    <h6 className="font-bold mb-2 md:mb-3">{perk.title}</h6>
                                    <p>{perk.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
        </div>
    );
};

export default CompanyDetails;
