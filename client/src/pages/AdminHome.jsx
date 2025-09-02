import { useAuth } from "../store/auth";
import { ShieldCheck, Users, MessageSquare, Settings } from "lucide-react";

export const AdminHome = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-green-600">
          Welcome to Admin Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your application with ease 🚀
        </p>
      </div>

      {/* Welcome Card */}
      <div className="w-full max-w-3xl bg-white shadow-md rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Hello, {user?.username || "Admin"} 👋
        </h2>
        <p className="text-gray-600">
          You have full control over users, services, and contact messages.
        </p>
      </div>

      
    </div>
  );
};
