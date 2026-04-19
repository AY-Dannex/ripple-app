import { useState, useEffect } from "react"
import PostCard from "./postCard.jsx"
import PostSkeleton from "./PostSkeleton.jsx"
import WritePost from "./WritePost.jsx"
import UploadPost from "./UploadPost.jsx"
import { usePosts } from "../context/PostContext.jsx"
import pic from "../assets/pic.jpg"

function Post () {
    // const [posts, setPosts] = useState([])
    // const [loadingPost, setLoadingPost] = useState(false)
    const { fetchPosts, posts, loadingPost } = usePosts()


    useEffect(() => {
        // const getPost = async () => {
        //     setLoadingPost(true)
        //     try {
        //         const response = await fetch ("http://localhost:5000/api/post", {
        //             method: "GET",
        //             credentials: "include"
        //         })
    
        //         const data = await response.json()
    
        //         if (response.ok){
        //             setPosts(data.allPost)
        //             setLoadingPost(false)
        //         }
    
        //     } catch (error) {
        //         console.log(error)
        //     }
        // }
        // getPost()
        fetchPosts()

    }, [])
    const allPosts = posts?.slice().reverse().map((post) => (
        <PostCard  
            key={post._id}
            id={post._id}
            profilePic={post.user?.profilePic || pic}
            firstName={post.user?.firstName}
            lastName={post.user?.lastName}
            username={post.user?.username}
            content={post.description}
            image={post.image}
            visibility={post.visibility}
            dateUpdated={post.updatedAt}
        />
    ) )
    return(
        <div className="relative h-screen">
            <div className="sticky top-0 z-10 bg-[#fff]">
                <WritePost />
            </div>
            {
                loadingPost ? 
                (
                    <PostSkeleton />
                ) : (
                    <div className="flex flex-col gap-2 pr-3">
                        {allPosts}
                         <UploadPost />
                    </div>
                )
            }
        </div>
    );
}
export default Post