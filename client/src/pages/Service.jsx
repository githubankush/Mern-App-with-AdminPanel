import { useAuth } from "../store/auth";

export const Service = () => {
    const { service } = useAuth();  // Set default value to empty array
    console.log("SERVICE: ", service)
    return (
        <div className="w-full min-h-full flex flex-col p-10 gap-4">
            <div className="heading text-3xl font-bold text-gray-800 mb-10">Services</div>
            <div className="main w-full min-h-full bg-white rounded-lg shadow-lg p-10 flex flex-wrap gap-10">
                {
                    service.map((currentService, index) => {
                        const { service, price, description, provider } = currentService;
                        return (
                            <div key={index} className="card-body w-72 h-96 bg-white shadow-lg rounded-lg py-5 ">
                            <div className="card-image w-4/5 h-48  mx-auto mb-4">
                                <img src="https://picsum.photos/500" alt="service" className="w-full h-full object-cover" />
                            </div>
                            <div className="card-info flex justify-around">
                            <h2 className="text-xl font-bold text-gray-800">{service}</h2>
                            <h2 className="">{price}</h2>

                            </div>
                            <div className="more-info flex flex-col px-5 gap-5 mt-5 ">
                                <p>{description}</p>
                                <h1>{provider}</h1>
                                
                            </div>
                            
                            

                        </div>
                        );
                    })
                }
            </div>
        </div>
    );
};
