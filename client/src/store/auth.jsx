import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [service, setService] = useState([]);
  const [admin, setAdmin] = useState(false);
  const authorizationToken = `Bearer ${token}`;
  const isLoggedIn = !!token;

  // store token and fetch user immediately
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
    userAuthentication(serverToken); // 🔥 fetch user right after login
  };

  const userAuthentication = async (customToken) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API}/auth/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${customToken || token}`, // support fresh token
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
        setAdmin(data.userData.isAdmin === true);
      } else {
        setUser(null);
        setAdmin(false);
      }
    } catch (error) {
      toast.error("Session expired. Please login again.");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const getServiceData = async () => {
    try {
      const response = await fetch(`${API}/data/service`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setService(data.msg);
      }
    } catch (err) {
      toast.error("Failed to fetch services data.");
    }
  };

  useEffect(() => {
    getServiceData();
    if (token) {
      userAuthentication(); // run on refresh only if token exists
    } else {
      setIsLoading(false);
    }
  }, []);

  const Logoutuser = () => {
    setToken("");
    setUser(null); // 🔥 clear user too
    setAdmin(false);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        Logoutuser,
        storeTokenInLS,
        user,
        service,
        authorizationToken,
        isLoading,
        admin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContextValue;
};
