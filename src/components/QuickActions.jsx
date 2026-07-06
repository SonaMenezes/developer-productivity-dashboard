import {
  LuFolderPlus,
  LuUsers,
  LuBell,
  LuArrowRight
} from "react-icons/lu";
import { useNavigate } from "react-router-dom";

function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="quickaction-card">

      <h2 className="quickaction-title">
        Quick Actions
      </h2>

      <div
        className="quickaction-item"
        onClick={() => navigate("/assign-tasks")}
      >
        <div className="quickaction-left">

          <div className="quickaction-icon">
            <LuFolderPlus size={24} />
          </div>

          <div>
            <h4>Create Project</h4>
            <p>Create and assign a new project</p>
          </div>

        </div>

        <LuArrowRight className="quickaction-arrow" />
      </div>

      <div
        className="quickaction-item"
        onClick={() => navigate("/users")}
      >
        <div className="quickaction-left">

          <div className="quickaction-icon">
            <LuUsers size={24} />
          </div>

          <div>
            <h4>Add User</h4>
            <p>Register a new team member</p>
          </div>

        </div>

        <LuArrowRight className="quickaction-arrow" />
      </div>

      <div
        className="quickaction-item"
        onClick={() => navigate("/notifications")}
      >
        <div className="quickaction-left">

          <div className="quickaction-icon">
            <LuBell size={24} />
          </div>

          <div>
            <h4>Notifications</h4>
            <p>View recent updates</p>
          </div>

        </div>

        <LuArrowRight className="quickaction-arrow" />
      </div>

    </div>
  );
}

export default QuickActions;