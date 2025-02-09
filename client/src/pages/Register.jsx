import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export const Register = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
    });

    const navigate = useNavigate();
    const { storeTokenInLS } = useAuth();

    const handleInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                const res_data = await response.json();
                storeTokenInLS(res_data.token);
                setUser({ username: "", email: "", phone: "", password: "" });
                navigate("/");
            } else {
                console.log("Error in response");
            }
        } catch (error) {
            console.log("Register Error: ", error);
        }
    };

    return (
        <section className="flex flex-col md:flex-row items-center justify-center  ">
            <div className="w-full md:w-1/2 flex justify-center">
                        <img src="/images/register-image.jpg" className="w-[90%] md:w-[80%]" alt="Contact" />
                    </div>

            <div className="w-full md:w-1/2 flex flex-col items-center p-6">
                <h1 className="text-3xl font-bold text-blue-500 border-b-2 border-blue-400 p-2">Register</h1>
                <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white shadow-lg rounded-lg p-6">
                    <label htmlFor="username" className="font-medium">Username</label>
                    <input value={user.username} onChange={handleInput} className="w-full p-2 mb-3 bg-gray-200 rounded rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" type="text" name="username" required autoComplete="off" />

                    <label htmlFor="email" className="font-medium">Email</label>
                    <input value={user.email} onChange={handleInput} className="w-full p-2 mb-3 bg-gray-200 rounded rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" type="email" name="email" required autoComplete="off" />

                    <label htmlFor="phone" className="font-medium">Phone</label>
                    <input value={user.phone} onChange={handleInput} className="w-full p-2 mb-3 bg-gray-200 rounded rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" type="number" name="phone" required autoComplete="off" />

                    <label htmlFor="password" className="font-medium">Password</label>
                    <input value={user.password} onChange={handleInput} className="w-full p-2 mb-4 bg-gray-200 rounded rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" type="password" name="password" required autoComplete="off" />

                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold p-2 rounded transition duration-200">
                        Register
                    </button>
                </form>
            </div>
        </section>
    );
};
