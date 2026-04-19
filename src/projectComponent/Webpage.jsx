import Login from "./Login.jsx"
import Register from "./Register.jsx"
import Landing from "./Landing.jsx"
import Home from "./Home.jsx"
import Post from "./Post.jsx"
import Profile from "./Profile.jsx"
import Explore from "./Explore.jsx"
import Notification from "./Notification.jsx"
import Message from "./Message.jsx"
import Moderator from "./ModDash.jsx"
import AdminDashboard from "./AdmDash.jsx"

import { Routes, Route, Navigate } from "react-router-dom"
import { useUser } from "../context/UserContext.jsx"

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
            
            {/* Home is now the layout wrapper */}
            <Route path="/home" element={
                <ProtectedRoute>
                    <Home />
                </ProtectedRoute>
            }>
                {/* Nested routes render inside <Outlet /> */}
                <Route index element={<Post />} />          {/* /home */}
                <Route path="profile" element={<Profile />} />       {/* /home/profile */}
                <Route path="explore" element={<Explore />} />       {/* /home/explore */}
                <Route path="notifications" element={<Notification />} /> {/* /home/notifications */}
                <Route path="messages" element={<Message />} />      {/* /home/messages */}
                <Route path="mod-dashboard" element={<Moderator />}/>
                <Route path="admin-dashboard" element={<AdminDashboard />} />
            </Route>
        </Routes>
    )
}
export default Webpage