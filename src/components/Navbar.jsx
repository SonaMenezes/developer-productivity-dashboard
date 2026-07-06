import { Search, User, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
function Navbar({
  user,
  setUser,
  darkMode,
  setDarkMode,
}) {

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  
const navigate = useNavigate();
const [unreadCount, setUnreadCount] = useState(0);
useEffect(() => {

  const loadUnreadCount = () => {

    const notifications =
      JSON.parse(localStorage.getItem("notifications")) || [];

    const count = notifications.filter((notification) => {

      if (user?.role?.toLowerCase() === "admin") {
        return (
          notification.recipient === "Admin" &&
          notification.status === "Unread"
        );
      }

      return (
        notification.recipient === user?.name &&
        notification.status === "Unread"
      );

    }).length;

    setUnreadCount(count);

  };

  loadUnreadCount();

  window.addEventListener(
    "notificationUpdated",
    loadUnreadCount
  );

  return () => {
    window.removeEventListener(
      "notificationUpdated",
      loadUnreadCount
    );
  };

}, [user]);
  return (
    <div className="navbar">

      <div>

  <h2 className="navbar-title">
    Developer Productivity Dashboard
  </h2>

  <p className="navbar-subtitle">
    Enterprise Task & Project Management
  </p>

</div>

      <div className="navbar-right">

    

        <button
  className="notification-icon"
  onClick={() => navigate("/notifications")}
  style={{ position: "relative", cursor: "pointer" }}
>
  <Bell size={20} />

  {unreadCount > 0 && (
    <span className="bell-notification-badge">
      {unreadCount}
    </span>
  )}
</button>

        <button
         className="notification-icon"
        onClick={() => navigate("/settings")}
        style={{ cursor: "pointer" }}
         title="Go to Profile Settings"
         >

          <User size={20} />

          

        </button>

      </div>

    </div>
  );
}

export default Navbar;