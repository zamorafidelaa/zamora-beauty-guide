import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div>
      {/* Tambahkan Header atau layout global di sini */}
      <Outlet />
      {/* Tambahkan Footer global di sini */}
    </div>
  );
}
