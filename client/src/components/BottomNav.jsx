import { NavLink } from "react-router-dom";
import { Home, Info, Phone, User } from "lucide-react"; // lucide icons

const navItems = [
  { to: "/", icon: <Home size={20} />, label: "Home" },
  { to: "/about", icon: <Info size={20} />, label: "About" },
  { to: "/contact", icon: <Phone size={20} />, label: "Contact" },
  { to: "/service", icon: <User size={20} />, label: "Services" },
];

const BottomNav = () => {
  return (
    <nav className="fixed z-10 bottom-0 left-0 w-full flex md:hidden justify-around bg-white/90 backdrop-blur-md border-t border-gray-200 shadow-md py-2">
      {navItems.map(({ to, icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex flex-col items-center text-sm transition-colors ${
              isActive ? "text-indigo-600" : "text-gray-500"
            }`
          }
        >
          <span className="text-xl">{icon}</span>
          <span className="text-xs">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
