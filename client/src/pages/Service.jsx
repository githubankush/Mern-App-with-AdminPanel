import { useAuth } from "../store/auth";
import { motion } from "framer-motion";

export const Service = () => {
  const { service } = useAuth();

  // Simple fade-up animation for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="w-full min-h-screen flex flex-col p-6 md:p-12 bg-gradient-to-b from-blue-50 via-white to-blue-100">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500 mb-10"
      >
        Our Premium Services
      </motion.h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {service?.map((currentService, index) => {
          const { service, price, description, provider, image } = currentService;

          return (
            <motion.div
              key={index}
              variants={cardVariants}
              initial={{opacity: 0, y: 30}}
              animate={{opacity: 1, y: 0, transition: {duration: 0.5}}}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
            >
              {/* Image */}
              <motion.div
              key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
                className="w-full h-48 overflow-hidden"
                whileHover={{ scale: 1.05 }}
              >
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={image}
                  alt={service}
                  className="w-full h-full object-cover"
                />
              </div>
                </motion.div>

              {/* Service Info */}
              <div className="p-6 flex flex-col gap-3">
                <h2 className="text-2xl font-bold text-gray-800">
                  {service}
                </h2>
                <h3 className="text-lg text-blue-600 font-semibold">
                  {price}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {description}
                </p>
                <h4 className="text-gray-700 font-medium mt-2 italic">
                  Provided by {provider}
                </h4>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
