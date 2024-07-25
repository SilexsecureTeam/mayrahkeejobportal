import React, { useState } from 'react'
import CustomizedCheckbox from '../../jobs/components/CustomizedCheckbox'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const Insdustriestype = () => {
    const [close, setClose] = useState(true)
    return (
        <div>
            <div className="mb-5">
                <div className="flex justify-between">
                    <p className="font-bold">Indusries</p>
                    <button
                        onClick={() => setClose(!close)}
                    >{close ? <FaChevronUp /> : <FaChevronDown />}</button>
                </div>
                {close && (
                    <div className="">
                        <CustomizedCheckbox values={{
                            label: "Advertising",
                            id: "Advertising"
                        }} />
                        <CustomizedCheckbox values={{
                            label: "Business Service",
                            id: "business"
                        }} />
                        <CustomizedCheckbox values={{
                            label: "Block Chian",
                            id: "blockChain"
                        }} />
                        <CustomizedCheckbox values={{
                            label: "Cloud",
                            id: "Cloud"
                        }} />
                        <CustomizedCheckbox values={{
                            label: "Consumer Tech",
                            id: "Consumer"
                        }} />
                        <CustomizedCheckbox values={{
                            label: "Education",
                            id: "Education"
                        }} />
                        <CustomizedCheckbox values={{
                            label: "Fintech",
                            id: "Fintech"
                        }} />
                        <CustomizedCheckbox values={{
                            label: "Gaming",
                            id: "Gaming"
                        }} />
                        <CustomizedCheckbox values={{
                            label: "Food",
                            id: "Food"
                        }} />
                        <CustomizedCheckbox values={{
                            label: "Healthcare",
                            id: "Healthcare"
                        }} />
                        <CustomizedCheckbox values={{
                            label: "Hosting",
                            id: "Hosting"
                        }} />
                        <CustomizedCheckbox values={{
                            label: "Media",
                            id: "Media"
                        }} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Insdustriestype