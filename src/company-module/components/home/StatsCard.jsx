// StatsCard.jsx
import { FaArrowRight } from "react-icons/fa";

function StatsCard({ data, value, onClick }) {
  return (
    <li
      onClick={onClick}
      className={`flex-1 min-w-[220px] md:min-w-[250px] hover:scale-105 cursor-pointer transition-transform duration-150 text-white shadow-sm flex items-center justify-between p-4 ${data.bg_color}`}
    >
      <div className="flex items-center gap-3">
        <h2 className="text-lg md:text-2xl font-bold">{value.length}</h2>
        <span className="text-xs md:text-sm font-medium opacity-90">
          {data.title}
        </span>
      </div>
      <FaArrowRight className="text-white text-lg md:text-xl opacity-90" />
    </li>
  );
}

export default StatsCard;
