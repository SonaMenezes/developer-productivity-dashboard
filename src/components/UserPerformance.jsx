import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

function UserPerformance({ users,projects }) {

 const data = users
  .filter(user => user.role !== "Admin")
  .map(user => {

    let assigned = 0;
    let completed = 0;

    projects.forEach(project => {

      (project.members || []).forEach((member) => {

        if (member.member === user.name) {

          assigned++;

          if (member.status === "Completed") {
            completed++;
          }

        }

      });

    });

    return {
      name: user.name,
      performance:
        assigned === 0
          ? 0
          : Math.round((completed / assigned) * 100),
    };

  });

  return (

    <div className="chart-card">

      <div className="chart-header">
        <h2>Developer Performance</h2>
        <p
  style={{
    color: "#FFD700",
    fontWeight: "700",
    fontSize: "15px",
    letterSpacing: "0.5px",
  }}
>
  Completion rate of every team member
</p>
      </div>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <BarChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,.08)"
          />

          <XAxis
            dataKey="name"
            tick={{ fill: "#d1d5db" }}
          />

          <YAxis
            domain={[0,100]}
            tick={{ fill: "#d1d5db" }}
          />

          <Tooltip
  formatter={(value) => [`${value}%`, "Performance"]}
  cursor={{
    fill: "rgba(255,215,0,0.08)",
  }}
  contentStyle={{
    background: "#121212",
    border: "1px solid rgba(255,215,0,0.35)",
    borderRadius: "14px",
    color: "#fff",
    boxShadow: "0 10px 30px rgba(0,0,0,.45)",
  }}
  labelStyle={{
    color: "#FFD700",
    fontWeight: "700",
  }}
  itemStyle={{
    color: "#ffffff",
    fontWeight: "600",
  }}
/>

          <Bar
            dataKey="performance"
            radius={[10,10,0,0]}
          >

            {data.map((entry,index)=>(
              <Cell
                key={index}
                fill="#FFD700"
              />
            ))}

          </Bar>

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}

export default UserPerformance;