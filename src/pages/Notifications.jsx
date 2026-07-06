import { Bell } from "lucide-react";
import NotificationPanel from "../components/NotificationPanel";

function Notifications({user}) {
  return (
    <div>

      {/* Hero Section */}
      <div className="hero-card">
        

        <div className="pagehero-content">
          
           <h1>Notifications</h1> 
          

          <p>
            Stay updated with team activity, tasks and project changes.
          </p>
        </div>
      </div>

      {/* Notification Panel */}
      <NotificationPanel user={user}/>

    </div>
  );
}

export default Notifications;