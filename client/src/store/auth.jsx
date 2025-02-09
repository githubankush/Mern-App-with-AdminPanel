import { createContext, useContext,useEffect,useState } from "react";


// create context
export const AuthContext = createContext();

// create provider
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setuser] = useState(""); // for userAuthentication
    const [isLoading, setIsLoading] = useState(true)
    const [service, setservice] = useState([]); // for service data
    const authorizationToken = `Bearer ${token}`;

    //Function for storing Token in Local Storage
    const storeTokenInLS = (serverToken)=>{
        setToken(serverToken);
        return localStorage.setItem("token", serverToken);
    }

    let isLoggedIn = !!token; // if token is present then logged in else not logged in

    //Function for JWT AUthentication
    const userAuthentication = async()=>{
        try {
            setIsLoading(true);
            const response = await fetch("http://localhost:5000/api/auth/user",{
                method:"GET",
                headers:{
                    "Authorization": authorizationToken
                }
            });

            if(response.ok)
            {
                const data = await response.json();
                console.log("User Data: ", data.userData);
                setuser(data.userData);
                setIsLoading(false);
            }
            else{
                setIsLoading(false);
            }
            
        } catch (error) {
            console.log("Auth userAuthencation Error: ",error)
        }
    }

    //Function to get the service data
    const getServiceData = async() => {
        try{
            const response = await fetch("http://localhost:5000/api/data/service",{
                method:"GET",
            })
            if(response.ok)
            {
                const data = await response.json();
                // console.log("Service Data: ", data.msg);
                setservice(data.msg);
            }
           
        }
        catch(err)
        {
            console.log("Service Data Error: ",err)
        }
       
        }

    useEffect(()=>{
        getServiceData();
        userAuthentication();
    },[])


    //Function for Logout
    const Logoutuser = ()=>{
        setToken("");
        return localStorage.removeItem("token");
    }

    return <AuthContext.Provider value={{isLoggedIn ,Logoutuser, storeTokenInLS,user,service,authorizationToken,isLoading}}>
        {children}
    </AuthContext.Provider>
}

// delivery boy
export const useAuth = () =>{
    const authContextValue = useContext(AuthContext);
    if(!authContextValue)
    {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return authContextValue;
} 