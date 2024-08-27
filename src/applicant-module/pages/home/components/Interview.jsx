import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'

const Interview = ({getInterviews, shortListed}) => {
    const [newInterview, setNewInterview] = useState();

    useEffect(()=>{
        getInterviews(shortListed?.interview_id, setNewInterview)
    },[])
    console.log(newInterview)
    const date =  new Date(newInterview?.interview_date)
    return (
        <div className='border-b'>
            <div className="px-3 my-3 flex items-center">
                <p className="w-1/6 font-medium">{date.toLocaleTimeString()}</p>
                <div className="bg-[#47AA4933] rounded w-5/6 p-3">
                    <div className="flex items-center">
                        <div className="size-12 mr-3 rounded-full bg-gray-100"></div>
                        <div className="w-80 divide-y-1 divide-inherit">
                            <p className="prime_text border-b border-4 font-medium">{newInterview?.interviewer_name}</p>
                            <p className="font-bold">{shortListed?.employer_name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Interview