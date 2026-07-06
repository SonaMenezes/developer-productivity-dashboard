import { useEffect, useState } from "react";
import {
  LuClipboardList,
  LuCircleCheckBig,
  LuFolderPlus
} from "react-icons/lu";
import { toast } from "react-toastify";
function ActivityFeed() {

  const [activities, setActivities] = useState([]);
  const [showClearModal, setShowClearModal] = useState(false);
  useEffect(() => {

    const loadActivities = () => {

      const saved =
        JSON.parse(localStorage.getItem("activities")) || [];

      setActivities(saved);

    };

    loadActivities();

    window.addEventListener("storage", loadActivities);

    return () =>
      window.removeEventListener("storage", loadActivities);

  }, []);
const clearAllActivities = () => {
  setActivities([]);

  localStorage.removeItem("activities");

  toast.success("Recent activity cleared.");

  setShowClearModal(false);
};
  return (

    <div className="activitybox-container">

      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  }}
>
  <h2 className="activitybox-title">Recent Activity</h2>

  <button
    className="clear-projects-btn"
    onClick={() => setShowClearModal(true)}
    style={{marginRight: "15px"}}
  >
    Clear All
  </button>
</div>
      <div className="activitybox-scroll">
      {activities.length === 0 ? (

        <div className="activitybox-item">

          No recent activity.

        </div>

      ) : (

        activities.map((item) => (

          <div
            key={item.id}
            className="activitybox-item"
          >

            {item.type === "started" && (
              <LuClipboardList
                size={18}
                style={{ marginRight: "10px", color: "#facc15" }}
              />
            )}

            {item.type === "completed" && (
              <LuCircleCheckBig
                size={18}
                style={{ marginRight: "10px", color: "#22c55e" }}
              />
            )}

            {item.type === "project" && (
              <LuFolderPlus
                size={18}
                style={{ marginRight: "10px", color: "#60a5fa" }}
              />
            )}

            <div style={{ display: "flex", flexDirection: "column" }}>

  <span
    style={{
      color: "#ffffff",
      fontWeight: "500"
    }}
  >
    {item.message}
  </span>

  <span
    style={{
      fontSize: "12px",
      color: "#9ca3af",
      marginTop: "4px"
    }}
  >
    {new Date(item.time).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit"
    })}
    {" • "}
    {new Date(item.time).toDateString() === new Date().toDateString()
      ? "Today"
      : new Date(item.time).toLocaleDateString()}
  </span>

</div>

          </div>

        ))

      )}

    </div>
    {showClearModal && (
  <div className="delete-modal-overlay">
    <div className="delete-modal">

      <h2>Clear Recent Activity?</h2>

      <p>
        Are you sure you want to clear all recent activity?
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
          onClick={clearAllActivities}
        >
          Clear
        </button>

      </div>

    </div>
  </div>
)}
</div>
  );

}

export default ActivityFeed;