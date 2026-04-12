import { useState, useEffect, useRef } from "react"
import { Button } from "../components/ui/button"
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
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Camera, Upload, ImagePlus, Image, Plus, Loader2, FileInput } from "lucide-react"
import { toast } from "sonner"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select"
import { usePosts } from "../context/PostContext.jsx"

function UploadPost (){
    const [description, setDescription] = useState("")
    const [visibility, setVisibility] = useState("")
    const [imageFile, setImageFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const fileInputRef = useRef(null)
    const { fetchPosts } = usePosts()


    const handlePost = async () => {
        console.log(description)
        console.log(visibility)
        console.log(imageFile)
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
            setDescription("")
            setVisibility("")
            setImageFile(null)
            if(fileInputRef) fileInputRef.current.value = ""
            setLoading(false)
            fetchPosts()
            // window.location.reload()
        }else{
            toast.error(data.message)
            setLoading(false)
        }
    } catch (error) {
        toast.error(error.message)
        setLoading(false)
       }
    }

    // const handleClear = (e) => {
    //     e.target.value = ""
    // }

    return(
        <div className="absolute inset-0 sticky bottom-3 px-5">
            <Dialog className="px-5">
                {/* <form> */}
                    <DialogTrigger style={{ boxShadow: "0 6px 35px 5px rgba(168, 85, 247, 0.7)" }} className="h-[55px] w-[55px] rounded-[50px] cursor-pointer bg-purple-500 absolute bottom-0 right-3 grid place-content-center ">
                        <Plus className="!w-7 !h-7 text-white" />
                    </DialogTrigger>
                    <DialogContent className="!max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Whats on your mind</DialogTitle>
                        <DialogDescription>
                            What’s on your mind? Upload a photo or write something to share with your audience.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="name-1">Description</Label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} disabled={loading} className="p-2 border border-purple-400 outline-purple-400 rounded-lg resize-none h-30" name="" id=""></textarea>
                        </Field>
                        {/* <Field> */}
                        <div className="w-full flex items-center mt-[-15px] gap-5">
                            <Select value={visibility} disabled={loading} onValueChange={setVisibility}>
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
                            <div className="relative w-[40px] h-[40px] flex items-center justify-center cursor-pointer">
                                <input ref={fileInputRef} type="file" accept="image/*" disabled={loading} onChange={(e) => {
                                    const file = e.target.files[0]
                                    console.log(file)
                                    setImageFile(file)
                                }} className="w-full h-full text-30 border absolute top-3 inset-0 top z-5 opacity-0 " name="" id="upload" />
                                <label htmlFor="upload">
                                    <ImagePlus className="w-[30px] h-[30px] z-10 cursor-pointer" />
                                </label>
                            </div>
                        </div>
                        {/* </Field> */}
                    </FieldGroup>
                    <DialogFooter className="flex flex-row justify-end">
                        <DialogClose className="">
                            <Button className="cursor-pointer border-purple-500 text-purple-500 bg-transparent">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" onClick={handlePost} className="cursor-pointer bg-purple-500 w-20">{loading? <Loader2 className="animate-spin" /> : "Upload"}</Button>
                    </DialogFooter>
                    </DialogContent>
                {/* </form> */}
            </Dialog>
        </div>
    );
}
export default UploadPost