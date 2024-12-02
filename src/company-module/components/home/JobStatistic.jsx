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

  // Filter applicants based on the selected option
  const filterApplicants = (status) => {
    switch (status) {
      case "Declined Applicants":
        return applicants.filter((app) => app.status === "declined");
      case "Interviewed Applicants":
        return applicants.filter((app) => app.status === "shortlist");
      case "Onboarded Applicants":
        return applicants.filter((app) => app.status === "hired");
      default: // Overview includes all
        return applicants;
    }
  };

  // Generate chart data for the selected filter
  const generateChartData = () => {
    const filteredApplicants = filterApplicants(active);

    if (active === "Overview") {
      // Group data by job and categorize by status
      const applicantByStatus = {
        declined: [],
        shortlist: [],
        hired: [],
      };

      Object.keys(byCategory).forEach((cat) => {
        const jobId = byCategory[cat][0].job_id;
        const jobTitle = byCategory[cat][0].job_title;

        const declined = applicants.filter(
          (app) => app.job_id === jobId && app.status === "declined"
        ).length;
        const shortlist = applicants.filter(
          (app) => app.job_id === jobId && app.status === "shortlist"
        ).length;
        const hired = applicants.filter(
          (app) => app.job_id === jobId && app.status === "hired"
        ).length;

        applicantByStatus.declined.push({ jobTitle, count: declined });
        applicantByStatus.shortlist.push({ jobTitle, count: shortlist });
        applicantByStatus.hired.push({ jobTitle, count: hired });
      });

      // Calculate totals for each category (Rejected, Interviewed, Onboarded)
      const totalDeclined = applicantByStatus.declined.reduce(
        (sum, item) => sum + item.count,
        0
      );
      const totalShortlist = applicantByStatus.shortlist.reduce(
        (sum, item) => sum + item.count,
        0
      );
      const totalHired = applicantByStatus.hired.reduce(
        (sum, item) => sum + item.count,
        0
      );

      return {
        categories: Object.keys(byCategory).map((cat) => byCategory[cat][0].job_title),
        series: [
          {
            name: "Rejected",
            data: applicantByStatus.declined.map((item) => item.count),
          },
          {
            name: "Interviewed",
            data: applicantByStatus.shortlist.map((item) => item.count),
          },
          {
            name: "Onboarded",
            data: applicantByStatus.hired.map((item) => item.count),
          },
        ],
        totals: { totalDeclined, totalShortlist, totalHired },
      };
    }

    // For other tabs
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
    };
  };

  const chartData = generateChartData();

  // Chart configurations
  const getChartConfig = () => {
    if (active === "Overview") {
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
          colors: ["#FF6347", "#FFA500", "#32CD32"],
          title: { text: "Overview of All Applicants", style: { fontSize: "16px" } },
          legend: {
            position: "top",
            horizontalAlign: "center",
            formatter: (seriesName, opts) => {
              switch (seriesName) {
                case "Rejected":
                  return `${seriesName}: ${chartData.totals.totalDeclined}`;
                case "Interviewed":
                  return `${seriesName}: ${chartData.totals.totalShortlist}`;
                case "Onboarded":
                  return `${seriesName}: ${chartData.totals.totalHired}`;
                default:
                  return `${seriesName}: ${opts.w.globals.series[opts.seriesIndex]}`;
              }
            },
          },
        },
        series: chartData.series,
      };
    }

    switch (active) {
      case "Rejected Applicants":
        return {
          options: {
            chart: { type: "bar", toolbar: { show: false } },
            xaxis: {
              categories: chartData.categories,
              labels: {
                rotate: -45,
                style: { fontSize: "10px" },
              },
            },
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
            dataLabels: { enabled: false },
            legend: {
              show: true,
              position: "bottom",
              formatter: (seriesName, opts) =>
                `${seriesName}: ${opts.w.globals.series[opts.seriesIndex]}`,
              maxHeight: 100,
            },
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
            dataLabels: { enabled: false },
            legend: {
              show: true,
              position: "bottom",
              formatter: (seriesName, opts) =>
                `${seriesName}: ${opts.w.globals.series[opts.seriesIndex]}`,
              maxHeight: 100,
            },
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
      <div className="w-full p-2 items-center flex h-fit justify-center overflow-x-auto">
        {chartConfig ? (
          <ReactApexChart
            options={chartConfig.options}
            series={chartConfig.series}
            type={chartConfig.options.chart.type}
            height={Math.max(300, chartData.categories.length * 30)} // Dynamic height
          />
        ) : (
          <span>No data available</span>
        )}
      </div>
    </div>
  );
}

export default JobStatistic;
