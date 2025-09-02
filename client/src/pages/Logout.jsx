import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import toast from "react-hot-toast";

export const Logout = () => {
  const { Logoutuser } = useAuth();

  useEffect(() => {
    Logoutuser();
    toast.success("Logout Successful"); 
  }, [Logoutuser]);

  return <Navigate to="/login" replace />;
};
