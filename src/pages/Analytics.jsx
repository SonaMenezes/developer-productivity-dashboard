import AnalyticsSummary from "../components/AnalyticsSummary";
import { BarChart3, TrendingUp, Activity } from "lucide-react";
import UserPerformance from "../components/UserPerformance";
function Analytics({ tasks, projects, users }) {
  return (
    <div className="page-container">

      <div className="hero-card">

        <div className="pagehero-left">
          

          <div className="pagehero-content">
            <h1>Analytics Dashboard</h1>
            <p>
              Gain valuable insights into team productivity, task completion,
              project efficiency and overall performance.
            </p>
          </div>
        </div>

        

      </div>
      console.log(projects);
      <AnalyticsSummary projects={projects} />
     
      <UserPerformance 
      users={users}
      projects={projects}/>
    </div>
  );
}

export default Analytics;