
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

      <input name="nickname" placeholder="nickname (3-10 characters)" onChange={handleChange} />
      <br />

      <input
  type="email"
  name="email"
  placeholder="email"
  onChange={handleChange}
/>
      <br />

      <input
        name="password"
        type="password"
        placeholder="password (min 8 char, 1 letter & num)"
        onChange={handleChange}
      />
      <br />

      <input name="age" placeholder="age (18-40)" onChange={handleChange} />
      <br />

      <input name="height_cm" placeholder="height (cm)" onChange={handleChange} />
      <br />

      <input name="weight_kg" placeholder="weight (kg)" onChange={handleChange} />
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
  <MenuItem value="Sedentary">sedentary</MenuItem>
  <MenuItem value="Lightly Active">lightly active</MenuItem>
  <MenuItem value="Moderately Active">moderately active</MenuItem>
  <MenuItem value="Very Active">very active</MenuItem>
</TextField>

      <button onClick={handleRegister}>start my journey 🌱</button>

      <p>
        already have an account? <Link to="/Login">login</Link>
      </p>
      <h4>p.s. login/register might be a little slow because the backend is hosted on a free tier. if the button isn't working please wait 30 seconds. sorry 😭</h4>
 
    </div>
  );
}