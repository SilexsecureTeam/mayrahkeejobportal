function HeaderAttribute({ data }) {
  return (
    data.content &&<div className="flex items-center truncate gap-[5px]">
      <div className="h-[30px] items-center flex">
      {<data.icon />}
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-little text-gray-800">{data.title}</span>
        <a href={data.content} className="text-little cursor-pointer hover:underline font-semibold text-black">{data.content}</a>
      </div>
    </div>
  );
}

export default HeaderAttribute;
