import React, { useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar,
  LineChart, Line,
  XAxis, YAxis
} from "recharts";

// 🎨 Gradient Colors
const COLORS = {
  Food: ["#ff7e5f", "#feb47b"],
  Travel: ["#36A2EB", "#6dd5fa"],
  Bills: ["#f7971e", "#ffd200"],
  Others: ["#43cea2", "#185a9d"]
};

export default function Chart({ data, type }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const chartData = Object.values(
    data.reduce((acc, e) => {
      acc[e.category] = acc[e.category] || { name: e.category, value: 0 };
      acc[e.category].value += e.amount;
      return acc;
    }, {})
  );

  // 🎯 Hover effect
  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  // 🎨 PIE CHART
  if (type === "pie") {
    return (
      <div className="flex flex-col md:flex-row items-center gap-6">

        <PieChart width={400} height={300}>
          <defs>
            {chartData.map((entry, index) => {
              const gradient = COLORS[entry.name] || ["#8884d8", "#8884d8"];
              return (
                <linearGradient id={`color${index}`} key={index}>
                  <stop offset="0%" stopColor={gradient[0]} />
                  <stop offset="100%" stopColor={gradient[1]} />
                </linearGradient>
              );
            })}
          </defs>

          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            onMouseEnter={onPieEnter}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={index}
                fill={`url(#color${index})`}
                opacity={activeIndex === index ? 1 : 0.7}
                scale={activeIndex === index ? 1.05 : 1}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>

        {/* 📌 LEGEND */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Categories</h3>

          {chartData.map((entry, index) => {
            const gradient = COLORS[entry.name] || ["#8884d8", "#8884d8"];

            return (
              <div key={index} className="flex items-center gap-2 mb-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{
                    background: `linear-gradient(to right, ${gradient[0]}, ${gradient[1]})`,
                  }}
                ></div>
                <span>{entry.name}</span>
                <span className="ml-auto font-semibold">₹{entry.value}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 📊 BAR CHART
  if (type === "bar") {
    return (
      <BarChart width={500} height={300} data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value">
          {chartData.map((entry, index) => {
            const gradient = COLORS[entry.name] || ["#8884d8", "#8884d8"];
            return (
              <Cell
                key={index}
                fill={gradient[0]}
              />
            );
          })}
        </Bar>
      </BarChart>
    );
  }

  // 📈 LINE CHART
  return (
    <LineChart width={500} height={300} data={chartData}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line dataKey="value" stroke="#8884d8" strokeWidth={3} />
    </LineChart>
  );
}