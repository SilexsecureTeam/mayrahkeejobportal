import React from 'react'
import { useNavigate } from 'react-router-dom';

const CompanyCard = ({ company, newApplicant }) => {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate("/applicant/browse-companies/id", { state: { company: company } })}
            className="border cursor-pointer hover:shadow-inner my-4 p-4 w-full"
        >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div className="flex flex-col sm:flex-row items-start sm:items-center">
                    <div>
                        <img src={newApplicant} width={50} alt="" />
                    </div>
                    <div className="ml-3 mt-3 sm:mt-0">
                        <p><b>{company.company_name}</b></p>
                        <p className="my-3">{company.location}</p>
                        <p className="my-3">{company.address}</p>
                        <div className="flex flex-wrap">
                            <button className="mx-1 my-1 py-1 px-2 rounded-full hover:bg-white bg-green-100 text-green-700 border">
                                Company size: {company.company_size}
                            </button>
                            <button className="mx-1 my-1 py-1 px-2 border-yellow-500 rounded-full hover:bg-yellow-100 text-yellow-500 border">
                                {company.sector}
                            </button>
                            <button className="mx-1 my-1 py-1 px-2 border-green-500 rounded-full hover:bg-green-100 text-green-500 border">
                                Since: {company.year_of_incorporation}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-4 sm:mt-0 sm:text-right">
                    <button className="w-full sm:w-[150px] text-white mb-2 py-2 bg-green-700 hover:bg-green-900">
                        {company.phone_number}
                    </button>
                    <div className="flex my-3 bg-gray-100 w-full sm:w-[150px]">
                        <div className="pt-1 bg-[#56CDAD] w-[50%]"></div>
                    </div>
                    <p><b>5 applied</b> of 10 capacity</p>
                </div>
            </div>
        </div>
    )
}

export default CompanyCard;
