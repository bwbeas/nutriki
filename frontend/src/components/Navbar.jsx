import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <h3 style={{ margin: 0 }}>🪴 Nutriki</h3>
      </div>

      <div style={styles.links}>
        <Link to="/dashboard">Home</Link>
        <Link to="/analytics">Analytics</Link>
        <Link to="/food">Food Log</Link>
        <Link to="/water">Water Log</Link>
        <Link to="/cycle">Cycle Log</Link>
        <Link to="/mood">Mood</Link>
      </div>

      <button onClick={logout} style={styles.logout}>
        Logout
      </button>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    background: "#f7f5f2",
    borderBottom: "1px solid #e5e5e5",
    fontFamily: "sans-serif",
  },
  links: {
    display: "flex",
    gap: "15px",
  },
  logout: {
    padding: "6px 12px",
    cursor: "pointer",
  },
};