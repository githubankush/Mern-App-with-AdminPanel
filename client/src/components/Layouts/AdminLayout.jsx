import { NavLink, Outlet, Navigate } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { LuContact } from "react-icons/lu";
import { MdHomeRepairService } from "react-icons/md";
import { TiHome } from "react-icons/ti";
import { useAuth } from "../../store/auth";
import { useState } from "react";
import { motion } from "framer-motion";

export const AdminLayout = () => {
  const { user, isLoading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Handle Loading & Authentication
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold text-gray-600">
        Loading...
      </div>
    );
  if (!user) return <Navigate to="/login" replace />;
  if (!user.isAdmin) {
    return (
      <div className="text-2xl text-center flex justify-center items-center h-screen text-red-600 font-bold">
        🚫 You are not authorized to access this page
      </div>
    );
  }

  const navItems = [
    { to: "/admin/home", icon: <TiHome />, label: "Home" },
    { to: "/admin/users", icon: <FaUser />, label: "Users" },
    { to: "/admin/contacts", icon: <LuContact />, label: "Contacts" },
    { to: "/admin/services", icon: <MdHomeRepairService />, label: "Services" },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Sidebar - Desktop */}
      <motion.aside
        animate={{ width: isSidebarOpen ? 220 : 70 }}
        transition={{ duration: 0.3 }}
        className="hidden md:flex relative flex-col h-screen p-4 bg-white/90 backdrop-blur-md shadow-lg border-r border-gray-200"
      >
        {/* Toggle Button */}
        <button
          className="absolute -right-3 top-6 bg-indigo-500 text-white rounded-full p-1.5 shadow-md hover:scale-110 transition"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "◀" : "▶"}
        </button>

        {/* Title */}
        <h1
          className={`text-xl font-extrabold bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent mb-8 transition-all ${
            isSidebarOpen ? "block" : "hidden"
          }`}
        >
          Admin
        </h1>

        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-3">
            {navItems.map(({ to, icon, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-base font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md"
                        : "text-gray-600 hover:bg-gray-100"
                    }`
                  }
                >
                  <span className="text-lg">{icon}</span>
                  {isSidebarOpen && <span>{label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </motion.aside>

      {/* Bottom Navigation - Mobile */}
      <nav className="fixed z-10 bottom-0 left-0 w-full flex md:hidden justify-around bg-white/90 backdrop-blur-md border-t border-gray-200 shadow-md py-2">
        {navItems.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center text-sm ${
                isActive ? "text-indigo-600" : "text-gray-500"
              }`
            }
          >
            <span className="text-xl">{icon}</span>
            <span className="text-xs">{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 p-6 md:p-10"
      >
        <Outlet />
      </motion.main>
    </div>
  );
};
