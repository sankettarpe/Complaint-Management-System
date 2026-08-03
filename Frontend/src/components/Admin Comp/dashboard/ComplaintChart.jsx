import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const ComplaintChart = ({ data = [] }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
          Monthly Complaint Analysis
        </h2>

        <span className="text-gray-500 text-sm">
          Current Year
        </span>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="4 4" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="complaints"
            radius={[8, 8, 0, 0]}
            fill="#2563EB"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ComplaintChart;