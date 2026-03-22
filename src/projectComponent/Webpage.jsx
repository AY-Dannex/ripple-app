import Header from "./Header.jsx";
import Navbar from "./navbar.jsx";
// import writePost from "./writePost.jsx";
import Post from "./Post.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Landing from "./Landing.jsx";
import Home from "./Home.jsx";

import { Routes, Route } from "react-router-dom"

function Webpage() {
    return(
        <Routes>
            <Route path="/" element={<Landing />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/home" element={<Home />}/>
        </Routes>
    );
}
export default Webpage