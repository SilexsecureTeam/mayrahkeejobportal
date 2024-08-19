import React, { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import EditResume from './EditResume'
import { BASE_URL } from '../../../../utils/base'
import axios from 'axios'

const Resume = ({ resume, setGetResumeById, authDetails }) => {
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
                setIsOpen(false)
                setGetResumeById((prev) => {
                    return {
                        ...prev, isDataNeeded: true
                    }
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

    return (
        <div className='p-3 border rounded shadow-2xl justify-between flex-col flex'>
            <div className="flex justify-between w-full">
                <p>{resume.title}</p>

                <EditResume resume={resume} />
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