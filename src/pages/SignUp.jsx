import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LuEye, LuEyeOff } from "react-icons/lu";

function SignUp({setUser}) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
const [showPassword,setShowPassword] = useState(false);
const [showConfirmPassword,setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createAccount = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.warning("Please fill all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const alreadyExists = users.find(
      (user) => user.email === formData.email
    );

    if (alreadyExists) {
      toast.error("Email already exists.");
      return;
    }

    

    const newUser = {
  id: Date.now(),
  name: formData.name,
  email: formData.email,
  password: formData.password,
  role: "User",
};

users.push(newUser);

localStorage.setItem("users", JSON.stringify(users));

// Automatically log the user in
localStorage.setItem("user", JSON.stringify(newUser));
setUser(newUser);

toast.success("Welcome! Your account has been created.");

navigate("/");
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>Create your account</h1>

        <label>Full Name</label>

        <input
          type="text"
          name="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
        />

        <label>Email Address</label>

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />

        <label>Password</label>

        <div className="password-box">
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Create password"
    value={formData.password}
    onChange={handleChange}
  />

  <span
    className="password-eye"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
  </span>
</div>

        <label>Confirm Password</label>

      <div className="password-box">
  <input
    type={showConfirmPassword ? "text" : "password"}
    name="confirmPassword"
    placeholder="Confirm password"
    value={formData.confirmPassword}
    onChange={handleChange}
  />

  <span
    className="password-eye"
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
  >
    {showConfirmPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
  </span>
</div>


        <button onClick={createAccount}>
          Create Account
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            color: "#ddd",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#FFD700",
              fontWeight: "600",
            }}
          >
            Sign In
          </Link>
        </p>

      </div>

    </div>
  );
}

export default SignUp;