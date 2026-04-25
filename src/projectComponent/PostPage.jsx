import Post from "./Post";
import UploadPost from "./UploadPost";
import WritePost from "./WritePost";

function PostPage (){
    return(
        <div>
            <WritePost />
            <Post />
            <UploadPost />
        </div>
    );
}
export default PostPage