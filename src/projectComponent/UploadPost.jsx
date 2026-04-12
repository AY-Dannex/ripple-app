import { useState, useEffect } from "react"
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
import { Camera, Upload, ImagePlus, Image, Plus, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select"

function UploadPost (){
    const [description, setDescription] = useState("")
    const [visibility, setVisibility] = useState("")
    const [imageFile, setImageFile] = useState(null)
    const [loading, setLoading] = useState(false)


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

    const handleClear = () => {
        
    }

    return(
        <div className="absolute inset-0 sticky bottom-3 px-5">
            <Dialog className="px-5">
                {/* <form> */}
                    <DialogTrigger>
                        {/* <div className="h-[60px] w-[60px] rounded-[50px] flex justify-center items-center"> */}
                            <Button className="h-[55px] w-[55px] rounded-[50px] cursor-pointer bg-purple-500 absolute bottom-0 right-3 shadow">
                                <Plus className="!w-7 !h-7" />
                            </Button>
                        {/* </div> */}
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
                            <textarea onChange={(e) => setDescription(e.target.value)} disabled={loading} className="p-2 border border-purple-400 outline-purple-400 rounded-lg resize-none h-30" name="" id=""></textarea>
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
                                <input type="file" accept="image/*" disabled={loading} onChange={(e) => setImageFile(e.target.files[0])} className="w-full h-full text-30 border absolute top-3 inset-0 top z-5 hidden " name="" id="upload" />
                                <label htmlFor="upload">
                                    <ImagePlus className="w-[30px] h-[30px] z-10 cursor-pointer" />
                                </label>
                            </div>
                        </div>
                        {/* </Field> */}
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
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