"use client";
import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function SaleChart() {
  const data = [
    {
      date: "403/01/01",
      sale: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      date: "403/01/02",
      sale: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      date: "403/01/03",
      sale: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      date: "403/01/04",
      sale: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      date: "403/01/05",
      sale: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      date: "403/01/06",
      sale: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      date: "403/01/07",
      sale: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height="92%">
      <AreaChart
        width={500}
        height={200}
        data={data}
        margin={{ top: 5, right: 10, left: 0, bottom: 10 }}
      >
        <XAxis dataKey="date" 
        tick={{ fill: "var(--text-color)" }}
        axisLine={{ stroke: "var(--text-color)" }} // تغییر رنگ خط محور
        tickLine={{ stroke: "var(--text-color)" }} // تغییر رنگ خطوط کوچک
        />
        <YAxis 
        tick={{ fill: "var(--text-color)" }}
        axisLine={{ stroke: "var(--text-color)" }} // تغییر رنگ خط محور
        tickLine={{ stroke: "var(--text-color)" }} // تغییر رنگ خطوط کوچک
        />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="sale"
          stroke="#8884d8"
          fillOpacity={1}
          fill="#711d1c"
        />
        <Area
          type="monotone"
          dataKey="amt"
          stroke="#82ca9d"
          fillOpacity={.6}
          fill="#82cc1c"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default SaleChart;
