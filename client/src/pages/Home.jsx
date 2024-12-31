import {NavLink} from "react-router-dom"
export const Home = () => {
    return <>
        <div className="container w-full min-h-96 bg-white flex justify-around items-center px-20 py-10">
            <div className="main border-3 border-black-800 w-1/2 p-10 m-10">
            <p className="text-sxl font-bold text-black-500">World's Best Tech Support Company</p>
            <h1 className="text-4xl font-extrabold text-black-500 mt-2">Welcome to Ankush <span className="text-blue-500">24x7</span></h1>
            <p className="mt-5 text-black-30 font-normal ">Are you ready to take your business to the next level with cutting-edge Tech Support. In Ankush <span className="text-blue-500">24x7</span> we specialize in providing innovative IT service to meet your unique need.</p>
            <div className="row mt-5">
            <button className="bg-blue-500 text-white px-5 py-2 rounded-md mr-2 hover:bg-blue-600"><NavLink to="/contact">Contact Now</NavLink></button>
            <button className="bg-gray-200 text-black-500 px-5 py-2 rounded-md hover:bg-gray-300">Learn More</button>
            </div>
            </div>
            <div className="main2 w-1/2">
            <img src="/images/home-image.png" alt="Hello" />
            </div>
        </div>
    </>
}