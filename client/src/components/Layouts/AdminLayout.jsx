import { NavLink, Outlet } from "react-router-dom"
import { FaUser } from "react-icons/fa6";
import { LuContact } from "react-icons/lu";
import { MdHomeRepairService } from "react-icons/md";
import { TiHome } from "react-icons/ti";
import { Navigate } from "react-router-dom";

import {useAuth} from "../../store/auth";

export const AdminLayout = () =>{
    const {user, isLoading} = useAuth();


    if(isLoading) return <div>Loading...</div>
    if(!user) return <div>Please login</div>
    if(!user.isAdmin)
    {

        return <div className="text-2xl text-center flex justify-center items-center h-screen">You are not authorized to access this page</div>
    }
    else{
        Navigate("/admin/");
    }

    return <>
    <div className="main flex min-h-screen justify-between">
    <div className="container w-1/6 h-full flex flex-col shadow-xl p-5 ">
            <div className="text-2xl font-bold text-center mb-5">Dashboard</div>
            <nav>
                <ul>
                    <li><NavLink to="/admin/home" className="flex gap-2 items-center text-xl mb-2 hover:shadow-lg p-1 rounded-lg"><TiHome />Home</NavLink></li>
                    <li><NavLink to="/admin/users" className="flex gap-2 items-center text-xl mb-2  hover:shadow-lg p-1 rounded-lg "><FaUser />Users</NavLink></li>
                    <li><NavLink to="/admin/contacts" className="flex gap-2 items-center text-xl mb-2 hover:shadow-lg p-1 rounded-lg"><LuContact />Contacts</NavLink></li>
                    <li><NavLink to="/admin/services" className="flex gap-2 items-center text-xl mb-2 hover:shadow-lg p-1 rounded-lg"><MdHomeRepairService />Services</NavLink></li>
                </ul>
            </nav>
    
    </div>
    <div className="container2 flex p-5 w-5/6">
    <Outlet />

    </div>
    </div>
       
    </>
}