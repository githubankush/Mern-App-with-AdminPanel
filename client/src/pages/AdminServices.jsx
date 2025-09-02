import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";

export const AdminServices = () => {
  const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
  const [services, setServices] = useState([]);
  const { authorizationToken } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [newService, setNewService] = useState({
    service: "",
    description: "",
    price: "",
    provider: "",
    image: "",
  });

  const getAllServicesData = async () => {
    try {
      const response = await fetch(`${API}/admin/services`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
        credentials: "include",
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

  const addService = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}/admin/createservice`, {
        method: "POST",
        headers: {
          Authorization: authorizationToken,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newService),
      });
      const data = await response.json();
      console.log("New Service Created: ", data);

      setShowForm(false); // hide form after submit
      setNewService({ service: "", description: "", price: "", provider: "", image: "" });
      getAllServicesData(); // refresh services list
    } catch (err) {
      console.log("Error in Admin Services: ", err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Heading */}
      <h1 className="text-2xl font-bold text-center mb-8">Admin Services</h1>

      {/* Add Button */}
      <div className="text-center mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          {showForm ? "Cancel" : "Add New Service"}
        </button>
      </div>

      {/* Add New Service Form */}
      {showForm && (
        <form
          onSubmit={addService}
          className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mb-8"
        >
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Service Name"
              value={newService.service}
              onChange={(e) =>
                setNewService({ ...newService, service: e.target.value })
              }
              className="border p-2 rounded"
              required
            />
            <textarea
              placeholder="Description"
              value={newService.description}
              onChange={(e) =>
                setNewService({ ...newService, description: e.target.value })
              }
              className="border p-2 rounded"
              required
            />
            <input
              type="string"
              placeholder="Price"
              value={newService.price}
              onChange={(e) =>
                setNewService({ ...newService, price: e.target.value })
              }
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Provider"
              value={newService.provider}
              onChange={(e) =>
                setNewService({ ...newService, provider: e.target.value })
              }
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newService.image}
              onChange={(e) =>
                setNewService({ ...newService, image: e.target.value })
              }
              className="border p-2 rounded"
              
            />
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
            >
              Save Service
            </button>
          </div>
        </form>
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services?.map((currentService, index) => {
          const { service, price, description, provider, image } = currentService;
          return (
            <div
              key={index}
              className="w-full bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              {/* Image */}
              <div className="w-full h-48">
                <img
                  src={image}
                  alt={service}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Service Info */}
              <div className="p-4 flex flex-col gap-2">
                <h2 className="text-xl font-semibold text-gray-800">
                  {service}
                </h2>
                <h3 className="text-lg text-blue-600 font-medium">{price}</h3>
                <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
                <h4 className="text-gray-700 font-medium mt-1">{provider}</h4>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
