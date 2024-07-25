import React, { useState } from 'react'
import CustomizedCheckbox from '../../jobs/components/CustomizedCheckbox'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const CompanySizeType = () => {
    const [close, setClose] = useState(true)
    return (
        <div>
            <div className="mb-5">
                <div className="flex justify-between">
                    <p className="font-bold">Company Size</p>
                    <button
                        onClick={() => setClose(!close)}
                    >{close ? <FaChevronUp /> : <FaChevronDown />}</button>
                </div>
                {close && (
                    <div className="">
                        <CustomizedCheckbox values={{
                            label: "50-100",
                            id: "50"
                        }} />
                        <CustomizedCheckbox values={{
                            label: "101-150",
                            id: "101"
                        }} />
                        <CustomizedCheckbox values={{
                            label: "151-250",
                            id: "151"
                        }} />
                        <CustomizedCheckbox values={{
                            label: "251-500",
                            id: "251"
                        }} />
                        <CustomizedCheckbox values={{
                            label: "501-1000",
                            id: "501"
                        }} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default CompanySizeType