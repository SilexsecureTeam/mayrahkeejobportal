import { BarChart } from "@mantine/charts";
import "@mantine/core/styles.css";
import classes from "../../../css/charts.module.css";
import {
  getThreeMonths,
  monthNames,
  toCamelCase,
} from "../../../utils/formmaters";
import { useState } from "react";

const data = [
  { month: "January", Smartphones: 1200, Laptops: 900, Tablets: 200 },
  { month: "February", Smartphones: 1900, Laptops: 1200, Tablets: 400 },
  { month: "March", Smartphones: 400, Laptops: 1000, Tablets: 200 },
];

const options = ["Overview", "No of job Posted", "Approved Applications"];

function JobStatistic({ applicants, byCategory }) {
  const [active, setActive] = useState(options[0]);
  const data1 = () => {
    const threeMonths = getThreeMonths();

    const applicantByMonth = [];

    threeMonths.map((currentMonth) => {
      const monthApplicants = applicants.filter(
        (current) =>
          monthNames[new Date(current.created_at).getMonth()] == currentMonth
      );

      const applicantByMonthCat = {};
      Object.keys(byCategory).map((current) => {
        const catApps = monthApplicants.filter(
          (currentApp) => currentApp.job_id == byCategory[current][0].job_id
        );
        const key = toCamelCase(byCategory[current][0].job_title);
        applicantByMonthCat[key] = catApps.length;
      });

      applicantByMonth.push({
        month: currentMonth,
        ...applicantByMonthCat,
      });
    });

    console.log("Result", ...applicantByMonth);

    return applicantByMonth;
  };

  return (
    <div className="border h-fit md:h-full w-full md:w-[65%]  ">
      <div className="h-[28%] border-b px-2 justify-between pt-1 flex flex-col">
        <div className="w-full justify-between flex">
          <div className="flex flex-col">
            <h3 className="font-semibold text-sm">Job Statistics</h3>
            <span className=" text-gray-400 text-little">
              Showing Jobstatistic Jul 19-25
            </span>
          </div>

          {/* <div className="w-[35%] flex justify-between p-1 bg-gray-400 h-[80%]">
            <button className="w-[30%] bg-white hover:scale-105 duration-75 text-black font-semibold text-little">
              Week
            </button>
            <button className="w-[30%] bg-white hover:scale-105 duration-75 text-black font-semibold text-little">
              Month
            </button>
            <button className="w-[30%] bg-white hover:scale-105 duration-75 text-black font-semibold text-little">
              Year
            </button>
          </div> */}
        </div>

        <div className="flex gap-5 border-b">
          {options.map((current) => (
            <h3
              onClick={() => setActive(current)}
              className={`text-little py-1 border-b cursor-pointer ${
                active === current ? "border-primaryColor" : ""
              } w-fit  font-semibold`}
            >
              {current}
            </h3>
          ))}
        </div>
      </div>

      <div className="w-full p-2  items-end flex h-fit">
        {active === options[0] && (
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
              tooltipItemBody: classes.tooltipItemBody,
            }}
            className="text-little "
            series={[
              { name: "Smartphones", color: "violet.6" },
              { name: "Laptops", color: "blue.6" },
              { name: "Tablets", color: "teal.6" },
            ]}
          />
        )}

        {(active === options[1] || active === options[2])  && (
          <span>Nothing to display</span>
        )}
      </div>
    </div>
  );
}

export default JobStatistic;
