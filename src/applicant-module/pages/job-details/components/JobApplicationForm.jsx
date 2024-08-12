import React, { useState, useEffect, useContext } from 'react'
import UseModal from '../../../components/general/UseModal';
import JobForm from './JobForm';
import { ResourceContext } from '../../../../context/ResourceContext';

const JobApplicationForm = ({ job }) => {
    const { getCandidate, setGetCandidate } = useContext(ResourceContext);

    const [isOpen, setIsOpen] = useState(false);
    const header = "Fill the form to  apply"

    useEffect(() => {
        setGetCandidate((prev) => {
            return {
                ...prev, isDataNeeded: true
            }
        })
    }, [])

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className='px-10 py-2 green_btn text-white hover:bg-green-700'>
                Apply
            </button>
            <UseModal header={header} setIsOpen={setIsOpen} isOpen={isOpen} >
                <JobForm
                    setIsOpen={setIsOpen}
                    getCandidate={getCandidate.data}
                    job={job} />
            </UseModal>
        </>
    )
}

export default JobApplicationForm