import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import ManageRoles from "./ManageRoles";

function AdminDashboard (){
    const [tabName, setTabName] = useState(null)
    const links = ["Delete Posts", "Assign Roles", "Suspend User", "Remove User",]
    const tabs = links.map((tab) => (<Button key={tab} value={tab} onClick={(e) => setTabName(e.target.value)} className="px-5 py-5 bg-purple-500 cursor-pointer"> {tab} </Button>))
    
    useEffect(() => {
        // console.log(tabName)
    }, [tabName])
    
    return(
        <div>
            <div className="max-w-[700px] mt-4 m-auto flex flex-row justify-between">
                {tabs}
            </div>
            <div className="px-5 py-5">
                <ManageRoles />
            </div>
        </div>
    )
};
export default AdminDashboard