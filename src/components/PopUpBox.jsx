
function PopUpBox({ isOpen, children}) {
  return (
    isOpen && (
      <div className="h-full w-full flex justify-center items-center bg-gray-600/70 fixed top-0 left-0">
        {children}
      </div>
    )
  );
}

export default PopUpBox;
