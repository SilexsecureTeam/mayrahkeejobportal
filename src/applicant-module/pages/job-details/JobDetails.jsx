import React from 'react'
import headerImg from "../../../assets/pngs/detail-logo.png"
import { BsShare } from 'react-icons/bs'
import { FaRegCheckCircle } from 'react-icons/fa'

const JobDetails = () => {
    return (
        <div className="h-full text-[#25324b] epilogue p-6 text-s w-full">
            <div>
                <div className="job_header p-6">
                    <div className="p-3 bg-white border">
                        <div className="flex justify-between items-center">
                            <div className="flex">
                                <div>
                                    <img src={headerImg} width={80} alt="" />
                                </div>
                                <div className="ml-3">
                                    <p className="text-base mb-4 font-bold">Social Media Assistance</p>
                                    <p className="mb-3">Agency · Paris · France · Full Time</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className=" border-r">
                                    <button className=" mr-5">
                                        <BsShare />
                                    </button>
                                </div>
                                <div className="ml-3">
                                    <button className='px-10 py-2 green_btn text-white hover:bg-green-700'>Apply</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-10">
                    <div className="flex">
                        <div className="w-[80%] pr-4">
                            <div className="mb-6">
                                <h4 className='font-bold mb-4'>Description</ h4>
                                <p>Pattern is looking for Social Media Marketing expert to help manage our online networks. You will be responsible for monitoring our social media channels, creating content, finding effective ways to engage the community and incentivize others to engage on our channels.</p>
                            </div>
                            <div className="mb-6">
                                <h4 className='font-bold mb-4'>Responsibilties</ h4>
                                <div className='flex items-center mb-2'>
                                    <span className="mr-3 prime_text"><FaRegCheckCircle /></span>
                                    Community engagement to ensure that is supported and actively represented online
                                </div>
                                <div className='flex items-center mb-2'>
                                    <span className="mr-3 prime_text"><FaRegCheckCircle /></span>
                                    Focus on social media content development and publication
                                </div>
                                <div className='flex items-center mb-2'>
                                    <span className="mr-3 prime_text"><FaRegCheckCircle /></span>
                                    Marketing and strategy support
                                </div>
                                <div className='flex items-center mb-2'>
                                    <span className="mr-3 prime_text"><FaRegCheckCircle /></span>
                                    Stay on top of trends on social media platforms, and suggest content ideas to the team
                                </div>
                                <div className='flex items-center mb-2'>
                                    <span className="mr-3 prime_text"><FaRegCheckCircle /></span>
                                    Engage with online communities
                                </div>
                            </div>
                            <div className="mb-6">
                                <h4 className='font-bold mb-4'>Who You Are</ h4>
                                <div className='flex items-center mb-2'>
                                    <span className="mr-3 prime_text"><FaRegCheckCircle /></span>
                                    You get energy from people and building the ideal work environment                                </div>
                                <div className='flex items-center mb-2'>
                                    <span className="mr-3 prime_text"><FaRegCheckCircle /></span>
                                    You have a sense for beautiful spaces and office experiences                                </div>
                                <div className='flex items-center mb-2'>
                                    <span className="mr-3 prime_text"><FaRegCheckCircle /></span>
                                    You are a confident office manager, ready for added responsibilities                                </div>
                                <div className='flex items-center mb-2'>
                                    <span className="mr-3 prime_text"><FaRegCheckCircle /></span>
                                    You're detail-oriented and creative                                </div>
                                <div className='flex items-center mb-2'>
                                    <span className="mr-3 prime_text"><FaRegCheckCircle /></span>
                                    You're a growth marketer and know how to run campaigns                                </div>
                            </div>
                            <div className="mb-6">
                                <h4 className='font-bold mb-4'>Nice-To-Haves</ h4>
                                <div className='flex items-center mb-2'>
                                    <span className="mr-3 prime_text"><FaRegCheckCircle /></span>
                                    Fluent in English                                </div>
                                <div className='flex items-center mb-2'>
                                    <span className="mr-3 prime_text"><FaRegCheckCircle /></span>
                                    Project management skills
                                </div>
                                <div className='flex items-center mb-2'>
                                    <span className="mr-3 prime_text"><FaRegCheckCircle /></span>
                                    Copy editing skills
                                </div>
                            </div>
                        </div>
                        <div className="w-[20%]">
                            <h4 className="font-bold mb-4">About this role</h4>
                            <div className="p-2 bg-ggray-200"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDetails