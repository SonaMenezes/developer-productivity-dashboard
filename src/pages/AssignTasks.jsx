import { useState, useEffect } from "react";
import {
  LuFolderKanban,
  LuUsers,
  LuCalendarDays,
  LuClipboardList,
  LuFlag,
  LuPlus,
  LuPencil,
  LuTrash2,
  LuEye,
  LuClock3,
  LuCircleDashed,
  LuSearch,LuListCheck,
  LuCircleCheck
} from "react-icons/lu";
import { toast } from "react-toastify";

function AssignTask() {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState(() => {
  const saved = localStorage.getItem("projects");
  return saved ? JSON.parse(saved) : [];
});

  const [editingTask, setEditingTask] = useState(null);
  const [search, setSearch] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showProjectDeleteModal, setShowProjectDeleteModal] = useState(false);
const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [formData, setFormData] = useState({
  projectName: "",
  description: "",
  priority: "Medium",
  dueDate: "",
  members: [
    {
      member: "",
      task: "",
      status: "Pending"
    }
  ]
});

  useEffect(() => {
    const savedUsers =
      JSON.parse(localStorage.getItem("users")) || [];
    setUsers(savedUsers);
  }, []);

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

  window.addEventListener("storage", refreshProjects);
  window.addEventListener("notificationUpdated", refreshProjects);

  return () => {
    window.removeEventListener("storage", refreshProjects);
    window.removeEventListener("notificationUpdated", refreshProjects);
  };
}, []);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
const handleMemberChange = (index, field, value) => {
  const updatedMembers = [...formData.members];

  updatedMembers[index][field] = value;

  setFormData({
    ...formData,
    members: updatedMembers
  });
};

const addMember = () => {
  setFormData({
    ...formData,
    members: [
      ...formData.members,
      {
        member: "",
        task: "",
        status: "Pending"
      }
    ]
  });
};

const removeMember = (index) => {
  const updatedMembers = [...formData.members];
  updatedMembers.splice(index, 1);

  setFormData({
    ...formData,
    members: updatedMembers
  });
};


  const saveProject = () => {
    if (
  !formData.projectName ||
  !formData.description ||
  !formData.dueDate
) {
  toast.warning("Please fill all fields.");
  return;
}

const hasEmptyMember = formData.members.some(
  (member) => !member.member || !member.task
);

if (hasEmptyMember) {
  toast.warning("Please assign a task to every selected member.");
  return;
}

    if (editingTask) {
  const updatedProjects = projects.map((project) =>
  project.id === editingTask.id
    ? { ...formData, id: editingTask.id }
    : project
);

  setProjects(updatedProjects);

  
  toast.success("Project updated successfully!");
} else {
      const projectId = Date.now();

const newProject = {
  id: projectId,
  ...formData
};

const updatedProjects = [...projects, newProject];

setProjects(updatedProjects);

localStorage.setItem(
  "projects",
  JSON.stringify(updatedProjects)
);
const notifications =
  JSON.parse(localStorage.getItem("notifications")) || [];

newProject.members.forEach((member) => {
  notifications.unshift({
    id: Date.now() + Math.random(),

    recipient: member.member,

    title: "New Task Assigned",

    message: `You have been assigned "${member.task}".`,

    description: `${newProject.projectName}`,

    priority: newProject.priority,

    dueDate: newProject.dueDate,

    status: "Unread",

    time: new Date().toISOString(),
  });
});

localStorage.setItem(
  "notifications",
  JSON.stringify(notifications)
);
window.dispatchEvent(new Event("notificationUpdated"));
toast.success("Project created successfully!");

    }

    setEditingTask(null);

    setFormData({
  projectName: "",
  description: "",
  priority: "Medium",
  dueDate: "",
  members: [
    {
      member: "",
      task: "",
      status: "Pending"
    }
  ]
});
  };

  const editTask = (task) => {
    setEditingTask(task);
    setFormData(task);
  };

 const deleteTask = (id) => {
  setSelectedProjectId(id);
  setShowProjectDeleteModal(true);
};

const confirmDeleteProject = () => {

  const updatedProjects = projects.filter(
    (project) => project.id !== selectedProjectId
  );

  setProjects(updatedProjects);

  localStorage.setItem(
    "projects",
    JSON.stringify(updatedProjects)
  );

  toast.success("Project deleted successfully!");

  setShowProjectDeleteModal(false);
  setSelectedProjectId(null);
};

  const filteredProjects = projects.filter((project) => {
  const projectName = project.projectName || "";

  return projectName
    .toLowerCase()
    .includes(search.toLowerCase());
});
const clearAllProjects = () => {
  setShowDeleteModal(true);
};

const confirmDeleteAll = () => {

  setProjects([]);

  localStorage.removeItem("projects");

  toast.success("All projects cleared.");

  setShowDeleteModal(false);

};
  return (
    
<div>
      <div className="hero-card">


  <div className="pagehero-content">
    <h1>Project Management</h1>
    <p>
      Create projects, assign team members, track progress and monitor productivity.
    </p>
  </div>

</div>
      
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px"
        }}
      >
        <div className="search-box">
        
          <LuSearch className="search-icon"/>

          <input
            className="search-input"
            style={{ paddingLeft: "40px" }}
            placeholder="Search projects..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>
      </div>

      <div className="panel">

  <h2 style={{ marginBottom: "20px" }}>
    {editingTask ? "Edit Task" : "Create New Project"}
  </h2>

  <div className="project-management-form-wrapper">

    <div className="form-group">
  <label>Project Name</label>

  <input
    type="text"
    name="projectName"
    placeholder="Enter project name"
    value={formData.projectName}
    onChange={handleChange}
  />
