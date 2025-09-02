import { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const Contact = () => {
  const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
  });

  const { user } = useAuth();
  const navigate = useNavigate();

  // Prefill user details if logged in
  useEffect(() => {
    if (user) {
      setContact({
        username: user.username,
        email: user.email,
        message: "",
      });
    }
  }, [user]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Contact User: ", contact);

    try {
      const response = await fetch(`${API}/api/form/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        setContact({ username: "", email: "", message: "" });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen flex flex-col justify-center items-center px-6 py-12 ">
      {/* Title */}
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-blue-500 mb-10 text-center drop-shadow-md"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Get in Touch ✨
      </motion.h1>

      <div className="flex flex-col md:flex-row gap-10 w-full max-w-6xl">
        {/* Contact Form Card */}
        <motion.div
          className="flex-1 bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-8 border border-white/40"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
            Send Us a Message 💌
          </h2>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={contact.username}
                onChange={handleInput}
                required
                placeholder="Enter your name"
                className="w-full p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={contact.email}
                onChange={handleInput}
                required
                placeholder="Enter your email"
                className="w-full p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={contact.message}
                onChange={handleInput}
                rows="5"
                required
                placeholder="Write your message..."
                className="w-full p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:bg-blue-600 transition-all"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>

        {/* Map Card */}
        <motion.div
          className="flex-1 bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl overflow-hidden border border-white/40"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d78510.49266759012!2d75.80060237010142!3d22.746978728183638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fcad1b410ddb%3A0x96ec4da356240f4!2sIndore%2C%20Madhya%20Pradesh!5e1!3m2!1sen!2sin!4v1756814154607!5m2!1sen!2sin" width="600" height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </motion.div>
      </div>
    </section>
  );
};
