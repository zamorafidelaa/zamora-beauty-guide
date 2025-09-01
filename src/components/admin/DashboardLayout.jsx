import { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation(); // untuk highlight menu aktif
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(true); // default terbuka
  

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/login");
  };

  const menuItems = [
    { name: "Dashboard", path: "/admin" },
    { name: "Complaints", path: "/admin/complaints" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Hamburger Button for Mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-30 p-2 bg-pink-300 text-white rounded-lg shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed z-20 inset-y-0 left-0 w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:inset-0`}
      >
        <div className="h-16 flex items-center justify-center bg-pink-300 text-white font-bold text-lg rounded-b-xl shadow-sm">
          Admin Panel
        </div>
        <nav className="flex flex-col p-4 gap-2">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center justify-between px-4 py-2 rounded-lg hover:bg-pink-50 cursor-pointer transition font-medium text-gray-700"
          >
            Menu
            {menuOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {menuOpen && (
            <div className="flex flex-col pl-4 gap-1 mt-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`px-4 py-2 rounded-lg cursor-pointer transition
                    ${location.pathname === item.path
                      ? "bg-pink-200 text-pink-800 font-semibold"
                      : "text-gray-600 hover:bg-pink-50 hover:text-pink-700"
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}

          <button
            onClick={handleLogout}
            className="mt-4 px-4 py-2 bg-pink-300 text-white rounded-lg hover:bg-pink-400 cursor-pointer transition shadow-sm"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-10 md:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Content */}
      <main className="flex-1 p-6 overflow-auto bg-gray-50 transition-all">
        <Outlet />
      </main>
    </div>
  );
}
