import { useState, useEffect } from "react"
import PostCard from "./postCard.jsx"

function Post () {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const getPost = async () => {
            try {
                const response = await fetch ("https://ripple-app-backend-jkkz.onrender.com/api/post", {
                    method: "GET",
                    credentials: "include"
                })
    
                const data = await response.json()
    
                if (response.ok){
                    setPosts(data.allPost)
                    console.log(data.allPost)
                }
    
            } catch (error) {
                console.log(error)
            }
        }
        getPost()
    }, [])
    const allPosts = posts?.map((post) => (
        <PostCard  
            key={post._id}
            username={post.user.username}
            content={post.description}
            visibility={post.visibility}
            dateUpdated={post.updatedAt}
            role={post.user.role}
        />
    ) )
    return(
        <div className="flex flex-col gap-2">
            {allPosts}
        </div>
    );
}
export default Post