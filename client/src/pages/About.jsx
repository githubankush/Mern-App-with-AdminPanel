import { useAuth } from "../store/auth";

export const About = () => {
  const { user } = useAuth();
  console.log(user);

  return (
    <div className="w-full flex flex-col items-center p-6 md:p-10 bg-white">
      {/* Heading */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6">
        About Us
      </h1>

      {/* Grid Layout for Responsive Design */}
      <div className="flex flex-col md:flex-row  items-center w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 md:p-10">
        
        {/* Left Section (Text) */}
        <div className="flex flex-col justify-center text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
            Welcome, {user?.username || "Guest"} 👋
          </h2>
          <p className="text-gray-600 mt-2 leading-relaxed">
            We are committed to providing excellent services that cater to your needs. 
            Explore our offerings and get to know more about us.
          </p>
        </div>

        {/* Right Section (Profile Image) */}
        <div className="w-full md:w-1/2 flex justify-center">
                        <img src="/images/about-image.jpg" className="w-[90%] md:w-[80%]" alt="Contact" />
                    </div>
      </div>
    </div>
  );
};
