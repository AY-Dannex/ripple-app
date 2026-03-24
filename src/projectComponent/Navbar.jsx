function Navbar(){
    const navLinks = ["Home", "Explore", "Notifications", "Message", "Profile", "Admin Dashboard"]
    const links = navLinks.map((link, key) => 
    <li className="px-5 py-4"
    key={key}><a href="">{link}</a></li>)
    return(
        <div className="">
            <div>
                <h1>LOGO</h1>
            </div>

            <div>
                <ul className="flex flex-col">
                    {links}
                </ul>
            </div>
        </div>
    );
}
export default Navbar