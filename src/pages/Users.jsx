import { useState, useEffect } from "react";
import {
  LuUsers,
  LuPlus,
  LuSearch,
  LuPencil,
  LuTrash2,
  LuX,
} from "react-icons/lu";
import { toast } from "react-toastify";

function Users() {
console.log("Users page loaded");
  // Default Users
  const defaultUsers = [
    {
      id: 1,
      name: "Admin",
      email: "admin@company.com",
      password: "admin123",
      role: "Admin",
      
    },
    {
      id: 2,
      name: "Sona Menezes",
      email: "sona@gmail.com",
      password: "sona123",
      role: "User",
      
    },
  ];
  // Load Users
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers
      ? JSON.parse(savedUsers)
      : defaultUsers;
  });

  // Save Users
  useEffect(() => {
    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );
  }, [users]);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editingUser, setEditingUser] =
    useState(null);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [userToDelete, setUserToDelete] =
    useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "User",
    
  });
  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Open Add User Modal
  const openAddModal = () => {
    console.log("Button Clicked");
    setEditingUser(null);

    setFormData({
      name: "",
      email: "",
      password: "",
      role: "User",
      
    });

    setShowModal(true);
    console.log("Modal should open");
  };

  // Open Edit User Modal
  const openEditModal = (user) => {
    setEditingUser(user);
    setFormData(user);
    setShowModal(true);
  };

  // Save User
  const saveUser = () => {

    if (
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {
      toast.warning("Please fill all fields.");
      return;
    }

    const emailExists = users.some(
      (user) =>
        user.email === formData.email &&
        user.id !== editingUser?.id
    );

    if (emailExists) {
      toast.error("Email already exists.");
      return;
    }

    if (editingUser) {

      const updatedUsers = users.map((user) =>
        user.id === editingUser.id
          ? {
              ...formData,
              id: editingUser.id,
            }
          : user
      );

      setUsers(updatedUsers);

      toast.success("User updated successfully!");

    } else {

      const newUser = {
        ...formData,
        id: Date.now(),
      };

      setUsers([...users, newUser]);

      toast.success("User created successfully!");

    }

    setShowModal(false);

    setEditingUser(null);

    setFormData({
      name: "",
      email: "",
      password: "",
      role: "User",
    
    });

  };

  // Delete User
  const deleteUser = () => {

    setUsers(
      users.filter(
        (user) =>
          user.id !== userToDelete.id
      )
    );

    toast.success("User deleted successfully!");

    setShowDeleteModal(false);

    setUserToDelete(null);

  };

  // Filter Users
  const filteredUsers = users.filter(
    (user) =>
      user.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      user.email
        .toLowerCase()
        .includes(search.toLowerCase())
  );
  return (
    <div className="page-container">

      {/* Hero Section */}

      <div className="hero-card">

        <div className="pagehero-left">
          <div className="pagehero-content">

            <h1>User Management</h1>

            <p>
              Create, manage and monitor all platform users from one place.
            </p>

          </div>

        </div>

      </div>

      {/* Search + Add Button */}

      <div className="users-toolbar">

        <div className="search-box">

          <LuSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <button
  className="action-btn"
  onClick={() => {
    console.log("Clicked");
    openAddModal();
  }}
>
  <LuPlus size={18} />
  Add New User
</button>
        </div>
      <div className="panel">

        <table className="user-table">

          <thead>

            <tr>

              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredUsers.length === 0 ? (

              <tr>

                <td
                  colSpan="4"
                  style={{
                    textAlign: "center",
                    padding: "35px",
                    color: "#9ca3af",
                  }}
                >
                  No matching users found.
                </td>

              </tr>

            ) : (

              filteredUsers.map((user) => (

                <tr key={user.id}>

                  <td>{user.name}</td>

                  <td>{user.email}</td>

                  <td>

                    <span className="role-badge">
                      {user.role}
                    </span>

                  </td>


                  <td>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "10px",
                      }}
                    >

                      <button
                        className="table-btn edit-btn"
                        onClick={() => openEditModal(user)}
                      >
                        <LuPencil />
                      </button>

                      <button
                        className="table-btn delete-btn"
                        onClick={() => {

                          if (user.role === "Admin") {
                            toast.error(
                              "Admin account cannot be deleted."
                            );
                            return;
                          }

                          setUserToDelete(user);
                          setShowDeleteModal(true);

                        }}
                      >
                        <LuTrash2 />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>
      {/* Add / Edit User Modal */}

      {showModal && (

        <div className="modal-overlay">

          <div className="user-modal">

            <div className="modal-header">

              <h2>
                {editingUser ? "Edit User" : "Create User"}
              </h2>

              <button
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                <LuX size={20} />
              </button>

            </div>

            <div className="modal-body">

              <label>Full Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
              />

              <label>Email Address</label>

              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
              />

              <label>Password</label>

              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />

              <label>Role</label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                disabled={editingUser?.role === "Admin"}
              >
                <option>Admin</option>
                <option>User</option>
                <option>Frontend Developer</option>
                <option>Backend Developer</option>
                <option>UI/UX Designer</option>
                <option>QA Tester</option>
                <option>Project Manager</option>
              </select>

        

            </div>

            <div className="modal-footer">

              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="save-btn"
                onClick={saveUser}
              >
                {editingUser ? "Update User" : "Create User"}
              </button>

            </div>

          </div>

        </div>

      )}

      {/* Delete Confirmation Modal */}

      {showDeleteModal && (

        <div className="modal-overlay">

          <div className="delete-modal">

            <h2>Delete User</h2>

            <p>

              Are you sure you want to delete

              <br />

              <strong>{userToDelete?.name}</strong>?

            </p>

            <div className="modal-actions">

              <button
                className="cancel-btn"
                onClick={() => {
                  setShowDeleteModal(false);
                  setUserToDelete(null);
                }}
              >
                Cancel
              </button>

              <button
                className="delete-confirm-btn"
                onClick={deleteUser}
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Users;