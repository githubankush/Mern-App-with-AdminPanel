import { useState } from "react";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";

export const Contact = () => {
    const [contact, setContact] = useState({
        username: "",
        email: "",
        message: ""
    });
    const { user } = useAuth();
    const [userData, setUserData] = useState(true);

    if (userData && user) {
        setContact({
            username: user.username,
            email: user.email,
            message: "",
        });
        setUserData(false);
    }

    const navigate = useNavigate();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setContact({ ...contact, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Contact User: ", contact);
        try {
            const response = await fetch("http://localhost:5000/api/form/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(contact),
            });
            console.log("Response: ", response);

            if (response.ok) {
                alert("Message sent successfully");
                setContact({ username: "", email: "", message: "" });
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <section className="container mx-auto px-5 py-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Contact Image */}
                    <div className="w-full md:w-1/2 flex justify-center">
                        <img src="/images/contact-image.jpg" className="w-[90%] md:w-[80%]" alt="Contact" />
                    </div>

                    {/* Contact Form */}
                    <div className="w-full md:w-1/2 flex flex-col items-center">
                        <h1 className="text-3xl font-bold text-blue-400 border-b-2 border-blue-400 p-2 mb-2">
                            Contact Us
                        </h1>
                        <form
                            className="flex flex-col gap-4 w-full max-w-md"
                            onSubmit={handleSubmit}
                        >
                            <label htmlFor="username" className="text-lg font-semibold">
                                Username
                            </label>
                            <input
                                value={contact.username}
                                onChange={handleInput}
                                className="w-full p-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                type="text"
                                name="username"
                                id="username"
                                required
                                autoComplete="off"
                            />

                            <label htmlFor="email" className="text-lg font-semibold">
                                Email
                            </label>
                            <input
                                value={contact.email}
                                onChange={handleInput}
                                className="w-full p-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                type="email"
                                name="email"
                                id="email"
                                required
                                autoComplete="off"
                            />

                            <label htmlFor="message" className="text-lg font-semibold">
                                Message
                            </label>
                            <textarea
                                value={contact.message}
                                onChange={handleInput}
                                className="w-full p-2 bg-gray-200 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                                name="message"
                                id="message"
                                rows="5"
                                required
                                autoComplete="off"
                            />

                            <button
                                type="submit"
                                className="bg-blue-400 text-white font-bold p-3 mt-4 rounded-md hover:bg-blue-500 transition-all duration-300"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>

                {/* Map Section */}
                <div className="map-location w-full mt-10 bg-blue-300 flex justify-center items-center p-10">
                    <iframe
                        className="w-full max-w-3xl aspect-video rounded-md shadow-md"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7056454.516373481!2d15.377003327360653!3d64.41873148636067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4681cadf4b32f6dd%3A0x146d63c75a810!2sFinland!5e0!3m2!1sen!2sin!4v1728625738834!5m2!1sen!2sin"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </section>
        </>
    );
};
