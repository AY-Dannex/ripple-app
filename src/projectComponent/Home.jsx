import Navbar from "./Navbar.jsx";
import Post from "./Post.jsx";
import WritePost from "./WritePost.jsx";
function Home (){
    return(
        <div className="w-full h-screen px-5">
            <div className="max-w-[1440px] h-screen m-auto flex">
                <div className="border w-full basis-2/10">
                    <Navbar />
                </div>
                <div className="border w-full basis-8/10 overflow-y-auto scrollbar-hide">
                    <WritePost />
                    <Post />
                </div>
            </div>
        </div>
    );
}
export default Home