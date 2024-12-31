import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../store/auth"
export const Login = () => {
    const [User, setUser] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate();

    // using context api
    const {storeTokenInLS, user} = useAuth();

    // handling the input values
   const handleInput = (e) =>{
    let name = e.target.name;
    let value = e.target.value;

    setUser({...User, [name]: value})

    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log("USER", user);
        try{
            // send the user data to the server
            const response = await fetch(`http://localhost:5000/api/auth/login`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(User)
            },
            )
            if(response.ok) 
            {
                const res_data = await response.json();
                storeTokenInLS(res_data.token);
                alert('Login Successful');
                setUser({
                    email: "",
                    password: ""
                })
                if(!user.isAdmin)
                {

                    navigate("/");
                }
                else{
                    navigate("/admin/")
                }
            }
            else{
                alert('Invalid Credentials');
            }

        }catch(error)
        {
            console.log("LOGIN: ", error);
        }
    }

    return <>
         <div className="main w-full min-h-96 flex justify-between text-black p-10">
            <div className="login-image w-1/2 p-20 ">
                <img src="/images/login-image.jpg" alt="Registration Image" />
            </div>
            <div className="login-content w-1/2 flex justify-around flex-col items-center p-20 ">
            <h1 className="text-3xl font-bold text-blue-400 border-b-2 border-blue-400 p-2 ">Login</h1>
            <form className="login-form flex flex-col gap-2 w-1/  " onSubmit={handleSubmit}>
               
                <label htmlFor="email">Email</label>
                <input value={User.email} onChange={handleInput} className=" bg-gray-200 p-2 text-black " type="email" name="email" id="email" required autoComplete="off"/>
            
                
                <label htmlFor="password">Password</label>
                <input value={User.password} onChange={handleInput} className=" bg-gray-200 p-2 text-black" type="password" name="password" id="password" required autoComplete="off"/>
               
                <input onSubmit={handleSubmit} className="sub text-black font-bold items-end bg-blue-400 p-2 mt-10 hover:bg-blue-500" type="submit" value="Login"/>
             
            </form>
            </div>
            
        </div>
    </>
}