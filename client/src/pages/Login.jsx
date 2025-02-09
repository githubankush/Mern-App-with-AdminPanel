import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export const Login = () => {
    const [User, setUser] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    // Using context API
    const { storeTokenInLS, user } = useAuth();

    // Handling the input values
    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...User, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("USER", user);
        try {
            const response = await fetch(`http://localhost:5000/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(User)
            });
            if (response.ok) {
                const res_data = await response.json();
                storeTokenInLS(res_data.token);
                alert('Login Successful');
                setUser({ email: "", password: "" });
                user?.isAdmin ? navigate("/admin/") : navigate("/");
            } else {
                alert('Invalid Credentials');
            }
        } catch (error) {
            console.log("LOGIN: ", error);
        }
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center p-2 md:p-6">
            {/* Login Image */}
            <div className="w-full md:w-1/2 flex justify-center">
                        <img src="/images/login-image.jpg" className="w-[90%] md:w-[80%]" alt="Contact" />
                    </div>
            
            {/* Login Form */}
            <div className="w-full md:w-1/2 flex flex-col items-center p-2 md:p-10 bg-white">
                <h1 className="text-3xl font-bold text-blue-500 border-b-2 border-blue-400  mb-4">Login</h1>
                <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white shadow-lg rounded-lg p-6">
    <label htmlFor="email" className="font-medium">Email</label>
    <input 
        value={User.email} 
        onChange={handleInput} 
        className="w-full p-2 mb-3 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
        type="email" 
        name="email" 
        id="email" 
        required 
        autoComplete="off"
    />

    <label htmlFor="password" className="font-medium">Password</label>
    <input 
        value={User.password} 
        onChange={handleInput} 
        className="w-full p-2 mb-4 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
        type="password" 
        name="password" 
        id="password" 
        required 
        autoComplete="off"
    />

    <button 
        type="submit" 
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold p-2 rounded transition duration-200"
    >
        Login
    </button>
</form>

            </div>
        </div>
    );
};
