import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const options = [
  "Overview",
  "In-Review Applicants",
  "Shortlisted Applicants",
  "Interviewed Applicants",
  "Onboarded Applicants",
  "Declined Applicants"
];

function JobStatistic({ applicants, byCategory }) {
  const [active, setActive] = useState(options[0]);

  // Helper function to filter applicants based on the selected status.
  const filterApplicants = (status) => {
    switch (status) {
      case "Declined Applicants":
        return applicants.filter((app) => app.status === "declined");
      case "Shortlisted Applicants":
        return applicants.filter((app) => app.status === "shortlist");
      case "In-Review Applicants":
        return applicants.filter((app) => app.status === "in-review");
      case "Interviewed Applicants":
        return applicants.filter((app) => app.status === "interview");
      case "Onboarded Applicants":
        return applicants.filter((app) => app.status === "hired");
      default:
        return applicants; // Overview includes all
    }
  };

  const generateChartData = () => {
    const filteredApplicants = filterApplicants(active);

    // For "Overview", we return counts for each category
    if (active === "Overview") {
      const applicantByStatus = { declined: 0, shortlist: 0, hired: 0, interview: 0, inReview: 0 };
      
      // Count applicants by each status
      applicants.forEach((app) => {
        switch (app.status) {
          case "declined":
            applicantByStatus.declined += 1;
            break;
          case "shortlist":
            applicantByStatus.shortlist += 1;
            break;
          case "hired":
            applicantByStatus.hired += 1;
            break;
          case "interview":
            applicantByStatus.interview += 1;
            break;
          case "in-review":
            applicantByStatus.inReview += 1;
            break;
          default:
            break;
        }
      });

      return {
        categories: ["Declined", "Shortlisted", "Interviewed", "Onboarded", "In-Review"],
        series: [
          { name: "Rejected", data: [applicantByStatus.declined] },
          { name: "Shortlisted", data: [applicantByStatus.shortlist] },
          { name: "Interviewed", data: [applicantByStatus.interview] },
          { name: "Onboarded", data: [applicantByStatus.hired] },
          { name: "In Review", data: [applicantByStatus.inReview] },
        ],
      };
    }

    // For other tabs (like "Interviewed Applicants", "Shortlisted Applicants", etc.)
    const applicantCount = filteredApplicants.length;
    return {
      categories: [active],
      series: [{ name: active, data: [applicantCount] }],
    };
  };

  const chartData = generateChartData();

  const getChartConfig = () => {
    const colorPalette = {
      Rejected: "#FF6347", // Tomato Red
      Interviewed: "#FFFF00", // Yellow
      InReview: "#FFA500", // Orange
      Shortlisted: "#03055B", // Lime Green
      Onboarded: "#32CD32", // Navy Blue
      default: "#1E90FF", // Dodger Blue for other cases
    };

    const colorMap = {
      "Declined Applicants": colorPalette.Rejected,
      "Interviewed Applicants": colorPalette.Interviewed,
      "Shortlisted Applicants": colorPalette.Shortlisted,
      "In-Review Applicants": colorPalette.InReview,
      "Onboarded Applicants": colorPalette.Onboarded,
    };

    // For Overview, we want all colors, for other tabs, we show just the one color
    const chartColors =
      active === "Overview"
        ? [
            colorPalette.Rejected,
            colorPalette.Interviewed,
            colorPalette.Shortlisted,
            colorPalette.Onboarded,
            colorPalette.InReview,
          ]
        : [colorMap[active] || colorPalette.default];

    return {
      options: {
        chart: { type: "bar", stacked: true, toolbar: { show: false } },
        xaxis: {
          categories: chartData.categories,
          labels: {
            rotate: -45,
            style: { fontSize: "10px" },
          },
        },
        plotOptions: {
          bar: { columnWidth: "50%", barHeight: "80%" },
        },
        colors: chartColors, // Dynamically set the color for each tab
        title: { text: `${active} by Job`, style: { fontSize: "16px" } },
        legend: {
          position: "top",
          horizontalAlign: "center",
          formatter: (seriesName) => {
            return `${seriesName}: ${chartData.series[0].data[0]}`;
          },
        },
      },
      series: chartData.series,
    };
  };

  const chartConfig = getChartConfig();

  return (
    <div className="border h-fit md:h-full w-full md:w-[65%]">
      <div className="h-[28%] border-b px-2 justify-between pt-1 flex flex-col">
        <div className="w-full justify-between flex">
          <div className="flex flex-col">
            <h3 className="font-semibold text-sm">Job Statistics</h3>
            <span className="text-gray-400 text-little">
              Showing statistics for {active}
            </span>
          </div>
        </div>
        <div className="flex gap-5 border-b overflow-x-auto">
          {options?.map((current, index) => (
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
      <div className="w-full p-2 items-center flex h-fit justify-center overflow-x-auto">
        {chartConfig ? (
          <ReactApexChart
            options={chartConfig.options}
            series={chartConfig.series}
            type={chartConfig.options.chart.type}
            height={Math.min(500, Math.max(300, chartData.categories.length * 40))} // Dynamic height
          />
        ) : (
          <span>No data available</span>
        )}
      </div>
    </div>
  );
}

export default JobStatistic;
            
