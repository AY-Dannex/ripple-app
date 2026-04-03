import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const getUserProfile = async () => {
        try {
            const response = await fetch("https://ripple-app-backend-jkkz.onrender.com/api/user/profile", {
                method: "GET",
                credentials: "include",
                header: {
                    "Cache-Control": "no-cache"
                }
            })
            // console.log("Status: ", response.status)
            const data = await response.json()
            // console.log("Data: ", data.profile)

            if(response.ok){
                setUser(data.profile)
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
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext)