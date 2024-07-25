import React, { useState } from 'react'
import CustomizedCheckbox from './CustomizedCheckbox'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const EmploymentCategory = () => {
    const [close, setClose] = useState(true)
    return (
        <div>
            <div className="mb-5">
                <div className="flex justify-between">
                    <p className="font-bold">Type of Employment</p>
                    <button
                        onClick={() => setClose(!close)}
                    >{close ? <FaChevronUp /> : <FaChevronDown />}</button>
                </div>
                {close && (
                    <div className="">
                        <CustomizedCheckbox values={{
                            label: "Full time",
                            id: "fullTime"
                        }} />
                        <CustomizedCheckbox values={{
                            label: "Part time",
                            id: "partTime"
                        }} />
                        <CustomizedCheckbox values={{
                            label: "Remote",
                            id: "remote"
                        }} />
                        <CustomizedCheckbox values={{
                            label: "Internship",
                            id: "Internship"
                        }} />
                        <CustomizedCheckbox values={{
                            label: "Contract",
                            id: "Contract"
                        }} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default EmploymentCategory