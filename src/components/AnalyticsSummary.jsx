import {
  CheckCircle2,
  Clock3,
  LoaderCircle,
  ClipboardList,
  TrendingUp,
} from "lucide-react";

function AnalyticsSummary({ projects }) {
  let totalTasks = 0;
let completedTasks = 0;
let pendingTasks = 0;
let inProgressTasks = 0;

projects.forEach((project) => {
  project.members?.forEach((member) => {

    totalTasks++;

    if (member.status === "Completed") {
      completedTasks++;
    }

    else if (member.status === "In Progress") {
      inProgressTasks++;
    }

    else {
      pendingTasks++;
    }

  });

});

const efficiency =
  totalTasks === 0
    ? 0
    : Math.round(
        (completedTasks / totalTasks) * 100
      );
  const stats = [
    {
      title: "Total Tasks",
      value: totalTasks,
      subtitle: "Overall tasks",
      icon: <ClipboardList size={28} />,
      className: "total-card",
    },
    {
      title: "Completed",
      value: completedTasks,
      subtitle: "Successfully finished",
      icon: <CheckCircle2 size={28} />,
      className: "completed-card",
    },
    {
      title: "In Progress",
      value: inProgressTasks,
      subtitle: "Currently active",
      icon: <LoaderCircle size={28} />,
      className: "progress-card",
    },
    {
      title: "Pending",
      value: pendingTasks,
      subtitle: "Waiting to start",
      icon: <Clock3 size={28} />,
      className: "pending-card",
    },
    {
      title: "Efficiency",
      value: `${efficiency}%`,
      subtitle: "Completion Rate",
      icon: <TrendingUp size={28} />,
      className: "efficiency-card",
    },
  ];

  return (
    <div className="summary-grid">
      {stats.map((item, index) => (
        <div className={`summary-item ${item.className}`} key={index}>

          <div className="summary-top">
            <div className="summary-icon">
              {item.icon}
            </div>

            <div>
              <h4>{item.title}</h4>
              <p>{item.subtitle}</p>
            </div>
          </div>

          <h2>{item.value}</h2>

        </div>
      ))}
    </div>
  );
}

export default AnalyticsSummary;