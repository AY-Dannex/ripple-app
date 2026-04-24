import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import UserManagement from "./UserManagement";
import PostManagement from "./PostManagement";

function AdminDashboard (){
    const [tabName, setTabName] = useState(null)
    const links = ["User Management", "Post Management"]
    const tabs = links.map((tab) => (<Button key={tab} value={tab} onClick={(e) => setTabName(e.target.value)} className="px-5 py-5 bg-purple-500 cursor-pointer"> {tab} </Button>))
    
    useEffect(() => {
        // console.log(tabName)
    }, [tabName])
    
    return(
        <div>
            <div className="max-w-[400px] mt-4 m-auto flex flex-row justify-between">
                {tabs}
            </div>
            <div className="px-5 py-5">
                {
                    tabName === "Post Management" ? <PostManagement />  : <UserManagement />
                }
            </div>
        </div>
    )
};
export default AdminDashboard