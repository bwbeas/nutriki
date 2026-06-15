import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.access_token);
      alert("Login successful 🌿");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.detail || "Error");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>welcome back to nutriki🌿</h2>

      <input name="email" placeholder="Email" onChange={handleChange} />
      <br />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <br />

      <button onClick={handleLogin}>Login</button>

      <p>
        don't have an account? <Link to="/register">register</Link>
      </p>
    </div>
  );
}