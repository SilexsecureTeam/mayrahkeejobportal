import React from "react";
import Chart from "react-apexcharts";

const RoundChart = ({ data }) => {
  const statusOrder = [
    "In-Review",
    "Shortlist",
    "Interview",
    "Declined",
    "Hired",
  ];
  const statusColors = ["#FF9900", "#008FFB", "#FFFF00", "#8B0A1A", "#00E396"];

  const applicationStatuses = data?.reduce((acc, app) => {
    acc[app.status.toLowerCase()] = (acc[app.status.toLowerCase()] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    series: statusOrder.map(
      (status) => applicationStatuses?.[status.toLowerCase()] || 0
    ),
    options: {
      chart: {
        type: "donut",
      },
      labels: statusOrder.map((status) =>
        status === "In-Review"
          ? "Under-Review"
          : status === "Shortlist"
          ? "Shortlisted"
          : status === "Interview"
          ? "Interviewed"
          : status
      ),
      colors: statusColors,
      legend: {
        position: "bottom",
        labels: {
          colors: "#FFFFFF",
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "14px", // Adjust font size here
          fontWeight: "bold",
        },
        dropShadow: {
          enabled: false,
        },
      },
      plotOptions: {
        pie: {
          donut: {
            size: "70%",
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: "14px",
              },
              value: {
                show: true,
                fontSize: "16px",
                fontWeight: 600,
              },
              total: {
                show: true,
                fontSize: "14px",
                fontWeight: 500,
                label: "Total",
                formatter: function (w) {
                  return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                },
              },
            },
          },
        },
      },
    },
  };

  return (
    <div className="w-full max-w-[400px] mx-auto">
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="donut"
        width="100%"
      />
    </div>
  );
};

export default RoundChart;
