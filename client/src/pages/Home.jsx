import { NavLink } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <div className="container w-full  bg-white flex flex-col gap-10 md:flex-row justify-center items-center px-6 py-10 md:px-10 md:py-8">
        
        {/* Left Section */}
        <div className="main w-full md:w-1/2 p-2 md:p-10 text-center md:text-left">
          <p className="text-lg md:text-xl font-bold text-gray-700">
            World's Best Tech Support Company
          </p>
          <h1 className="text-2xl md:text-5xl font-extrabold text-gray-900 mt-2">
            Welcome to Ankush <span className="text-blue-500 text-lg md:text-4xl">24x7</span>
          </h1>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Are you ready to take your business to the next level with cutting-edge Tech Support? At Ankush 
            <span className="text-blue-500"> 24x7</span>, we specialize in providing innovative IT services to meet your unique needs.
          </p>
          <div className="row mt-6 flex flex-col md:flex-row gap-3 md:gap-5">
            <NavLink 
              to="/contact" 
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300 text-center"
            >
              Contact Now
            </NavLink>
            <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Section (Image) */}
        <div className="main2 w-full md:w-1/2 flex justify-center mt-6 md:mt-0">
          <img src="/images/home-image.png" alt="Tech Support" className="max-w-full h-auto rounded-lg " />
        </div>
      
      </div>
    </>
  );
};
