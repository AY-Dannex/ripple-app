// import { Sidebar } from "@/components/ui/sidebar";
function Navbar(){
    const navLinks = ["Home", "Explore", "Notifications", "Message", "Profile", "Admin Dashboard"]
    const links = navLinks.map((link, key) => 
    <li className="px-5 py-4"
    key={key}><a href="">{link}</a></li>)
    return(
    //    <Sidebar>
        <div>
            <h1>LOGO</h1>
            
            <ul>
                {links}
            </ul>
        </div>
    //    </Sidebar>
    );
}
export default Navbar