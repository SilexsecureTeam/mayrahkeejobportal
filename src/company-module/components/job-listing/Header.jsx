function Header({ options, currentOption, setCurrentOption }) {
  return (
    <div className=" w-full justify-between gap-[10px] border-b flex flex-col">
      <div className="flex w-full justify-between ">
        <div className="flex flex-col gap-[5px]">
          <h1 className="font-semibold">Social Media Assistant</h1>
          <span className="text-gray-400 text-little">
            Design - Fulltime - 4/11 Hired
          </span>
        </div>

        <button className="px-2 py-1 h-fit border border-primaryColor text-primaryColor text-sm">
          More Actions
        </button>
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
