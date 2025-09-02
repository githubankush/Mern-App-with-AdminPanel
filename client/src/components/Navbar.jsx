import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
import { FiMenu, FiX } from "react-icons/fi";

export const Navbar = () => {
  const { isLoggedIn, admin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // Normal user navigation
  const userNavItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
    { path: "/service", label: "Services" },
  ];

  // Admin navigation
  const adminNavItems = [
    { path: "/admin/home", label: "Home" },
    { path: "/admin/users", label: "Users" },
    { path: "/admin/contacts", label: "Contacts" },
    { path: "/admin/services", label: "Services" },
  ];

  const navItems = admin ? adminNavItems : userNavItems;

  return (
    <header className="sticky top-0 z-50 w-full bg-blue-500/80 backdrop-blur-md shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6 md:px-12">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link to={admin ? "/admin/home" : "/"} className="text-3xl font-extrabold text-white tracking-wide">
            Tech<span className="text-yellow-300">Ease</span>
          </Link>
          {admin && (
            <span className="ml-3 text-xs font-semibold bg-gradient-to-r from-red-500 to-red-700 text-white px-3 py-1 rounded-full shadow-md">
              Admin
            </span>
          )}
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex">
          <ul className="flex gap-8 font-medium text-white">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `relative transition-colors ${
                      isActive
                        ? "text-yellow-300"
                        : "hover:text-yellow-200 hover:scale-105"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            {isLoggedIn ? (
              <li>
                <NavLink
                  to="/logout"
                  className="px-4 py-2 bg-yellow-300 text-blue-900 rounded-lg font-semibold shadow hover:bg-yellow-400 transition-all"
                >
                  Logout
                </NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/register"
                    className="px-4 py-2 bg-yellow-300 text-blue-900 rounded-lg font-semibold shadow hover:bg-yellow-400 transition-all"
                  >
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    className="px-4 py-2 bg-white text-blue-700 rounded-lg font-semibold shadow hover:bg-gray-100 transition-all"
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-3xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <nav className="md:hidden bg-blue-600/95 backdrop-blur-sm py-6 shadow-lg animate-fadeIn">
          <ul className="flex flex-col items-center gap-5 font-medium text-lg text-white">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="hover:text-yellow-300 hover:scale-110 transition-transform"
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            {isLoggedIn ? (
              <li>
                <NavLink
                  to="/logout"
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2 bg-yellow-300 text-blue-900 rounded-lg font-semibold shadow hover:bg-yellow-400 transition-all"
                >
                  Logout
                </NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-2 bg-yellow-300 text-blue-900 rounded-lg font-semibold shadow hover:bg-yellow-400 transition-all"
                  >
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-2 bg-white text-blue-700 rounded-lg font-semibold shadow hover:bg-gray-100 transition-all"
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
};
