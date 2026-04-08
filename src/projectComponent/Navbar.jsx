// import { Sidebar } from "@/components/ui/sidebar";
import { useUser } from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical } from "lucide-react"
import { toast } from "sonner";

function Navbar(){
    const { user, setUser } = useUser()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const response = await fetch("https://ripple-app-backend-jkkz.onrender.com/api/user/logout", {
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
    return(
    //    <Sidebar>
        <div>
            <h1>LOGO</h1>
            
            <ul>
                <li className="px-5 py-4">Home</li>
                <li className="px-5 py-4">Explore</li>
                <li className="px-5 py-4">Notification</li>
                <li className="px-5 py-4">Message</li>
                <li className="px-5 py-4">Profile</li>
                {user?.role === "admin" && (<li className="px-5 py-4">Admin Dashboard</li>)}
            </ul>

            <div className="flex gap-2 items-center">
                <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img className="w-full h-full" src={null} alt="profile pic" />
                    </div>
                    <div className="flex flex-col">
                        <h4 className="font-medium text-[14px]">{user?.firstName} {user?.lastName}</h4>
                        <small>@{user?.username}</small>
                    </div>
                </div>

                {/* Three dots dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger className="cursor-pointer outline-none">
                        <MoreVertical size={25} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>


        </div>
    //    </Sidebar>
    );
}
export default Navbar