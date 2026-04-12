import Navbar from "./Navbar.jsx"
import { Outlet } from "react-router-dom"

function Home() {
    return (
        <div className="w-full h-screen">
            <div className="max-w-[1440px] h-screen m-auto flex">
                {/* Left - Navbar stays fixed */}
                <div className="border h-full w-[60px] lg:w-[220px] transition-all duration-300 flex-shrink-0">
                    <Navbar />
                </div>
                <div className="border flex-1 overflow-y-auto scrollbar-hide">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
export default Home