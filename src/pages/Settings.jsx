import { useState } from "react";
import { Settings as SettingsIcon, User, FolderKanban, CameraIcon, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
function Settings({ user,setUser }) {
  const isAdmin = user?.role?.toLowerCase() === "admin";

  const [name, setName] = useState(user?.name || user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profileImage, setProfileImage] = useState(user?.profileImage || "");
  const [projectName, setProjectName] = useState(
    localStorage.getItem("projectName") || "Developer Productivity Dashboard"
  );

  const [organization, setOrganization] = useState(
    localStorage.getItem("organization") || "ABC Technologies"
  );

  const [apiVersion, setApiVersion] = useState(
    localStorage.getItem("apiVersion") || "v1"
  );

  const [baseUrl, setBaseUrl] = useState(
    localStorage.getItem("baseUrl") || "https://api.company.com"
  );
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

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

  const saveProject = () => {
    localStorage.setItem("projectName", projectName);
    localStorage.setItem("organization", organization);
    localStorage.setItem("apiVersion", apiVersion);
    localStorage.setItem("baseUrl", baseUrl);

    toast.success("Project settings saved!");
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
              value={isAdmin ? "API Management" : "Development"}
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
            <FolderKanban size={22} /> Project Settings
          </h2>

          <div className="settings-grid">

            <div>
              <label>Project Name</label>
              <input
                value={projectName}
                onChange={(e)=>setProjectName(e.target.value)}
              />
            </div>

            <div>
              <label>Organization</label>
              <input
                value={organization}
                onChange={(e)=>setOrganization(e.target.value)}
              />
            </div>

            <div>
              <label>API Version</label>
              <select
                value={apiVersion}
                onChange={(e)=>setApiVersion(e.target.value)}
              >
                <option>v1</option>
                <option>v2</option>
                <option>v3</option>
              </select>
            </div>

            <div>
              <label>Base URL</label>
              <input
                value={baseUrl}
                onChange={(e)=>setBaseUrl(e.target.value)}
              />
            </div>

          </div>

          <button className="save-btn" onClick={saveProject}>
            Save Project Settings
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
    </div>
  );
}

export default Settings;