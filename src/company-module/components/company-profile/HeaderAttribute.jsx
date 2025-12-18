function HeaderAttribute({ data }) {
  return (
    data.content && (
      <div className="flex gap-[5px]">
        <div className="h-[30px] items-center flex">{<data.icon />}</div>
        <div className="flex flex-col justify-center">
          <span className="text-little text-gray-800">{data.title}</span>
          <a
            href={data.content}
            className="text-little cursor-pointer hover:underline font-semibold text-black break-all line-clamp-1"
          >
            {data.content?.length > 15 ? `${data.content}...` : data.content}
          </a>
        </div>
      </div>
    )
  );
}

export default HeaderAttribute;
