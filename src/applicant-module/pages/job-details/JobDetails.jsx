import React from 'react'
import headerImg from "../../../assets/pngs/detail-logo.png"
import { BsShare } from 'react-icons/bs'
import { FaRegCheckCircle } from 'react-icons/fa'

const JobDetails = () => {
    return (
        <div className="h-full text-[#25324b] epilogue p-6 text-sm w-full">
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
                        </div>
                        <div className="w-[20%]"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDetails