import {BrowserRouter, redirect, Route, Routes} from "react-router-dom";
import { Home} from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Service } from "./pages/Service";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Navbar } from "./components/Navbar";
import {Error} from "./pages/Error";
import {Logout} from "./pages/Logout";
import { AdminLayout } from "./components/Layouts/AdminLayout";
import { AdminUsers } from "./pages/AdminUsers";
import { AdminContacts } from "./pages/AdminContacts";
import { AdminServices } from "./pages/AdminServices";
import { AdminHome } from "./pages/AdminHome";
import { Toaster } from "react-hot-toast";
const App = ()=>{
 
  return <>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/service" element={<Service/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="*" element={<Error/>}/>

        {/* for admin */}
        <Route path="/admin" element={<AdminLayout/>}>
          <Route path="home" element={<AdminHome/>}/>
          <Route path="users" element={<AdminUsers/>}/>
          <Route path="contacts" element={<AdminContacts/>}/>
          <Route path="services" element={<AdminServices/>}/>
        </Route>
      </Routes> 
      <Toaster position="top-center" reverseOrder={false} />
    </BrowserRouter>
  </>
}

export default App;