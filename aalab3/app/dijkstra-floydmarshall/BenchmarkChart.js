// File: app/dijkstra-floyd/BenchmarkChart.js
"use client";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

/**
 * Expects data items: { size, dijkstra, floyd }
 */
export default function BenchmarkChart({ data, title }) {
  if (!data?.length) return null;

  return (
    <div className="p-4 bg-white rounded-xl shadow lg:col-span-5">
      <h2 className="font-semibold text-lg mb-2">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="size" label={{ value: "Nodes", position: "insideBottom", dy: 10 }} />
          <YAxis label={{ value: "ms", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="dijkstra" strokeWidth={2} name="Dijkstra" />
          <Line type="monotone" dataKey="floyd" strokeWidth={2} name="Floyd–Warshall" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
