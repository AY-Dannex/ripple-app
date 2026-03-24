function Navbar(){
    const navLinks = ["Home", "Explore", "Notifications", "Message", "Profile", "Admin Dashboard"]
    const links = navLinks.map((link, key) => <li key={key}><a href="">{link}</a></li>)
    return(
        <div className="">
            <div>
                LOGO
            </div>

            <div>
                <ul>
                    {links}
                </ul>
            </div>
        </div>
    );
}
export default Navbar