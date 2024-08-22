import React, { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import EditResume from './EditResume'
import { BASE_URL, IMAGE_URL } from '../../../../utils/base'
import axios from 'axios'
import { onSuccess } from '../../../../utils/notifications/OnSuccess'

const Resume = ({ resume, setGetResumeById, authDetails, getCandidate }) => {
    const [errorMsg, setErrorMsg] = useState(false)
    const [loading, setLoading] = useState(null)

    const deleteUser = (e) => {
        setErrorMsg(null)
        setLoading(true)
        setGetResumeById((prev) => {
            return {
                ...prev, isDataNeeded: false
            }
        })
        axios.delete(`${BASE_URL}/resumes/${resume.id}`, {
            headers: {
                Authorization: `Bearer ${authDetails.token}`,
                // 'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                console.log(response)
                setLoading(false)
                setGetResumeById((prev) => {
                    return {
                        ...prev, isDataNeeded: true
                    }
                })
                onSuccess({
                    message: 'Delete Resume',
                    success: response.data.message
                })
            })
            .catch((error) => {
                console.log(error)
                if (error.response) {
                    setErrorMsg(error.response.data.error)
                } else {
                    console.log(error)
                    setErrorMsg(error.message)
                }
                setLoading(false);
            });
    }
    console.log(resume)
    console.log(getCandidate)
    return (
        <div className='p-4 border rounded shadow-2xl justify-between flex-col flex'>
            <div>
                <div className="flex justify-between w-full">
                    <p>{resume.title}</p>
                    <EditResume resume={resume} />
                </div>
                <div className="details">
                    <div className="flex justify-center mb-3">
                        <div className='md:w-50'>
                            <div className="mb-3">
                                <img className='w-[100px] h-[100px] rounded-full'
                                    src={`${IMAGE_URL}/${getCandidate?.details?.profile}`}
                                    alt={`${getCandidate.details?.full_name} profile image`} />
                            </div>
                            <h3 className="font-bold">{getCandidate.details?.full_name}</h3>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-3">
                        <div className="">
                            <p className="font-bold">Address:</p>
                            <p>{getCandidate.details?.address}</p>
                        </div>
                        <div className="">
                            <p className="font-bold">Phone:</p>
                            <p>{getCandidate.details?.phone_number}</p>
                        </div>
                        <div className="">
                            <p className="font-bold">Email:</p>
                            <p className='break-words'>{getCandidate.details?.email}</p>
                        </div>
                    </div>
                    <div className="flex my-3">
                        <div className="w-2/4">
                        <p className="font-bold text-base">Employment</p>
                        <p className="font-medium text-base">Position</p>
                        </div>
                        <div className="w-2/4">
                        <p className="font-medium">{resume.company_name}</p>
                        <p className="">{resume.position_held}</p>
                        <p><span>{resume.start_date}</span> - <span>{resume.end_date}</span></p>
                        </div>
                    </div>
                    <div className="flex my-3">
                        <div className="w-2/4">
                        <p className="font-bold text-base">Education</p>
                        </div>
                        <div className="w-2/4">
                        <p className="font-medium">{resume.educational_institution}</p>
                        <p><span>{resume.year_of_entry}</span> - <span>{resume.year_of_graduation}</span></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className=' w-full'>
                {errorMsg && (
                    <div className="flex justify-center my-3">
                        <small className="text-red-700 text-center">{errorMsg}</small>
                    </div>
                )}
                <div className="flex justify-center mt-3">
                    <button
                        onClick={deleteUser}
                        className='px-4 rounded bg-red-500 text-white'
                        disabled={loading}
                    >{loading ? "Deleting" : "Delete"}</button>
                </div>
            </div>
        </div>
    )
}

export default Resume