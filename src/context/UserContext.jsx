import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const getUserProfile = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/user/profile", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Cache-Control": "no-cache"
                }
            })
            // console.log("Status: ", response.status)
            // console.log("fetchUser status:", response.status)
            const data = await response.json()
            // console.log("fetchUser data:", data)
            // console.log("Data: ", data.profile)

            if(response.ok){
                // setUser(data.profile)
                setUser(data.profile)
                // console.log(user)
            }else{
                setUser(null)
            }
        } catch (error) {
            setUser(null)
            console.log(error.message)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        getUserProfile()
        // console.log(user)
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext)