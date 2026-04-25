import Post from "./Post";

function PostManagement (){
    return(
        <div>
            <div>
                <h1 className="text-xl font-bold">Post Management</h1>
                <div className="w-full mt-10">
                    <Post pageType="admin" />
                </div>
            </div>
        </div>
    );
}
export default PostManagement