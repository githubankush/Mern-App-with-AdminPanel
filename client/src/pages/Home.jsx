import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export const Home = () => {
  return (
    <section className="w-full min-h-[90vh] flex flex-col md:flex-row items-center justify-center px-2 md:px-12 lg:px-20 py-2 bg-gradient-to-r from-blue-50 via-white to-blue-100">
      
      {/* Left Section */}
      <motion.div
        className="w-full md:w-1/2 space-y-6 text-center md:text-left"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-lg md:text-xl font-semibold text-blue-600 tracking-wide uppercase">
          World’s Best Tech Support Company
        </p>

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
            TechEase
          </span>
        </h1>

        <p className="mt-4 text-gray-700 leading-relaxed text-base md:text-lg max-w-lg mx-auto md:mx-0">
          Ready to take your business to the next level with cutting-edge tech
          support? At{" "}
          <span className="text-blue-500 font-semibold">TechEase</span>, we
          specialize in providing innovative IT services tailored to your needs.
        </p>

        <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center md:justify-start">
          <NavLink
            to="/contact"
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition duration-300 text-lg font-medium"
          >
            Contact Now
          </NavLink>
          <NavLink
            to="/about"
            className="bg-gray-200 text-gray-800 px-8 py-3 rounded-xl hover:bg-gray-300 hover:scale-105 transition duration-300 text-lg font-medium"
          >
            Learn More
          </NavLink>
        </div>
      </motion.div>

      {/* Right Section (Image) */}
      <motion.div
        className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.img
          src="/images/home-image.png"
          alt="Tech Support"
          className="max-w-md md:max-w-lg lg:max-w-xl w-full h-auto rounded-2xl "
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
};
