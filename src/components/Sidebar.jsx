import {
  LayoutDashboard,
  CheckSquare,
  FolderKanban,
  ClipboardCheck,
  BarChart3,
  Bell,
  Settings,
  LogOut, Users
} from "lucide-react";
import { LuClipboardList, LuCalendarCheck } from "react-icons/lu";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Sidebar({user,setUser}) {
const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("user");
  setUser(null);
  toast.success("Logged out successfully!");
  navigate("/login");
};
  return (
    <div className="sidebar">

      <div className="sidebar-profile" onClick={() => navigate("/settings")}
        title="Go to Profile Settings">

       <div className="profile-avatar">

  {user?.profileImage ? (

    <img
      src={user.profileImage}
      alt="Profile"
      className="profile-image"
    />

  ) : (

    <span>
      {user?.name
        ?.split(" ")
        .map((n) => n[0])
        .join("")}
    </span>

  )}

</div>
<br></br>
        <h3>{user?.name}</h3>

        <p>{user?.role === "Admin" ? "Administrator" : user?.role}</p>

      </div>

      <div className="sidebar-menu">
        

        <NavLink to="/" className="sidebar-item">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
{user?.role !== "Admin" && (
  <NavLink to="/attendance" className="sidebar-item">
    <LuCalendarCheck size={20} />
    <span>Attendance</span>
  </NavLink>
)}
{user?.role === "Admin" && (
<NavLink to="/attendance" className="sidebar-item">
  <LuCalendarCheck size={20} />
  <span>Attendance</span>
</NavLink>
)}
      
          {user?.role !== "Admin" && (
  <NavLink to="/my-tasks" className="sidebar-item">
    <LuClipboardList size={20} />
    <span>My Tasks</span>
  </NavLink>
)}
     
        {user?.role === "Admin" && (
  <>
    <NavLink to="/users" className="sidebar-item">
      <Users size={20} />
      <span>Users</span>
    </NavLink>
          
            
    <NavLink to="/assign-tasks" className="sidebar-item">
      <ClipboardCheck size={20} />
      <span>Project Management</span>
    </NavLink>
  </>
)}
 {user?.role === "Admin" && (
        <NavLink to="/projects" className="sidebar-item">
          <FolderKanban size={20} />
          <span>Projects</span>
        </NavLink>
      )}
{user?.role === "Admin" && (
        <NavLink to="/analytics" className="sidebar-item">
          <BarChart3 size={20} />
          <span>Analytics</span>
        </NavLink>
      )} 
        <NavLink to="/notifications" className="sidebar-item">
          <Bell size={20} />
          <span>Notifications</span>
        </NavLink>

        <NavLink to="/settings" className="sidebar-item">
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>

      </div>

      <button className="logout-btn"
      onClick={handleLogout}>
        <LogOut size={20} />
        <span>Logout</span>
      </button>

    </div>
  );
}

export default Sidebar;