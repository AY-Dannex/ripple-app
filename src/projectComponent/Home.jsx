import Navbar from "./Navbar.jsx";
import Post from "./Post.jsx";
function Home (){
    return(
        <div className="w-full h-screen px-5">
            <div className="max-w-[1440px] m-auto flex">
                <div className="border w-full">
                    <Navbar />
                </div>
                <div className="border w-full">
                    <Post />
                </div>
            </div>
        </div>
    );
}
export default Home