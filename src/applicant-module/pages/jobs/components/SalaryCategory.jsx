import React, { useState } from 'react'
import CustomizedCheckbox from './CustomizedCheckbox'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const SalaryCategory = () => {
    const [close, setClose] = useState(true)
    return (
        <div>
            <div className="mb-5">
                <div className="flex justify-between">
                    <p className="font-bold">Salary Range</p>
                    <button
                        onClick={() => setClose(!close)}
                    >{close ? <FaChevronUp /> : <FaChevronDown />}</button>
                </div>
                {close && (
                    <div className="">
                        <CustomizedCheckbox values={{
                            label: "$700 - $1000",
                            id: "700"
                        }} />
                        <CustomizedCheckbox values={{
                            label: "$1000 - $1500",
                            id: "1000"
                        }} />
                        <CustomizedCheckbox values={{
                            label: "$1500 - $2000",
                            id: "1500"
                        }} />
                        <CustomizedCheckbox values={{
                            label: "$3000 - Above",
                            id: "3000"
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

export default SalaryCategory