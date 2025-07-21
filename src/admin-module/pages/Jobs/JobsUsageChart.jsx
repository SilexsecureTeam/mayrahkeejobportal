import React, { Component } from "react";
import Chart from "react-apexcharts";

const TrafficStages = [
  { label: "Applied", value: 30, color: "#00E396" },
  { label: "Shortlisted", value: 20, color: "blue" },
  { label: "Interviewed", value: 10, color: "#f7dc6f" },
  { label: "In Review", value: 40, color: "orange" },
];

class Donut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        labels: TrafficStages.map((stage) => stage.label),
        colors: TrafficStages.map((stage) => stage.color),
        legend: {
          position: "bottom",
        },
        dataLabels: {
          formatter: (val, opts) => {
            return `${opts.w.globals.series[opts.seriesIndex]}%`;
          },
        },
        responsive: [
          {
            breakpoint: 768,
            options: {
              chart: {
                width: "100%",
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
      series: TrafficStages.map((stage) => stage.value),
    };
  }

  render() {
    return (
      <div className="donut w-full">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="donut"
          width="100%" // changed from fixed 380 to 100%
        />
      </div>
    );
  }
}

export default Donut;
