import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons for menu

export const Navbar = () => {
  const { isLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu

  return (
    <>
      <header className="sticky top-0 z-50 bg-blue-400 shadow-md w-full">
        <div className="container w-full flex justify-between items-center py-5 px-6 md:px-20">
          {/* Brand Logo */}
          <div className="font-bold text-2xl text-white">
            <a href="/" className="text-3xl">
              Ankush <span className="text-blue-900 text-2xl">24x7</span>
            </a>
          </div>

          {/* Hamburger Menu for Mobile */}
          <button
            className="md:hidden text-white text-2xl focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex">
            <ul className="flex gap-8 font-poppins text-lg">
              <li className="hover:text-white">
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="hover:text-white">
                <NavLink to="/about">About</NavLink>
              </li>
              <li className="hover:text-white">
                <NavLink to="/contact">Contact</NavLink>
              </li>
              <li className="hover:text-white">
                <NavLink to="/service">Service</NavLink>
              </li>
              {isLoggedIn ? (
                <li className="hover:text-white">
                  <NavLink to="/logout">Logout</NavLink>
                </li>
              ) : (
                <>
                  <li className="hover:text-white">
                    <NavLink to="/register">Register</NavLink>
                  </li>
                  <li className="hover:text-white">
                    <NavLink to="/login">Login</NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <nav className="md:hidden bg-blue-500 py-4">
            <ul className="flex flex-col items-center gap-4 font-poppins text-lg">
              <li className="hover:text-white">
                <NavLink to="/" onClick={() => setIsOpen(false)}>
                  Home
                </NavLink>
              </li>
              <li className="hover:text-white">
                <NavLink to="/about" onClick={() => setIsOpen(false)}>
                  About
                </NavLink>
              </li>
              <li className="hover:text-white">
                <NavLink to="/contact" onClick={() => setIsOpen(false)}>
                  Contact
                </NavLink>
              </li>
              <li className="hover:text-white">
                <NavLink to="/service" onClick={() => setIsOpen(false)}>
                  Service
                </NavLink>
              </li>
              {isLoggedIn ? (
                <li className="hover:text-white">
                  <NavLink to="/logout" onClick={() => setIsOpen(false)}>
                    Logout
                  </NavLink>
                </li>
              ) : (
                <>
                  <li className="hover:text-white">
                    <NavLink to="/register" onClick={() => setIsOpen(false)}>
                      Register
                    </NavLink>
                  </li>
                  <li className="hover:text-white">
                    <NavLink to="/login" onClick={() => setIsOpen(false)}>
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        )}
      </header>
    </>
  );
};
