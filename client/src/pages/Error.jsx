
import { NavLink } from 'react-router-dom';

export const Error = () => {
  return (
    <div className="flex flex-col w-full max-h-72 p-10 border-3 border-blue-500 items-center justify-center">
      <h1 className="text-8xl font-bold text-blue-600 mt-4 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 text-center mb-6 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      <div className="buttons flex gap-4 mt-5">
      <NavLink to="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
        Go Back to Homepage
      </NavLink>
      <NavLink to="/contact" className="bg-gray-300 text-black px-6 py-3 rounded-lg hover:bg-blue-500  transition duration-300">
        Report Problem
      </NavLink>
      </div>
      
    </div>
  );
};

export default Error;
