export default function AdminHeader() {
  return (
    <header style={{ backgroundColor: "#f8f9fa", padding: "10px" }}>
      <h1>Admin Panel</h1>
      <nav>
        <a href="/admin">Dashboard</a> | <a href="/about">About</a>
      </nav>
    </header>
  );
}
