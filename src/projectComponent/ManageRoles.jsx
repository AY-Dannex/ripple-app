import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { X, MoreVertical } from "lucide-react" 
import { toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function ManageRoles (){
    const [user, setUser] = useState(null)
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSearch = async (email) => {
        try {
            setLoading(true)
            const response = await fetch(`http://localhost:5000/api/user/get-user?email=${email}`, {
                method: "GET",
                credentials: "include"
            })

            const data = await response.json()

            if (response.ok){
                setUser(data.user)
                setEmail("")
                toast.success(data.message)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            // console.log(`Error: ${error.message}`)
        } finally{
            setLoading(false)
            // console.log(user)
        }
    }

    useEffect(() => {
        console.log(user)
    }, [user])

    // const allUsers = user.map((singleUser) => (<div> 
    //                                 <div className="w-10 h-10 rounded-[50px] overflow-hidden">
    //                                     <img className="w-full h-full object-cover" src={singleUser.profilePic} alt="" />
    //                                 </div>
    //                             </div>))

    const roleStyles = {
        admin: "bg-purple-100 text-purple-500",
        moderator: "bg-blue-100 text-blue-500",
        user: "bg-green-100 text-green-500"
    }

    return(
        <div>
            <h1 className="text-xl font-bold">Manage Roles</h1>
            <div className="mt-5 flex border-2 rounded-sm max-w-[400px]">
                <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Search users by their email" className="max-w-90 !border-none focus:border-none focus:!ring-0 shadow-none rounded-sm" />
                <Button onClick={() => handleSearch(email)} className="px-5 rounded-sm cursor-pointer"> { loading? <Loader2 className="animate-spin" /> : <Search className=""/>} </Button>
            </div>
            <div className="my-10">
                {
                    user && (
                        <div className="flex items-center justify-between border p-3 rounded-lg max-w-[350px]">
                            <div className="flex items-center gap-3">
                                <div className="w-[50px] h-[50px] rounded-[50px] border overflow-hidden">
                                    <img className="w-full h-full object-cover" src={user.profilePic} alt="" />                 
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="font-medium">{user.lastName} {user.firstName}</h3>
                                    <div className="flex gap-3 items-center">
                                        <small>@{user.username}</small> 
                                        <small className={`rounded px-1 font-medium ${roleStyles[user.role]}`} >{user.role}</small>
                                    </div>
                                    <small className="font-medium">{user.email}</small>
                                </div>
                            </div>

                            <DropdownMenu>
                                <DropdownMenuTrigger className="cursor-pointer outline-none">
                                    <MoreVertical size={25} />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
                                    {/* <DropdownMenuSeparator /> */}
                                    <DropdownMenuItem className="cursor-pointer">Assign Roles</DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">Suspend User</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-red-500 cursor-pointer">Delete User</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    )
                }
            </div>
        </div>
    );
}
export default ManageRoles