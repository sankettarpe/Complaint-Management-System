import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
];

const CategoryChart = ({ data = [] }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 h-105">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
          Complaints by Category
        </h2>

        <span className="text-sm text-gray-500">
          Overall Distribution
        </span>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={120}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>
      </ResponsiveContainer>

    </div>
  );
};

export default CategoryChart;