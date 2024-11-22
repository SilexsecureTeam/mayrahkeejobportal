// import * as React from 'react';
// import { BarChart } from '@mui/x-charts/BarChart';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import ButtonGroup from '@mui/material/ButtonGroup';
// import { format, subDays } from 'date-fns';

// const generateLast7DaysLabels = () => {
//   const labels = [];
//   for (let i = 6; i >= 0; i--) {
//     labels.push(format(subDays(new Date(), i), 'MMM d'));
//   }
//   return labels;
// };

// const dataSets = {
//   '1 Week': {
//     data: [
//       { label: 'Page A', pv: 2400, uv: 4000 },
//       { label: 'Page B', pv: 1398, uv: 3000 },
//       { label: 'Page C', pv: 9800, uv: 2000 },
//       { label: 'Page D', pv: 3908, uv: 2780 },
//       { label: 'Page E', pv: 4800, uv: 1890 },
//       { label: 'Page F', pv: 3800, uv: 2390 },
//       { label: 'Page G', pv: 4300, uv: 3490 },
//     ],
//     xLabels: generateLast7DaysLabels(),
//   },
//   '2 Weeks': {
//     data: [
//       { label: 'Page H', pv: 3400, uv: 5000 },
//       { label: 'Page I', pv: 2398, uv: 4000 },
//       { label: 'Page J', pv: 10800, uv: 3000 },
//       { label: 'Page K', pv: 4908, uv: 3780 },
//       { label: 'Page L', pv: 5800, uv: 2890 },
//       { label: 'Page M', pv: 4800, uv: 3390 },
//       { label: 'Page N', pv: 5300, uv: 4490 },
//     ],
//     xLabels: generateLast7DaysLabels(),
//   },
//   '3 Weeks': {
//     data: [
//       { label: 'Page O', pv: 4400, uv: 6000 },
//       { label: 'Page P', pv: 3398, uv: 5000 },
//       { label: 'Page Q', pv: 11800, uv: 4000 },
//       { label: 'Page R', pv: 5908, uv: 4780 },
//       { label: 'Page S', pv: 6800, uv: 3890 },
//       { label: 'Page T', pv: 5800, uv: 4390 },
//       { label: 'Page U', pv: 6300, uv: 5490 },
//     ],
//     xLabels: generateLast7DaysLabels(),
//   },
// };

// export default function StackedBarChart() {
//   const [timeFrame, setTimeFrame] = React.useState('1 Week');
//   const { data, xLabels } = dataSets[timeFrame];

//   return (
//     <Box sx={{ width: '100%' }}>
//       <Box className="flex justify-end mb-4">
//         <ButtonGroup variant="contained" aria-label="outlined primary button group">
//           {Object.keys(dataSets).map((key) => (
//             <button className='text-green-800 bg-gray-200 px-2 py-2 rounded flwx justify-end text-right' key={key} onClick={() => setTimeFrame(key)}>
//               {key}
//             </button>
//           ))}
//         </ButtonGroup>
//       </Box>
//       <BarChart
//         width={500}
//         height={300}
//         series={[
//           { data: data.map(item => item.pv), label: 'pv', id: 'pvId', color: '#66BB6A' }, // Light green
//           { data: data.map(item => item.uv), label: 'uv', id: 'uvId', color: '#388E3C' }, // Dark green
//         ]}
//         xAxis={[{ data: xLabels, scaleType: 'band' }]}
//         barWidth={20} // Adjust bar width
//         barGap={10} // Adjust gap between bars
//       />
//     </Box>
//   );
// }