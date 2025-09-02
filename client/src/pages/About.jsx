import { Link } from "react-router-dom";
import { useAuth } from "../store/auth";
import { motion } from "framer-motion";

export const About = () => {
  const { user } = useAuth();

  return (
    <div className="w-full flex flex-col items-center p-6 md:p-12 bg-gradient-to-b from-blue-100 via-white to-blue-50">
      
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"
      >
        About <span className="text-blue-500">TechEase</span>
      </motion.h1>

      {/* Glassmorphic Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col-reverse md:flex-row items-center w-full max-w-6xl 
                   bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl 
                   p-6 md:p-12 gap-10 border border-gray-100"
      >
        {/* Left Section (Text) */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="flex flex-col justify-center text-center md:text-left md:w-1/2"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Welcome, <span className="text-blue-600">{user?.username || "Guest"}</span>
          </h2>
          <p className="text-gray-600 mt-4 leading-relaxed text-lg">
            At <span className="font-bold text-blue-500">TechEase</span>, we believe 
            technology should <span className="font-medium">empower, not frustrate</span>. 
            That’s why we deliver <span className="font-semibold text-indigo-500">24x7 tech support</span> 
            and innovative IT solutions to keep your business running seamlessly.
          </p>
          <p className="text-gray-600 mt-4 leading-relaxed text-lg">
            From startups to enterprises, our mission is to simplify your tech challenges, 
            so you can focus on <span className="font-semibold text-blue-600">what truly matters — growth & success.</span>
          </p>

          <Link
            to={"/service"}
            className="mt-6 px-8 py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 
                       shadow-lg hover:shadow-xl hover:scale-105 transform transition duration-300"
          >
            Explore Our Services
          </Link>
        </motion.div>

        {/* Right Section (Image / Illustration) */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <div className="relative group">
            <img
              src="/images/about-image.jpg"
              className="w-[90%] md:w-[80%] rounded-2xl shadow-lg group-hover:shadow-2xl transform group-hover:scale-105 transition duration-500"
              alt="About TechEase"
            />
            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-indigo-500 opacity-20 blur-2xl group-hover:opacity-30 transition" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
