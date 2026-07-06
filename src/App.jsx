import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import AssignTasks from "./pages/AssignTasks";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Analytics from "./pages/Analytics";
import Users from "./pages/Users";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import MyTasks from "./pages/MyTasks";
import Attendance from "./pages/Attendance";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(() => 
    JSON.parse(localStorage.getItem("user"))

  );
  const [users, setUsers] = useState(() => {
  const savedUsers = localStorage.getItem("users");
  return savedUsers ? JSON.parse(savedUsers) : [];
});

 const [tasks, setTasks] = useState(() => {
  const savedTasks =
    localStorage.getItem("tasks");

  return savedTasks
    ? JSON.parse(savedTasks)
    : [
        {
          name: "UI Design",
          status: "Pending",
        },
        {
          name: "Dashboard Layout",
          status: "Completed",
        },
        {
          name: "Testing",
          status: "In Progress",
        },
        {
          name: "API Integration",
          status: "Pending",
        },
      ];
});

useEffect(() => {
  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );
}, [tasks]);

const [projects, setProjects] = useState(() => {
  const savedProjects =
    localStorage.getItem("projects");

  return savedProjects
    ? JSON.parse(savedProjects)
    : [
        {
          name: "Website Redesign",
          status: "ON TRACK",
        },
        {
          name: "Mobile App",
          status: "AT RISK",
        },
        {
          name: "Dashboard Upgrade",
          status: "DELAYED",
        },
      ];
});

useEffect(() => {
  localStorage.setItem(
    "projects",
    JSON.stringify(projects)
  );
}, [projects]);
useEffect(() => {

  const refreshProjects = () => {

    const savedProjects =
      JSON.parse(localStorage.getItem("projects")) || [];

    setProjects(savedProjects);

  };

  window.addEventListener(
    "projectsUpdated",
    refreshProjects
  );

  return () => {

    window.removeEventListener(
      "projectsUpdated",
      refreshProjects
    );

  };

}, []);
const [attendance, setAttendance] = useState(() => {
  const savedAttendance =
    localStorage.getItem("attendance");

  return savedAttendance
    ? JSON.parse(savedAttendance)
    : [];
});
useEffect(() => {
  localStorage.setItem(
    "attendance",
    JSON.stringify(attendance)
  );
}, [attendance]);

const [activities, setActivities] = useState([
  "Admin logged in",
  "System initialized"
]);

const [developers] = useState([
  {
    name: "Dev1",
    role: "developer",
  },
  {
    name: "Dev2",
    role: "developer",
  },
  {
    name: "Dev3",
    role: "developer",
  },
]);
console.log("Projects in App:",projects);
return (
    <BrowserRouter>

  {!user ? (

    <Routes>

      <Route
        path="/"
        element={<Login setUser={setUser} />}
      />

      <Route
        path="/login"
        element={<Login setUser={setUser} />}
      />

      <Route
        path="/signup"
        element={<SignUp setUser={setUser}/>}
      />

      <Route
        path="*"
        element={<Navigate to="/login" />}
      />

    </Routes>

  ) : (
    
      <div style={{ display: "flex" }}>
        <Sidebar user={user} setUser={setUser}/>

        <div className={darkMode ? "dark-mode" : ""}
          style={{
            flex:1 ,
            background: "linear-gradient(135deg,#050505,#0D0D0D,#151515)",
            minHeight: "100vh",
          }}
        >
          <Navbar user={user} setUser={setUser} darkMode={darkMode} setDarkMode={setDarkMode} />

          <div className="dashboard-content">
            <Routes>
            <Route path="/attendance"
            element={<Attendance user={user} attendance={attendance} setAttendance={setAttendance} />}
            />
              <Route
  path="/"
  element={
    <Dashboard
      user={user}
      tasks={tasks}
      projects={projects}
      setProjects={setProjects}
      activities={activities}
      developers={users}
      attendance={attendance}
    />
  }
/>

    <Route
   path="/my-tasks"
  element={<MyTasks user={user} />}  />
  
              <Route
                path="/projects"
                element={<Projects projects={projects} setProjects={setProjects} user={user}/>}
              />

              <Route
                path="/analytics"
                element={<Analytics tasks={tasks} projects={projects} users={users}/>}
              />
              {user?.role === "Admin" && (
              <Route
              path="/assign-tasks"
              element={<AssignTasks/>}  
              />
              )}

              {user?.role === "Admin" && (
              <Route
              path="/users"
              element={<Users/>}  
              />
              )}


              <Route
                path="/notifications"
                element={<Notifications user={user}/>}
              />

              <Route
                path="/settings"
                element={<Settings 
                  user={user}
                  setUser={setUser}/>}
              />

             
            </Routes>
          </div>
        </div>
      </div>
    )} 
    <ToastContainer
    position="top-right"
    autoClose={3000}
    theme="dark"
    />
    </BrowserRouter>
);
}

export default App;