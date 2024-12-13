"use client";
import React from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function GrowthChat() {
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
      <LineChart
        width={500}
        height={200}
        data={data}
        margin={{ top: 5, right: 10, left: 0, bottom: 10 }}
      >
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="sale" stroke="#8884d8" />
        <Line type="monotone" dataKey="amt" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default GrowthChat;
