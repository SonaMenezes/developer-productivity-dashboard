import { useState, useEffect } from "react";
import {
  LuClipboardList,
  LuSearch,
  LuClock3,
  LuLoaderCircle,
  LuCircleCheckBig,
  LuFlag
} from "react-icons/lu";
import { toast } from "react-toastify";

function MyTasks({ user }) {

const [projects,setProjects]=useState([]);

const [tasks,setTasks]=useState([]);

const [search,setSearch]=useState("");

useEffect(()=>{

const savedProjects=
JSON.parse(localStorage.getItem("projects"))||[];

setProjects(savedProjects);

},[]);

useEffect(()=>{

if(!user)return;

const myTasks=[];

projects.forEach(project => {

  const members = Array.isArray(project.members)
    ? project.members
    : [];

  members.forEach(member => {

    if (member.member === user.name) {

      myTasks.push({
        projectId: project.id,
        projectName: project.projectName || "Unnamed Project",
        priority: project.priority || "Medium",
        dueDate: project.dueDate || "No deadline",
        task: member.task || "No task specified",
        status: member.status || "Pending"
      });

    }

  });

});

setTasks(myTasks);

},[projects,user]);



const filteredTasks = tasks.filter(task =>
  (task.task || "")
    .toLowerCase()
    .includes(search.toLowerCase())
  ||
  (task.projectName || "")
    .toLowerCase()
    .includes(search.toLowerCase())
);
const startTask = (projectId) => {
console.log(projectId);
console.log(user.name);
  const updatedProjects = [...projects];

  updatedProjects.forEach(project => {

    if(project.id === projectId){

      const members = Array.isArray(project.members)
  ? project.members
  : [];

members.forEach(member => {
        console.log(member.member);
        if(member.member === user.name){

          member.status = "In Progress";
            const notifications =
JSON.parse(localStorage.getItem("notifications")) || [];

notifications.unshift({

  id: Date.now(),

  recipient: "Admin",

  title: "Task Started",

  message: `${user.name} started working on "${member.task}".`,

  description: ` ${project.projectName}`,

  priority: project.priority,

  dueDate: project.dueDate,

  status: "Unread",

  time: new Date().toISOString()

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

  type: "started",

  message: `${user.name} started working on task "${member.task}".`,
    time: new Date().toISOString()
});

localStorage.setItem(
  "activities",
  JSON.stringify(activities)
);
        }

      });

    }

  });

  localStorage.setItem(
    "projects",
    JSON.stringify(updatedProjects)
  );
  window.dispatchEvent(new Event("projectsUpdated"));
  window.dispatchEvent(new Event("storage"));
  setProjects(updatedProjects);
toast.success("Task started successfully!");
};
const completeTask = (projectId) => {

  const updatedProjects = [...projects];

  updatedProjects.forEach(project => {

    if(project.id === projectId){

      const members = Array.isArray(project.members)
  ? project.members
  : [];

members.forEach(member => {

        if(member.member === user.name){

    member.status = "Completed";

    const notifications =
    JSON.parse(localStorage.getItem("notifications")) || [];

    notifications.unshift({

      id: Date.now(),

      recipient: "Admin",

      title: "Task Completed",

      message: `${user.name} completed "${member.task}".`,

      description: ` ${project.projectName}`,

      priority: project.priority,

      dueDate: project.dueDate,

      status: "Unread",

      time: new Date().toISOString()

    });

    localStorage.setItem(
      "notifications",
      JSON.stringify(notifications)
    );
    window.dispatchEvent(new Event("notificationUpdated"));
    const activities =
JSON.parse(localStorage.getItem("activities")) || [];

activities.unshift({

  id: Date.now(),

  type: "completed",

  message: `${user.name} completed "${member.task}".`,
    time: new Date().toISOString()
});

localStorage.setItem(
"activities",
JSON.stringify(activities)
);
}

      });

    }

  });

  localStorage.setItem(
  "projects",
  JSON.stringify(updatedProjects)
);
window.dispatchEvent(new Event("projectsUpdated"));
window.dispatchEvent(new Event("storage"));
setProjects(updatedProjects);

toast.success("Task completed successfully!");
setTimeout(() => {

  setTasks(currentTasks =>
    currentTasks.filter(
      task => task.projectId !== projectId
    )
  );

}, 1000);
};

return(

<div className="qxmv-page">

<div className="hero-card">


<div className="pagehero-content">

<h1>My Tasks</h1>

<p>

View your assigned work,
update progress and keep your
team informed in real-time.

</p>

</div>

</div>

<div className="qxmv-search-row">

<div className="qxmv-search-box">

<LuSearch
className="qxmv-search-icon"
/>

<input

type="text"

placeholder="Search tasks..."

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

/>

</div>

</div>
<p style={{color:"white",fontSize:"20px"}}>
  Tasks:{filteredTasks.length}
</p>
<div className="qxmv-grid">

{filteredTasks.length===0? (

<div className="qxmv-empty-card">

<h2>No Tasks Assigned</h2>

<p>
You don't have any assigned tasks yet.
</p>

</div>

):(filteredTasks.map((task,index)=>(

<div
key={index}
className="qxmv-task-card"
>

<div className="qxmv-card-header">

<h2>{task.task}</h2>

<span className={`qxmv-priority-${(task.priority || "medium").toLowerCase()}`}>

<LuFlag size={15}/>

{task.priority}

</span>

</div>

<div className="qxmv-info-row">

<p>

<strong>Project</strong>

</p>

<span>

{task.projectName}

</span>

</div>

<div className="qxmv-info-row">

<p>

<strong>Deadline</strong>

</p>

<span>

{task.dueDate}

</span>

</div>

<div className="qxmv-info-row">

<p>

<strong>Status</strong>

</p>

{task.status === "Pending" ? (

<button
className="qxmv-start-btn"
onClick={() =>
startTask(task.projectId)}
>
Start Working
</button>

) : task.status === "In Progress" ? (

<button
className="qxmv-complete-btn"
onClick={() =>
completeTask(task.projectId)
}
>
Mark Completed
</button>

) : (

<button
className="qxmv-done-btn"
disabled
>
Completed
</button>

)}

</div>

<div className="qxmv-status-preview">

{task.status==="Pending"&&(

<span className="qxmv-status-pending">

<LuClock3 size={16}/>

Pending

</span>

)}

{task.status==="In Progress"&&(

<span className="qxmv-status-progress">

<LuLoaderCircle size={16}/>

In Progress

</span>

)}

{task.status==="Completed"&&(

<span className="qxmv-status-completed">

<LuCircleCheckBig size={16}/>

Completed

</span>

)}

</div>

</div>

)))}

</div>

</div>

);

}

export default MyTasks;