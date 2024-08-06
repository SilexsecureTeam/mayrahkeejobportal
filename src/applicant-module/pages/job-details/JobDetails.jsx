import React from 'react'
import headerImg from "../../../assets/pngs/detail-logo.png"
import { BsShare } from 'react-icons/bs'
import { FaRegCheckCircle } from 'react-icons/fa'
import healthIcon from "../../../assets/pngs/perks-n-benefits/tethoscope.png"
import vacation from "../../../assets/pngs/perks-n-benefits/vacation.png"
import cam from "../../../assets/pngs/perks-n-benefits/cam.png"
import arrowUp from "../../../assets/pngs/perks-n-benefits/kite-up.png"
import coffee from "../../../assets/pngs/perks-n-benefits/coffee-cup.png"
import trainIcon from "../../../assets/pngs/perks-n-benefits/vehicle.png"
import unity from "../../../assets/pngs/perks-n-benefits/unity.png"

const JobDetails = () => {
    return (
        <div className="h-full text-[#25324b] w-full">
            <div className=' p-6 border-b mb-8'>
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
                            <div className="my-6">
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
                            <div className="text-sm p-2 bg-gray-100">
                                <div className="flex my-4 bg-gray-300">
                                    <div className="pt-1 bg-[#56CDAD] w-[50%]"></div>
                                </div>
                                <p><b>5 applied</b> of 10 capacity</p>
                            </div>
                            <div className="my-6 border-b">
                                <div className="flex my-3 justify-between">
                                    <p>Apply Before</p>
                                    <p className="font-medium">June 31, 2021</p>
                                </div>
                                <div className="flex my-3 justify-between">
                                    <p>Job Posted On</p>
                                    <p className="font-medium">July 1, 2021</p>
                                </div>
                                <div className="flex my-3 justify-between">
                                    <p>Job Type</p>
                                    <p className="font-medium">Full-Time</p>
                                </div>
                            </div>
                            <div className="my-6 border-b pb-6">
                                <h4 className="font-bold mb-4">Categories</h4>
                                <div className="flex text-xs">
                                    <button className="px-3 py-1 rounded-full bg-amber-100 text-amber-500">Marketing</button>
                                    <button className="px-3 py-1 mx-2 rounded-full bg-teal-50 text-teal-400">Design</button>
                                </div>
                            </div>
                            <div className="my-6 border-b pb-6">
                                <h4 className="font-bold mb-4">Reuired Skills</h4>
                                <div className="flex flex-wrap">
                                    <button className="m-1 px-2 py-1 rounded bg-green-100 hover:bg-green-200 hover:text-green-900 text-green-700">Project Management</button>
                                    <button className="m-1 px-2 py-1 rounded bg-green-100 hover:bg-green-200 hover:text-green-900 text-green-700">Copywriting</button>
                                    <button className="m-1 px-2 py-1 rounded bg-green-100 hover:bg-green-200 hover:text-green-900 text-green-700">English</button>
                                    <button className="m-1 px-2 py-1 rounded bg-green-100 hover:bg-green-200 hover:text-green-900 text-green-700">social Media Marketing</button>
                                    <button className="m-1 px-2 py-1 rounded bg-green-100 hover:bg-green-200 hover:text-green-900 text-green-700">Cpoy Editing</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-6 border-b">
                <h4 className="font-bold text-xl">Perks & Benefits</h4>
                <p>This job comes with several perks and benefits</p>
                <div className="my-5 pb-4  flex flex-wrap text-sm">
                    <div className="p-2 w-full md:w-1/4">
                        <div className="hover:shadow p-2 h-full transition-all hover:scale-105">
                            <div className="my-2">
                                <img src={healthIcon} alt="" />
                            </div>
                            <h6 className="font-bold mb-3">Full Healthcare </h6>
                            <p>We believe in thriving communities and that starts with our team being happy and healthy.</p>
                        </div>
                    </div>
                    <div className="p-2 w-full md:w-1/4">
                        <div className="hover:shadow p-2 h-full transition-all hover:scale-105">
                            <div className="my-2">
                                <img src={vacation} alt="" />
                            </div>
                            <h6 className="font-bold mb-3">Unlimited Vacation </h6>
                            <p>
                                We believe you should have a flexible schedule that makes space for family, wellness, and fun.
                            </p>
                        </div>
                    </div>
                    <div className="p-2 w-full md:w-1/4">
                        <div className="hover:shadow p-2 h-full transition-all hover:scale-105">
                            <div className="my-2">
                                <img src={cam} alt="" />
                            </div>
                            <h6 className="font-bold mb-3">Skill Development</h6>
                            <p>
                                We believe in always learning and leveling up our skills. Whether it's a conference or online course.
                            </p>
                        </div>
                    </div>
                    <div className="p-2 w-full md:w-1/4">
                        <div className="hover:shadow p-2 h-full transition-all hover:scale-105">
                            <div className="my-2">
                                <img src={arrowUp} alt="" />
                            </div>
                            <h6 className="font-bold mb-3">Team Summit</h6>
                            <p>
                                Every 6 months we have a full team summit where we have fun, reflect, and plan for the upcoming quarter.
                            </p>
                        </div>
                    </div>
                    <div className="p-2 w-full md:w-1/4">
                        <div className="hover:shadow p-2 h-full transition-all hover:scale-105">
                            <div className="my-2">
                                <img src={coffee} alt="" />
                            </div>
                            <h6 className="font-bold mb-3">Remote Working</h6>
                            <p>
                                We believe in thriving communities and that starts with our team being happy and healthy.
                            </p>
                        </div>
                    </div>
                    <div className="p-2 w-full md:w-1/4">
                        <div className="hover:shadow p-2 h-full transition-all hover:scale-105">
                            <div className="my-2">
                                <img src={trainIcon} alt="" />
                            </div>
                            <h6 className="font-bold mb-3">Commuter Benefits</h6>
                            <p>
                                We’re grateful for all the time and energy each team member puts into getting to work every day.
                            </p>
                        </div>
                    </div>
                    <div className="p-2 w-full md:w-1/4">
                        <div className="hover:shadow p-2 h-full transition-all hover:scale-105">
                            <div className="my-2">
                                <img src={unity} alt="" />
                            </div>
                            <h6 className="font-bold mb-3">We give back</h6>
                            <p>
                                We anonymously match any donation our employees make (up to $/€ 600) so they can support the organizations they care about most—times two.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDetails