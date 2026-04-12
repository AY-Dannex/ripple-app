import { formatDistanceToNow } from "date-fns"
import { useState, useEffect } from "react"
import { X, MoreVertical } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useUser } from "../context/UserContext.jsx"

function PostCard ({ profilePic, image, firstName, lastName, username, content, visibility, dateUpdated}) {
    const timeAgo = formatDistanceToNow(new Date(dateUpdated), { addSuffix: true })
    const [selectedImage, setSelectedImage] = useState(null)
    const { user } = useUser()

    return (
        <div className="flex flex-col">
            <div className="flex px-5 gap-2 items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img src={profilePic} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex justify-between items-center gap-3">
                        <div className="w-full flex justify-between items-center">
                            <div className="flex flex-col">
                                <h4 className="font-medium">{lastName} {firstName}</h4> 
                                <small>@{username}</small>
                            </div>
                            <div className="flex flex-col items-end">
                                <small>{visibility}</small>
                                <small>{timeAgo}</small>
                            </div>
                        </div>
                        <div>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="cursor-pointer outline-none">
                                    <MoreVertical size={25} />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
                                    {/* <DropdownMenuSeparator /> */}
                                    <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
                                    {(user?.role === "admin" || user?.role === "moderator")  && (
                                        <div>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-red-500 cursor-pointer">Delete</DropdownMenuItem>
                                        </div>
                                        )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </div>

            <div className="ml-17 mb-5">
                <div className="mt-2 mb-2 pr-5">
                    <p>{content}</p>
                </div>

                {/* Clickable image */}
                {image && (
                    <div className="rounded-3xl border border-purple-200 overflow-hidden w-full sm:h-50 md:h-70 lg:h-100">
                        <img 
                            src={image} 
                            alt="post" 
                            className="object-cover w-full cursor-pointer scale-150 hover:opacity-90 transition-opacity"
                            onClick={() => setSelectedImage(image)}
                        />
                    </div>
                )}
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    style={{ backgroundColor: "rgba(0,0,0,0.9)" }}
                    onClick={() => setSelectedImage(null)}
                >
                    {/* Close button */}
                    <button 
                        className="absolute top-4 right-4 text-white cursor-pointer"
                        onClick={() => setSelectedImage(null)}
                    >
                        <X size={32} />
                    </button>

                    {/* Full screen image */}
                    <img 
                        src={selectedImage} 
                        alt="full screen" 
                        className="max-w-[90%] max-h-[90vh] object-contain rounded-lg"
                        onClick={(e) => e.stopPropagation()}
                    />
                    {/* <div className="absolute flex justify-center top-[70%] w-[100%] h-[20%] bg-black/80">
                        <textarea className="w-[70%] text-white resize-none h-full scrollbar-hide ">{content}</textarea>
                    </div> */}
                </div>
            )}
        </div>
    )
}
export default PostCard