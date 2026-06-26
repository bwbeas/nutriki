import { Link, useNavigate } from "react-router-dom";
//import "../pages/theme.css";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="nk-navbar">
      <div className="nk-navbar-left">
        <h3 className="nk-navbar-brand">🪴 Nutriki</h3>
      </div>

      <div className="nk-navbar-links">
        <Link to="/dashboard">Home</Link>
        <Link to="/analytics">Analytics</Link>
        <Link to="/food">Food Log</Link>
        <Link to="/water">Water Log</Link>
        <Link to="/cycle">Cycle Log</Link>
        <Link to="/mood">Mood</Link>
      </div>

      <button onClick={logout} className="nk-navbar-logout">
        Logout
      </button>
    </nav>
  );
}