import { IoMdCloseCircle } from "react-icons/io";

function UseModal({ isOpen, setIsOpen, header, children }) {
  return (
    isOpen && (
      <div className="fixed inset-0 -left-3 w-full z-[1000000] flex items-center justify-center bg-gray-600/70 text-gray-400">
        <div className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] max-h-[90vh] px-4 pb-4 bg-white border rounded-lg overflow-y-auto thin_scroll_bar mx-auto relative">
          <div className="flex flex-col gap-4 px-2">
            <div className="sticky z-10 top-0 flex justify-between items-center gap-3 items-center py-4 border-b bg-white">
              <h3 className="text-lg font-semibold text-gray-600 ">
                {header}
              </h3>
              <IoMdCloseCircle
                size="24"
                onClick={() => setIsOpen(false)}
                className="text-lg text-red-600 cursor-pointer"
              />
            </div>
            {children}
          </div>
        </div>
      </div>
    )
  );
}

export default UseModal;
