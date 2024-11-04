import { IoMdCloseCircle } from "react-icons/io";

function RedirectModal({ isOpen, setIsOpen, user, navigateToProfile }) {
  return (
    isOpen && (
      <div className="h-full w-full flex justify-center bg-gray-600/70 fixed top-0 left-0">
        <div className="w-[40%] h-[25%] p-2 flex flex-col mt-[10%] rounded-[10px]  bg-white border">
          <IoMdCloseCircle onClick={() => setIsOpen(false)} className="text-lg place-self-end text-gray-400 cursor-pointer" />
          <div className="w-full p-2 flex gap-[10px] flex-col">
            <h3 className="font-semibold text-lg text-gray-600">{`Welcome ${user?.name}`}</h3>
            <p className="w-full text-little text-gray-400">
              Thanks for joining us! To get started, please complete your
              profile so we can tailor the experience for you.
            </p>

            <button onClick={() => navigateToProfile(setIsOpen)} className="px-2 p-1 w-[30%] place-self-end rounded-[5px] text-white font-semibold text-little bg-primaryColor">
              Complete update
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default RedirectModal;
