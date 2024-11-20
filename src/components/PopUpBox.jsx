
function PopUpBox({ isOpen, children}) {
  return (
    isOpen && (
      <div className="h-full z-[999] w-full flex justify-center items-center bg-gray-600/50 fixed top-0 left-0">
        {children}
      </div>
    )
  );
}

export default PopUpBox;
