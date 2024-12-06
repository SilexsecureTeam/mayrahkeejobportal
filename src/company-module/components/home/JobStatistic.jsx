import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const options = [
  "Overview",
  "Declined Applicants",
  "Interviewed Applicants",
  "Onboarded Applicants",
];

function JobStatistic({ applicants, byCategory }) {
  const [active, setActive] = useState(options[0]);

  // Group applicants by job and status
  const groupApplicantsByJob = (filterStatus) => {
    const groupedData = {};
    Object.keys(byCategory).forEach((cat) => {
      const jobId = byCategory[cat][0].job_id;
      const jobTitle = byCategory[cat][0].job_title;

      const filteredCount = applicants.filter(
        (app) => app.job_id === jobId && (!filterStatus || app.status === filterStatus)
      ).length;

      groupedData[jobTitle] = filteredCount;
    });
    return groupedData;
  };

  // Generate chart data
  const generateChartData = () => {
    let statusFilter;
    switch (active) {
      case "Declined Applicants":
        statusFilter = "declined";
        break;
      case "Interviewed Applicants":
        statusFilter = "shortlist";
        break;
      case "Onboarded Applicants":
        statusFilter = "hired";
        break;
      default:
        statusFilter = null; // Overview includes all
    }

    const groupedData = groupApplicantsByJob(statusFilter);
    return {
      categories: Object.keys(groupedData),
      series: Object.values(groupedData),
    };
  };

  const chartData = generateChartData();

  // Chart configurations
  const getChartConfig = () => {
    const baseConfig = {
      xaxis: {
        categories: chartData.categories,
        labels: {
          rotate: -45,
          style: { fontSize: "10px" },
        },
      },
      title: { style: { fontSize: "16px" } },
      colors: [],
      legend: {
        show: true,
        position: "bottom",
        formatter: (seriesName, opts) =>
          `${seriesName}: ${opts.w.globals.series[opts.seriesIndex]}`,
      },
    };

    switch (active) {
      case "Overview":
        return {
          ...baseConfig,
          chart: { type: "bar", stacked: true },
          colors: ["#FF6347", "#FFA500", "#32CD32"],
          series: [
            { name: "Rejected", data: chartData.series },
            { name: "Interviewed", data: chartData.series },
            { name: "Onboarded", data: chartData.series },
          ],
          title: { text: "Overview of All Applicants" },
        };

      case "Declined Applicants":
        return {
          ...baseConfig,
          chart: { type: "bar" },
          colors: ["#FF6347"],
          series: [{ name: "Declined Applicants", data: chartData.series }],
          title: { text: "Declined Applicants by Job" },
        };

      case "Interviewed Applicants":
        return {
          ...baseConfig,
          chart: { type: "donut" },
          labels: chartData.categories,
          colors: ["#FFA500", "#FFD700", "#FF4500"],
          series: chartData.series,
          title: { text: "Interviewed Applicants by Job" },
        };

      case "Onboarded Applicants":
        return {
          ...baseConfig,
          chart: { type: "donut" },
          labels: chartData.categories,
          colors: ["#32CD32", "#ADFF2F", "#7FFF00"],
          series: chartData.series,
          title: { text: "Onboarded Applicants by Job" },
        };

      default:
        return null;
    }
  };

  const chartConfig = getChartConfig();

  return (
    <div className="border h-fit md:h-full w-full md:w-[65%]">
      {/* Header Section */}
      <div className="h-[28%] border-b px-2 justify-between pt-1 flex flex-col">
        <div className="w-full justify-between flex">
          <div className="flex flex-col">
            <h3 className="font-semibold text-sm">Job Statistics</h3>
            <span className="text-gray-400 text-little">
              Showing statistics for {active}
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-5 border-b">
          {options.map((current, index) => (
            <h3
              key={index}
              onClick={() => setActive(current)}
              className={`text-little py-1 border-b cursor-pointer ${
                active === current ? "border-primaryColor" : ""
              } w-fit font-semibold`}
            >
              {current}
            </h3>
          ))}
        </div>
      </div>

      {/* Chart Section */}
      <div className="w-full p-2 items-center flex h-fit justify-center overflow-x-auto">
        {chartConfig ? (
          <ReactApexChart
            options={chartConfig}
            series={chartConfig.series}
            type={chartConfig.chart.type}
            height={300}
          />
        ) : (
          <span>No data available</span>
        )}
      </div>
    </div>
  );
}

export default JobStatistic;
