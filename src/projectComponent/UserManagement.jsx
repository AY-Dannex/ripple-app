import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { X, MoreVertical, List, DeleteIcon, SearchIcon} from "lucide-react" 
import { Table as TableIcon } from "lucide-react";
import { 
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow, 
} from "@/components/ui/table";
import { toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { Field, FieldGroup } from "../components/ui/field"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select"
import pic from "../assets/pic.jpg"

function UserManagement (){
    const [user, setUser] = useState(null)
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("")
    const [date, setDate] = useState("")
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [logs, setLogs] = useState(null)
    const [view, setView] = useState("table")
    const dialogCloseRef = useRef(null)
    const [isAssignRoleOpen, setIsAssignRoleOpen] = useState(false)
    const [isSuspendOpen, setIsSuspendOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const dropdownTriggerRef = useRef(null)

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
                // setEmail("")
                // toast.success(data.message)
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


    const handleAssignRole = async () => {
        setLoading2(true)
        try {
            const response = await fetch("http://localhost:5000/api/user/assign-role", {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: user.email,
                    newRole: role
                })
            })

            const data = await response.json()

            if(response.ok){
                toast.success(data.message)
                setIsAssignRoleOpen(false)  // 👈 close dialog
                dropdownTriggerRef.current?.click()  // close dropdown
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error.message)
        } finally{
            handleSearch(email)
            setLoading2(false)
            handleGetActivityLogs()
        }
    }

    const handleSuspendUser = async () => {
        setLoading2(true)
        try {
            const response = await fetch("http://localhost:5000/api/user/suspend", {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: user.email,
                    suspendedUntil: date
                })
            })

            const data = await response.json()

            if(response.ok){
                toast.success(data.message)
                setIsSuspendOpen(false)
                dropdownTriggerRef.current?.click()  // close dropdown
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error.message)
        } finally{
            setLoading2(false)
            handleGetActivityLogs()
        }
    }

    const handleDeleteUser = async (email) => {
        try {
            const response = await fetch(`http://localhost:5000/api/user/delete?email=${email}`, {
                method: "DELETE",
                credentials: "include"
            })

            const data = await response.json()

            if (response.ok){
                toast.success(data.message)
                setIsDeleteOpen(false)
                setUser(null)
                dropdownTriggerRef.current?.click()  // close dropdown
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error.message)
        } finally{
            handleGetActivityLogs()
        }
    }

    const roleStyles = {
        admin: "bg-purple-100 text-purple-500",
        moderator: "bg-blue-100 text-blue-500",
        user: "bg-green-100 text-green-500"
    }

    const handleGetActivityLogs = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/activity-logs/get-logs", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await response.json()

            if(response.ok){
                if (data.logs.length > 0){
                    setLogs(data.logs)
                    console.log(data.logs)
                    
                }
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleDeleteEachActivityLog = async(id) => {
        console.log(id)
        try {
            const response = await fetch(`http://localhost:5000/api/activity-logs/delete-each?ID=${id}`, {
                method: "DELETE",
                credentials: "include"
            })

            const data = await response.json()

            if (response.ok){
                toast.success(data.message)
                setLogs(prev => prev.filter(log => log._id !== id))
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error.message)
        } 
    }

    const handleDeleteAllActivityLogs = async () => {
        setLoading2(true)
        try {
            const response = await fetch("http://localhost:5000/api/activity-logs/delete-all", {
                method: "DELETE",
                credentials: "include"
            })

            const data = await response.json()

            if(response.ok){
                toast.success(data.message)
                setLogs(null)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error.message)
        }finally{
            setLoading2(false)
        }
    }
    
    useEffect(() => {
        handleGetActivityLogs()
    }, [])

    return(
        <div>
            <h1 className="text-xl font-bold">User Management</h1>
            <div className="mt-5 flex border-2 rounded-sm max-w-[400px]">
                <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Search users by their email" className="max-w-90 !border-none focus:border-none focus:!ring-0 shadow-none rounded-sm" />
                <Button onClick={() => handleSearch(email)} className="px-5 rounded-sm cursor-pointer"> { loading? <Loader2 className="animate-spin" /> : <Search className=""/>} </Button>
            </div>
            <div className="my-10 w-full h-[88px] relative">
                {
                    user ? ((
                        <div className="absolute flex items-center justify-between border py-3 px-5 rounded-lg w-90">
                            <div className="flex items-center gap-3">
                                <div className="w-[50px] h-[50px] rounded-[50px] border overflow-hidden">
                                    <img className="w-full h-full object-cover" src={user.profilePic || pic} alt="" />                 
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
                                    <DropdownMenuItem onSelect={(e) => {e.preventDefault()}} className="cursor-pointer">
                                        <Dialog open={isAssignRoleOpen} onOpenChange={setIsAssignRoleOpen}>
                                            <DialogTrigger className="cursor-pointer">Assign Roles</DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Assign New Role</DialogTitle>
                                                    <DialogDescription>Select the new role you would like to assign to this user</DialogDescription>
                                                </DialogHeader>

                                                <FieldGroup>
                                                    <Select value={role} disabled={loading} onValueChange={setRole}>
                                                        <SelectTrigger className="w-full max-w-30">
                                                            <SelectValue placeholder="Select Role" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectLabel>Role</SelectLabel>
                                                                <SelectItem value="moderator">Moderator</SelectItem>
                                                                <SelectItem value="user">User</SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </FieldGroup>

                                                <DialogFooter>
                                                    <DialogClose ref={dialogCloseRef} className="flex gap-3">
                                                        <Button className="cursor-pointer px-4">Cancel</Button>
                                                    </DialogClose>
                                                        <Button onClick={handleAssignRole} className="cursor-pointer px-4">{loading2? <Loader2 className="animate-spin" /> : "Save" }</Button>
                                                </DialogFooter>
                                            </DialogContent>                      
                                        </Dialog>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onSelect={(e) => {e.preventDefault()}} className="cursor-pointer">
                                        <Dialog open={isSuspendOpen} onOpenChange={setIsSuspendOpen}>
                                            <DialogTrigger className="cursor-pointer">Suspend User</DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Suspend User</DialogTitle>
                                                    <DialogDescription>Select duration</DialogDescription>
                                                </DialogHeader>

                                                <FieldGroup>
                                                    <Input value={date} onChange={(e) => {setDate(e.target.value)}} type="datetime-local"/>
                                                </FieldGroup>

                                                <DialogFooter>
                                                    <DialogClose ref={dialogCloseRef} className="flex gap-3">
                                                        <Button className="cursor-pointer px-4">Cancel</Button>
                                                    </DialogClose>
                                                        <Button onClick={handleSuspendUser} className="cursor-pointer px-4">{loading2? <Loader2 className="animate-spin" /> : "Save" }</Button>
                                                </DialogFooter>
                                            </DialogContent>                      
                                        </Dialog>
                                    </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onSelect={(e) => {e.preventDefault()}} className="text-red-500 cursor-pointer">
                                            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                                            <DialogTrigger className="cursor-pointer">Delete User</DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Are you sure you want to take this action</DialogTitle>
                                                    <DialogDescription>This action is permernent and  can't be reversed</DialogDescription>
                                                </DialogHeader>
                                                <DialogFooter>
                                                    <DialogClose className="flex gap-3">
                                                        <Button className="cursor-pointer px-4">No</Button>
                                                        <Button onClick={() => handleDeleteUser(email)} className="cursor-pointer px-4">{loading2? <Loader2 className="animate-spin" /> : "Yes" }</Button>
                                                    </DialogClose>
                                                </DialogFooter>
                                            </DialogContent>                      
                                        </Dialog>
                                        </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    )) : ((
                            <div className="flex flex-col justify-center items-center max-w-[350px]">
                                {
                                   loading ? <Loader2 size={30} className="animate-spin" /> : ((
                                    <div className="flex flex-col justify-center items-center">
                                        <SearchIcon size={60} className="text-gray-500" />
                                        <p>Search by email to render user</p>
                                    </div>
                                   ))
                                }
                            </div>
                        )) 
                } 
            </div>

            <div className="flex justify-between mb-5">
               <div className="flex gap-2">
                    <Button className="cursor-pointer px-5" onClick={() => setView("table")}> <TableIcon /> </Button>
                    <Button variant="outline" className="cursor-pointer px-5" onClick={() => setView("list")}> <List /> </Button>
               </div>

               <Button onClick={() => handleDeleteAllActivityLogs()} className="cursor-pointer w-20 px-5"> { loading2 ? <Loader2 className="animate-spin" /> :  "Clear" } </Button>
            </div>
            
            {
                logs && logs.length > 0 ? ((
                        view === "table" ? (
                        (
                            <div>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>User</TableHead>
                                            <TableHead>Action</TableHead>
                                            <TableHead>Details</TableHead>
                                            <TableHead>Performed By</TableHead>
                                            <TableHead>Date</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {logs.map((log) => (
                                            <TableRow key={log._id}>
                                                <TableCell>
                                                    <div className="flex gap-2 items-center">
                                                        {log.targetUser?.lastName} {log.targetUser?.firstName}
                                                        <small className={`rounded px-1 font-medium ${roleStyles[log.targetUser?.role]}`}>{log.targetUser?.role}</small>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{log.action}</TableCell>
                                                <TableCell>{log.details}</TableCell>
                                                <TableCell>
                                                    <div className="flex gap-2 items-center">
                                                        {log.performedBy.lastName} {log.performedBy.firstName}
                                                        <small className={`rounded px-1 font-medium ${roleStyles[log.performedBy.role]}`}>{log.performedBy.role}</small>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {new Date(log.createdAt).toLocaleString()}
                                                </TableCell>
                                                <TableCell>
                                                    <Button onClick={() => handleDeleteEachActivityLog(log._id)} className="cursor-pointer px-4"> <DeleteIcon /> </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )
                    ) 
                        : 
                    (
                        (
                            <div className="flex flex-col gap-3">
                                {logs.map(log => (
                                    <div key={log._id} className="p-4 border rounded-lg flex w-full justify-between items-center">
                                        <div>
                                            <p className="font-semibold">{log.targetUser.lastName} {log.targetUser.firstName}</p>
                                            <p className="text-sm text-gray-500">{log.action}: {log.details}</p>
                                            <div className="flex gap-2 items-center">
                                                <p className="text-xs text-gray-400">Performed by: {log.performedBy.lastName} {log.performedBy.firstName}</p>
                                                <small className={`rounded px-1 font-medium ${roleStyles[log.performedBy.role]}`}>{log.performedBy.role}</small>
                                            </div>
                                            <p className="text-xs text-gray-400">{new Date(log.createdAt).toLocaleString()}</p>
                                        </div>
                                        <Button onClick={() => handleDeleteEachActivityLog(log._id)} className="cursor-pointer px-4"> <DeleteIcon /> </Button>
                                    </div>
                                ))}
                            </div>
                        )
                    )
                )) : ((
                    <div className="w-full flex justify-center mt-10">
                        <p>No history recorded yet.....</p>
                    </div>
                ))
            }
        </div>
    );
}
export default UserManagement