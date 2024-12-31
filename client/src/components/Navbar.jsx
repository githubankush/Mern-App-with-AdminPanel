import { NavLink } from "react-router-dom"
import { useAuth } from "../store/auth"
export const Navbar = () => {
  const { isLoggedIn } = useAuth();
  return <>
    <header>
      <div className="container flex justify-between items-center bg-blue-400 py-5 px-20">
        <div className="logo-brand font-bold text-2xl text-white">
          <a href="/" className="text-3xl">Ankush <span className="text-blue-900 text-2xl">24X7</span></a>
        </div>
        <nav>
          <ul className="flex gap-10 font-poppins text-lg ">
            <li className=" hover:text-white"><NavLink to="/">Home</NavLink></li>
            <li className=" hover:text-white"><NavLink to="/about">About</NavLink></li>
            <li className=" hover:text-white"><NavLink to="/contact">Contact</NavLink></li>
            <li className=" hover:text-white"><NavLink to="/service">Service</NavLink></li>
            {
              isLoggedIn ? (
                <li className=" hover:text-white"><NavLink to="/logout">Logout</NavLink></li>
              ) : (<>
                <li className=" hover:text-white"><NavLink to="/register">Register</NavLink></li>
                <li className=" hover:text-white"><NavLink to="/login">Login</NavLink></li>
              </>)
            }


          </ul>
        </nav>
      </div>

    </header>
  </>
}

