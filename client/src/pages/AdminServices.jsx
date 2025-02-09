import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";

export const AdminServices = () => {
    const [services, setServices] = useState([]);
    const { authorizationToken } = useAuth();

    const getAllServicesData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/admin/services", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken
                }
            });
            const data = await response.json();
            console.log("Data from Admin Services: ", data);
            setServices(data);
        } catch (err) {
            console.log("Error in Admin Services: ", err);
        }
    };

    useEffect(() => {
        getAllServicesData();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Heading */}
            <h1 className="text-2xl font-bold text-center mb-8">Admin Services</h1>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((currentService, index) => {
                    const { service, price, description, provider } = currentService;
                    return (
                        <div 
                            key={index} 
                            className="bg-white shadow-lg rounded-lg p-5 flex flex-col items-center justify-center gap-2"
                        >
                            {/* Service Image */}
                            <div className="w-full h-48 mb-4">
                                <img 
                                    src="https://picsum.photos/500" 
                                    alt="service" 
                                    className="w-full h-full object-cover rounded-md"
                                />
                            </div>

                            {/* Service Info */}
                            <h2 className="text-xl font-bold text-gray-800">{service}</h2>
                            <p className="text-gray-600">{description}</p>
                            <h3 className="text-lg font-semibold text-green-600 mt-2">₹{price}</h3>
                            <h4 className="text-sm text-gray-500 mt-1">Provider: {provider}</h4>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
