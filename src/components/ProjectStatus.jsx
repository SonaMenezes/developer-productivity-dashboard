import { useState } from "react";
import {
  Edit,
  Save,
  Trash2,
  FolderKanban,
} from "lucide-react";
import { toast } from "react-toastify";

function ProjectStatus({ projects, setProjects, user }) {

  const [editProject, setEditProject] = useState(null);
  const [editStatus, setEditStatus] = useState("");
  const [showProjectModal, setShowProjectModal] = useState(false);

const [projectName, setProjectName] = useState("");

const [projectStatus, setProjectStatus] = useState("ON TRACK");
  const startEdit = (name, status) => {
    setEditProject(name);
    setEditStatus(status);
  };

  const saveProject = (name) => {

    const updated = projects.map((project) =>
      project.name === name
        ? { ...project, status: editStatus }
        : project
    );

    setProjects(updated);
    setEditProject(null);

    toast.success("Project updated!");
  };

  const deleteProject = (name) => {

    setProjects(
      projects.filter((project) => project.name !== name)
    );

    toast.error("Project removed!");
  };

  const progressValue = {
    "ON TRACK": 100,
    "AT RISK": 70,
    "DELAYED": 40,
  };

  const progressColor = {
    "ON TRACK": "#22c55e",
    "AT RISK": "#f59e0b",
    "DELAYED": "#ef4444",
  };

  const addProject = () => {

  if (!projectName.trim()) {
    toast.error("Please enter a project name.");
    return;
  }

  const newProject = {
    name: projectName,
    status: projectStatus,
  };

  setProjects([...projects, newProject]);

  toast.success("Project created successfully!");

  setProjectName("");
  setProjectStatus("ON TRACK");
  setShowProjectModal(false);
};

  return (

    <div className="project-section">
      <div className="activitybox-container">
      <div className="activitybox-title">

  <div>
    <h2>Project Overview</h2>
    <p>Track every project from one place.</p>
  </div>

  {user?.role?.toLowerCase() === "admin" && (
    <button
      className="add-project-btn"
      onClick={() => setShowProjectModal(true)}
    >
      + Add Project
    </button>
  )}

</div>
  

  <div className="activitybox-list">
      <div className="project-grid">

        {projects.map((project) => (

          <div className="project-card" key={project.name}>

            <div className="project-top">

              <h3>{project.name}</h3>

              {user?.role?.toLowerCase() === "admin" && (

                <div className="project-actions">

                  {editProject === project.name ? (

                    <button
                      className="save-btn"
                      onClick={() => saveProject(project.name)}
                    >
                      <Save size={16}/>
                    </button>

                  ) : (

                    <>
                      <button
                        className="edit-btn"
                        onClick={() =>
                          startEdit(project.name, project.status)
                        }
                      >
                        <Edit size={16}/>
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteProject(project.name)
                        }
                      >
                        <Trash2 size={16}/>
                      </button>
                    </>

                  )}

                </div>

              )}

            </div>

            {editProject === project.name ? (

              <select
                value={editStatus}
                onChange={(e)=>setEditStatus(e.target.value)}
                className="project-select"
              >
                <option>ON TRACK</option>
                <option>AT RISK</option>
                <option>DELAYED</option>
              </select>

            ) : (

              <span
                className="project-badge"
                style={{
                  color: progressColor[project.status]
                }}
              >
                {project.status}
              </span>

            )}

            <div className="progress-bar">

              <div
                className="progress-fill"
                style={{
                  width:`${progressValue[project.status]}%`,
                  background:progressColor[project.status]
                }}
              />

            </div>

            <div className="progress-footer">

              <span>Progress</span>

              <strong>
                {progressValue[project.status]}%
              </strong>

            </div>

          </div>

        ))}
      </div>
      </div>
        </div>
        {showProjectModal && (
  <div className="modal-overlay">

    <div className="user-modal">

      <div className="modal-header">
        <h2>Add Project</h2>

        <button
          className="close-btn"
          onClick={() => setShowProjectModal(false)}
        >
          ✕
        </button>
      </div>

      <div className="modal-body">

        <label>Project Name</label>

        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Enter project name"
        />

        <label>Status</label>

        <select
          value={projectStatus}
          onChange={(e) => setProjectStatus(e.target.value)}
        >
          <option>ON TRACK</option>
          <option>AT RISK</option>
          <option>DELAYED</option>
        </select>

      </div>

      <div className="modal-footer">

        <button
          className="cancel-btn"
          onClick={() => setShowProjectModal(false)}
        >
          Cancel
        </button>

        <button
          className="save-btn"
          onClick={addProject}
        >
          Add Project
        </button>

      </div>

    </div>

  </div>
)}

    </div>

  );
}

export default ProjectStatus;