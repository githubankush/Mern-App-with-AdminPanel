import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn } from "lucide-react";

export const Login = () => {
  const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
  const { user, isloggedIn, admin, storeTokenInLS } = useAuth();
  const [User, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (admin && isloggedIn) {
      navigate("/admin/home");
    }
  }, [isloggedIn, admin, navigate]);

  // Handle inputs
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...User, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(User),
        credentials: "include",
      });

      if (response.ok) {
        const res_data = await response.json();
        storeTokenInLS(res_data.token);
        toast.success("Login Successful 🎉");
        setUser({ email: "", password: "" });
        if (admin) {
        navigate("/admin/");
        } else {
        navigate("/");
        }

      } else {
        toast.error("Invalid Credentials ❌");
      }
    } catch (error) {
      console.log("LOGIN ERROR: ", error);
      toast.error("Something went wrong, try again!");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center  bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Left Side - Image */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-500 via-blue-300  items-center justify-center p-6">
          <motion.img
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            src="/images/login-image.jpg"
            alt="Login Illustration"
            className="rounded-xl shadow-lg max-h-[400px] object-cover"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
            Welcome Back 👋
          </h1>
          <p className="text-gray-500 text-center mb-6">
            Login to continue exploring
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email Address
              </label>
              <div className="flex items-center border rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-400 mt-1">
                <Mail className="ml-3 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={User.email}
                  onChange={handleInput}
                  placeholder="Enter your email"
                  className="w-full p-3 bg-transparent focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <div className="flex items-center border rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-400 mt-1">
                <Lock className="ml-3 text-gray-400" size={20} />
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={User.password}
                  onChange={handleInput}
                  placeholder="Enter your password"
                  className="w-full p-3 bg-transparent focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-lg transition-all duration-300"
            >
              <LogIn size={20} />
              Login
            </motion.button>
          </form>

          <p className="text-center text-gray-500 mt-6">
            Don’t have an account?{" "}
            <a href="/register" className="text-indigo-600 font-semibold">
              Register
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
