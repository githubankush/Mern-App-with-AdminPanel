import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import toast from "react-hot-toast";
import { User, Mail, Phone, Lock } from "lucide-react";
import {motion} from "framer-motion";
export const Register = () => {
  const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
        credentials: "include",
      });

      const res_data = await response.json();

      if (response.ok) {
        storeTokenInLS(res_data.token);
        toast.success(res_data.message || "Registration Successful");
        setUser({ username: "", email: "", phone: "", password: "" });
        navigate("/");
      } else {
        toast.error(res_data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Register Error: ", error);
      toast.error("Server not responding. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-64px)] flex items-center justify-center  bg-gradient-to-br from-blue-50 to-blue-100 ">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
      
      <div className="flex flex-col md:flex-row bg-white/20 backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden max-w-5xl w-full">
        
        {/* Left side image */}
         <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-500 via-blue-300  items-center justify-center p-6">
          <motion.img
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            src="/images/register-image.jpg"
            alt="Login Illustration"
            className="rounded-xl shadow-lg max-h-[400px] object-cover"
          />
        </div>

        {/* Form side */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8">
          <h1 className="text-4xl font-extrabold text-blue-500 drop-shadow-lg mb-6 text-center">
            Create Account
          </h1>
          <form
            onSubmit={handleSubmit}
            className="bg-white/80 rounded-xl p-6 shadow-lg space-y-4"
          >
            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Username
              </label>
              <div className="flex items-center bg-gray-100 rounded-md p-2 focus-within:ring-2 focus-within:ring-indigo-500">
                <User className="text-gray-500 mr-2" size={18} />
                <input
                  value={user.username}
                  onChange={handleInput}
                  className="w-full bg-transparent focus:outline-none"
                  type="text"
                  name="username"
                  required
                  placeholder="Enter username"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Email
              </label>
              <div className="flex items-center bg-gray-100 rounded-md p-2 focus-within:ring-2 focus-within:ring-indigo-500">
                <Mail className="text-gray-500 mr-2" size={18} />
                <input
                  value={user.email}
                  onChange={handleInput}
                  className="w-full bg-transparent focus:outline-none"
                  type="email"
                  name="email"
                  required
                  placeholder="Enter email"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Phone
              </label>
              <div className="flex items-center bg-gray-100 rounded-md p-2 focus-within:ring-2 focus-within:ring-indigo-500">
                <Phone className="text-gray-500 mr-2" size={18} />
                <input
                  value={user.phone}
                  onChange={handleInput}
                  className="w-full bg-transparent focus:outline-none"
                  type="tel"
                  name="phone"
                  required
                  pattern="[0-9]{10}"
                  placeholder="10-digit phone"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="flex items-center bg-gray-100 rounded-md p-2 focus-within:ring-2 focus-within:ring-indigo-500">
                <Lock className="text-gray-500 mr-2" size={18} />
                <input
                  value={user.password}
                  onChange={handleInput}
                  className="w-full bg-transparent focus:outline-none"
                  type="password"
                  name="password"
                  required
                  placeholder="Enter password"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-bold text-white transition duration-300 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-xl"
              }`}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
      </motion.div>
    </section>
  );
};
