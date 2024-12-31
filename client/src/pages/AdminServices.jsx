import { useEffect, useState } from "react"
import { useAuth } from "../store/auth";
export const AdminServices = () => {
    const [services, setServices] = useState([]);
    const {authorizationToken} = useAuth();
   
        const getAllServicesData = async () => {
            try{
            const response = await fetch("http://localhost:5000/api/admin/services",{
                method: "GET",
                headers: {
                    Authorization: authorizationToken
                }
            });
            const data = await response.json();
            console.log("Data from Admin Services: ", data)
            setServices(data);
        }
    
    catch(err)
    {
        console.log("Error in Admin Services: ", err);
    }
}

    useEffect(() => {
          // fetch services
          getAllServicesData();
    },[]);
    return <>
        <div className="container">
            <div className="c1">
            <h1>Admin Services</h1>

            </div>
            <div className="main w-full min-h-full bg-white rounded-lg shadow-lg p-10 flex flex-wrap gap-10">
                {
                    services.map((currentService, index) => {
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
    </>
}