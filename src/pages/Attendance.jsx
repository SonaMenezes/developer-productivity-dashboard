import { useState } from "react";
import {
  LuCalendarCheck,
  LuBadgeCheck,
} from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Attendance({ user,attendance,setAttendance }) {
  const [sortBy, setSortBy] = useState("Newest");
  const [selectedDate, setSelectedDate] = useState(
  new Date().toISOString().split("T")[0]
);
  if (user.role === "Admin") {
  return (
    <div>

      <div className="hero-card">

        <h1>Attendance Management</h1>

        <p>
          Monitor employee attendance, check check-in times and attendance records.
        </p>

      </div>

      <div className="attendance-card">

        <h2>
          <LuCalendarCheck
            size={26}
            color="#facc15"
          />
          Employee Attendance
        </h2>
        <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "20px 0",
    gap: "20px",
  }}
>

  <div>

    <label
      style={{
        color: "#9ca3af",
        marginRight: "10px",
      }}
    >
      Select Date
    </label>

    <input
      type="date"
      value={selectedDate}
      onChange={(e) =>
        setSelectedDate(e.target.value)
      }
      className="attendance-date-picker"
    />

  </div>

  <div>

    <label
      style={{
        color: "#9ca3af",
        marginRight: "10px",
      }}
    >
      Sort By
    </label>

    <select
      value={sortBy}
      onChange={(e) =>
        setSortBy(e.target.value)
      }
      className="attendance-date-picker"
    >
      <option>Newest</option>
      <option>Oldest</option>
      <option>Name (A-Z)</option>
      <option>Name (Z-A)</option>
  
    </select>

  </div>

</div>
  
       <div className="attendance-table-container">

  <table className="attendance-table">
        
          <thead>

            <tr>
              <th>Developer</th>
              <th>Date</th>
              <th>Check In</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            {attendance.length === 0 ? (

              <tr>

                <td
                  colSpan="4"
                  style={{
                    textAlign: "center",
                    padding: "30px"
                  }}
                >
                  No attendance records found.
                </td>

              </tr>

            ) : (

              attendance
  .filter(
    (record) =>
      record.date === selectedDate
  )
  .sort((a, b) => {

  if (sortBy === "Newest") {
    return b.id - a.id;
  }

  if (sortBy === "Oldest") {
    return a.id - b.id;
  }

  if (sortBy === "Name (A-Z)") {
    return a.user.localeCompare(b.user);
  }

  if (sortBy === "Name (Z-A)") {
    return b.user.localeCompare(a.user);
  }

  return 0;

})
  .map((record) => (

                <tr key={record.id}>

                  <td>{record.user}</td>

                  <td>{record.date}</td>

                  <td>{record.checkIn}</td>

                  <td>

                    <span className="present-badge">
                      {record.status}
                    </span>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>
      </div>
      </div>

    </div>
  );
}
const navigate=useNavigate();

  const currentTime = new Date().toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  });
const today = new Date().toISOString().split("T")[0];
const displayDate = new Date().toLocaleDateString("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
});
const todaysAttendance = attendance.find(
  (record) =>
    record.user === user.name &&
    record.date === today
);

const attendanceMarked = !!todaysAttendance;
const attendanceProgress = attendanceMarked ? 100 : 0;
const markAttendance = () => {

  if (attendanceMarked) return;

  const now = new Date();

  const newAttendance = {
    id: Date.now(),
    user: user.name,
    date: today,
    checkIn: now.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
    }),
    status: "Present",
  };

  setAttendance([
    newAttendance,
    ...attendance,
  ]);
  const notifications =
  JSON.parse(localStorage.getItem("notifications")) || [];

notifications.unshift({
  id: Date.now(),
  recipient: "Admin",
  title: "Attendance Marked",
  message: `${user.name} marked today's attendance.`,
  description: newAttendance.checkIn,
  status: "Unread",
  time: new Date().toISOString(),
});

localStorage.setItem(
  "notifications",
  JSON.stringify(notifications)
);

window.dispatchEvent(new Event("storage"));
const activities =
  JSON.parse(localStorage.getItem("activities")) || [];

activities.unshift({
  id: Date.now(),
  type: "attendance",
  message: `${user.name} marked today's attendance.`,
  time: new Date().toISOString(),
});

localStorage.setItem(
  "activities",
  JSON.stringify(activities)
);

window.dispatchEvent(new Event("storage"));
  toast.success("Attendance recorded successfully!");

setTimeout(() => {
  navigate("/");
}, 1000);

};
  return (
    <div>

      <div className="hero-card">

        <h1>Attendance Portal</h1>

        <p>
          Mark your attendance, monitor attendance history,
          and maintain accurate work records.
        </p>

      </div>

      <div className="attendance-card">

        <h2>
          <LuCalendarCheck
            size={26}
            color="#facc15"
          />
          Attendance Today
        </h2>

        <p className="attendance-status">
          {attendanceMarked
            ? "Your attendance has been successfully recorded for today."
            : "You haven't marked today's attendance yet."}
        </p>
            
        <div className="attendance-info">

          <div>
            <strong>Date</strong>
            <p>{displayDate}</p>
          </div>

          <div>
            <strong>Current Time</strong>
            <p>{currentTime}</p>
          </div>

        </div>

        <button
          className={`attendance-btn ${
            attendanceMarked ? "marked" : ""
          }`}
          disabled={attendanceMarked}
          onClick={markAttendance}
        >
   {attendanceMarked ? (
    <>
    <LuBadgeCheck size={20} />
    Attendance Recorded
  </>
) : (
  <>
    <LuCalendarCheck size={20} />
    Mark Attendance
  </>
)}
        </button>

      </div>
    <div className="attendance-card">

  <h2>
    <LuCalendarCheck size={24} color="#facc15" />
    Attendance History
  </h2>

  <table className="attendance-table">

    <thead>
      <tr>
        <th>Date</th>
        <th>Check-In</th>
        <th>Status</th>
      </tr>
    </thead>

    <tbody>

      {attendance
  .filter(
    (record) => record.user === user.name
  )
  .map((record) => (

          <tr key={record.id}>

            <td>{record.date}</td>

            <td>{record.checkIn}</td>

            <td>
              <span className="present-badge">
                {record.status}
              </span>
            </td>

          </tr>

      ))}

    </tbody>

  </table>

</div>
    </div>
  );
}

export default Attendance;