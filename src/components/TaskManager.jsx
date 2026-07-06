import { useState } from "react";
import { Edit, Trash2, Save } from "lucide-react";
import { toast } from "react-toastify";
function TaskManager({ user, tasks, setTasks }) {
  const [taskName, setTaskName] = useState("");
  const [taskStatus, setTaskStatus] = useState("Pending");

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const [editIndex, setEditIndex] = useState(null);
  const [editStatus, setEditStatus] = useState("");

  // Add Task
  const addTask = () => {
    if (taskName.trim() === ""){
      toast.warning("Please enter a task name!");
     return;
    }
    const newTask = {
      name: taskName,
      status: taskStatus,
    };

    setTasks([...tasks, newTask]);

    setTaskName("");
    setTaskStatus("Pending");
    toast.success("Task added successfully!");
  };

  // Filter Tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = (task.name || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "All" || task.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  // Start Edit
  const startEdit = (index, status) => {
    setEditIndex(index);
    setEditStatus(status);
    task.info("Editing task...");
  };

  // Save Edit
  const saveEdit = (index) => {
    const updatedTasks = [...tasks];

    updatedTasks[index].status = editStatus;

    setTasks(updatedTasks);
    setEditIndex(null);
    toast.info("Task updated successfully!");
  };

  // Delete Task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    toast.error("Task deleted!");
  };

  return (
    <div className="task-manager">
      <h2>Tasks</h2>

      {user?.role?.toLowerCase() === "admin" && (
        <div className="task-inputs">

          <input
            className="task-search"
            type="text"
            placeholder="Search Tasks"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />

          <select
            className="edit-status-select"
            value={taskStatus}
            onChange={(e) => setTaskStatus(e.target.value)}
          >   
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <button onClick={addTask}>
            Add Task
          </button>
          
        </div>
      )}

      <div className="filter-buttons">
        <button
          className={`filter-btn ${filterStatus === "All" ? "active" : ""}`}
          onClick={() => setFilterStatus("All")}
        >
          All
        </button>

        <button
          className={`filter-btn ${filterStatus === "Pending" ? "active" : ""}`}
          onClick={() => setFilterStatus("Pending")}
        >
          Pending
        </button>

        <button
          className={`filter-btn ${filterStatus === "In Progress" ? "active" : ""}`}
          onClick={() => setFilterStatus("In Progress")}
        >
          In Progress
        </button>

        <button
          className={`filter-btn ${filterStatus === "Completed" ? "active" : ""}`}
          onClick={() => setFilterStatus("Completed")}
        >
          Completed
        </button>
      </div>

      <table className="task-table">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Status</th>

            {user?.role?.toLowerCase() === "admin" && (
              <th>Actions</th>
            )}
          </tr>
        </thead>

        <tbody>
          {filteredTasks.length === 0 ? (
            <tr>
              <td colSpan={user?.role?.toLowerCase() === "admin" ? 3 : 2}>
                No tasks found.
              </td>
            </tr>
          ) : (
            filteredTasks.map((task, index) => (
              <tr key={index}>
                <td>{task.name}</td>

                <td>
                  {editIndex === index ? (
                    <select
                      className="edit-status-select"
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value)}
                    >
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                    </select>
                  ) : (
                    <span
                      className={`status-badge ${task.status
                        .replace(" ", "-")
                        .toLowerCase()}`}
                    >
                      {task.status}
                    </span>
                  )}
                </td>

                {user?.role?.toLowerCase() === "admin" && (
                  <td>

                    {editIndex === index ? (
                      <button
                        className="task-action-btn save-btn"
                        onClick={() => saveEdit(index)}
                      >
                        <Save size={16} color="white" />
                      </button>
                    ) : (
                      <>
                        <button
                          className="task-action-btn edit-btn"
                          onClick={() => startEdit(index, task.status)}
                        >
                          <Edit size={16} color="white" />
                        </button>

                        <button
                          className="task-action-btn delete-btn"
                          onClick={() => deleteTask(index)}
                        >
                          <Trash2 size={16} color="white" />
                        </button>
                      </>
                    )}

                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TaskManager;