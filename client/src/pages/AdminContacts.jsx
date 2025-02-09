import { useState, useEffect } from "react";
import { useAuth } from "../store/auth";

export const AdminContacts = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { authorizationToken } = useAuth();

    // Fetch all contacts
    const getAllContactsData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/admin/contacts", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            const data = await response.json();
            setContacts(data);
        } catch (err) {
            console.log("Error in Admin Contacts", err);
        } finally {
            setLoading(false);
        }
    };

    // Delete contact
    const deleteContact = async (id) => {
        if (!id) {
            alert("Error: Unable to delete contact. No valid ID found.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            if (response.ok) {
                alert("Contact deleted successfully.");
                getAllContactsData();
            } else {
                alert("Failed to delete contact. Please try again.");
            }
        } catch (err) {
            alert("An error occurred while trying to delete the contact.");
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
                    <div className="text-lg text-gray-500 text-center">Loading contacts...</div>
                ) : contacts.length === 0 ? (
                    <div className="text-lg text-red-500 text-center">No contacts found.</div>
                ) : (
                    <>
                        {/* Table for Desktop */}
                        <div className="hidden md:block">
                            <table className="w-full text-center">
                                <thead>
                                    <tr className="bg-gray-100 text-green-600 border-b border-gray-300">
                                        <th className="py-3 w-1/5">Username</th>
                                        <th className="py-3 w-1/5">Email</th>
                                        <th className="py-3 w-1/5">Message</th>
                                        <th className="py-3 w-1/5">Edit</th>
                                        <th className="py-3 w-1/5">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contacts.map((user) => (
                                        <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-50">
                                            <td className="px-4 py-4">{user.username}</td>
                                            <td className="px-4 py-4">{user.email}</td>
                                            <td className="px-4 py-4 truncate max-w-xs">{user.message}</td>
                                            <td className="px-4 py-4">
                                                <button className="text-blue-600 hover:underline">Edit</button>
                                            </td>
                                            <td className="px-4 py-4">
                                                <button className="text-red-600 hover:underline" onClick={() => deleteContact(user._id)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Responsive Mobile View */}
                        <div className="block md:hidden">
                            {contacts.map((user) => (
                                <div key={user._id} className="border text-sm border-gray-300 rounded-lg shadow-md p-4 mb-2">
                                    <p className=" font-semibold">Username: {user.username}</p>
                                    <p>Email: {user.email}</p>
                                    <p className="truncate">Message: {user.message}</p>
                                    <div className="mt-2 flex justify-between">
                                        <button className="text-blue-600 hover:underline">Edit</button>
                                        <button className="text-red-600 hover:underline" onClick={() => deleteContact(user._id)}>
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
