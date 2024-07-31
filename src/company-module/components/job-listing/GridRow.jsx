import ApplicantCard from "./ApplicantCard";


function GridRow({data}) {
  return (
    <div className="flex flex-col border px-2 py-1 gap-[20px]">
      <div className={`"w-full items-center border border-t-[2px] ${data.border_color}  justify-between text-little flex p-1`}>
        <div className="h-[8px] bg-gray-400  w-[8px] rounded-full" />
        <span>In Review</span>
        <span className="h-[20px] w-[20px] items-center justify-center flex bg-gray-300">13</span>
        <span>...</span>
      </div>

      <ul className="flex flex-col w-full gap-[10px] justify-between">
           <ApplicantCard/>
           <ApplicantCard/>
           <ApplicantCard/>
      </ul>
    </div>
  );
}

export default GridRow;
