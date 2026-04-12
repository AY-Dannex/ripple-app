import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner";
import { useUser } from "../context/UserContext";
import { ImagePlus } from "lucide-react";
import pic from "../assets/pic.jpg"

function WritePost () {
    const [description, setDescription] = useState("")
    const [visibility, setVisibility] = useState("")
    const [imageFile, setImageFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const {user, setUser} = useUser()

    
    const handlePost = async () => {
        setLoading(true)
        try {
           const formData = new FormData()
           formData.append("description", description)
           formData.append("visibility", visibility)
           if(imageFile) formData.append("image", imageFile)
         const response = await fetch ("http://localhost:5000/api/post/create", {
            method: "POST",
            credentials: "include",
            body: formData
        })

        const data = await response.json()
        console.log(data)

        if(response.ok){
            toast.success(data.message)
            setLoading(false)
            window.location.reload()
        }else{
            setLoading(false)
            toast.error(data.message)
        }
    } catch (error) {
           setLoading(false)
            toast.error(error.message)
       }
    }

    return(
        <div className="px-5 py-5">
            <div className="flex gap-3 py-2">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img src={user.profilePic || pic} alt="profilepic" className="w-full h-full object-cover" />
                </div>
                    <Input type="text" onChange={(e) => (setDescription(e.target.value))} placeholder="What's on your mind?" className="border-none" />
            </div>
            <hr />
            <div className="py-3 flex gap-5">
                <input type="file" accept="image/*" disabled={loading} onChange={(e) => setImageFile(e.target.files[0])} className="w-full h-full text-30 border absolute top-3 inset-0 top z-5 hidden " name="" id="upload" />
                <label htmlFor="upload">
                    <ImagePlus className="w-[30px] h-[30px] z-10 cursor-pointer" />
                </label>
                <Select value={visibility} onValueChange={setVisibility}>
                    <SelectTrigger className="w-full max-w-35">
                        <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectLabel>Visibility</SelectLabel>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Button onClick={handlePost} className="cursor-pointer px-5 bg-purple-500">Post</Button>
            </div>
            <hr />
        </div>
    );
}
export default WritePost