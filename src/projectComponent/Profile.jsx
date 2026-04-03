import { useEffect, useState } from "react"
import { useUser } from "../context/UserContext"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

function Profile (){
    const { user } = useUser()
    const [readOnly, setReadOnly] = useState(true)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        created: ""
    })

    const handleEdit = () => {
        setReadOnly(false)
    }

    const handleSave = async () => {
        try {
            const response = await fetch("", {
                method: "PATCH",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    username: formData.username,
                    email: formData.email
                })
            })
            const data = await response.json()

            if(response.ok){
                toast.success(data.message)
                setReadOnly(true)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        // getProfile()
        setFormData({
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            username: user?.username || "",
            email: user?.email || "",
            role: user?.role || "",
            created: user?.created || ""

            
        })
         console.log(formData)
    }, [user])

    return(
        <div className="w-full">
            <h1>My Profile</h1>
            <div>
                <div>
                    <img src={null} alt="profilePic" />
                </div>
                <div>
                    <h2>{user?.firstName} {user?.lastName}</h2>
                    <small>{user?.role}</small>
                </div>
            </div>
            <div>
                <div className="w-full flex justify-between">
                    <h1>Persornal Information</h1>
                    <Button onClick={readOnly? handleEdit : handleSave} className="py-3 px-5">{readOnly? "Edit" : "Save"}</Button>
                </div>
                <br />
                <div className="grid grid-cols-3 gap-6 mb-10">
                    <div className="flex flex-col gap-2">
                        <small className="pl-3">First Name</small>
                        <Input type="text" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} readOnly={readOnly} className="font-medium !border-none outline-none !ring-0 focus:!ring-0 focus:!border-none shadow-none"/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <small className="pl-3">Last Name</small>
                        <Input type="text" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} readOnly={readOnly} className="font-medium !border-none outline-none !ring-0 focus:!ring-0 focus:!border-none shadow-none"/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <small className="pl-3">Username</small>
                        <Input type="text" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} readOnly={readOnly} className="font-medium !border-none outline-none !ring-0 focus:!ring-0 focus:!border-none shadow-none"/>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                    <div className="flex flex-col justify-center gap-2">
                        <small className="pl-3">Email</small>
                        <Input type="text" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} readOnly={readOnly} className="font-medium !border-none outline-none !ring-0 focus:!ring-0 focus:!border-none shadow-none"/>
                    </div>
                    <div className="flex flex-col justify-center gap-2">
                        <small className="pl-3">Role</small>
                        <p className="font-medium pl-3">{formData.role}</p>
                    </div>
                    <div className="flex flex-col justify-center gap-2">
                        <small className="pl-3">Member Since</small>
                        <p className="font-medium text-sm pl-3">{new Date(formData.created).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Profile