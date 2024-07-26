import wheelIcon from "../../../assets/pngs/wheel-icon-black.png";
import ProgressBar from "../shared/ProgressBar";
function JobItem({ data }) {
  return (
    <div className="flex flex-col  border justify-between h-full p-2">
      <div className="flex justify-between w-[150px] items-center">
        <img src={wheelIcon} className="h-[30px] w-[30px]" />
        <button className="bg-green-600/40 text-black text-little px-2 h-fit rounded-[20px]">
          {data.type}
        </button>
      </div>

      <div className="flex flex-col gap-[5px]">
        <h3 className="text-black font-semibold text-little">{data.title}</h3>
        <span className="text-gray-400 font-semibold text-little">
          Agency - {data.agency}
        </span>
      </div>

      <div className="flex justify-between">
        <button className="border border-[#ffb836] text-little px-2 h-fit  text-[#ffb836] rounded-[20px]">
          {data.options[0]}
        </button>
        <button className="border border-primaryColor text-little px-2 h-fit   text-primaryColor rounded-[20px]">
          {data.options[1]}
        </button>
      </div>

      <div className="flex flex-col">
        <ProgressBar measured={data.applicants} total={data.capacity} />

        <span className="font-semibold text-little text-gray-800">
          {data.applicants} Applied{" "}
          <span className="text-gray-400 font-normal">of {data.capacity} capacity</span>
        </span>
      </div>
    </div>
  );
}

export default JobItem;
