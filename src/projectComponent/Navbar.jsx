import { useUser } from "../context/UserContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
    Home, 
    Compass, 
    Bell, 
    MessageCircle, 
    User, 
    Shield, 
    MoreHorizontal,
    Waves
} from "lucide-react"
import { toast } from "sonner";
import pic from "../assets/pic.jpg"

function Navbar(){
    const { user, setUser } = useUser()
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/user/logout", {
                method: "POST",
                credentials: "include"
            })
            const data = await response.json()

            if(response.ok){
                toast.success(data.message)
                setUser(null)
                document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
                navigate("/login")
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const navLinks = [
        { to: "/home", label: "Home", icon: Home },
        { to: "/home/explore", label: "Explore", icon: Compass },
        { to: "/home/notifications", label: "Notifications", icon: Bell },
        { to: "/home/messages", label: "Messages", icon: MessageCircle },
        { to: "/home/profile", label: "Profile", icon: User },
    ]

    if (user?.role === "admin") {
        navLinks.push({ to: "/home/admin-dashboard", label: "Admin Dashboard", icon: Shield })
    }
    if (user?.role === "moderator") {
        navLinks.push({ to: "/home/mod-dashboard", label: "Mod Dashboard", icon: Shield })
    }

    return(
        <div className="h-full flex flex-col justify-between py-6 px-3">
            
            {/* Logo */}
            <div>
                <div className="flex items-center gap-2 px-3 mb-8">
                    <Waves size={24} className="text-purple-500" />
                    <span className="font-bold text-xl tracking-tight">Ripple</span>
                </div>

                {/* Nav Links */}
                <ul className="flex flex-col gap-1">
                    {navLinks.map(({ to, label, icon: Icon }) => {
                        const isActive = location.pathname === to
                        return (
                            <li key={to}>
                                <Link
                                    to={to}
                                    className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 font-medium text-sm
                                        ${isActive 
                                            ? "bg-purple-500/10 text-purple-500" 
                                            : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                                        }`}
                                >
                                    <Icon size={20} />
                                    {label}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>

            {/* User section at bottom */}
            <div className="flex items-center justify-between px-2 py-3 rounded-xl hover:bg-gray-100 transition-all duration-200">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-purple-200">
                        <img 
                            className="w-full h-full object-cover" 
                            src={user?.profilePic || pic} 
                            alt="profile pic" 
                        />
                    </div>
                    <div className="flex flex-col">
                        <h4 className="font-semibold text-[13px] leading-tight">
                            {user?.lastName} {user?.firstName} 
                        </h4>
                        <small className="text-gray-400 text-[11px]">@{user?.username}</small>
                    </div>
                </div>

                {/* Three dots dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger className="cursor-pointer outline-none p-1 rounded-lg hover:bg-gray-200 transition-all">
                        <MoreHorizontal size={18} className="text-gray-500" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="top" align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/home/profile")}>
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
export default Navbar