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

  const filterApplicants = (status) => {
    switch (status) {
      case "Declined Applicants":
        return applicants.filter((app) => app.status === "declined");
      case "Interviewed Applicants":
        return applicants.filter((app) => app.status === "shortlist");
      case "Onboarded Applicants":
        return applicants.filter((app) => app.status === "hired");
      default:
        return applicants; // Overview includes all
    }
  };

  const generateChartData = () => {
    const filteredApplicants = filterApplicants(active);

    if (active === "Overview") {
      const applicantByStatus = { declined: [], shortlist: [], hired: [] };

      Object.keys(byCategory).forEach((cat) => {
        const jobId = byCategory[cat][0].job_id;
        const jobTitle = byCategory[cat][0].job_title;

        applicantByStatus.declined.push({
          jobTitle,
          count: applicants.filter(
            (app) => app.job_id === jobId && app.status === "declined"
          ).length,
        });
        applicantByStatus.shortlist.push({
          jobTitle,
          count: applicants.filter(
            (app) => app.job_id === jobId && app.status === "shortlist"
          ).length,
        });
        applicantByStatus.hired.push({
          jobTitle,
          count: applicants.filter(
            (app) => app.job_id === jobId && app.status === "hired"
          ).length,
        });
      });

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
      };
    }

    const applicantByCategory = {};
    Object.keys(byCategory).forEach((cat) => {
      const jobApplicants = filteredApplicants.filter(
        (app) => app.job_id === byCategory[cat][0].job_id
      );
      applicantByCategory[byCategory[cat][0].job_title] = jobApplicants.length;
    });

    return {
      categories: Object.keys(applicantByCategory),
      series: Object.values(applicantByCategory),
    };
  };

  const chartData = generateChartData();

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
          plotOptions: {
            bar: {
              columnWidth: "50%",
              barHeight: "80%", // Increase bar height
              dataLabels: { position: "top" },
            },
          },
          responsive: [
            {
              breakpoint: 768,
              options: {
                xaxis: { labels: { rotate: -30, style: { fontSize: "8px" } } },
                legend: { position: "bottom" },
              },
            },
          ],
          colors: ["#FF6347", "#FFA500", "#32CD32"],
          title: { text: "Overview of All Applicants", style: { fontSize: "16px" } },
          legend: {
            position: "top",
            horizontalAlign: "center",
            formatter: (seriesName, opts) => {
              switch (seriesName) {
                case "Rejected":
                  return `${seriesName}: ${chartData.series[0].data.reduce((a, b) => a + b, 0)}`;
                case "Interviewed":
                  return `${seriesName}: ${chartData.series[1].data.reduce((a, b) => a + b, 0)}`;
                case "Onboarded":
                  return `${seriesName}: ${chartData.series[2].data.reduce((a, b) => a + b, 0)}`;
                default:
                  return seriesName;
              }
            },
          },
        },
        series: chartData.series,
      };
    }

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
        plotOptions: {
          bar: { columnWidth: "50%", barHeight: "80%" },
        },
        colors: ["#FF6347"],
        title: { text: `${active} by Job`, style: { fontSize: "16px" } },
      },
      series: [
        {
          name: active,
          data: chartData.series,
        },
      ],
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
      <div className="w-full p-2 items-center flex h-fit justify-center overflow-x-auto">
        {chartConfig ? (
          <ReactApexChart
            options={chartConfig.options}
            series={chartConfig.series}
            type={chartConfig.options.chart.type}
            height={Math.max(300, chartData.categories.length * 50)} // Dynamic height
          />
        ) : (
          <span>No data available</span>
        )}
      </div>
    </div>
  );
}

export default JobStatistic;
