import { useState, useEffect } from "react";
import { useAuth } from "../store/auth";

export const AdminContacts = () => {
  const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authorizationToken } = useAuth();

  // Fetch all contacts
  const getAllContactsData = async () => {
    try {
      const response = await fetch(`${API}/admin/contacts`, {
        method: "GET",
         headers: {
                    Authorization: authorizationToken
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch contacts");
      }

      const data = await response.json();
      setContacts(data);
    } catch (err) {
      console.error("Error in Admin Contacts:", err);
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllContactsData();
  }, []);

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-[100%]">
        <div className="heading mb-6 text-center">
          <h1 className="text-2xl font-bold">Admin Panel - Contacts Data</h1>
        </div>

        {/* Show Loading or No Contacts Message */}
        {loading ? (
          <div className="text-lg text-gray-500 text-center">
            Loading contacts...
          </div>
        ) : contacts.length === 0 ? (
          <div className="text-lg text-red-500 text-center">
            No contacts available.
          </div>
        ) : (
          <>
            {/* Table for Desktop */}
            <div className="hidden md:block">
              <table className="w-full text-center">
                <thead>
                  <tr className="bg-gray-100 text-green-600 border-b border-gray-300">
                    <th className="py-3 w-1/4">Username</th>
                    <th className="py-3 w-1/4">Email</th>
                    <th className="py-3 w-1/4">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((user) => (
                    <tr
                      key={user._id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-4 py-4">{user.username}</td>
                      <td className="px-4 py-4">{user.email}</td>
                      <td className="px-4 py-4 truncate max-w-xs">
                        {user.message}
                      </td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Responsive Mobile View */}
            <div className="block md:hidden">
              {contacts.map((user) => (
                <div
                  key={user._id}
                  className="border text-sm border-gray-300 rounded-lg shadow-md p-4 mb-2"
                >
                  <p className=" font-semibold">Username: {user.username}</p>
                  <p>Email: {user.email}</p>
                  <p className="truncate">Message: {user.message}</p>
                  <div className="mt-2 flex justify-end">
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => deleteContact(user._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
