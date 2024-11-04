import React from 'react';
import Chart from 'react-apexcharts';

const JobStatistics = () => {
  const pieOptions = {
    labels: ['Finished Training', 'Chapter A', 'Chapter B', 'Haven\'t Started Yet'],
    colors: ['#2B8F3A', '#FDC5C7', '#C6A7E7', '#34A853'],
    legend: {
      position: 'bottom',
      fontSize: '14px',
      labels: { colors: '#000' },
    },
  };

  const pieSeries = [34, 22, 7, 20]; // Example data for the pie chart

  const barOptions = {
    chart: {
      id: 'active-workers',
      stacked: true,
      toolbar: { show: false },
    },
    xaxis: {
      categories: ['3 Jun', '4 Jun', '5 Jun', '6 Jun', '7 Jun', '8 Jun', '9 Jun', '10 Jun'],
      labels: { style: { colors: '#666', fontSize: '12px' } },
    },
    yaxis: {
      labels: { style: { colors: '#666', fontSize: '12px' } },
    },
    colors: ['#34A853', '#B0C4DE'],
    legend: {
      show: false,
    },
  };

  const barSeries = [
    {
      name: 'Completed Training',
      data: [100, 200, 150, 250, 300, 200, 220, 270],
    },
    {
      name: 'Ongoing Training',
      data: [300, 200, 250, 200, 100, 150, 180, 130],
    },
  ];

  return (
    <div className="border min-h-screen w-full md:w-[80%]">
      <div className="h-max border-b px-2 justify-between pt-1 flex flex-col">
      <div className="w-full justify-between flex">
           <div className="flex flex-col">
             <h3 className="font-bold text-xl">Job Statistics</h3>
             <span className=" text-gray-400 text-little">
               Showing Jobstatistic Jul 19-25
             </span>
           </div>
                    {/* Filters */}

           <div className="w-max flex justify-between p-1 bg-green-100">
             <button className="px-6 py-[4px] bg-white text-primaryColor font-bold text-sm">
               Week
             </button>
             <button className="px-6 py-[4px] text-primaryColor font-bold text-sm">
               Month
             </button>
             <button className="px-6 py-[4px] text-primaryColor font-bold text-sm">
               Year
             </button>
           </div>
         </div>
        {/* Tabs */}
        
          <div className="my-2 flex gap-4 w-full overflow-x-auto text-little">
          <button className={`${true ? "border-b-[2px] border-primaryColor text-primaryColor": "text-gray-500"} pb-2 cursor-pointer w-fit font-semibold`}>
            Overview
          </button>
          <button className={`${false ? "border-b-[2px] border-primaryColor text-primaryColor": "text-gray-500"} pb-2 cursor-pointer w-fit font-semibold`}>
            No of Job Posted
          </button>
          <button className={`${false ? "border-b-[2px] border-primaryColor text-primaryColor": "text-gray-500"} pb-2 cursor-pointer w-fit font-semibold`}>
            Approved Application
          </button>
          <button className={`${false ? "border-b-[2px] border-primaryColor text-primaryColor": "text-gray-500"} pb-2 cursor-pointer w-fit font-semibold`}>
            Rejected Application
          </button>
          <button className={`${false ? "border-b-[2px] border-primaryColor text-primaryColor": "text-gray-500"} pb-2 cursor-pointer w-fit font-semibold`}>
            Onboard Applicant
          </button>
          </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="bg-white p-4 shadow rounded-lg border">
            <h2 className="text-center text-gray-600 mb-4">Chapter Wise Status</h2>
            <Chart options={pieOptions} series={pieSeries} type="pie" width="100%" />
          </div>

          {/* Bar Chart */}
          <div className="bg-white p-4 shadow rounded-lg border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-gray-600">Last 14 Days Active Workers In Training</h2>
              <span className="text-gray-500 text-sm">Last 14 Days</span>
            </div>
            <Chart options={barOptions} series={barSeries} type="bar" width="100%" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobStatistics;
