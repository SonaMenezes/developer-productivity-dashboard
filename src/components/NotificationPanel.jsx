import { useEffect, useState } from "react";
import { LuBell, LuCalendar, LuClipboard, LuFlag, LuLetterText,LuCheckCheck, LuTrash2, LuSearch } from "react-icons/lu";

function NotificationPanel({ user }) {

  const [notifications, setNotifications] = useState([]);
  const [search, setSearch] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [showClearModal, setShowClearModal] = useState(false);
const [notificationToDelete, setNotificationToDelete] = useState(null);
  useEffect(() => {
  const loadNotifications = () => {
    const savedNotifications =
      JSON.parse(localStorage.getItem("notifications")) || [];

    const userNotifications = savedNotifications.filter((notification) => {

  if (user?.role === "Admin") {
    return notification.recipient === "Admin";
  }

  return notification.recipient === user?.name;

})
.sort((a, b) => {
  if (a.status === "Unread" && b.status === "Read") return -1;
  if (a.status === "Read" && b.status === "Unread") return 1;
  return b.id - a.id;
});

    setNotifications(userNotifications);
  };

  loadNotifications();

  window.addEventListener("storage", loadNotifications);
  
  return () =>
    window.removeEventListener("storage", loadNotifications);
}, [user]);
const markAsRead = (id) => {

  const allNotifications =
    JSON.parse(localStorage.getItem("notifications")) || [];

  const updatedNotifications = allNotifications.map((notification) =>

    notification.id === id
      ? { ...notification, status: "Read" }
      : notification

  );

  localStorage.setItem(
    "notifications",
    JSON.stringify(updatedNotifications)
  );

  const userNotifications = updatedNotifications.filter((notification) => {

    if (user?.role === "Admin") {
      return notification.recipient === "Admin";
    }

    return notification.recipient === user?.name;

  })
.sort((a, b) => {
  if (a.status === "Unread" && b.status === "Read") return -1;
  if (a.status === "Read" && b.status === "Unread") return 1;
  return b.id - a.id;
});

  setNotifications(userNotifications);
  window.dispatchEvent(
    new Event("notificationUpdated")
  );
};
const deleteNotification = (id) => {

  setNotificationToDelete(id);

  setShowDeleteModal(true);

};
const confirmDeleteNotification = () => {

  
  const allNotifications =
    JSON.parse(localStorage.getItem("notifications")) || [];

  const updatedNotifications =
    allNotifications.filter(
      (notification) => notification.id !== id
    );

  localStorage.setItem(
    "notifications",
    JSON.stringify(updatedNotifications)
  );

  const userNotifications = updatedNotifications
    .filter((notification) => {

      if (user?.role === "Admin") {
        return notification.recipient === "Admin";
      }

      return notification.recipient === user?.name;

    })
    .sort((a, b) => {
      if (a.status === "Unread" && b.status === "Read") return -1;
      if (a.status === "Read" && b.status === "Unread") return 1;
      return b.id - a.id;
    });

  setNotifications(userNotifications);

  window.dispatchEvent(
    new Event("notificationUpdated")
  );

};
const clearReadNotifications = () => {

const allNotifications =
JSON.parse(localStorage.getItem("notifications")) || [];

const updatedNotifications =
allNotifications.filter(notification=>{

if(notification.status==="Read"){

return false;

}

return true;

});

localStorage.setItem(
"notifications",
JSON.stringify(updatedNotifications)
);

const userNotifications=
updatedNotifications
.filter(notification=>{

if(user?.role==="Admin"){

return notification.recipient==="Admin";

}

return notification.recipient===user?.name;

})
.sort((a,b)=>{

if(a.status==="Unread"&&b.status==="Read")return-1;

if(a.status==="Read"&&b.status==="Unread")return 1;

return b.id-a.id;

});

setNotifications(userNotifications);

window.dispatchEvent(
new Event("notificationUpdated")
);

};
const confirmClearNotifications = () => {

  clearReadNotifications();

  setShowClearModal(false);

};
console.log(notifications);
const filteredNotifications = notifications.filter((item) =>
  (
    item.title +
    item.message +
    item.description +
    item.priority +
    item.dueDate
  )
    .toLowerCase()
    .includes(search.toLowerCase())
);
  return (
    <div className="notification-panel">

      <div
className="notification-header"
>

<h2>Notifications</h2>
<div className="notification-search">
<div className="search-box" style={{ marginBottom: "20px" }}>
  <LuSearch size={18} />
  <input
    type="text"
    placeholder="Search by task or project..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</div>
</div>
<button
className="notification-clear-btn"
onClick={() => setShowClearModal(true)}
>

Clear All

</button>

</div>

        
        {filteredNotifications.length === 0 ? (

<div
style={{
textAlign:"center",
padding:"40px",
color:"#9ca3af",
fontSize:"18px",
fontWeight:"600"
}}
>

No notifications found.

</div>

) : (

filteredNotifications.map((item) => (
  <div className="notification-card" key={item.id}>

    <div className="notification-top">

  <span className="notification-title">
    <LuBell size={18} /> {item.title}
  </span>

  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px"
    }}
  >

    {item.status === "Unread" ? (

      <button
        className="notification-unread"
        onClick={() => markAsRead(item.id)}
      >
        Mark as Read
      </button>

    ) : (

      <span className="notification-read">
        Read
      </span>

    )}

    <button
      className="notification-delete-btn"
      onClick={() => deleteNotification(item.id)}
    >
      <LuTrash2 size={18} />
    </button>

  </div>

</div>

    <p className="notification-row">
      <LuClipboard />
      <strong> Task:</strong> 
      <span>{item.message}</span>
    </p>

    <p className="notification-row">
      <LuLetterText />
      <strong> Project:</strong> 
      <span>{item.description}</span>
    </p>
     <p className="notification-row">
      <LuFlag />
  <strong> Priority:</strong>

  <span
    className={
      item.priority === "Critical"
        ? "offline-badge"
        : item.priority === "High"
        ? "delete-badge"
        : item.priority === "Medium"
        ? "put-badge"
        : "online-badge"
    }
    style={{ marginLeft: "10px" }}
  >
    {item.priority}
  </span>
</p>
     <p className="notification-row">
      <LuCalendar />
      <strong> Due Date:</strong> 
      <span>{item.dueDate}</span>
    </p>
   <div className="notification-footer">
  <span className="notification-time">
    {item.time ? (
  <>
    {new Date(item.time).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    })}{" "}
    •{" "}
    {new Date(item.time).toDateString() === new Date().toDateString()
      ? "Today"
      : new Date(item.time).toLocaleDateString()}
  </>
) : (
  "Just now"
)}
  </span>
</div>


</div>



))

      )}
    {showDeleteModal && (
  <div className="delete-modal-overlay">
    <div className="delete-modal">

      <h2>Delete Notification?</h2>

      <p>
        Are you sure you want to delete this notification?
      </p>

      <div className="delete-modal-buttons">

        <button
          className="cancel-btn"
          onClick={() => setShowDeleteModal(false)}
        >
          Cancel
        </button>

        <button
          className="confirm-delete-btn"
          onClick={confirmDeleteNotification}
        >
          Delete
        </button>

      </div>

    </div>
  </div>
)}
{showClearModal && (
  <div className="delete-modal-overlay">
    <div className="delete-modal">

      <h2>Clear Notifications?</h2>

      <p>
        Are you sure you want to clear all read notifications?
      </p>

      <div className="delete-modal-buttons">

        <button
          className="cancel-btn"
          onClick={() => setShowClearModal(false)}
        >
          Cancel
        </button>

        <button
          className="confirm-delete-btn"
          onClick={confirmClearNotifications}
        >
          Clear All
        </button>

      </div>

    </div>
  </div>
)}
    </div>
  );
}

export default NotificationPanel;