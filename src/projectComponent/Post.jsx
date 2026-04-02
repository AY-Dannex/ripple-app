import { useState, useEffect } from "react"
import PostCard from "./postCard.jsx"
import PostSkeleton from "./PostSkeleton.jsx"

function Post () {
    const [posts, setPosts] = useState([])
    const [loadingPost, setLoadingPost] = useState(false)


    useEffect(() => {
        const getPost = async () => {
            setLoadingPost(true)
            try {
                const response = await fetch ("https://ripple-app-backend-jkkz.onrender.com/api/post", {
                    method: "GET",
                    credentials: "include"
                })
    
                const data = await response.json()
    
                if (response.ok){
                    setPosts(data.allPost)
                    console.log(data.allPost)
                    setLoadingPost(false)
                }
    
            } catch (error) {
                console.log(error)
            }
        }
        getPost()
    }, [])
    const allPosts = posts?.slice().reverse().map((post) => (
        <PostCard  
            key={post._id}
            username={post.user.username}
            content={post.description}
            image={post.image}
            visibility={post.visibility}
            dateUpdated={post.updatedAt}
            role={post.user.role}
        />
    ) )
    return(
        <div>
            {
                loadingPost ? 
                (
                    <PostSkeleton />
                ) : (
                    <div className="flex flex-col gap-2">
                        {allPosts}
                    </div>
                )
            }
        </div>
    );
}
export default Post