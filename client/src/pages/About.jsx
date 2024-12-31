
import { useAuth } from "../store/auth"
export const About = () => {

    const { user } = useAuth();
    console.log(user);

    return <>
    <div className="main w-full h-screen flex flex-col justify-center items-center">
        <div className="left w-1/2 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-4">
            Welcome {user ? user.username : ""}
        </h1>
        <h1>This is About Page</h1>
        </div>

        <div className="right w-1/2 flex flex-col justify-center items-center">
        <img src="" alt="" />
        </div>
     

    </div>
    
    </>
}