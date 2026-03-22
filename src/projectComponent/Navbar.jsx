const Navbar = () => {
    const navLinks = ["Home", "Explore", "Notifications", "Message", "Profile", "Admin Dashboard"]
    const links = navLinks.map((link) => {<li>{link}</li>})
    return(
        <div>
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