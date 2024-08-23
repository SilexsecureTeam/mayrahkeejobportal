import React from 'react'
import newApplicant from "../../../../assets/pngs/applicant-logo1.png"
import { MdMoreHoriz } from 'react-icons/md'

const AllApplicants = ({ app, index }) => {
  const dateCreated = new Date(app?.created_at)

    return (
        <div className="flex recent_added items-center" >
            <div className="flex justify-between py-3 px-2 w-[25%]">
                <span>{index + 1}</span>
                <div className="w-3/4 flex items-center">
                    <div>
                        <img src={newApplicant} width={'40px'} alt="" />
                    </div>
                    <p className="ml-2">Company</p>
                </div>
            </div>
            <div className="flex py-3 px-2 w-3/6">
                <p className="w-[60%]">{app.job_title}</p>
                <p className="w-[40%]">{dateCreated.toDateString()}</p>
            </div>
            <div className="flex justify-between py-3 px-2 w-[25%]">
                <div className="w-2/3">
                    <button className="border border-green-600 text-green-900 px-2 py-1 rounded-full">{app.status}</button>
                </div>
                <div className="w-1/3">
                    <button className="hover:bg-gray-200 p-1 rounded-full"><MdMoreHoriz size={25} /></button>
                </div>
            </div>
        </div >
    )
}

export default AllApplicants