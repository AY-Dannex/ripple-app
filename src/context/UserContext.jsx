import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [contacts, setContacts] = useState(null)
    const [loadingProfile, setLoadingProfile] = useState(false)
    const [loadingContact, setLoadingContact] = useState(false)

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

    const getOtherUserProfile = async (ID) => {
        setProfile(null)
        setLoadingProfile(true)
        try {
            const response = await fetch(`http://localhost:5000/api/user/get-other-user-profile?ID=${ID}`, {
                method: "GET",
                credentials: "include"
            })

            const data = await response.json()

            if(response.ok){
                setProfile(data.user)
                console.log(data.user)
            }
        } catch (error) {
            console.log(error.message)
        } finally{
            setLoadingProfile(false)
        }
    }

    const getAllUsers = async () => {
        setLoadingContact(true)
        try {
            const response = await fetch("http://localhost:5000/api/user/get-all-users", {
                method: "GET",
                credentials: "include"
            })

            const data = await response.json()

            if (response.ok) {
                setContacts(data.users)
            }
        } catch (error) {
            console.log(error.message)
        } finally{
            setLoadingContact(false)
        }
    }

    useEffect(() => {
        getUserProfile()
        getAllUsers()
        // console.log(user)
    }, [])

    // useEffect(() => {
    //     if (!user) return

    //     const interval = setInterval(async () => {
    //         try {
    //             const response = await fetch("", {
    //                 method: "GET",
    //                 credentials: "include",
    //                 headers: {
    //                     "Cache-Control": "no-cache"
    //                 }
    //             })

    //             const data = await response.json()

    //             if(response.ok){
    //                 if (data.role !== user.role){
    //                     setUser(data)
    //                     window.location.href = "/home"
    //                 }
    //             }else{
    //                 setUser(null)
    //                 window.location.href = "/login"
    //             }
    //         } catch (error) {
    //             console.log(error.message)
    //         }
    //     }, 15000)

    //     return () => clearInterval(interval)
    // }, [user])

    return (
        <UserContext.Provider value={{ user, setUser, loading, profile, loadingProfile, contacts, loadingContact, getOtherUserProfile }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext)