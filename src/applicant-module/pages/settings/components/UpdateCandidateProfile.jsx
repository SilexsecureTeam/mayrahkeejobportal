import React, { useState } from 'react'
import UseModal from '../../../components/general/UseModal'
import BasicInfo from './BasicInfo';

const UpdateCandidateProfile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const header = "Update Applicant Profile"
    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 px-3 border-2 flex  border-green-700 font-medium hover:bg-green-100 text-green-700 items-center">
                Edit Profile
            </button>
            <UseModal header={header} setIsOpen={setIsOpen} isOpen={isOpen} >
                <BasicInfo />
            </UseModal>
        </>
    )
}

export default UpdateCandidateProfile