import { useState, useEffect } from "react";
import {
  LuChartNoAxesCombined,
  LuFolderKanban,
  LuCircleCheckBig,
  LuClock3,
  LuTriangleAlert,
  LuSearch
} from "react-icons/lu";

function Projects() {

  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {

    const savedProjects =
      JSON.parse(localStorage.getItem("projects")) || [];

    setProjects(savedProjects);

  }, []);

  const totalProjects = projects.length;

 const completedProjects = projects.filter(project => {
  const members = Array.isArray(project.members)
    ? project.members
    : [];

  return members.length > 0 &&
    members.every(member => member.status === "Completed");
}).length;

const inProgressProjects = projects.filter(project => {
  const members = Array.isArray(project.members)
    ? project.members
    : [];

  return members.some(member =>
    member.status === "In Progress" ||
    member.status === "Completed"
  ) &&
  !(
    members.length > 0 &&
    members.every(member => member.status === "Completed")
  );
}).length;

  const overdueProjects = projects.filter(project => {

    const today = new Date();

    return new Date(project.dueDate) < today;

  }).length;

  const overallProgress = totalProjects === 0
    ? 0
    : Math.round(
        (completedProjects / totalProjects) * 100
      );

  const filteredProjects = projects.filter(project =>
  (project.projectName || "")
    .toLowerCase()
    .includes(search.toLowerCase())
);

  return (

<div className="ppssx-page">

<div className="hero-card">



<div className="pagehero-content">

<h1>Project Progress</h1>

<p>

Track overall project completion,
monitor deadlines and analyse team
productivity in real-time.

</p>

</div>

</div>

<div className="ppssx-overall-card">

<div className="ppssx-overall-header">

<h2>Overall Project Progress</h2>

<span>

{overallProgress}%

</span>

</div>

<div className="ppssx-progress-track">

<div

className="ppssx-progress-fill"

style={{
width:`${overallProgress}%`
}}

></div>

</div>

<p>

{`${completedProjects} of ${totalProjects} projects completed successfully.`}

</p>

</div>
<div className="ppssx-stat-grid">

<div className="ppssx-stat-card">

<div className="ppssx-stat-icon">
<LuFolderKanban size={30}/>
</div>

<h3>{totalProjects}</h3>

<p>Total Projects</p>

</div>

<div className="ppssx-stat-card">

<div className="ppssx-stat-icon">
<LuClock3 size={30}/>
</div>

<h3>{inProgressProjects}</h3>

<p>In Progress</p>

</div>

<div className="ppssx-stat-card">

<div className="ppssx-stat-icon">
<LuCircleCheckBig size={30}/>
</div>

<h3>{completedProjects}</h3>

<p>Completed</p>

</div>

<div className="ppssx-stat-card">

<div className="ppssx-stat-icon">
<LuTriangleAlert size={30}/>
</div>

<h3>{overdueProjects}</h3>

<p>Overdue</p>

</div>

</div>

<div className="ppssx-search-section">

<div className="ppssx-search-box">

<LuSearch className="ppssx-search-icon"/>

<input

type="text"

placeholder="Search projects..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>

</div>

<select

className="ppssx-filter-select"

value={filter}

onChange={(e)=>setFilter(e.target.value)}

>

<option>All</option>

<option>Completed</option>

<option>In Progress</option>

<option>Overdue</option>

</select>

</div>
<div className="ppssx-table-wrapper">

<table className="ppssx-table">

<thead>

<tr>

<th>Project Name</th>

<th>Progress</th>

<th>Status</th>

<th>Deadline</th>

<th>Members</th>

<th>Priority</th>

</tr>

</thead>

<tbody>

{filteredProjects.length===0?(
<tr>

<td
colSpan="6"
className="ppssx-empty"
>

No Projects Found

</td>

</tr>

):(

filteredProjects.map(project=>{

const members = Array.isArray(project.members)
  ? project.members
  : [];

const completed = members.filter(
  m => m.status === "Completed"
).length;

const totalMembers = members.length;

const progress =
  totalMembers === 0
    ? 0
    : Math.round((completed / totalMembers) * 100);

const overdue=
new Date(project.dueDate)<new Date();

const status =
  totalMembers === 0
    ? "In Progress"
    : overdue && progress < 100
    ? "Overdue"
    : progress === 100
    ? "Completed"
    : "In Progress";

return(

<tr key={project.id}>

<td>

<div className="ppssx-project-title">

 {project.projectName}

</div>

</td>

<td>

<div className="ppssx-progress-wrapper">

<span className="ppssx-progress-text">

{progress}%

</span>

<div className="ppssx-progress-bar">

<div
className="ppssx-progress-fill"
style={{
width:`${progress}%`
}}
></div>

</div>

</div>

</td>

<td>

<span className={`ppssx-status-${status.replace(" ","").toLowerCase()}`}>

{status}

</span>

</td>

<td>

{project.dueDate}

</td>

<td>

{totalMembers}


</td>

<td>

<span className={`ppssx-priority-${(project.priority || "medium").toLowerCase()}`}>

{project.priority || "Medium"}

</span>

</td>

</tr>

);

})

)}

</tbody>

</table>

</div>
</div>
  );
}
export default Projects;