import { IoMdCloseCircle } from "react-icons/io";
import { useEffect, useState } from "react";


function NotificationsModal({
  isOpen,
  setIsOpen,
  data
}) {
  return (
    isOpen && (
      <div className="h-full z-10 w-full text-primaryColor text-little flex justify-center items-center bg-gray-600/70 fixed top-0 left-0">
        <div className="w-[40%] min-h-[30%] h-fit p-3 flex flex-col  rounded-[10px]  bg-white border">
          <IoMdCloseCircle
            onClick={() => setIsOpen(false)}
            className="text-lg place-self-end  cursor-pointer"
          />
          <div className="flex flex-col w-full h-full  gap-[10px]">
            <h4 className="text-[16px] font-semibold border-b">
              Notifications
            </h4>

            <div className="items-center flex  justify-center">
                {data?.length === 0 || !data && <span className="text-red-500 text-center mt-[20px] w-full">No notification</span>}
            </div>

          </div>
        </div>
      </div>
    )
  );
}

export default NotificationsModal;
