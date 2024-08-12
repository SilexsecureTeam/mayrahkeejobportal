import React from 'react'
import { useNavigate } from 'react-router-dom'

const CompanyGridCard = ({ newApplicant, job}) => {
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
                    <button className="mx-2 py-1 px-2 rounded-full hover:bg-white  bg-green-100 text-green-700 border">7 Jobs</button>
                </div>
                <div className="">
                    <p><b>Social Media Assistant</b></p>
                    <p className="mb-3">Agency  · Paris · France</p>
                    <div className="flex flex-wra items-start my-6">
                        <button className="mr-2 mt-2 py-1 px-2 border-green-500 rounded-full hover:bg-green-100 text-green-700 border text-nowrap">Business</button>
                        <button className="mr-2 mt-2 py-1 px-2 rounded-full bg-green-100 hover:bg-white text-green-700 border text-nowrap">Payment Gateway</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyGridCard