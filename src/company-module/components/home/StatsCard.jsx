import ArrowRight from "../../../assets/pngs/arrow-right.png";

function StatsCard({ data, value, onClick }) {
  return (
    <li
      onClick={onClick}
      className={`md:w-[25%] w-[32%] hover:scale-105 cursor-pointer duration-100 text-white min-h-12 flex items-center justify-between p-2 ${data.bg_color}`}
    >
      <h2 className="md:text-xl text-lg font-bold">{value.length}</h2>
      <span className="md:text-sm text-little text-center">{data.title}</span>
      <img src={ArrowRight} className="md:h-[20px] h-[10px] w-[10px]  md:w-[20px]" />
    </li>
  );
}

export default StatsCard;
