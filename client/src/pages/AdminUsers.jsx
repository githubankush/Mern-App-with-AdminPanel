import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";

export const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { authorizationToken } = useAuth();

    // Fetch users
    const getAllUsersData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/admin/users", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            const data = await response.json();
            setUsers(data);
        } catch (err) {
            console.log("Error in Admin Users ", err);
        } finally {
            setLoading(false);
        }
    };

    // Delete user
    const deleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            if (response.ok) {
                alert("User deleted successfully");
                getAllUsersData();
            }
        } catch (err) {
            console.log("Error in Admin delete function ", err);
        }
    };

    useEffect(() => {
        getAllUsersData();
    }, []);

    return (
        <div className="flex justify-center min-h-screen">
            <div className="w-[100%]  ">
                <div className="heading mb-6 text-center">
                    <h1 className="text-2xl font-bold">Admin Panel - Users Data</h1>
                </div>

                {/* Show Loading State */}
                {loading ? (
                    <div className="text-lg text-gray-500 text-center">Loading users...</div>
                ) : users.length === 0 ? (
                    <div className="text-lg text-red-500 text-center">No users found.</div>
                ) : (
                    <>
                        {/* Table for Desktop */}
                        <div className="hidden md:block">
                            <table className="w-full text-center">
                                <thead>
                                    <tr className="bg-gray-100 text-green-600 border-b border-gray-300">
                                        <th className="py-3 w-1/5">Username</th>
                                        <th className="py-3 w-1/5">Email</th>
                                        <th className="py-3 w-1/5">Phone</th>
                                        <th className="py-3 w-1/5">Edit</th>
                                        <th className="py-3 w-1/5">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-50">
                                            <td className="px-4 py-4">{user.username}</td>
                                            <td className="px-4 py-4">{user.email}</td>
                                            <td className="px-4 py-4">{user.phone}</td>
                                            <td className="px-4 py-4">
                                                <Link to={`/admin/users/${user._id}/edit`} className="text-blue-600 hover:underline">
                                                    Edit
                                                </Link>
                                            </td>
                                            <td className="px-4 py-4">
                                                <button className="text-red-600 hover:underline" onClick={() => deleteUser(user._id)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Responsive Card Layout for Mobile */}
                        <div className="block md:hidden">
                            {users.map((user) => (
                                <div key={user._id} className="w-full border border-gray-300 rounded-lg p-4 mb-4 shadow-md">
                                    <p className="text-lg font-semibold">Username: {user.username}</p>
                                    <p>Email: {user.email}</p>
                                    <p>Phone: {user.phone}</p>
                                    <div className="mt-2 flex justify-between">
                                        <Link to={`/admin/users/${user._id}/edit`} className="text-blue-600 hover:underline">
                                            Edit
                                        </Link>
                                        <button className="text-red-600 hover:underline" onClick={() => deleteUser(user._id)}>
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
