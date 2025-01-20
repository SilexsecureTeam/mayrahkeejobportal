import React, { useState } from 'react'
import CustomizedCheckbox from './CustomizedCheckbox'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const EmploymentCategory = ({ setEmploymentType }) => {
    const [close, setClose] = useState(false)
    return (
        <div>
            <div className="mb-5">
                <div className="flex justify-between cursor-pointer" 
                        onClick={() => setClose(!close)}>
                    <p className="font-bold">Type of Employment</p>
                    <button
                    >{close ? <FaChevronUp /> : <FaChevronDown />}</button>
                </div>
                {close && (
                    <div className="">
                        <CustomizedCheckbox
                            setSelectedValue={setEmploymentType}
                            values={{
                                label: "Undo",
                                value: "",
                                id: "employmentNil",
                                name: "employmentType"
                            }} />
                        <CustomizedCheckbox
                            setSelectedValue={setEmploymentType}
                            values={{
                                label: "Full time",
                                value: "Full",
                                id: "fullTime",
                                name: "employmentType"
                            }} />
                        <CustomizedCheckbox
                            setSelectedValue={setEmploymentType}
                            values={{
                                label: "Part time",
                                value: "Part",
                                id: "partTime",
                                name: "employmentType"
                            }} />
                        <CustomizedCheckbox
                            setSelectedValue={setEmploymentType}
                            values={{
                                label: "Remote",
                                value: "Remote",
                                id: "remote",
                                name: "employmentType"
                            }} />
                        <CustomizedCheckbox
                            setSelectedValue={setEmploymentType}
                            values={{
                                label: "Internship",
                                value: "Internship",
                                id: "Internship",
                                name: "employmentType"
                            }} />
                        <CustomizedCheckbox
                            setSelectedValue={setEmploymentType}
                            values={{
                                label: "Contract",
                                value: "Contract",
                                id: "Contract",
                                name: "employmentType"
                            }} />
     <CustomizedCheckbox
                            setSelectedValue={setEmploymentType}
                            values={{
                                label: "Hybrid",
                                value: "Hybrid",
                                id: "Hybrid",
                                name: "employmentType"
                            }} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default EmploymentCategory