function BasicInput({ data, details, onTextChange }) {
  return (
    <div className="w-full flex flex-col gap-[3px]">
      <label className="text-sm font-semibold">{data.label}</label>
      <input
        value={details[data?.name]}
        onChange={onTextChange}
        required={data.required}
        className="p-2 border focus:outline-none"
        name={data.name}
        placeholder={data.placeholder}
        type={data.type}
      />
    </div>
  );
}

export default BasicInput;
