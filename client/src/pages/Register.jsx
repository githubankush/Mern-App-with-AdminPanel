import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
export const Register = () => {
    const [user, setuser] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
    })

    const navigate = useNavigate();

    // using context api to store the token in local storage
    const {storeTokenInLS}  = useAuth();

    // handling the input values
   const handleInput = (e) =>{
    
    let name = e.target.name;
    let value = e.target.value;
    console.log(user);

    setuser({...user, [name]: value})

    }
    

    // handling the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch(`http://localhost:5000/api/auth/register`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
            console.log("REsponse: ", response);
            

            // empty the form inputs (getting fresh form)
            if(response.ok)
            {
                const res_data = await response.json();
                console.log("registration successful");
                
                // store the token in local storage
                storeTokenInLS(res_data.token);

            
                setuser({ username: "", email: "", phone: "", password: "" });
                navigate("/");
                
            }
            else {
                console.log("Error in response")
              }

        } 
        catch(error)
        {
            console.log("Register: ", error);
        }
        
        

    }

    return <>
        <section>
        <div className="main w-full min-h-96 flex justify-between text-black p-10">
            <div className="register-image w-1/2 ">
                <img src="/images/register-image.jpg" alt="Registration Image" />
            </div>
            <div className="register-content w-1/2 flex justify-around flex-col items-center ">
            <h1 className="text-3xl font-bold text-blue-400 border-b-2 border-blue-400 p-2 ">Registration Page</h1>
            <form className="register-form flex flex-col gap-2 w-1/3  " onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input value={user.username} onChange={handleInput} className=" bg-gray-200 p-2 text-black" type="text" name="username" id="username" required autoComplete="off"/>
                
                <label htmlFor="email">Email</label>
                <input value={user.email} onChange={handleInput} className=" bg-gray-200 p-2 text-black " type="email" name="email" id="email" required autoComplete="off"/>
                
                <label htmlFor="phone">Phone</label>
                <input value={user.phone} onChange={handleInput} className=" bg-gray-200 p-2 text-black" type="number" name="phone" id="phone" required autoComplete="off"/>
                
                <label htmlFor="password">Password</label>
                <input value={user.password} onChange={handleInput} className=" bg-gray-200 p-2 text-black" type="password" name="password" id="password" required autoComplete="off"/>
               
                <input onSubmit={handleSubmit} className="sub text-black font-bold items-end bg-blue-400 p-2 mt-10 hover:bg-blue-500" type="submit" />
             
            </form>
           
            </div>
            
        </div>

        </section>
    </>
}