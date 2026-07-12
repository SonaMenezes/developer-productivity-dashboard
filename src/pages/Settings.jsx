import { useState } from "react";
import { Settings as SettingsIcon, User, FolderKanban, CameraIcon, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
function Settings({ user,setUser }) {
  const isAdmin = user?.role?.toLowerCase() === "admin";

  const [name, setName] = useState(user?.name || user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profileImage, setProfileImage] = useState(user?.profileImage || "");

  const [organization, setOrganization] = useState(
    localStorage.getItem("organization") || "ABC Technologies"
  );
  const [workspaceName, setWorkspaceName] = useState(
  localStorage.getItem("workspaceName") ||
  "Developer Productivity Dashboard"
);

const [workingHours, setWorkingHours] = useState(
  localStorage.getItem("workingHours") || "9:00 AM - 6:00 PM"
);

const [attendanceCutoff, setAttendanceCutoff] = useState(
  localStorage.getItem("attendanceCutoff") || "10:00"
);

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showOrganizationModal, setShowOrganizationModal] = useState(false);

  const handleImageUpload = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    setProfileImage(reader.result);
  };

  reader.readAsDataURL(file);
};
  const saveProfile = () => {

  const users =
    JSON.parse(localStorage.getItem("users")) || [];

  const updatedUsers = users.map((u) =>
    u.email === user.email
      ? {
          ...u,
          name,
          email,
          profileImage,
        }
      : u
  );

  localStorage.setItem(
    "users",
    JSON.stringify(updatedUsers)
  );

  const updatedUser =
    updatedUsers.find((u) => u.email === email);

  localStorage.setItem(
    "user",
    JSON.stringify(updatedUser)
  );

  setUser(updatedUser);
  toast.success("Profile updated successfully!");

};

  const saveOrganization = () => {
  localStorage.setItem("workspaceName", workspaceName);
  localStorage.setItem("organization", organization);
  localStorage.setItem("workingHours", workingHours);
  localStorage.setItem("attendanceCutoff", attendanceCutoff);

  toast.success("Organization settings saved!");
};

  return (
    <div>
      {/* Profile */}

      <div className="settings-card">

        <h2
  style={{
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    color: "#FFD700",
    fontWeight: "700",
  }}
>
  <User size={22} />
  Profile Settings
</h2>
        <div className="profile-settings-header">

  <div className="settings-avatar">

    {profileImage ? (

      <img
        src={profileImage}
        alt="Profile"
        className="settings-avatar-img"
      />

    ) : (

      <span>
        {user?.name
          ?.split(" ")
          .map((n) => n[0])
          .join("")}
      </span>

    )}

  </div>

  <label className="upload-photo-btn">
  <CameraIcon size={18} />
  <span className="upload-text">
    {profileImage
      ? "Change Profile Picture"
      : "Upload Profile Picture"}
  </span>

  <input
    type="file"
    accept="image/*"
    hidden
    onChange={handleImageUpload}
  />
</label>
  
  {profileImage && (
    <button className="remove-photo-btn"
    onClick={() => {
      setShowProfileModal(true);
    }}
    >
      <Trash2 size={18} />
      Remove Profile Picture
    </button>
  )}

</div>

        <div className="settings-grid">

          <div>
            <label>Name</label>
            <input
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
          </div>

          <div>
            <label>Email</label>
            <input
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

         <div>
  <label>Role</label>
  <input
    readOnly
    value={
      user?.role
        ? user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()
        : "User"
    }
  />
</div>

          <div>
            <label>Department</label>
            <input
              readOnly
              value={isAdmin ? "Administration" : "Development"}
            />
          </div>

        </div>

        <button className="save-btn" 
        onClick={() => 
          setShowSaveModal(true)}>
          Save Profile
        </button>

      </div>

     {isAdmin && (
  <div className="settings-card">

    <h2
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        color: "#FFD700",
        fontWeight: "700",
      }}
    >
      <FolderKanban size={22} />
      Organization Settings
    </h2>

    <div className="settings-grid">

      <div>
        <label>Workspace Name</label>
        <input
          value={workspaceName}
          onChange={(e) => setWorkspaceName(e.target.value)}
        />
      </div>

      <div>
        <label>Organization Name</label>
        <input
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
        />
      </div>

      <div>
        <label>Working Hours</label>
        <input
          value={workingHours}
          onChange={(e) => setWorkingHours(e.target.value)}
          placeholder="9:00 AM - 6:00 PM"
        />
      </div>

      <div>
  <label>Attendance Cut-off Time</label>

  <select
    value={attendanceCutoff}
    onChange={(e) => setAttendanceCutoff(e.target.value)}
  >
    <option value="09:00">9:00 AM</option>
    <option value="09:30">9:30 AM</option>
    <option value="10:00">10:00 AM</option>
    <option value="10:30">10:30 AM</option>
    <option value="11:00">11:00 AM</option>
  </select>
</div>

    </div>

    <button
  className="save-btn"
  onClick={() => setShowOrganizationModal(true)}
>
  Save Organization Settings
</button>

  </div>
)}
      {showProfileModal && (
  <div className="modal-overlay">
    <div className="delete-modal">

      <h2>Remove Profile Picture</h2>

      <p>
        Are you sure you want to remove your profile picture?
      </p>

      <div className="modal-actions">

        <button
          className="cancel-btn"
          onClick={() => setShowProfileModal(false)}
        >
          Cancel
        </button>

        <button
          className="delete-confirm-btn"
          onClick={() => {

  setProfileImage("");

  const users =
    JSON.parse(localStorage.getItem("users")) || [];

  const updatedUsers = users.map((u) =>
    u.email === user.email
      ? {
          ...u,
          profileImage: "",
        }
      : u
  );

  localStorage.setItem(
    "users",
    JSON.stringify(updatedUsers)
  );

  const updatedUser = updatedUsers.find(
    (u) => u.email === user.email
  );

  localStorage.setItem(
    "user",
    JSON.stringify(updatedUser)
  );

  setUser(updatedUser);

  setShowProfileModal(false);

  toast.success("Profile picture removed successfully!");

}}
        >
          Remove
        </button>

      </div>

    </div>
  </div>
)}
{showSaveModal && (
  <div className="modal-overlay">
    <div className="delete-modal">

      <h2>Save Changes</h2>

      <p>
        Are you sure you want to save your profile changes?
      </p>

      <div className="modal-actions">

        <button
          className="cancel-btn"
          onClick={() => setShowSaveModal(false)}
        >
          Cancel
        </button>

        <button
          className="save-btn"
          onClick={() => {
            saveProfile();
            setShowSaveModal(false);
          }}
        >
          Save
        </button>

      </div>

    </div>
  </div>
)}
{showOrganizationModal && (
  <div className="modal-overlay">
    <div className="delete-modal">

      <h2>Save Organization Settings</h2>

      <p>
        Are you sure you want to save the organization settings?
      </p>

      <div className="modal-actions">

        <button
          className="cancel-btn"
          onClick={() => setShowOrganizationModal(false)}
        >
          Cancel
        </button>

        <button
          className="save-btn"
          onClick={() => {
            saveOrganization();
            setShowOrganizationModal(false);
          }}
        >
          Save
        </button>

      </div>

    </div>
  </div>
)}
    </div>
  );
}

export default Settings;