
import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import { TextField, MenuItem } from "@mui/material";

export default function Register() {
  const [form, setForm] = useState({
  nickname: "",
  email: "",
  password: "",
  age: "",
  height_cm: "",
  weight_kg: "",
  activity_level: "Sedentary",
});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const res = await API.post("/auth/register", form);
      alert(res.data.message);
      navigate("/");
    } catch (err) {
  alert(JSON.stringify(err.response.data));
}
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>we're glad to have you here 💓</h2>

      <input name="nickname" placeholder="Nickname" onChange={handleChange} />
      <br />

      <input
  type="email"
  name="email"
  placeholder="Email"
  onChange={handleChange}
/>
      <br />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <br />

      <input name="age" placeholder="Age" onChange={handleChange} />
      <br />

      <input name="height_cm" placeholder="Height (cm)" onChange={handleChange} />
      <br />

      <input name="weight_kg" placeholder="Weight (kg)" onChange={handleChange} />
      <br />
     
      <TextField
  select
  label="activity level"
  name="activity_level"
  value={form.activity_level}
  onChange={handleChange}
  fullWidth
  margin="normal"
>
  <MenuItem value="Sedentary">Sedentary</MenuItem>
  <MenuItem value="Lightly Active">Lightly Active</MenuItem>
  <MenuItem value="Moderately Active">Moderately Active</MenuItem>
  <MenuItem value="Very Active">Very Active</MenuItem>
</TextField>

      <button onClick={handleRegister}>start my journey 🌱</button>

      <p>
        already have an account? <Link to="/">login</Link>
      </p>
    </div>
  );
}