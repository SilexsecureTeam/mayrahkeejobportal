import React, { useState } from 'react'
import { CiCircleRemove } from 'react-icons/ci'
import { GoChevronDown, GoChevronUp } from 'react-icons/go'
import { MdOutlineClose } from 'react-icons/md'

const GroupExperience = ({ index,
    handleInputChange,
    handleRemoveExperience,
    experience, }) => {

    const [show, setShow] = useState(false)
    return (
        <div>
            <div
                className='border border-green-900 rounded p-2 mb-5'
                key={index}>
                <div className="flex justify-between items-start">
                    <div className="flex items-start">
                        <button
                            className=' mr-4 text-red-800'
                            type="button" onClick={() => handleRemoveExperience(index)}>
                            <MdOutlineClose />
                        </button>
                        <p className='font-bold mb-3'><i>Experience {index + 1}</i></p>
                    </div>
                    <button
                        type='button'
                        onClick={() => setShow(!show)}
                        className='text-green-500 transition hover:text-lg'>
                        {show ? <GoChevronUp /> : <GoChevronDown />}
                    </button>
                </div>
                {show && (
                    <div>

                        <div className="mb-4">
                            <label className="block">
                                <span className="block text-sm font-medium text-slate-700">Title</span>
                                <input
                                    onChange={(e) => handleInputChange(index, e)}
                                    value={experience.title}
                                    name="titil"
                                    type="text"
                                    className="mt-1 rounded block p-1 focus:outline-none w-full border" />
                            </label>
                        </div>
                        <div className="mb-4">
                            <label className="block">
                                <span className="block text-sm font-medium text-slate-700">Start Date</span>
                                <input
                                    onChange={(e) => handleInputChange(index, e)}
                                    value={experience.startDate}
                                    name="startDate"
                                    type="text"
                                    className="mt-1 rounded block p-1 focus:outline-none w-full border" />
                            </label>
                        </div>
                        <div className="mb-4">
                            <label className="block">
                                <span className="block text-sm font-medium text-slate-700">End Date</span>
                                <input
                                    onChange={(e) => handleInputChange(index, e)}
                                    value={experience.endDate}
                                    name="endDate"
                                    type="text"
                                    className="mt-1 rounded block p-1 focus:outline-none w-full border" />
                            </label>
                        </div>
                        <div className="mb-4">
                            <label className="block">
                                <span className="block text-sm font-medium text-slate-700">Company</span>
                                <input
                                    onChange={(e) => handleInputChange(index, e)}
                                    value={experience.company}
                                    name="company"
                                    type="text"
                                    className="mt-1 rounded block p-1 focus:outline-none w-full border" />
                            </label>
                        </div>
                        <div className="mb-4">
                            <label className="block">
                                <span className="block text-sm font-medium text-slate-700">Description</span>
                            </label>
                            <textarea className="mt-1 block w-full focus:outline-green-400 border" id=""></textarea>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default GroupExperience