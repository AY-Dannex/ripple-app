import Navbar from "./Navbar.jsx"
import { Outlet } from "react-router-dom"

function Home() {
    return (
        <div className="w-full h-screen">
            <div className="max-w-[1440px] h-screen m-auto flex">
                {/* Left - Navbar stays fixed */}
                <div className="border w-full basis-2/10 h-full">
                    <Navbar />
                </div>
                {/* Right - Content changes based on route */}
                <div className="border w-full basis-8/10 overflow-y-auto scrollbar-hide">
                    <Outlet />  {/* 👈 this is where page content renders */}
                </div>
            </div>
        </div>
    )
}
export default Home