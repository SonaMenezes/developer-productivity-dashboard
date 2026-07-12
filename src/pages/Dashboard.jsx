import SummaryCard from "../components/SummaryCard";
import ActivityFeed from "../components/ActivityFeed";
import QuickActions from "../components/QuickActions";
import { MdOutlineEvent, MdSchedule, MdSpeed, } from "react-icons/md";
import { LuChartNoAxesCombined,LuCalendarCheck,LuCircleAlert,LuBadgeCheck,LuCircleCheck, LuListChecks } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import ProgressOverview from "../components/ProgressOverview";
function Dashboard({user, tasks, projects, setProjects, activities, developers,attendance}) {
const navigate = useNavigate();
const today = new Date().toISOString().split("T")[0];

const attendanceMarked = attendance.some(
  (record) =>
    record.user === user.name &&
    record.date === today
);
const userTasks = projects.flatMap((project) =>
  (project.members || [])
    .filter((member) => member.member === user?.name)
    .map((member) => ({
      ...member,
      projectName: project.projectName,
      dueDate: project.dueDate,
      priority: project.priority
    }))
);

const upcomingTasks = userTasks.filter(
  (task) => task.status !== "Completed"
);

const pendingTasks = userTasks.filter(
  (task) => task.status === "Pending"
);

const completedTasks = userTasks.filter(
  (task) => task.status === "Completed"
);

const productivityIncrease = completedTasks.length * 2;

const productivity =
  userTasks.length === 0
    ? 0
    : Math.round(
        (completedTasks.length / userTasks.length) * 100
      );
const hour = new Date().getHours();

let greeting = "Good Evening";

if (hour < 12) {
  greeting = "Good Morning";
} else if (hour < 17) {
  greeting = "Good Afternoon";
} else {
  greeting = "Good Evening";
}
const lastLogin = new Date().toLocaleString("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});
const completedProjects = projects.filter((project) => {

  if (!project.members) return false;

  return project.members.every(
    (member) => member.status === "Completed"
  );

}).length;

const activeProjects =
projects.length - completedProjects;

const overallProgress =
projects.length === 0
? 0
: Math.round(
(completedProjects / projects.length) * 100
);
const developerCount = developers.filter(
  (person) => person.role !== "Admin"
).length;
const presentToday = new Set(
  attendance
    .filter((record) => record.date === today)
    .map((record) => record.user)
).size;
const attendancePercentage =
developerCount === 0
? 0
: Math.round((presentToday / developerCount) * 100);
  return (
    <div>

      <div className="hero-card">

  <h1>
    {greeting}, {user.name}!
  </h1>

  <p>
    Manage developers, assign tasks, monitor project progress and team productivity.
  </p>
    {user?.role !== "Admin" && (
  <div className="attendance-reminder">

    <div className="attendance-reminder-left">

      {
  attendanceMarked ? (
    <LuBadgeCheck
      size={34}
      color="#22c55e"
    />
  ) : (
    <LuCircleAlert
      size={34}
      color="#ef4444"
    />
  )
}

      <div>
        <h3>{attendanceMarked
  ? "Attendance Marked"
  : "Attendance Pending"}</h3>

        <p>
          {attendanceMarked
  ? "Your attendance has been successfully recorded for today."
  : "You haven't marked today's attendance."}
        </p>
      </div>

    </div>

   <button
  className="attendance-btn"
  onClick={() => navigate("/attendance")}
  disabled={attendanceMarked}
  style={{
    backgroundColor: attendanceMarked ? "#22c55e" : "#facc15",
    color: attendanceMarked ? "#ffffff" : "#111827",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  }}
>
  {attendanceMarked ? (
    <>
      <LuCircleCheck size={18} />
      Attendance Marked
    </>
  ) : (
    <>
      <LuCalendarCheck size={18} />
      Mark Attendance
    </>
  )}
</button>
</div>
)}
  <div className="hero-footer">
    <span>{user?.role} Dashboard</span>

    <span>
      Last Login • {lastLogin}
    </span>
  </div>

</div>
          
     <div className="cards-container">
  {user.role === "Admin" ? (
    <>
      <SummaryCard
        title="Developers"
        value={developerCount}
        subtitle="Registered Developers"
      />

     <SummaryCard
title="Attendance Today"
value={`${presentToday}/${developerCount}`}
subtitle={`${attendancePercentage}% Present`}
icon={<LuCalendarCheck size={26} color="#facc15" />}
/>

      <SummaryCard
  title="Active Projects"
  value={activeProjects}
  subtitle={`${completedProjects} Completed`}
/>

      <SummaryCard
  title="Project Progress"
  value={`${overallProgress}%`}
  subtitle="Overall Completion"
  icon={<LuChartNoAxesCombined size={26} color="#facc15" />}
/>
    </>
  ) : (
    <>
      <SummaryCard
  title="Task Completion"
  value={`${completedTasks.length}/${userTasks.length}`}
  subtitle="Completed / Total"
  icon={<LuListChecks size={26} color="#facc15" />}
/>

      <SummaryCard
  title="Performance Boost"
  value={`+${productivityIncrease}%`}
  subtitle="Compared to Yesterday"
  icon={<MdSpeed size={26}
  color="#facc15" />}
/>

      <SummaryCard
  title="Active Projects"
  value={
    projects.filter(project =>
      (project.members || []).some(
        member =>
          member.member === user?.name &&
          member.status !== "Completed"
      )
    ).length
  }
  subtitle="Assigned"
/>

      <SummaryCard
        title="Productivity"
        value={`${productivity}%`}
        subtitle="Performance"
      />
    </>
  )}
</div>

      <div
  style={{
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "20px",
    marginTop: "25px",
    width: "100%",
  }}
>
 <ActivityFeed  />
  
{user?.role?.toLowerCase() === "admin" ? (
  <QuickActions projects={projects} setProjects={setProjects}/>
) : (
 <ProgressOverview
 projects={projects}
 user={user}
 />
)}
</div>
        
</div>
  );
  }

export default Dashboard;