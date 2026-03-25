import { formatDistanceToNow } from "date-fns"
import { useState } from "react"
import { X } from "lucide-react"

function PostCard ({ profilePic, image, username, content, visibility, dateUpdated, role }) {
    const timeAgo = formatDistanceToNow(new Date(dateUpdated), { addSuffix: true })
    const [selectedImage, setSelectedImage] = useState(null)

    return (
        <div className="flex flex-col">
            <div className="flex px-5 gap-2 items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img src={image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                            <h4>{username}</h4> 
                            <small>{role}</small>
                        </div>
                        <div className="flex flex-col items-end">
                            <small>{visibility}</small>
                            <small>{timeAgo}</small>
                        </div>
                    </div>
                </div>
            </div>

            <div className="ml-17 mb-5">
                <div className="mt-2">
                    <p>{content}</p>
                </div>

                {/* Clickable image */}
                {image && (
                    <div className="rounded-xl overflow-hidden">
                        <img 
                            src={image} 
                            alt="post" 
                            className="object-cover w-full cursor-pointer hover:opacity-90 transition-opacity"
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
                </div>
            )}
        </div>
    )
}
export default PostCard