import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { BarChart3 } from "lucide-react";

function AnalyticsChart({ tasks }) {

  const completed = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const inProgress = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const pending = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const data = [
    {
      name: "Completed",
      tasks: completed,
      color: "#22c55e",
    },
    {
      name: "In Progress",
      tasks: inProgress,
      color: "#3b82f6",
    },
    {
      name: "Pending",
      tasks: pending,
      color: "#f59e0b",
    },
  ];

  return (
    <div className="chart-card">

      <div className="chart-header">

        <div className="chart-title">

          <div className="chart-icon">
            <BarChart3 size={24} />
          </div>

          <div>
            <h2>Task Performance</h2>
            <p>Status distribution of all tasks</p>
          </div>

        </div>

      </div>

      <ResponsiveContainer
        width="100%"
        height={360}
      >
        <BarChart
          data={data}
        >
          <CartesianGrid
            strokeDasharray="4 4"
            stroke="rgba(255,255,255,.08)"
          />

          <XAxis
            dataKey="name"
            tick={{
              fill: "#d1d5db",
              fontSize: 13,
            }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{
              fill: "#d1d5db",
            }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
  cursor={{ fill: "rgba(255,215,0,0.08)" }}
  contentStyle={{
    background: "#1a1a1a",
    border: "1px solid rgba(255,215,0,0.25)",
    borderRadius: "12px",
    color: "#fff",
    boxShadow: "0 10px 30px rgba(0,0,0,.4)"
  }}
  labelStyle={{
    color: "#FFD700",
    fontWeight: "600"
  }}
  itemStyle={{
    color: "#ffffff"
  }}
/>

          <Bar
            dataKey="tasks"
            radius={[10, 10, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.color}
              />
            ))}
          </Bar>

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}

export default AnalyticsChart;