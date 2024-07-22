import React from 'react'
import { MdOutlineMoreHoriz } from 'react-icons/md'

const RecentlyAdded = ({newApplicant}) => {
  return (
    <div className="recent_added my-4 p-2 flex items-center rounded transition duration-75 hover:bg-gray-100 hover:translate-y-1">
    <div className="flex items-center w-3/6">
      <div className="mr-2">
        <img src={newApplicant} className=" w-[60px]" alt="" />
      </div>
      <div className="">
        <p className="font-bold">Social Media Assistant</p>
        <p>Company Name · Location · Job Type</p>
      </div>
    </div>
    <div className="w-1/6">
      <p className="font-bold">Date Applied</p>
      <p>24 July, 2024</p>
    </div>
    <div className="w-1/6">
      <button className="border p-1 rounded-full">In Review</button>
    </div>
    <div className="w-1/6">
      <button className=" p-1"> <MdOutlineMoreHoriz /> </button>
    </div>
  </div>
  )
}

export default RecentlyAdded