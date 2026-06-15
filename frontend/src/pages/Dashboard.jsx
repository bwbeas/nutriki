export default function Dashboard() {
  const token = localStorage.getItem("token");

  return (
    <div style={{ padding: "20px" }}>
      <h2>NUTRIKI🪴</h2>

      {token ? (
        <p>ur logged in 🎉</p>
      ) : (
        <p>No token found. Please login.</p>
      )}
    </div>
  );
}