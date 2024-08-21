import { BarChart } from "@mantine/charts";
import '@mantine/core/styles.css';
import classes from '../../../css/charts.module.css'

const data = [
  { month: "January", Smartphones: 1200, Laptops: 900, Tablets: 200 },
  { month: "February", Smartphones: 1900, Laptops: 1200, Tablets: 400 },
  { month: "March", Smartphones: 400, Laptops: 1000, Tablets: 200 },
  { month: "April", Smartphones: 1000, Laptops: 200, Tablets: 800 },
  { month: "May", Smartphones: 800, Laptops: 1400, Tablets: 1200 },
  { month: "June", Smartphones: 750, Laptops: 600, Tablets: 1000 },
];

function JobStatistic() {
  return (
    <div className="border h-full w-[65%]  ">
      <div className="h-[28%] border-b px-2 justify-between pt-1 flex flex-col">
        <div className="w-full justify-between flex">
          <div className="flex flex-col">
            <h3 className="font-semibold text-sm">Job Statistics</h3>
            <span className=" text-gray-400 text-little">
              Showing Jobstatistic Jul 19-25
            </span>
          </div>

          <div className="w-[35%] flex justify-between p-1 bg-gray-400 h-[80%]">
            <button className="w-[30%] bg-white hover:scale-105 duration-75 text-black font-semibold text-little">
              Week
            </button>
            <button className="w-[30%] bg-white hover:scale-105 duration-75 text-black font-semibold text-little">
              Month
            </button>
            <button className="w-[30%] bg-white hover:scale-105 duration-75 text-black font-semibold text-little">
              Year
            </button>
          </div>
        </div>

        <h3 className="text-little border-b w-fit border-primaryColor font-semibold">
          Overview
        </h3>
      </div>

      <div className="w-full p-2  items-end flex h-fit">
        <BarChart
          data={data}
          h={150}
          w={500}
          dataKey="month"
          classNames={{
           root: classes.bar_root,
           bar: classes.bar,
           grid: classes.grid,
          //  container: classes.container,
           tooltip: classes.tooltip, 
           tooltipBody: classes.tooltipBody,
           tooltipItem: classes.tooltipItem,
           tooltipItemBody: classes.tooltipItemBody
          }}
          className="text-little "
          series={[
            { name: "Smartphones", color: "violet.6" },
            { name: "Laptops", color: "blue.6" },
            { name: "Tablets", color: "teal.6" },
          ]}
        />
      </div>
    </div>
  );
}

export default JobStatistic;
