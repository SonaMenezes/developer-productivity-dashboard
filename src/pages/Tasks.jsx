import TaskManager from "../components/TaskManager";
import { ClipboardList } from "lucide-react";

function Tasks({ user, tasks, setTasks }) {
  return (
    <div>

      <div className="projects-hero">

        <div className="hero-left">

          <div className="hero-icon">
            <ClipboardList size={48} />
          </div>

          <div>
            <h1>Task Management</h1>

            <p>
              Create, organize and monitor tasks efficiently across multiple
              projects.
            </p>
          </div>

        </div>

      </div>
      <div style={{marginTop: "25px"}}>
      <TaskManager
        user={user}
        tasks={tasks}
        setTasks={setTasks}
      />
    </div>
    </div>
  );
}

export default Tasks;