// import React from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';

// const data = [
//   { month: 'JAN', value: 0 },
//   { month: 'FEB', value: 100 },
//   { month: 'MAR', value: 200 },
//   { month: 'APR', value: 300 },
//   { month: 'MAY', value: 400 },
//   { month: 'JUN', value: 350 },
//   { month: 'JUL', value: 370 },
//   { month: 'AUG', value: 330 },
//   { month: 'SEP', value: 350 },
//   { month: 'OCT', value: 380 },
//   { month: 'NOV', value: 450 },
// ];

// export const ActivityChart = () => {
//   return (
//     <Card className="col-span-full">
//       <CardHeader className="flex flex-row items-center justify-between pb-2">
//         <div>
//           <CardTitle className="text-lg font-semibold">Activity</CardTitle>
//         </div>
//         <Select defaultValue="month">
//           <SelectTrigger className="w-32">
//             <SelectValue placeholder="Select period" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="week">Week</SelectItem>
//             <SelectItem value="month">Month</SelectItem>
//             <SelectItem value="year">Year</SelectItem>
//           </SelectContent>
//         </Select>
//       </CardHeader>

//       <CardContent className="pt-4">
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={data}>
//             <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />

//             <XAxis
//               dataKey="month"
//               stroke="hsl(var(--muted-foreground))"
//               fontSize={12}
//               tickLine={false}
//             />
//             <YAxis
//               stroke="hsl(var(--muted-foreground))"
//               fontSize={12}
//               tickLine={false}
//               axisLine={false}
//             />

//             <Tooltip
//               contentStyle={{
//                 backgroundColor: 'hsl(var(--card))',
//                 border: '1px solid hsl(var(--border))',
//                 borderRadius: '8px',
//               }}
//             />

//             {/* BLUE LINE (VISIBLE) */}
//             <Line
//               type="monotone"
//               dataKey="value"
//               stroke="#3b82f6"         // Tailwind blue-500
//               strokeWidth={3}
//               dot={false}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   );
// };
// export default ActivityChart;

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const ActivityChart = ({ data = [] }) => {
  const [period, setPeriod] = useState('month');

  // Format the data for the chart
  const formatChartData = (apiData) => {
    if (!apiData || apiData.length === 0) {
      return [];
    }

    return apiData.map(item => {
      const date = new Date(item.date);
      let formattedDate;

      // Format based on period
      if (period === 'week') {
        // Show day name + date (Mon 10)
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        const dateNum = date.getDate();
        formattedDate = `${day} ${dateNum}`;
      } else if (period === 'month') {
        // Show month + date (12/10)
        const month = date.  getMonth() + 1;
        const dateNum = date.getDate();
        formattedDate = `${month}/${dateNum}`;
      } else {
        // Year - show full month (Jan, Feb)
        formattedDate = date.toLocaleDateString('en-US', { month: 'short' });
      }

      return {
        date: formattedDate,
        value: item. count || 0,
        fullDate: date. toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
    });
  };

  const chartData = formatChartData(data);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div 
          style={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius:  '8px',
            padding:  '8px 12px',
          }}
        >
          <p className="text-sm font-semibold text-foreground">{payload[0].payload.fullDate}</p>
          <p className="text-sm text-primary">
            Queries: <span className="font-bold">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Sample every Nth item for cleaner X-axis
  const getSampledData = (data) => {
    if (data.length <= 10) return data; // Show all if 10 or fewer points
    
    const step = Math.ceil(data.length / 10); // Show ~10 labels max
    return data.map((item, index) => ({
      ... item,
      showLabel: index % step === 0 || index === data.length - 1
    }));
  };

  const sampledData = getSampledData(chartData);

  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-semibold">Activity</CardTitle>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="month">Month</SelectItem>
            <SelectItem value="year">Year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="pt-4">
        {chartData.length === 0 ? (
          <div className="flex items-center justify-center h-[300px] text-muted-foreground">
            <p>No activity data available</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sampledData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />

              <XAxis
                dataKey="date"
                stroke="hsl(var(--muted-foreground))"
                fontSize={11}
                tickLine={false}
                interval="preserveStartEnd"
                minTickGap={30}
              />
              
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />

              <Tooltip content={<CustomTooltip />} />

              {/* BLUE LINE */}
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityChart;