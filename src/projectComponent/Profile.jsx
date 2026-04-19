import { useEffect, useState } from "react"
import { useUser } from "../context/UserContext"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Loader2 } from "lucide-react";
import PostCard from "./postCard"
import pic from "../assets/pic.jpg"
import PostSkeleton from "./PostSkeleton.jsx"
import { usePosts } from "../context/PostContext.jsx"

function Profile (){
    const { user, setUser } = useUser()
    // const [userPosts, setUserPosts] = useState([])
    const [readOnly, setReadOnly] = useState(true)
    const [loading, setLoading] = useState(false)
    const [picLoading, setPicLoading] = useState(false)
    const [profilePic, setProfilePic] = useState(null)
    const {userPosts, loadingPost, fetchUserPosts} = usePosts()
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        created: "",
        bio: ""
    })

    const handleEdit = () => {
        setReadOnly(false)
    }

    const handleSave = async () => {
        try {
            setLoading(true)
            const response = await fetch("http://localhost:5000/api/user/update-profile", {
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

    // const getProfilePic = (e) => {
    //     setProfilePic(e.target.files[0])
    //     console.log(profilePic)
    // }

    const handleUploadProfilePic = async (e) =>{
        try {
            // getProfilePic(e)
            setPicLoading(true)
            const file = e.target.files[0]

            if(!file) return

            setProfilePic(URL.createObjectURL(file))

            const formData = new FormData()
            formData.append("profilePic", file)

            const response = await fetch ("http://localhost:5000/api/user/upload-profile-pic", {
                method: "PATCH",
                credentials: "include",
                body: formData
            })

            const data = await response.json()

            if(response.ok){
                // console.log("data:", data)
                // console.log("data.profile:", data.profile) 
                toast.success(data.message)
                setUser(data.profile)
                setPicLoading(false)
            }else{
                toast.error(data.message)
                setPicLoading(false)
            }
        } catch (error) {
            toast.error(error.message)
            setPicLoading(false)
        }
    }

    // const getUserPost = async () => {
    //     try {
    //         const response = await fetch("http://localhost:5000/api/post/user", {
    //             method: "GET",
    //             credentials: "include"
    //         })

    //         const data = await response.json()

    //         if(response.ok){
    //             setUserPosts(data.userPost)
    //             console.log(data.userPost)
    //         }
    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // }

    const allUserPosts = userPosts?.slice().reverse().map((post) => (
        <PostCard 
            key={post._id}
            id={post._id}
            profilePic={user?.profilePic || pic}
            username={post.user.username}
            firstName={post.user.firstName}
            lastName={post.user.lastName}
            content={post.description}
            image={post.image}
            visibility={post.visibility}
            dateUpdated={post.updatedAt}
            role={post.user.role}
        />
))

    useEffect(() => {
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

        setProfilePic(user?.profilePic || pic)

        fetchUserPosts()
    }, [])

    return(
        <div className="w-full px-3 py-2">
            <h1 className="text-[20px] font-medium mb-3">My Profile</h1>
            <div className="w-full flex gap-5 items-center  py-5 px-5 rounded-xl border shadow-md">
                <div className="pic w-30 h-30 rounded-[300px] relative border cursor-pointer overflow-hidden">
                    {
                        picLoading? (
                            <div className="absolute inset-o top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-full bg-black/50 h-[10%] z-10 cursor-pointer">
                                <small className="absolute inset-o top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full text-center text-[14px] font-medium cursor-pointer text-white ">{picLoading? <Loader2 className="animate-spin ml-[40%]"/> : ""}</small>
                            </div>
                        ) : (
                            <div className="hovereff absolute inset-o top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-full bg-black/50 h-[10%] z-10 cursor-pointer ">
                                <small className="absolute inset-o top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full text-center text-[14px] font-medium cursor-pointer text-white ">Add photo</small>
                            </div>
                        )
                    }
                    {profilePic && <img src={profilePic} alt="profile-pic" className="z-5 w-full h-full object-cover cursor-pointer " />}
                    <input type="file" disabled={picLoading} accept="image/*" onChange={(e) => handleUploadProfilePic(e)}  className="absolute z-15 inset-0 h-[100%] opacity-0 cursor-pointer"/>
                </div>
                <div>
                    <h2 className="font-medium text-[18px]">{user?.lastName} {user?.firstName}</h2>
                    <small className="font-medium text-[#555]">{user?.role}</small>
                </div>
            </div>
            <div className="w-full py-4 px-5 mt-3 rounded-xl border shadow-md">
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
                    <textarea readOnly={readOnly} placeholder="Add a bio" value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} className="w-full h-40 border rounded-xl p-2 text-[14px] resize-none"></textarea>
                </div>
            </div>
            <div className="mt-15">
                <h1 className="text-[20px] font-medium text-center">My Posts</h1>
                <div className="flex flex-col gap-2 mt-10">
                    { 
                        loadingPost? (
                            <PostSkeleton />
                        ) : (
                            allUserPosts
                        )
                    }
                </div>
            </div>
        </div>
    )
}
export default Profile