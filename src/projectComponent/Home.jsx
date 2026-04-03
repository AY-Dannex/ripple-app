import Navbar from "./Navbar.jsx";
import Post from "./Post.jsx";
import WritePost from "./WritePost.jsx";
import Profile from "./Profile.jsx";
import { Routes, Route, Navigate } from "react-router-dom"
function Home (){
    return(
        <div className="w-full h-screen px-5">
            <div className="max-w-[1440px] h-screen m-auto flex">
                <div className="border w-full basis-2/10">
                    <Navbar />
                </div>
                <div className="border w-full basis-8/10 overflow-y-auto scrollbar-hide">
                    <Profile />
                </div>
            </div>
        </div>
    );
}
export default Home