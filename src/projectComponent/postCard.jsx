function PostCard ({ profilePic, username, content, image, visibility }) {
    return (
        <div>
            <div>
                <img src={profilePic} alt="" />
            </div>
            <div>
                <h4>{username}</h4> 
                <small>{visibility}</small>
            </div>
            <div>
                <p>{content}</p>
            </div>
            <div>
                <img src={image} alt="" />
            </div>
        </div>
    );
}
export default PostCard