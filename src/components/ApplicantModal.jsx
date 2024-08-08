import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';

const ApplicantModal = () => {
    const [isOpen, setIsOpen] = useState(true)
const navigate = useNavigate();
    function closeModal() {
        setIsOpen(false);
    }

    function handleRedirection() {
        setIsOpen(false);
        navigate("/applicant/setting")
    }


    return (
        <div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-green-950/45" />
                    </Transition.Child>

                    <div className="fixed inset-0 ">
                        <div className="flex min-h-full items-center justify-center  text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-[90%] md:max-w-[50%] max-h-[60%] h-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div className="text-lg font-medium border-b pb-[5px] flex justify-between items-center  w-full leading-6 text-gray-900">
                                        <span className="font-bold font-sans  text-lg">
                                           Proceed to Update your Profile
                                        </span>
                                        <button
                                            onClick={closeModal}
                                            className="py-[5px] w-[14%] flex justify-between items-center px-[10px] text-center bg-gray-300 rounded-[20px]"
                                        >
                                            {/* <div className="h-[30px] w-[30px] bg-red-400 rounded-full" /> */}
                                            Later
                                        </button>
                                    </div>
                                    <div className="my-5">
                                        <button 
                                        onClick={handleRedirection}
                                        className="py-1 px-5 rounded font-medium text-white text-lg bg-green-400">
                                            Ok
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}

export default ApplicantModal