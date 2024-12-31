import { useState } from "react"
import { useAuth } from "../store/auth"
import { useNavigate } from "react-router-dom"
export const Contact = () => {
    const [contact, setcontact] = useState({
        username: "",
        email: "",
        message: ""
    })
    const { user } = useAuth();
    const [userData, setuserData] = useState(true);
    if(userData && user){
        setcontact({
            username: user.username,
            email: user.email,
            message: "",
        })
        setuserData(false)
    }
    const navigate = useNavigate();
    
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setcontact({
            ...contact,
            [name]: value
        })
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log("Contact User: ", contact);
        try{
            // send data to server
            const response = await fetch("http://localhost:5000/api/form/contact",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify(contact)
            });
            console.log("REsponse: ", response);
            
            if(response.ok){
                alert("Message sent successfully");
                setcontact({
                    username: "",
                    email: "",
                    message: ""
                 }) 
                navigate("/");
            }
        }
        catch(error){
            console.log(error);
        }
    }

    return <>
       <section>
        <div className="main w-full min-h-96 flex justify-between text-black p-10">
            <div className="contact-image w-1/2 p-10 ml-5">
                <img src="/images/contact-image.jpg" className="w-[80%]" alt="Contact Image" />
            </div>
            <div className="contact-content w-1/2 flex justify-around flex-col items-center ">
            <h1 className="text-3xl font-bold text-blue-400 border-b-2 border-blue-400 p-2 ">Contact Us</h1>
            <form className="contact-form flex flex-col gap-2 w-1/3  " onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input value={contact.username} onChange={handleInput} className=" bg-gray-200 p-2 text-black" type="text" name="username" id="username" required autoComplete="off"/>
                
                <label htmlFor="email">Email</label>
                <input value={contact.email} onChange={handleInput} className=" bg-gray-200 p-2 text-black " type="email" name="email" id="email" required autoComplete="off"/>
                
                <label htmlFor="message">Message</label>
                <textarea value={contact.message} onChange={handleInput} className="resize-none bg-gray-200 p-2 text-black " type="text" name="message" id="message" required autoComplete="off"/>
               
                <input onSubmit={handleSubmit} className="sub text-black font-bold items-end bg-blue-400 p-2 mt-10 hover:bg-blue-500" type="submit" />
             
            </form>
           
            </div>
            
        </div>

        <div className="map-location w-full min-h-96 bg-blue-300 flex justify-center items-center mt-10">
        <iframe className="p-20 w-full" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7056454.516373481!2d15.377003327360653!3d64.41873148636067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4681cadf4b32f6dd%3A0x146d63c75a810!2sFinland!5e0!3m2!1sen!2sin!4v1728625738834!5m2!1sen!2sin" width="900" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>

        </section>
    </>
}