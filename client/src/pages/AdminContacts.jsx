import { useState, useEffect } from "react"
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";
export const AdminContacts = () => {
    const [contacts, setContacts] = useState([]);
    const {authorizationToken} = useAuth();
    const getAllContactsData = async()=>{
        try{
            const response = await fetch("http://localhost:5000/api/admin/contacts",{
                method:"GET",
                headers:{
                    Authorization: authorizationToken
                }
                }
            );
            const data = await response.json();
            console.log(data);
            setContacts(data);
        }
        catch(err)
        {
            console.log("Error in Admin Contacts ",err)
        }
    }

    // to delete the contacts data from contact model (by admin)
    const deleteContact = async (id) => {
      if (!id) {
          console.error("Error: Contact ID is undefined.");
          alert("Error: Unable to delete contact. No valid ID found.");
          return;
      }
  
      try {
          const response = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`, {
              method: "DELETE",
              headers: {
                  Authorization: authorizationToken
              }
          });
  
          if (response.ok) {
              const data = await response.json();
              console.log("Delete response:", data);
              alert("Contact deleted successfully.");
              getAllContactsData(); // Refresh the contacts list
          } else {
              console.error("Failed to delete contact:", response);
              alert("Failed to delete contact. Please try again.");
          }
      } catch (err) {
          console.error("Error in Admin Contacts delete:", err);
          alert("An error occurred while trying to delete the contact.");
      }
  };
  

    useEffect(() => {
        // get all contacts
        getAllContactsData();
    },[])

    return (
        <div className="container min-h-screen flex flex-col items-center text-lg">
          <div className="heading mb-6">
            <h1 className="text-2xl font-bold">Admin Panel - Contacts Data</h1>
          </div>
          <div className="data w-full border-2 border-gray-300 rounded-lg overflow-hidden shadow-lg p-4">
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
                {contacts.map((user, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-4">{user.username}</td>
                    <td className="px-4 py-4">{user.email}</td>
                    <td className="px-4 py-4">{user.message}</td>
                    <td className="px-4 py-4">
                      <button className="text-blue-600 hover:underline" >Edit</button>
                    </td>
                    <td className="px-4 py-4">
                      <button className="text-red-600 hover:underline" onClick={()=>deleteContact(user._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
}