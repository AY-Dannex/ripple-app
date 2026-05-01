import Navbar from "./Navbar.jsx"
import { Outlet, useLocation} from "react-router-dom"
import Contact from "./Contacts.jsx"
import PostPage from "./PostPage.jsx"

function Home() {
    const location = useLocation()
    const isHomePage = location.pathname === "/home"
    return (
        <div className="w-full h-screen">
            <div className="max-w-[1440px] h-screen m-auto flex">
                {/* Left - Navbar stays fixed */}
                <div className="border h-full w-[60px] lg:w-[220px] transition-all duration-300 flex-shrink-0">
                    <Navbar />
                </div>
                <div className="overflow-y-auto scrollbar-hide flex-1">
                    {isHomePage ? <PostPage /> : <Outlet />}
                </div>

                {/* Right Section - Only on home page */}
                {isHomePage && (
                    <div className="hidden md:block border h-full w-[280px] lg:w-[320px] flex-shrink-0 overflow-y-auto scrollbar-hide">
                        <Contact />
                    </div>
                )}
            </div>
        </div>
    )
}
export default Home