function BasicJobInput({ data, jobUtils }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 border-b py-2 text-little">
      <div className="flex flex-col w-full sm:max-w-[25%] gap-2">
        <h3 className="text-gray-700 text-sm font-semibold">{data.label}</h3>
        <span className="text-little text-gray-400">{data.prompt}</span>
      </div>

      <div className="flex flex-col gap-1 w-full sm:max-w-[70%]">
        <input
          value={jobUtils.details[data.name]}
          onChange={jobUtils.onTextChange}
          name={data.name}
          type={data.type}
          className="border focus:outline-none w-full py-1 px-2"
          placeholder={data.placeholder}
        />
        <span className="text-[10px] text-gray-400">
          At least 80 characters
        </span>
      </div>
    </div>
  );
}

export default BasicJobInput;
