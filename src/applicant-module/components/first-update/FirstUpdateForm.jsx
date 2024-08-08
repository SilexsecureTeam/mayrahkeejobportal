import { useState } from 'react';
import UseModal from '../general/UseModal';
import NewForm from './NewForm';

const FirstUpdateForm = () => {
    const [isOpen, setIsOpen] = useState(true);
    const header = "Update Your Profile"
    return (
        <>
            {/* <button
                onClick={() => setIsOpen(true)}
                className="p-2 px-3 border-2 flex  border-green-700 font-medium hover:bg-green-100 text-green-700 items-center">
                Edit Profile
            </button> */}
            <UseModal header={header} setIsOpen={setIsOpen} isOpen={isOpen} >
                <p>Please complete your Registrration</p>
                <NewForm setIsOpen={setIsOpen} />
            </UseModal>
        </>
    )
}

export default FirstUpdateForm