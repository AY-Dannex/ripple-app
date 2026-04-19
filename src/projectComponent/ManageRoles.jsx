import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { useState } from "react";

function ManageRoles (){
    const [user, setUser] = useState(null)
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSearch = async () => {
        try {
            setLoading(true)
            const response = await fetch("http://localhost:5000/api/user/get-user", {
                method: "GET",
                credentials: "include",
                body: email
            })

            const data = await response.json()

            if (response.ok){
                // setUser(data.user)
                console.log(data.user)
            }
        } catch (error) {
            console.log(`Error: ${error.message}`)
        } finally{
            setLoading(false)
        }
    }


    return(
        <div>
            <h1 className="text-xl font-bold">Manage Roles</h1>
            <div className="mt-5 flex border-2 rounded-sm max-w-[400px]">
                <Input onChange={(e) => setEmail(e.target.value)} placeholder="Search users by their email" className="max-w-90 !border-none focus:border-none focus:!ring-0 shadow-none rounded-sm" />
                <Button onClick={handleSearch} className="px-5 rounded-sm"> { loading? <Loader2 /> : <Search className=""/>} </Button>
            </div>
        </div>
    );
}
export default ManageRoles