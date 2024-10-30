import React, { useState } from 'react'
import CustomizedCheckbox from './CustomizedCheckbox'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const JobLevelCategory = ({ setJobLevel }) => {
<<<<<<< HEAD
    const [close, setClose] = useState(true)
=======
    const [close, setClose] = useState(false)
>>>>>>> afowebdev
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
                        <CustomizedCheckbox
                            setSelectedValue={setJobLevel} values={{
                                label: "Undo",
                                value: "",
                                id: "levelNil",
                                name: "CareerLevel"
                            }} />
                        <CustomizedCheckbox
                            setSelectedValue={setJobLevel} values={{
                                label: "Entry Level",
                                value: "Entry",
                                id: "entry",
                                name: "CareerLevel"
                            }} />
                        <CustomizedCheckbox
                            setSelectedValue={setJobLevel} values={{
                                label: "Mid Level",
                                value: "Mid",
                                name: "CareerLevel",
                                id: "mid"
                            }} />
                        <CustomizedCheckbox
                            setSelectedValue={setJobLevel} values={{
                                label: "Senior Level",
                                value: "Senior",
                                name: "CareerLevel",
                                id: "Senior"
                            }} />
                        <CustomizedCheckbox
                            setSelectedValue={setJobLevel} values={{
                                label: "Director",
                                value: "Director",
                                name: "CareerLevel",
                                id: "Director"
                            }} />
                        <CustomizedCheckbox
                            setSelectedValue={setJobLevel} values={{
                                label: "VP or Above",
                                value: "VP",
                                name: "CareerLevel",
                                id: "VP"
                            }} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default JobLevelCategory