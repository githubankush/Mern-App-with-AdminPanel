import { useEffect, useState } from "react"
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";
export const AdminUsers = () => {
    const [users, setusers] = useState([])
    const {authorizationToken} = useAuth();
    const getAllUsersData = async () => {
        // get all users
        try{
            const response = await fetch("http://localhost:5000/api/admin/users",{
                method: "GET",
                headers: {
                    Authorization: authorizationToken
                }
            })
            const data = await response.json();
            // console.log("All users data: ", data);
            setusers(data);

        }
        catch(err)
        {
            console.log("Error in Admnin Users ", err);
        }
        
    }

    // to delete user
    const deleteUser = async (id) => {
      try{
        const response = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`,{
            method: "DELETE",
            headers: {
                Authorization: authorizationToken
            }
        })
        if(response.ok)
        {
            alert("User deleted successfully",response)
            getAllUsersData();
        }
        const data = await response.json();

    }
    catch(err)
    {
        console.log("Error in Admin delete function ", err);
    }
    
      
    }
    useEffect(() => {
        // get all users
        getAllUsersData();
    },[])
    return (
        <div className="container min-h-screen flex flex-col items-center text-lg">
          <div className="heading mb-6">
            <h1 className="text-2xl font-bold">Admin Panel - Users Data</h1>
          </div>
          <div className="data w-full border-2 border-gray-300 rounded-lg overflow-hidden shadow-lg p-4">
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
                {users.map((user, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-4">{user.username}</td>
                    <td className="px-4 py-4">{user.email}</td>
                    <td className="px-4 py-4">{user.phone}</td>
                    <td className="px-4 py-4">
                      <button className="text-blue-600 hover:underline"><Link to={`/admin/users/${user._id}/edit`}>Edit</Link></button>
                    </td>
                    <td className="px-4 py-4">
                      <button className="text-red-600 hover:underline" onClick={()=> deleteUser(user._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
      
}