</div>

    <div className="form-group">
      <label>Priority</label>
      <select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
        <option>Critical</option>
      </select>
    </div>

    <div className="form-group">
      <label>Deadline</label>
      <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
      />
    </div>

    <div className="form-group full-width">
      <label>Project Description</label>
      <textarea
        rows="5"
        name="description"
        placeholder="Enter Project details..."
        value={formData.description}
        onChange={handleChange}
      />
    </div>
<div className="assign-form">

   <div className="form-group full-width">
  <label align="center">Team Members & Project Tasks</label>

  <table className="member-table">
    <thead>
      <tr>
        <th>Member</th>
        <th>Assigned Task</th>
        <th>Status</th>
        
      </tr>
    </thead>

    <tbody>
      {formData.members.map((member, index) => (
        <tr key={index}>
          <td>
            <select
              value={member.member}
              onChange={(e) =>
                handleMemberChange(
                  index,
                  "member",
                  e.target.value
                )
              }
            >
              <option value="">Select User</option>

              {users
                .filter((user) => user.role !== "Admin")
                .map((user) => (
                  <option
                    key={user.id}
                    value={user.name}
                  >
                    {user.name}
                  </option>
                ))}
            </select>
          </td>

          <td>
            <input
              type="text"
              placeholder="Assign Task"
              value={member.task}
              onChange={(e) =>
                handleMemberChange(
                  index,
                  "task",
                  e.target.value
                )
              }
            />
          </td>

          <td>
  {member.status === "Pending" ? (
    <span className="pending-badge">
      <LuClock3 size={15} />
      Pending
    </span>
  ) : member.status === "In Progress" ? (
    <span className="progress-badge">
      <LuLoaderCircle size={15} />
      In Progress
    </span>
  ) : (
    <span className="completed-badge">
      <LuCircleCheck size={15} />
      Completed
    </span>
  )}
</td>

          <td>
            {formData.members.length > 1 && (
              <button
                type="button"
                className="table-btn delete-btn"
                onClick={() => removeMember(index)}
              >
                <LuTrash2 />
              </button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  <div className="project-action-row">
  
  <button
    type="button"
    className="project-add-member-btn"
    onClick={addMember}
    style={{ marginTop: "20px" }}
  >
    <LuPlus />
    Add Team Member
  </button>

  
        <div 
        style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop:"30px",
            
        }}
        >
  
  <button
    className="project-create-btn"
    onClick={saveProject}
  >
    <LuPlus />
    {editingTask ? " Update Project" : " Create Project"}
  </button>
    </div>
  </div>
  </div>
  </div>
</div>
</div>
      <div style={{ height: "30px" }}></div>

      <div className="panel">

        <div className="project-table-header">

  <h2>Projects</h2>

  <button
    className="clear-projects-btn"
    onClick={clearAllProjects}
  >
    Clear All
  </button>

</div>

        <table className="user-table">

          <thead>
            <tr>
              <th>Project</th>
              <th>Members</th>
              <th>Progress</th>
              <th>Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredProjects.length === 0 ? (
    <tr>
      <td
        colSpan="6"
        style={{
          textAlign: "center",
          padding: "30px",
          color: "#9ca3af",
        }}
      >
        No projects created yet.
      </td>
    </tr>

  ) : (

    filteredProjects.map((project) => {

  const completed = project.members?.filter(
  (m) => m.status === "Completed"
).length || 0;

  const progress =
    (project.members || []).length > 0
      ? Math.round((completed /  (project.members || []).length) * 100)
      : 0;

console.log(JSON.stringify(project,null,2));
  return (
    <tr key={project.id}>

  <td>{project.projectName}</td>

  <td>{project.members?.length || 0}</td>

 <td>
  <div className="project-progress-bar">
    <div
      className="project-progress-fill"
      style={{ width: `${progress}%` }}
    ></div>
  </div>

  <span className="project-progress-text">
    {progress}%
  </span>
</td>

  <td>{project.dueDate}</td>

  <td>

    <div
      style={{
        display: "flex",
        gap: "10px",
        justifyContent: "center",
      }}
    >
      
      <button
        className="table-btn edit-btn"
        onClick={() => editTask(project)}
      >
        <LuPencil size={20}/>
      </button>

      <button
        className="table-btn delete-btn"
        onClick={() => deleteTask(project.id)}
      >
        <LuTrash2 size={20}/>
      </button>

    </div>

  </td>

</tr>
  
              );
            })

            )}

          </tbody>

        </table>

      </div>
        {showDeleteModal && (
  <div className="delete-modal-overlay">
    <div className="delete-modal">

      <h2>Delete All Projects?</h2>

      <p>
        Are you sure you want to Clear All?
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
          onClick={confirmDeleteAll}
        >
          Clear All
        </button>

      </div>

    </div>
  </div>
)}  
{showProjectDeleteModal && (
  <div className="delete-modal-overlay">
    <div className="delete-modal">

      <h2>Delete Project?</h2>

      <p>Are you sure you want to delete this project?</p>

      <div className="delete-modal-buttons">

        <button
          className="cancel-btn"
          onClick={() => {
            setShowProjectDeleteModal(false);
            setSelectedProjectId(null);
          }}
        >
          Cancel
        </button>

        <button
          className="confirm-delete-btn"
          onClick={confirmDeleteProject}
        >
          Delete
        </button>

      </div>

    </div>
  </div>
)}  
    </div>
  );
}

export default AssignTask;