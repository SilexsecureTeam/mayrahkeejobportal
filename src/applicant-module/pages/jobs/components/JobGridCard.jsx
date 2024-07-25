import React from 'react'
import { useNavigate } from 'react-router-dom'

const JobGridCard = ({ newApplicant }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate("/applicant/find-job/id")}
            className="border cursor-pointer hover:shadow-inner">
            <div className="p-3 h-full transition-all hover:scale-105">
                <div className="flex justify-between items-start my-3">
                    <div>
                        <img src={newApplicant} width={40} alt="" />
                    </div>
                    <button className="mx-2 py-1 px-2 rounded-full hover:bg-white  bg-green-100 text-green-700 border">Full-Time</button>
                </div>
                <div className="">
                    <p><b>Social Media Assistant</b></p>
                    <p className="mb-3">Agency  · Paris · France</p>
                    <div className="flex my-4">
                        <button className="mr-2 py-1 px-2 border-yellow-500 rounded-full hover:bg-yellow-100 text-yellow-500 border">Marketing</button>
                        <button className="mr-2 py-1 px-2 border-green-500 rounded-full hover:bg-green-100 text-green-500 border">Design</button>
                    </div>
                </div>
                <div className="">
                    <div className="flex my-4 bg-gray-100">
                        <div className="pt-1 bg-[#56CDAD] w-[50%]"></div>
                    </div>
                    <p><b>5 applied</b> of 10 capacity</p>
                </div>
            </div>
        </div>
    )
}

export default JobGridCard