import React from 'react'
import { MdOutlineMoreHoriz } from 'react-icons/md'
import { FormatTextToUppecase } from '../../../utils/formmaters'

const RecentlyAdded = ({ newApplicant, newApp }) => {
  const dateCreated = new Date(newApp?.created_at)
  return (
    <div className="recent_added my-4 p-2 flex items-center rounded transition duration-75 hover:bg-gray-100 hover:translate-y-1">
      <div className="flex items-center w-full md:w-3/6">
        <div className="mr-2">
          <img src={newApplicant} className=" w-[60px]" alt="" />
        </div>
        <div className="">
          <p className="font-bold">{newApp.job_title}</p>
          <p>Company Name · Location · Job Type</p>
        </div>
      </div>
      <div className="w-1/6 hidden md:block">
        <p className="font-bold">Date Applied</p>
        <p>{dateCreated.toDateString()}</p>
      </div>
      <div className="w-1/6 hidden md:block">
        <button className="border px-2 p-1 rounded-full">{FormatTextToUppecase(newApp.status)}</button>
      </div>
      <div className="w-1/6">
        <button className=" p-1"> <MdOutlineMoreHoriz /> </button>
      </div>
    </div>
  )
}

export default RecentlyAdded