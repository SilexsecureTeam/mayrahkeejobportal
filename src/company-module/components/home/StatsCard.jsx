import ArrowRight from "../../../assets/pngs/arrow-right.png";

function StatsCard({ data, value, onClick }) {
  return (
    <li
      onClick={onClick}
      className={`w-[25%] hover:scale-105 cursor-pointer duration-100 text-white h-full flex items-center justify-between p-2 ${data.bg_color}`}
    >
      <h2 className="text-xl font-bold">{value.length}</h2>
      <span className="text-sm">{data.title}</span>
      <img src={ArrowRight} className="h-[20px] w-[20px]" />
    </li>
  );
}

export default StatsCard;
