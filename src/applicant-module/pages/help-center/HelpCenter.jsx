import React from 'react'
import { Helmet } from 'react-helmet'
import { BiLike } from 'react-icons/bi'
import { CiSearch } from 'react-icons/ci'
import { FaChevronDown } from 'react-icons/fa'
import { MdOutlineMoreHoriz } from 'react-icons/md'

const HelpCenter = () => {
    return (
        <>
            <Helmet>
                <title>Dashboard | Help Center</title>
            </Helmet>
            <div className="h-full text-[#7C8493] w-full flex">
                <div className="w-1/3 border-r h-full p-6">
                    <div className="h-full flex flex-col justify-between">
                        <div className="">
                            <p>Type your question or search keyword</p>
                            <div className="relative border my-5 py-1 w-full">
                                <input type="text" placeholder="Search" className="pl-[35px] focus:outline-none w-full" />
                                <span className="absolute text-primary top-0 left-0 p-2">
                                    <CiSearch size={20} />
                                </span>
                            </div>
                            <div className="divide-y-2">
                                <div className="my-2">
                                    <button className="py-2 font-medium">Getting Started</button>
                                </div>
                                <div className="my-2">
                                    <button className="py-2 font-medium">My Profile</button>
                                </div>
                                <div className="my-2">
                                    <button className="py-2 font-medium">Applying for a Job</button>
                                </div>
                                <div className="my-2">
                                    <button className="py-2 font-medium">Jobb search Tips</button>
                                </div>
                                <div className="my-2">
                                    <button className="py-2 font-medium">Job Alerts</button>
                                </div>
                            </div>
                        </div>
                        <div className="bg-g mt-24 text-white p-6 contact_card">
                            <p className="font-bold">Didn't find what you were looking for?</p>
                            <p className=" my-5">Contact our customer service</p>
                            <button className="transition px-6 hover:scale-110 py-2 bg-white text-green-600">Contact Us</button>
                        </div>
                    </div>
                </div>
                <div className="w-2/3 border-l h-full p-6">
                    <div className="flex my-5">
                        <span>Sorted by : </span>
                        <button className="flex items-center">
                            <span className="mr-2 font-medium text-slate-700 items-center"> Most relevant</span>
                            <span><FaChevronDown size={10} /></span>
                        </button>
                    </div>
                    <div className="border p-4 my-4">
                        <div className="flex justify-between text-slate-700 font-bold mb-3">
                            <p>What is My Applications?</p>
                            <button>
                                <MdOutlineMoreHoriz />
                            </button>
                        </div>
                        <p className='mb-4'>My Applications is a way for you to track jobs as you move through the application process. Depending on the job you applied to, you may also receive notifications indicating that an application has been actioned by an employer.</p>
                        <hr />
                        <div className="my-3 flex items-center">
                            <span className='mr-2'>Was this article helpful?</span>
                            <button className="border items-center text-green-900 hover:bg-green-100 flex py-1 px-2 font-medium mx-2">
                                <span className='mr-2'><BiLike /></span> Yes
                            </button>
                            <button className="border items-center text-green-900 hover:bg-green-100 flex py-1 px-2 font-medium mx-2">
                                <span className='mr-2 flip_y'><BiLike /></span> No
                            </button>
                        </div>
                    </div>
                    <div className="border p-4 my-4">
                        <div className="flex justify-between text-slate-700 font-bold mb-3">
                            <p>How to access my application history</p>
                            <button>
                                <MdOutlineMoreHoriz />
                            </button>
                        </div>
                        <p className='mb-4'>To access applications history, go to your My Applications page on your dashboard profile. You must be signed in to your JobHuntly account to view this page.</p>
                        <hr />
                        <div className="my-3 flex items-center">
                            <span className='mr-2'>Was this article helpful?</span>
                            <button className="border items-center text-green-900 hover:bg-green-100 flex py-1 px-2 font-medium mx-2">
                                <span className='mr-2'><BiLike /></span> Yes
                            </button>
                            <button className="border items-center text-green-900 hover:bg-green-100 flex py-1 px-2 font-medium mx-2">
                                <span className='mr-2 flip_y'><BiLike /></span> No
                            </button>
                        </div>
                    </div>
                    <div className="border p-4 my-4">
                        <div className="flex justify-between text-slate-700 font-bold mb-3">
                            <p>Not seeing jobs you applied in your my application list?</p>
                            <button>
                                <MdOutlineMoreHoriz />
                            </button>
                        </div>
                        <p className='mb-4'>Please note that we are unable to track materials submitted for jobs you apply to via an employer's site. As a result, these applications are not recorded in the My Applications section of your JobHuntly account. We suggest keeping a personal record of all positions you have applied to externally. </p>
                        <hr />
                        <div className="my-3 flex items-center">
                            <span className='mr-2'>Was this article helpful?</span>
                            <button className="border items-center text-green-900 hover:bg-green-100 flex py-1 px-2 font-medium mx-2">
                                <span className='mr-2'><BiLike /></span> Yes
                            </button>
                            <button className="border items-center text-green-900 hover:bg-green-100 flex py-1 px-2 font-medium mx-2">
                                <span className='mr-2 flip_y'><BiLike /></span> No
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HelpCenter