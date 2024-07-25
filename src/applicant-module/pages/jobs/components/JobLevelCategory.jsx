import React, { useState } from 'react'
import CustomizedCheckbox from './CustomizedCheckbox'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const JobLevelCategory = () => {
    const [close, setClose] = useState(true)
    return (
        <div>
            <div className="mb-5">
                <div className="flex justify-between">
                    <p className="font-bold">Job Level</p>
                    <button
                        onClick={() => setClose(!close)}
                    >{close ? <FaChevronUp /> : <FaChevronDown />}</button>
                </div>
                {close && (
                    <div className="">
                        <CustomizedCheckbox values={{
                            label: "Entry Level",
                            id: "entry"
                        }} />
                        <CustomizedCheckbox values={{
                            label: "Mid Level",
                            id: "mid"
                        }} />
                        <CustomizedCheckbox values={{
                            label: "Senior Level",
                            id: "Senior"
                        }} />
                        <CustomizedCheckbox values={{
                            label: "Director",
                            id: "Director"
                        }} />
                        <CustomizedCheckbox values={{
                            label: "VP or Above",
                            id: "vp"
                        }} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default JobLevelCategory