import { Helmet } from "react-helmet";
import { AiOutlineSend } from "react-icons/ai";
import { BsPinAngle } from "react-icons/bs";
import { CiSearch, CiStar } from "react-icons/ci";
import { DiVim } from "react-icons/di";
import { GrAttachment } from "react-icons/gr";
import { MdMoreVert, MdOutlineEmojiEmotions } from "react-icons/md";
import Conversations from "./components/Conversations";

function Messages() {
  return (
    <>
      <Helmet>
        <title>Dashboard | Messages</title>
      </Helmet>
      <div className="h-full text-sm w-full">
        <div className="flex text-primary h-full">
          <div className="w-1/3 p-5">
            <div className="relative border py-1 px-6 mb-4">
              <input type="text" placeholder="Search messages" className="pl-[10px] focus:outline-none w-full" />
              <span className="absolute text-primary top-0 left-0 p-2">
                <CiSearch />
              </span>
            </div>
            <div className="grid grid-cols-1 divide-y">
              <div className="flex items-center cursor-pointer hover:bg-[#47AA4933] p-2">
                <div className="">
                  <div className="bg-gray-300 size-12 rounded-full"></div>
                </div>
                <div className="ml-2 w-full">
                  <div className="flex mb-1 justify-between">
                    <p className="font-bold">Jan Mayer</p>
                    <span>12 mins ago</span>
                  </div>
                  <p>We want to invite you for a qui...</p>
                </div>
              </div>
              <div className="flex items-center cursor-pointer hover:bg-[#47AA4933] p-2">
                <div className="">
                  <div className="bg-gray-300 size-12 rounded-full"></div>
                </div>
                <div className="ml-2 w-full">
                  <div className="flex mb-1 justify-between">
                    <p className="font-bold">Jan Mayer</p>
                    <span>12 mins ago</span>
                  </div>
                  <p>We want to invite you for a qui...</p>
                </div>
              </div>
              <div className="flex items-center cursor-pointer hover:bg-[#47AA4933] p-2">
                <div className="">
                  <div className="bg-gray-300 size-12 rounded-full"></div>
                </div>
                <div className="ml-2 w-full">
                  <div className="flex mb-1 justify-between">
                    <p className="font-bold">Jan Mayer</p>
                    <span>12 mins ago</span>
                  </div>
                  <p>We want to invite you for a qui...</p>
                </div>
              </div>
              <div className="flex items-center cursor-pointer hover:bg-[#47AA4933] p-2">
                <div className="">
                  <div className="bg-gray-300 size-12 rounded-full"></div>
                </div>
                <div className="ml-2 w-full">
                  <div className="flex mb-1 justify-between">
                    <p className="font-bold">Jan Mayer</p>
                    <span>12 mins ago</span>
                  </div>
                  <p>We want to invite you for a qui...</p>
                </div>
              </div>
              <div className="flex items-center cursor-pointer hover:bg-[#47AA4933] p-2">
                <div className="">
                  <div className="bg-gray-300 size-12 rounded-full"></div>
                </div>
                <div className="ml-2 w-full">
                  <div className="flex mb-1 justify-between">
                    <p className="font-bold">Jan Mayer</p>
                    <span>12 mins ago</span>
                  </div>
                  <p>We want to invite you for a qui...</p>
                </div>
              </div>
              <div className="flex items-center cursor-pointer hover:bg-[#47AA4933] p-2">
                <div className="">
                  <div className="bg-gray-300 size-12 rounded-full"></div>
                </div>
                <div className="ml-2 w-full">
                  <div className="flex mb-1 justify-between">
                    <p className="font-bold">Jan Mayer</p>
                    <span>12 mins ago</span>
                  </div>
                  <p>We want to invite you for a qui...</p>
                </div>
              </div>
              <div className="flex items-center cursor-pointer hover:bg-[#47AA4933] p-2">
                <div className="">
                  <div className="bg-gray-300 size-12 rounded-full"></div>
                </div>
                <div className="ml-2 w-full">
                  <div className="flex mb-1 justify-between">
                    <p className="font-bold">Jan Mayer</p>
                    <span>12 mins ago</span>
                  </div>
                  <p>We want to invite you for a qui...</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-2/3 h-full border-l">
            <div className="mb-5  border-b p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="">
                    <div className="bg-gray-300 size-12 rounded-full"></div>
                  </div>
                  <div className=" ml-2 ">
                    <p className="font-bold">Jan Mayer</p>
                    <span>12 mins ago</span>
                  </div>
                </div>
                <div className="flex text-base">
                  <span className="mx-2 cursor-pointer border p-0.5 rounded"><BsPinAngle /></span>
                  <span className="mx-2 cursor-pointer border p-0.5 rounded"><CiStar /></span>
                  <span className="mx-2 cursor-pointer border p-0.5 rounded"><MdMoreVert /></span>
                </div>
              </div>
            </div>
            <div className="p-5 py-3">
              <div className="flex justify-center border-b-2">
                <div className="md:w-3/4 text-center">
                  <div className="pb-5">
                    <div className="flex justify-center my-2 mt-0">
                      <div className="bg-gray-300 size-16 rounded-full"></div>
                    </div>
                    <div className=" ml-2 ">
                      <p className="font-bold">Jan Mayer</p>
                      <p>Recruiter at Nomad</p>
                      <p>This is the very beginning of your direct message with <b>Jan Mayer</b></p>
                    </div>
                  </div>
                </div>
              </div>
              <Conversations />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Messages;
