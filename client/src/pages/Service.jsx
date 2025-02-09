import { useAuth } from "../store/auth";

export const Service = () => {
    const { service } = useAuth();  
    console.log("SERVICE: ", service);

    return (
        <div className="w-full min-h-screen flex flex-col p-6 md:p-10 gap-6">
            {/* Heading */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">
                Services
            </h1>

            {/* Service Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {service.map((currentService, index) => {
                    const { service, price, description, provider } = currentService;
                    return (
                        <div key={index} className="w-full bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
                            {/* Image */}
                            <div className="w-full h-48">
                                <img 
                                    src="https://picsum.photos/500" 
                                    alt="service" 
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Service Info */}
                            <div className="p-4 flex flex-col gap-2">
                                <h2 className="text-xl font-semibold text-gray-800">{service}</h2>
                                <h3 className="text-lg text-blue-600 font-medium">{price}</h3>
                                <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
                                <h4 className="text-gray-700 font-medium">{provider}</h4>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
