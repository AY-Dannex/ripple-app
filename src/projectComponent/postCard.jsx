const PostCard = ({ profilePic, username, post, image }) => {
    return (
        <div>
            <div>
                <img src={profilePic} alt="" />
            </div>
            <div>
                <h4>{username}</h4> 
            </div>
            <div>
                <p>{post}</p>
            </div>
            <div>
                <img src={image} alt="" />
            </div>
        </div>
    );
}
export default PostCard