import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";
import { LuChartPie, LuTrendingUp } from "react-icons/lu";

function ProgressOverview({ projects, user }) {
let completed = 0;
let pending = 0;
let inProgress = 0;

projects.forEach((project) => {
  (project.members || []).forEach((member) => {

    if (member.member === user?.name) {

      if (member.status === "Completed") {
        completed++;
      } 
      else if (member.status === "Pending") {
        pending++;
      } 
      else if (member.status === "In Progress") {
        inProgress++;
      }

    }

  });
});

const total = completed + pending + inProgress;

  const percentage =
    total === 0
      ? 0
      : Math.round((completed / total) * 100);

  const data =
  percentage === 0
    ? [
        {
          name: "No Progress",
          value: 1,
        },
      ]
    : [
        {
          name: "Completed",
          value: completed,
        },
        {
          name: "In Progress",
          value: inProgress,
        },
        {
          name: "Pending",
          value: pending,
        },
      ];
  let progressMessage = "";
let progressTitle = "";

if (percentage === 0) {
  if (inProgress > 0) {
    progressTitle = "Great start!";
    progressMessage = "Keep moving forward.";
  } else {
    progressTitle = "Ready to begin?";
    progressMessage = "Start a task and build momentum.";
  }
} else if (percentage < 50) {
  progressTitle = "Keep going!";
  progressMessage = "You're making steady progress.";
} else if (percentage < 100) {
  progressTitle = "Almost there!";
  progressMessage = "You're getting closer to the finish line.";
} else {
  progressTitle = "Excellent work!";
  progressMessage = "All your tasks are completed.";
}
  return (
    <div className="notification-panel">

      <h2>
        <LuChartPie
          size={24}
          color="#FACC15"
        />
        Progress Overview
      </h2>

      <div
        style={{
          width: "100%",
          height: 260
        }}
      >

       {percentage > 0 && (
  <ResponsiveContainer>
    <PieChart>
      <Pie
        data={data}
        dataKey="value"
        innerRadius={85}
        outerRadius={120}
        paddingAngle={3}
        cornerRadius={8}
      >
        <Cell fill="#22c55e" />
        <Cell fill="#facc15" />
        <Cell fill="#3b82f6" />
      </Pie>
    </PieChart>
  </ResponsiveContainer>
)}

      </div>

      <div
        style={{
          marginTop: "-150px",
          textAlign: "center"
        }}
      >

        <h1>{percentage}%</h1>

        <p>Overall Progress</p>

      </div>

      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    marginTop: "130px",
    padding: "0 15px",
  }}
>

  <div>
    <span style={{ color: "#22c55e" }}>●</span> Completed
    <br />
    {completed} Tasks
  </div>

  <div>
    <span style={{ color: "#facc15" }}>●</span> In Progress
    <br />
    {inProgress} Tasks
  </div>

  <div>
    <span style={{ color: "#3b82f6" }}>●</span> Pending
    <br />
    {pending} Tasks
  </div>

</div>

      <hr
        style={{
          margin: "20px 0",
          borderColor: "#333"
        }}
      />

      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "center"
        }}
      >

       <div
  style={{
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    background: "rgba(34,197,94,0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  <LuTrendingUp
    size={28}
    color="#22c55e"
  />
</div>

        <div>
  <strong>{progressTitle}</strong>

  <p
    style={{
      color: "#9ca3af",
      margin: 0
    }}
  >
    {progressMessage}
  </p>
</div>

      </div>

    </div>
  );
}

export default ProgressOverview;