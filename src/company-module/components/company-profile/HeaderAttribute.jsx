function HeaderAttribute({ data }) {
  return (
    <div className="w-[23%] flex items-end gap-[5px]">
      <img src={data.icon} className="h-[30px] w-[30px]" />
      <div className="flex flex-col">
        <span className="text-little text-gray-400">{data.title}</span>
        <span className="text-little font-semibold text-black">{data.content}</span>
      </div>
    </div>
  );
}

export default HeaderAttribute;
