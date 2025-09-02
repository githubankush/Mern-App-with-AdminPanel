import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
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
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${customToken || token}`, // support fresh token
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User Data: ", data.userData);
        setUser(data.userData);
        setAdmin(data.userData.isAdmin === true);
      } else {
        setUser(null);
        setAdmin(false);
      }
    } catch (error) {
      console.log("Auth userAuthentication Error: ", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const getServiceData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/data/service");
      if (response.ok) {
        const data = await response.json();
        setService(data.msg);
      }
    } catch (err) {
      console.log("Service Data Error: ", err);
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
