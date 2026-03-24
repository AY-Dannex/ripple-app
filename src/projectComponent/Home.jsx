import Navbar from "./Navbar.jsx";
import Post from "./Post.jsx";
function Home (){
    return(
        <div className="w-full h-screen px-5">
            <div className="max-w-[1440px] h-screen m-auto flex">
                <div className="border w-full basis-3/10">
                    <Navbar />
                </div>
                <div className="border w-full basis-7/10 overflow-y-auto scrollbar-hide">
                    <Post />
                </div>
            </div>
        </div>
    );
}
export default Home