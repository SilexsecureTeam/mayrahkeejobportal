import React from 'react'
import { TbPhoto } from 'react-icons/tb'

const BasicInfo = () => {
    return (
        <div className='text-[#515B6F]'>
           
            <div className="my-4">
                <div className="flex items-cente pb-6 border-b">
                    <div className="w-1/3 pr-5">
                        <p className="font-medium mb-2 text-slate-950">Profile Photo</p>
                        <p>This image will be shown publicly as your profile picture, it will help recruiters recognize you!</p>
                    </div>
                    <div className="flex items-center">
                        <div className="size-24 rounded-full bg-gray-300 mx-5"></div>
                        <button className="min-h-32 min-w-96 bg-green-50 border-2 border-green-500 border-dashed p-5 rounded">
                            <div className="text-center">
                                <div className="flex justify-center">
                                    <span className='text-green-500 mb-3'><TbPhoto /></span>
                                </div>
                                <p><span className='text-green-500 font-medium'>Click to replace </span>or drag and drop</p>
                                <p>SVG, PNG, JPG or GIF (max. 400 x 400px)</p>
                            </div>
                        </button>
                    </div>
                </div>
                <div className="update_form py-6">
                    <div>
                        <form>
                            <div className="border-b py-6">
                                <div className="flex md:w-4/5">
                                    <div className="font-medium w-2/5 text-slate-900">
                                        <p>Personal Details</p>
                                    </div>
                                    <div className="w-3/5">
                                        <div className="mb-4">
                                            <label className="block">
                                                <span className="block text-sm font-medium text-slate-700">Full Name</span>
                                                <input type="text" value=""
                                                    className="mt-1 block p-1 focus:outline-none w-full border" />
                                            </label>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="">
                                                <label className="block">
                                                    <span className="block text-sm font-medium text-slate-700">Phone Number</span>
                                                    <input type="text" value=""
                                                        placeholder='+44 1245 572 135'
                                                        className="mt-1 block p-1 focus:outline-none w-full border" />
                                                </label>
                                            </div>
                                            <div className="">
                                                <label className="block">
                                                    <span className="block text-sm font-medium text-slate-700">Email</span>
                                                    <input type="email" placeholder='Jakegyll@gmail.com' value=""
                                                        className="mt-1 block p-1 focus:outline-none w-full border" />
                                                </label>
                                            </div>
                                            <div className="">
                                                <label className="block">
                                                    <span className="block text-sm font-medium text-slate-700">Date of Birth</span>
                                                    <input type="text" value=""
                                                        className="mt-1 block p-1 focus:outline-none w-full border" />
                                                </label>
                                            </div>
                                            <div className="">
                                                <label className="block">
                                                    <span className="block text-sm font-medium text-slate-700 mb-1">Full Name</span>
                                                    <select name="gender" id="" className='border w-full focus:outline-none p-2 pb-1'>
                                                        <option value="male">Male</option>
                                                        <option value="female">Female</option>
                                                    </select>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=" border-b mb-8">
                                <div className="md:w-4/5 flex py-6">
                                    <div className=" w-2/5 text-slate-900">
                                        <p className='font-medium'>Account Type</p>
                                        <p>You can update your account type</p>
                                    </div>
                                    <div className="w-3/5 text-slate-700">
                                        <div className="mb-4 flex ">
                                            <div className="mr-4">
                                                <input type="radio" name="status" id="job_seeker" className='radio' />
                                            </div>
                                            <div className="">
                                                <label htmlFor="job_seeker" className='font-medium'>Job seeker</label>
                                                <p>Looking for job</p>
                                            </div>
                                        </div>
                                        <div className="mb-4 flex ">
                                            <div className="mr-4">
                                                <input type="radio" name="status" id="employer" className='radio' />
                                            </div>
                                            <div className="">
                                                <label htmlFor="employer" className='font-medium'>Employer</label>
                                                <p>Hiring, sourcing candidates, or posting a jobs</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BasicInfo