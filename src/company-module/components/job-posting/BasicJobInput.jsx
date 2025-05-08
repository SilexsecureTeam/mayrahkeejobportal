function BasicJobInput({ data, jobUtils }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 border-b py-2 text-little">
      <div className="flex flex-col w-full sm:max-w-[25%] gap-2">
        <h3 className="text-gray-700 text-sm font-semibold flex gap-1">{data.label} {data?.required && <strong className="text-red-500">*</strong>}</h3>
        {/* <span className="text-little text-gray-600">{data.prompt}</span> */}
      </div>

      <div className="flex flex-col gap-1 w-full sm:max-w-[70%]">
        <input
          value={jobUtils.details[data.name]}
          onChange={jobUtils.onTextChange}
          name={data.name}
          type={data.type}
          spellCheck="true"
          className="text-sm border border-gray-400 focus:outline-none placeholder:text-gray-500 w-full p-2 invalid:border-red-600"
          placeholder={data.placeholder}
          min={data.min ? data?.min : null} // Set minimum value for numbers
          max={data.max ? data?.max : null} // Set maximum value for numbers
        />

        <span className="text-xs text-gray-400">
          {data?.verification ? data?.verification : "At least 80 characters"}
        </span>
      </div>
    </div>
  );
}

export default BasicJobInput;
