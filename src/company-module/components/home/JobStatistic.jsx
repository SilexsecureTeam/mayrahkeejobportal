import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const options = [
  "Overview",
  "Rejected Applicants",
  "Interviewed Applicants",
  "Onboarded Applicants",
];

function JobStatistic({ applicants, byCategory }) {
  const [active, setActive] = useState(options[0]);

  // Filter applicants based on the selected option
  const filterApplicants = (status) => {
    switch (status) {
      case "Rejected Applicants":
        return applicants.filter((app) => app.status === "declined");
      case "Interviewed Applicants":
        return applicants.filter((app) => app.status === "shortlist");
      case "Onboarded Applicants":
        return applicants.filter((app) => app.status === "hired");
      default: // Overview
        return applicants;
    }
  };

  // Generate chart data for the selected filter
  const generateChartData = () => {
    const filteredApplicants = filterApplicants(active);

    const applicantByCategory = {};
    Object.keys(byCategory).forEach((cat) => {
      const jobApplicants = filteredApplicants.filter(
        (app) => app.job_id === byCategory[cat][0].job_id
      );
      const key = byCategory[cat][0].job_title;
      applicantByCategory[key] = jobApplicants.length;
    });

    return {
      categories: Object.keys(applicantByCategory),
      series: Object.values(applicantByCategory),
      total: filteredApplicants.length,
    };
  };

  const chartData = generateChartData();

  // Chart configurations
  const getChartConfig = () => {
    switch (active) {
      case "Overview":
        return {
          options: {
            chart: { type: "bar", toolbar: { show: false } },
            xaxis: { categories: chartData.categories },
            colors: ["#1E90FF"],
            title: { text: "Overview of All Applicants", style: { fontSize: "16px" } },
          },
          series: [
            {
              name: "Applicants",
              data: chartData.series,
            },
          ],
        };

      case "Rejected Applicants":
        return {
          options: {
            chart: { type: "bar", toolbar: { show: false } },
            xaxis: { categories: chartData.categories },
            colors: ["#FF6347"],
            title: { text: "Rejected Applicants by Job", style: { fontSize: "16px" } },
          },
          series: [
            {
              name: "Rejected Applicants",
              data: chartData.series,
            },
          ],
        };

      case "Interviewed Applicants":
        return {
          options: {
            chart: { type: "donut", toolbar: { show: false } },
            labels: chartData.categories,
            colors: ["#FFA500", "#FFD700", "#FF4500"],
            title: { text: "Interviewed Applicants by Job", style: { fontSize: "16px" } },
          },
          series: chartData.series,
        };

      case "Onboarded Applicants":
        return {
          options: {
            chart: { type: "donut", toolbar: { show: false } },
            labels: chartData.categories,
            colors: ["#32CD32", "#ADFF2F", "#7FFF00"],
            title: { text: "Onboarded Applicants by Job", style: { fontSize: "16px" } },
          },
          series: chartData.series,
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
      <div className="w-full p-2 items-center flex h-fit justify-center">
        {chartConfig ? (
          <ReactApexChart
            options={chartConfig.options}
            series={chartConfig.series}
            type={chartConfig.options.chart.type}
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
