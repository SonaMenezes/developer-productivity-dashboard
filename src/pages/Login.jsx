import { useState } from "react";
import { useNavigate, Link} from "react-router-dom";
import { toast } from "react-toastify";
import { LuEye,LuEyeOff } from "react-icons/lu";
const defaultUsers = [
  {
    id: 1,
    name: "Admin",
    email: "admin@company.com",
    password: "admin123",
    role: "Admin",
  },
];

if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify(defaultUsers));
}

function Login({ setUser }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const login = () => {
  if (!email || !password) {
    toast.warning("Please enter both email and password.");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const foundUser = users.find(
    (user) =>
      user.email === email &&
      user.password === password
  );

  if (!foundUser) {
    toast.error("Invalid email or password.");
    return;
  }

  localStorage.setItem("user", JSON.stringify(foundUser));

  setUser(foundUser);
  toast.success("Login successful!");
  navigate("/");
};

  return (
    <div className="login-page">
      <div className="login-card">

        <h1>Sign in to your account</h1>
        

        <label>Email Address</label>

<input
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

<label>Password</label>
<div className="password-box">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Enter your password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        login();
      }
    }}
  />

  <span
    className="password-eye"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
  </span>
</div>

        <div className="login-options">

  <label className="remember">
    <input type="checkbox" />
    Remember me
  </label>

  <span className="forgot">
    Forgot password?
  </span>

</div>
        <button
          onClick={login}>
          Sign In
        </button>

 <p
  style={{
    textAlign: "center",
    marginTop: "20px",
    color: "#ddd",
  }}
>
  Don't have an account?{" "}
  <Link
    to="/signup"
    style={{
      color: "#FFD700",
      fontWeight: "600",
    }}
  >
    Sign Up
  </Link>
</p>
      </div>
    </div>
  );
}

export default Login;