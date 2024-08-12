import React, { useState } from 'react'
import { GrCircleAlert } from 'react-icons/gr'
import { BASE_URL } from '../../../../utils/base';
import NotificationModal from '../../../../components/NotificationModal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeleteUser = ({ authDetails }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [loading, setLoading] = useState(false)
    const label = "Delete Account"
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        setErrorMsg("")
        setLoading(true)
        axios.post(`${BASE_URL}/candidate/deleteUser/${authDetails.user?.id}`, {
            headers: {
                Authorization: `Bearer ${authDetails.token}`,
                // 'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                console.log(response)
                setLoading(false)
                setIsOpen(false)
                navigate("/");
            })
            .catch((error) => {
                console.log(error)
                if (error.response) {
                    setErrorMsg(error.response.data.message)
                } else {
                    console.log(error)
                    setErrorMsg(error.message)
                }
                setLoading(false);
            });
    }
    return (
        <>
            <div className="flex justify-end py-6">
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex px-4 py-2 rounded text-red-500 font-medium items-center hover:shadow-lg shadow-cyan-500/50 ">
                    <span>Close Account </span>
                    <span className='ml-3'><GrCircleAlert /></span>
                </button>
            </div>
            <NotificationModal
                size="md:max-w-[30%] "
                label={label}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            >
                <p>Are you sure you want to delete your account?</p>
                {errorMsg &&
                    <p className="text-center text-red-500">{errorMsg}</p>
                }
                <div className="flex justify-end py-6">
                    <button
                        disabled={loading}
                        onClick={handleSubmit}
                        className="flex px-4 py-2 rounded text-red-500 font-medium items-center hover:shadow-lg shadow-cyan-500/50 ">
                        <span>Close Account </span>
                        <span className='ml-3'><GrCircleAlert /></span>
                    </button>
                </div>
            </NotificationModal>
        </>
    )
}

export default DeleteUser