import React, { useState } from 'react'
import { CiCircleRemove } from 'react-icons/ci'
import { GoChevronDown, GoChevronUp } from 'react-icons/go'
import { MdOutlineClose } from 'react-icons/md'

const SocialsGroup = ({ index,
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
                        <p className='font-bold mb-3'><i>Social Media {index + 1}</i></p>
                    </div>
                    <button
                        type='button'
                        onClick={() => setShow(!show)}
                        className='text-green-500 transition hover:text-lg'>
                        {show ? <GoChevronUp size={30} /> : <GoChevronDown size={30} />}
                    </button>
                </div>
                {show && (
                    <div>

                        <div className="mb-4">
                            <label className="block">
                                <span className="block text-sm font-medium text-slate-700">Network</span>
                                <select 
                                name='network' 
                                value={experience.network}
                                onChange={(e) => handleInputChange(index, e)}
                                 id="" className='border w-full focus:outline-none p-2 pb-1'>
                                    <option value="facebook">Facebook</option>
                                    <option value="twitter">Twitter</option>
                                    <option value="linkedIn">LinkedIn</option>
                                    <option value="dribble">Dribble</option>
                                </select>
                            </label>
                        </div>
                        <div className="mb-4">
                            <label className="block">
                                <span className="block text-sm font-medium text-slate-700">URL</span>
                                <input
                                    onChange={(e) => handleInputChange(index, e)}
                                    value={experience.url}
                                    name="url"
                                    type="text"
                                    className="mt-1 rounded block p-1 focus:outline-none w-full border" />
                            </label>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SocialsGroup