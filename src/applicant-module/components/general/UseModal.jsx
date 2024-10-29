import { IoMdCloseCircle } from "react-icons/io";
import { getImageURL } from "../../../utils/formmaters";
import wheelIcon from "../../../assets/pngs/wheel-icon-black.png";
import {
    FaRegEdit,
    FaFacebook,
    FaLinkedin,
    FaTwitter,
    FaInstagram,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function UseModal({ isOpen, setIsOpen, header, user, children }) {

    return (
        isOpen && (
            <div className="h-full z-10 w-full text-gray-400 text-little flex justify-center items-center bg-gray-600/70 fixed top-0 left-0">
                <div className="w-[70%] h-[90%] p-2 flex flex-col  rounded-[10px]  bg-white border">
                    <IoMdCloseCircle
                        onClick={() => setIsOpen(false)}
                        className="text-lg place-self-end mb-5 cursor-pointer"
                    />
                    <div className="w-full px-2 flex gap-[10px] flex-col h-[90%] overflow-y-auto thin_scroll_bar">
                        <h3 className="font-semibold text-lg border-b pb-2 text-gray-600">{header}</h3>
                        {children}
                    </div>
                </div>
            </div>
        )
    );
}

export default UseModal;