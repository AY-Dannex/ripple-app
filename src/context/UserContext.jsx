import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const getUserProfile = async () => {
        try {
            const response = await fetch("https://ripple-app-backend-jkkz.onrender.com/api/user/profile", {
                method: "GET",
                credentials: "include"
            })

            const data = await response.json()

            if(response.ok){
                setUser(data)
            }
        } catch (error) {
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