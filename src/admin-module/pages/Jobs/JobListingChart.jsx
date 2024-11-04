import React, { useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function JobListingChart() {
  const [days, setDays] = useState(7);

  const handleDaysChange = (event) => {
    setDays(parseInt(event.target.value));
  };

  const getDataForDays = (days) => {
    // Example data generation based on the number of days
    const data = {
      7: [2, 5.5, 2, 8.5, 1.5, 5, 6],
      14: [2, 5.5, 2, 8.5, 1.5, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      21: [2, 5.5, 2, 8.5, 1.5, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    };
    return data[days];
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1>Job Listing View Stats</h1>
        <div>
          <label htmlFor="days" className="mr-2"></label>
          <select
            id="days"
            value={days}
            onChange={handleDaysChange}
            className="p-2 border rounded"
          >
            <option value={7}>Last 7 Days</option>
            <option value={14}>Last 14 Days</option>
            <option value={21}>Last 21 Days</option>
          </select>
        </div>
      </div>
      <LineChart
        xAxis={[{ data: Array.from({ length: days }, (_, i) => i + 1) }]}
        series={[
          {
            data: getDataForDays(days),
          },
        ]}
        width={500}
        height={300}
      />
    </>
  );
}