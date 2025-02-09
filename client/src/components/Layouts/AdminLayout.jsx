import { NavLink, Outlet, Navigate } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { LuContact } from "react-icons/lu";
import { MdHomeRepairService } from "react-icons/md";
import { TiHome } from "react-icons/ti";
import { useAuth } from "../../store/auth";
import { useState } from "react";

export const AdminLayout = () => {
    const { user, isLoading } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Handle Loading & Authentication
    if (isLoading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
    if (!user) return <Navigate to="/login" replace />;
    if (!user.isAdmin) {
        return <div className="text-2xl text-center flex justify-center items-center h-screen">You are not authorized to access this page</div>;
    }

    return (
        <div className="flex min-h-screen">
            {/* Sidebar - Hidden on Mobile, Collapsible on Tablet/Desktop */}
            <div className={`bg-white shadow-lg p-5 transition-all duration-300 
                ${isSidebarOpen ? "w-64" : "w-16"} md:w-1/6 min-h-screen flex flex-col items-center`}>
                
                <button 
                    className="md:hidden p-2 mb-4 border rounded-lg" 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    {isSidebarOpen ? "Close" : "Open"}
                </button>

                <h1 className={`text-2xl font-bold text-center mb-5 transition-all ${isSidebarOpen ? "block" : "hidden md:block"}`}>Dashboard</h1>

                <nav>
                    <ul className="space-y-3">
                        <li>
                            <NavLink to="/admin/home" className="flex items-center gap-2 text-xl hover:shadow-lg p-2 rounded-lg">
                                <TiHome /> {isSidebarOpen && "Home"}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/users" className="flex items-center gap-2 text-xl hover:shadow-lg p-2 rounded-lg">
                                <FaUser /> {isSidebarOpen && "Users"}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/contacts" className="flex items-center gap-2 text-xl hover:shadow-lg p-2 rounded-lg">
                                <LuContact /> {isSidebarOpen && "Contacts"}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/services" className="flex items-center gap-2 text-xl hover:shadow-lg p-2 rounded-lg">
                                <MdHomeRepairService /> {isSidebarOpen && "Services"}
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-5 w-full">
                <Outlet />
            </div>
        </div>
    );
};