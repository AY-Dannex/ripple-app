import { useEffect, useState } from "react"
import { useUser } from "../context/UserContext"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Loader2 } from "lucide-react";
import pic from "../assets/pic.jpg"

function Profile (){
    const { user, setUser } = useUser()
    const [readOnly, setReadOnly] = useState(true)
    const [loading, setLoading] = useState(false)
    const [profilePic, setProfilePic] = useState(true)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        created: "",
        bio: "",
    })

    const handleEdit = () => {
        setReadOnly(false)
    }

    const handleSave = async () => {
        try {
            setLoading(true)
            const response = await fetch("https://ripple-app-backend-jkkz.onrender.com/api/user/update-profile", {
                method: "PATCH",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    username: formData.username,
                    email: formData.email,
                    bio: formData.bio
                })
            })
            const data = await response.json()

            if(response.ok){
                toast.success(data.message)
                setUser(data.profile)
                setReadOnly(true)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally{
            setLoading(false)
        }
    }

    const handleUploadProfilePic = async () =>{
        try {
            const response = await fetch ("https://ripple-app-backend-jkkz.onrender.com/api/user/upload-profile-pic", {
                method: "PATCH",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    imageUrl: profilePic
                })
            })

            const data = await response.json()

            if(response.ok){
                toast.success(data.message)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

        //    console.log("Loading: ", loading)

    useEffect(() => {
        // getProfile()
        setFormData({
            id: user?.id || "",
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            username: user?.username || "",
            email: user?.email || "",
            bio: user?.bio || "",
            role: user?.role || "",
            created: user?.created || "",
        })
         console.log(formData)
    }, [user])

    return(
        <div className="w-full px-3 py-2">
            <h1 className="text-[20px] font-medium mb-3">My Profile</h1>
            <div className="w-full flex gap-5 items-center  py-5 px-2 rounded-xl">
                <div className="w-30 h-30 rounded-[300px] relative border cursor-pointer overflow-hidden">
                    {profilePic && <img src={pic} alt="profile-pic" className="z-5 w-full h-full object-cover" />}
                    <Input type="file"  accept="image/*" onChange={(e) => setProfilePic(e.target.files[0])} className="absolute z-10 inset-0 h-[100%] opacity-0"/>
                </div>
                <div>
                    <h2 className="font-medium text-[18px]">{user?.firstName} {user?.lastName}</h2>
                    <small className="font-medium">{user?.role}</small>
                </div>
            </div>
            <div className="w-full py-3 px-2 mt-3 rounded-xl">
                <div className="w-full flex justify-between">
                    <h1 className="text-[20px] font-medium">Persornal Information</h1>
                    <Button onClick={readOnly? handleEdit : handleSave} className="cursor-pointer py-3 px-5">{loading? <Loader2 className="animate-spin"/> : readOnly? "Edit" : "Save"}</Button>
                </div>
                <br />
                <div className="grid grid-cols-3 gap-6 mb-10">
                    <div className="flex flex-col gap-1">
                        <small className="pl-3">First Name</small>
                        <Input type="text" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} readOnly={readOnly} className="font-medium !border-none outline-none !ring-0 focus:!ring-0 focus:!border-none shadow-none"/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <small className="pl-3">Last Name</small>
                        <Input type="text" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} readOnly={readOnly} className="font-medium !border-none outline-none !ring-0 focus:!ring-0 focus:!border-none shadow-none"/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <small className="pl-3">Username</small>
                        <Input type="text" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} readOnly={readOnly} className="font-medium !border-none outline-none !ring-0 focus:!ring-0 focus:!border-none shadow-none"/>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                    <div className="flex flex-col justify-center gap-1">
                        <small className="pl-3">Email</small>
                        <Input type="text" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} readOnly={readOnly} className="font-medium !border-none outline-none !ring-0 focus:!ring-0 focus:!border-none shadow-none"/>
                    </div>
                    <div className="flex flex-col justify-center gap-1">
                        <small className="pl-3">Role</small>
                        <p className="font-medium pl-3 text-sm">{formData.role}</p>
                    </div>
                    <div className="flex flex-col justify-center gap-1">
                        <small className="pl-3">Member Since</small>
                        <p className="font-medium text-sm pl-3">{new Date(formData.created).toLocaleDateString()}</p>
                    </div>
                </div>
                <div className="w-full mt-10 flex flex-col gap-3">
                    <small className="px-3">Bio</small>
                    <textarea readOnly={readOnly} placeholder="Add your bio" value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} className="w-full h-40 border rounded-xl p-2 text-[14px] resize-none"></textarea>
                </div>
            </div>
        </div>
    )
}
export default Profile