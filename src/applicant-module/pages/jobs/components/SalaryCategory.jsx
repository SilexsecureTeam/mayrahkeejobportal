import React, { useState } from 'react'
import CustomizedCheckbox from './CustomizedCheckbox'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const SalaryCategory = ({ setSalaryRange }) => {
    const [close, setClose] = useState(false)
    return (
        <div>
            <div className="mb-5">
                <div onClick={() => setClose(!close)} className="flex justify-between cursor-pointer">
                    <p className="font-bold">Salary Range</p>
                    <button
                    >{close ? <FaChevronUp /> : <FaChevronDown />}</button>
                </div>
                {close && (
                    <div className="">
                        {/* <CustomizedCheckbox
                            setSelectedValue={setSalaryRange} values={{
                                label: "$700 - $1000",
                                value: 700,
                                name: "salaryLevel",
                                id: "700"
                            }} /> */}
                        <CustomizedCheckbox
                            setSelectedValue={setSalaryRange} values={{
                                label: "Undo",
                                value: "",
                                name: "salaryLevel",
                                id: "salaryNil"
                            }} />
                        <CustomizedCheckbox
                            setSelectedValue={setSalaryRange} values={{
                                label: "$1000 - $1500",
                                value: 1000,
                                name: "salaryLevel",
                                id: "1000"
                            }} />
                        <CustomizedCheckbox
                            setSelectedValue={setSalaryRange} values={{
                                label: "$1500 - $2000",
                                value: 1500,
                                name: "salaryLevel",
                                id: "1500"
                            }} />
                        <CustomizedCheckbox
                            setSelectedValue={setSalaryRange} values={{
                                label: "$3000 - Above",
                                value: 3000,
                                name: "salaryLevel",
                                id: "3000"
                            }} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default SalaryCategory