import { AreaChart, BarChart } from "@mantine/charts";
import "@mantine/charts/styles.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FaSliders } from "react-icons/fa6";

function DashboardChart() {
  const lineChartDataSet = [
    {
      date: "01 Aug",
      Value: 50,
    },
    {
      date: "02 Aug",
      Value: 10,
    },
    {
      date: "03 Aug",
      Value: 60,
    },
    {
      date: "04 Aug",
      Value: 80,
    },
    {
      date: "05 Aug",
      Value: 12,
    },
    {
      date: "06 Aug",
      Value: 45,
    },
    {
      date: "07 Aug",
      Value: 29,
    },
    {
      date: "08 Aug",
      Value: 78,
    },
    {
      date: "09 Aug",
      Value: 100,
    },
    {
      date: "10 Aug",
      Value: 70,
    },
    {
      date: "11 Aug",
      Value: 65,
    },
    {
      date: "12 Aug",
      Value: 90,
    },
    {
      date: "13 Aug",
      Value: 100,
    },
    {
      date: "14 Aug",
      Value: 95,
    },
    {
      date: "15 Aug",
      Value: 15,
    },
    {
      date: "16 Aug",
      Value: 57,
    },
  ];

  const barChartDataSet = [
    {
      item: "Sales",
      value: 30,
    },
    {
      item: "IT",
      value: 50,
    },
    {
      item: "Marketing",
      value: 86,
    },
    {
      item: "Legal",
      value: 50,
    },
    {
      item: "API",
      value: 30,
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between gap-10 sm:flex-row flex-col">
        <span className="sm:w-[70%] w-full mb-10  sm:mb-28">
          <div className="flex items-center justify-between mb-10 sm:flex-row flex-col">
            <h2 className="text-2xl font-bold">Payment Comparison Chart</h2>
            <div className="flex gap-5 items-center">
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="daily"
                  control={<Radio color="success" />}
                  label="Daily"
                  checked
                />
                <FormControlLabel
                  value="weekly"
                  control={<Radio color="success" />}
                  label="Weekly"
                />
                <FormControlLabel
                  value="monthly"
                  control={<Radio color="success" />}
                  label="Monthly"
                />
              </RadioGroup>
              <FaSliders className="text-xl cursor-pointer" />
            </div>
          </div>
          <AreaChart
            h={500}
            data={lineChartDataSet}
            dataKey="date"
            unit="%"
            xAxisProps={{
              fontSize: 20,
              fontWeight: 700,
            }}
            series={[{ name: "Value", color: "green.6" }]}
            curveType="natural"
            tickLine="none"
            gridAxis="xy"
          />
        </span>
        <BarChart
          h={500}
          data={barChartDataSet}
          dataKey="item"
          unit="%"
          barProps={{ radius: [15, 15, 0, 0] }}
          series={[{ name: "value", color: "green.9" }]}
          tickLine="none"
          className="w-full sm:!w-[30%] sm:mb-0 mb-28"
          xAxisProps={{
            fontSize: 20,
            fontWeight: 700,
            angle: -20,
            padding: { left: 20, right: 20 },
          }}
        />
      </div>
    </>
  );
}

export default DashboardChart;
