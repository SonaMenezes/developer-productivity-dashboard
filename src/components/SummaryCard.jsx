import {
  Users,
  ClipboardList,
  FolderKanban,
  TrendingUp,
  CheckCircle2,
  Briefcase,

} from "lucide-react";

const icons = {
  Developers: <Users size={24} />,
  "Team Members": <Users size={24} />,
  "Total Tasks": <ClipboardList size={24} />,
  "Tasks Due Today": <ClipboardList size={24} />,
  Projects: <FolderKanban size={24} />,
  "Active Projects": <Briefcase size={24} />,
  Completed: <CheckCircle2 size={24} />,
  Productivity: <TrendingUp size={24} />,
  "Completion Rate": <TrendingUp size={24} />,
  "Productivity Score": <TrendingUp size={24} />,
};

function SummaryCard({ title, value, subtitle, icon }) {
  return (
    <div className="summary-card">

      <div className="summary-icon">
        {icon || icons[title]}
      </div>

      <h3 className="card-title">{title}</h3>

      <div className="card-value">{value}</div>

      <p className="card-subtitle">{subtitle}</p>

    </div>
  );
}

export default SummaryCard;