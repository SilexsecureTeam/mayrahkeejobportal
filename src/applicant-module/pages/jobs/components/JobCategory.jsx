import React, { useState } from 'react'
import CustomizedCheckbox from './CustomizedCheckbox'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const JobCategory = ({setCategory}) => {
    const [close, setClose] = useState(false)
    return (
        <div>
            <div className="mb-5">
                <div onClick={() => setClose(!close)} className="flex justify-between cursor-pointer">
                    <p className="font-bold">Categories</p>
                    <button
                    >{close ? <FaChevronUp /> : <FaChevronDown />}</button>
                </div>
                {close && (
                    <div className="">
                        <CustomizedCheckbox 
                        setSelectedValue={setCategory}values={{
                            label: "Undo",
                            value: "",
                            id: "undoCategory",
                            name: "sector"
                        }} />
                        <CustomizedCheckbox 
                        setSelectedValue={setCategory}values={{
                            label: "Design",
                            value: "Design",
                            id: "Design",
                            name: "sector"
                        }} />
                        <CustomizedCheckbox 
                        setSelectedValue={setCategory}values={{
                            label: "Sales",
                            value: "Sales",
                            id: "Sales",
                            name: "sector"
                        }} />
                        <CustomizedCheckbox 
                        setSelectedValue={setCategory}values={{
                            label: "Marketing",
                            value: "Marketing",
                            id: "Marketing",
                            name: "sector"
                        }} />
                        <CustomizedCheckbox 
                        setSelectedValue={setCategory}values={{
                            label: "Human Resource",
                            value: "Human Resource",
                            id: "resource",
                            name: "sector"
                        }} />
                        <CustomizedCheckbox 
                        setSelectedValue={setCategory}values={{
                            label: "Finance",
                            value: "Finance",
                            id: "Finance",
                            name: "sector"
                        }} />
                        <CustomizedCheckbox 
                        setSelectedValue={setCategory}values={{
                            label: "Engineering",
                            value: "Engineering",
                            id: "Engineering",
                            name: "sector"
                        }} />
                        <CustomizedCheckbox 
                        setSelectedValue={setCategory}values={{
                            label: "Technology",
                            value: "Technology",
                            id: "Technology",
                            name: "sector"
                        }} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default JobCategory