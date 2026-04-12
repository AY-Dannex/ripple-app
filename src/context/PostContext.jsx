import { createContext, useState, useContext } from "react";

const PostContext = createContext()

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([])
    const [userPosts, setUserPosts] = useState([])
    const [loadingPost, setLoadingPost] = useState(false)
    const [postsLoaded, setPostsLoaded] = useState(false)
    const [userPostsLoaded, setUserPostsLoaded] = useState(false)

    const fetchPosts = async () => {
        if (postsLoaded) return
        setLoadingPost(true)
        try {
            const response = await fetch("http://localhost:5000/api/post", {
                method: "GET",
                credentials: "include",
                // headers: {
                //     "Cache-Control": "no-cache"
                // }
            })
            const data = await response.json()
            if(response.ok){
                setPosts(data.allPost)
                setPostsLoaded(true)
            }else{
                setPosts([])
            }
        } catch (error) {
            console.log(error.message)
            setPosts([])
        } finally {
            setLoadingPost(false)
        }
    }

    const fetchUserPosts = async () => {
        if (userPostsLoaded) return
        setLoadingPost(true)
        try {
            const response = await fetch("http://localhost:5000/api/post/user", {
                method: "GET",
                credentials: "include",
                // headers: {
                //     "Cache-Control": "no-cache"
                // }
            })
            const data = await response.json()
            if(response.ok){
                setUserPosts(data.userPost)
                setUserPostsLoaded(true)
            }else{
                setUserPosts([])
            }
        } catch (error) {
            console.log(error.message)
            setUserPosts([])
        } finally {
            setLoadingPost(false)
        }
    }

    return (
        <PostContext.Provider value={{ posts, userPosts, loadingPost, fetchPosts, fetchUserPosts }}>
            {children}
        </PostContext.Provider>
    )
}

export const usePosts = () => useContext(PostContext)