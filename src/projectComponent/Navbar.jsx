// import { Sidebar } from "@/components/ui/sidebar";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
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
import Login from "./Login";

function Navbar(){
    const { user, setUser } = useUser()
    const navigate = useNavigate()
    const navLinks = ["Home", "Explore", "Notifications", "Message", "Profile", "Admin Dashboard"]
    const links = navLinks.map((link, key) => 
    <li className="px-5 py-4"
    key={key}><a href="">{link}</a></li>)

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
                {links}
            </ul>

            <div className="flex gap-2 items-center">
                <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img className="w-full h-full" src="" alt="profile pic" />
                    </div>
                    <div className="flex flex-col">
                        <h3 className="font-medium">{user?.username}</h3>
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