import React from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import { GrAttachment } from 'react-icons/gr'
import { MdOutlineEmojiEmotions } from 'react-icons/md'

const Conversations = () => {
    return (
        <div className="relative pb-[45px]">
            <div style={{ scrollbarWidth: "none" }} className=" h-[250px] overflow-y-auto py-3">
                {/* <div>
                    <div className="flex">
                        <div className="w-4/5 flex mb-3">
                            <div className="">
                                <div className="bg-gray-300 size-10 rounded-full"></div>
                            </div>
                            <div className="ml-2 w-full">
                                <p className="font-bold">Jan Mayer</p>
                                <div className=" p-2 border mt-2 ">
                                    <p>Hey Jake, I wanted to reach out because we saw your work contributions and were impressed by your work.</p>
                                </div>
                                <div className=" p-2 border mt-2 w-3/4">
                                    <p>We want to invite you for a quick interview</p>
                                </div>
                                <span className='text-xs mt-2'>12 mins ago</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div className="w-4/5 flex mb-3">
                            <div className="ml-2 flex items-end flex-col w-full">
                                <p className="font-bold text-end">You</p>
                                <p className="p-2 border text-end rounded mt-2 bg-[#47AA4933]">Hey Jake, I wanted to reach out because we saw your work contributions and were impressed by your work.</p>
                                <p className="p-2 border text-end rounded mt-2 bg-[#47AA4933]">We want to invite you for a quick interview</p>
                                <span className='text-xs mt-2'>12 mins ago</span>
                            </div>
                            <div className="ml-2">
                                <div className="bg-gray-300 size-10 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="flex items-center justify-center h-[100%]">
                    <p className="text">No message available</p>
                </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 w-full">
                <div className="relative border py-2 px-6">
                    <input type="text" placeholder="Reply messages" className="px-[20px] focus:outline-none w-full" />
                    <div className="absolute h-full flex items-center top-0 left-0 p-2">
                        <button className="hover:bg-gray-200 rounded p-2">
                            <GrAttachment />
                        </button>
                    </div>
                    <div className="absolute h-full flex items-center top-0 right-0 p-2">
                        <div className="flex">
                            <button className=" hover:bg-gray-200 rounded p-2 mr-2">
                                <MdOutlineEmojiEmotions />
                            </button>
                            <button className="prime_bg hover:text-gray-300 rounded text-white p-2 px-3">
                                <AiOutlineSend />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Conversations