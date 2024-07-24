import React from 'react'
import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md'

const Pagination = () => {
  return (
    <div className="my-6 flex justify-center">
    <div className="">
      <div className="flex pb-6">
        <button className="hover:bg-gray-200"><MdOutlineChevronLeft size={20} /></button>
        <button className="hover:bg-gray-200 px-3 py-1  bg-green-600 text-white rounded">1</button>
        <button className="hover:bg-gray-200 px-3 py-1 rounded">2</button>
        <button className="hover:bg-gray-200 px-3 py-1 rounded">3</button>
        <button className="hover:bg-gray-200 px-3 py-1 rounded">4</button>
        <button className="hover:bg-gray-200 px-3 py-1 rounded">5</button>
        <button className="hover:bg-gray-200 px-3 py-1 rounded">...</button>
        <button className="hover:bg-gray-200 px-3 py-1 rounded">38</button>
        <button className="hover:bg-gray-200"><MdOutlineChevronRight size={20} /></button>
      </div>
    </div>
  </div>
  )
}

export default Pagination