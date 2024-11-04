function Header({ options, currentOption, setCurrentOption }) {
    return (
      <div className=" w-full justify-between gap-[10px] border-b flex flex-col">
        <div className="flex w-full justify-between ">
          <div className="flex flex-col gap-[5px]">
            <h1 className="font-semibold">Help Center</h1>
            <span className="text-gray-400 text-little">
              Have a problem? Here what we have to say or contacnt us for help
            </span>
          </div>
  
  
        </div>
  
        <ul className="flex gap-[10px] ">
          {options.map((current) => (
            <li
              onClick={() => setCurrentOption(current)}
              className={`pb-[2] text-little cursor-pointer ${
                current.id === currentOption.id
                  ? "border-b-2 text-gray-700 border-primaryColor"
                  : "border-0 text-gray-400"
              }`}
              key={current.id}
            >
              {current.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default Header;
  