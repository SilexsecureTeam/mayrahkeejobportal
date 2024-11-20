import { useState } from "react";
import Chart from "react-apexcharts";

const RoundChart = ({ series = [52.56, 10, 50.83], colors = ["#000000", "#6c63ff", "#29cc97"] }) => {
  const labels = ["CRM Team Performance", "Recurring Calls", "Tickets Raised"];
  const [options] = useState({
    chart: { type: "donut" },
    animations: { enabled: true, easing: "easeinout", speed: 500 },
    labels: labels,
    colors: colors,
    legend: { show: false },
    plotOptions: { pie: { donut: { size: "60%" } } },
  });

  return (
    <div className="my-3 flex flex-col lg:flex-row justify-center items-center w-full max-w-[300px] lg:max-w-none mx-auto overflow-x-hidden space-y-4 lg:space-y-0 lg:space-x-6">
      {/* Custom Legend */}
      <div className="flex-1 flex flex-col mt-4 space-y-2 w-full lg:w-auto">
        {series.map((value, index) => (
          <div key={index} className="font-medium text-sm flex gap-3 items-center justify-between w-full">
            <div className="flex items-center">
              <span className="flex-shrink-0 w-4 h-4 mr-2 rounded-full" style={{ backgroundColor: colors[index] }}></span>
              <span>{labels[index]}</span>
            </div>
            <span className="text-gray-800">{value}%</span>
          </div>
        ))}
      </div>

      {/* Chart */}
      <Chart options={options} series={series} type="donut" width={200} height={200} />
    </div>
  );
};

export default RoundChart;
