import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Landing from "./Landing.jsx";
import Home from "./Home.jsx";

import { Routes, Route, Navigate } from "react-router-dom"
import { useUser } from "../context/UserContext.jsx";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useUser()

    if(loading) return null
    if(!user) return <Navigate to="/login"/>

    return children
}

function Webpage() {
    return(
        <Routes>
            <Route path="/" element={<Landing />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/home" element={
                <ProtectedRoute>
                    <Home />
                </ProtectedRoute>
                }/>
        </Routes>
    );
}
export default Webpage