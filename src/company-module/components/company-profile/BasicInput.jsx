function BasicInput({ data, details, onTextChange, value = null }) {
  return (
    <div className="w-full flex flex-col gap-[3px]">
      <label className="text-sm font-semibold">{data.label}</label>
      <input
        value={details[data?.name] ? details[data?.name] : value}
        onChange={onTextChange}
        required={data.required}
        className="p-2 border focus:outline-none min-w-[96%]"
        name={data.name}
        placeholder={data.placeholder}
        type={data.type}
      />
    </div>
  );
}

export default BasicInput;
