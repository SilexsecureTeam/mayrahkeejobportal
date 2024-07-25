import React, { useState } from 'react'
import CustomizedCheckbox from './CustomizedCheckbox'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const JobCategory = () => {
    const [close, setClose] = useState(true)
    return (
        <div>
            <div className="mb-5">
                <div className="flex justify-between">
                    <p className="font-bold">Categories</p>
                    <button
                        onClick={() => setClose(!close)}
                    >{close ? <FaChevronUp /> : <FaChevronDown />}</button>
                </div>
                {close && (
                    <div className="">
                        <CustomizedCheckbox values={{
                            label: "Design",
                            id: "Design"
                        }} />
                        <CustomizedCheckbox values={{
                            label: "Sales",
                            id: "Sales"
                        }} />
                        <CustomizedCheckbox values={{
                            label: "Marketing",
                            id: "Marketing"
                        }} />
                        <CustomizedCheckbox values={{
                            label: "Human Resource",
                            id: "resource"
                        }} />
                        <CustomizedCheckbox values={{
                            label: "Finance",
                            id: "Finance"
                        }} />
                        <CustomizedCheckbox values={{
                            label: "Engineering",
                            id: "Engineering"
                        }} />
                        <CustomizedCheckbox values={{
                            label: "Technology",
                            id: "Technology"
                        }} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default JobCategory