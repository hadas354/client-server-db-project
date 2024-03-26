import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import PostEdit from './PostEdit';
import Comment from './Comment';
import AddComment from './AddComment';

function PostMain() {
    const { postId } = useParams();
    const [post, setPost] = useState({});
    const [showEdit, setShowEdit] = useState(false);
    const [comments, setComments] = useState([]);
    const [userPost, setUserPost] = useState({});
    const [showAddComment, setShowAddComment] = useState(false);

    async function startPost() {
        // await fetch(`http://localhost:3305/posts/${postId}`)
        //     .then(response => response.json())
        //     .then(json => {
        //         setPost(json);
        //     });
        //this is the same request but in the form of a promise
        const data = await fetch(`http://localhost:3305/posts/${postId}`);
        const json = await data.json();
        setPost(json);
        console.log(json);
        return 1;
    }
    async function startUser() {
        // await fetch(`http://localhost:3305/users/?id=${post.userId}`)
        //     .then(response => response.json())
        //     .then(json => {
        //         console.log(json);
        //         setUserPost(json[0]);
        //     });
        //this is the same request but in the form of a promise
        const data2 = await fetch(`http://localhost:3305/users/?id=${post.userId}`);
        const json2 = await data2.json();
        setUserPost(json2[0]);
        console.log(json2);
    }

    useEffect(() => { startPost() }, [showEdit]);

    //useEffect(() => { startPost().then(startUser())}, [showEdit]);
    //useEffect(() => { if (startPost() === 1) startUser() }, [showEdit]);
    // useEffect(() => { startUser()}, [post]);

    function handleDelete() {
        fetch(`http://localhost:3305/posts/${postId}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
            })
    };

    function handleShowComments() {
        if (comments.length > 0) return setComments([]);
        fetch(`http://localhost:3305/comments/?postId=${postId}`)
            .then(response => response.json())
            .then(json => {
                setComments(json);
            })
    }

    return (
        <div>
            <div onClick={() => startUser()}>
                <h3>{post.id} {userPost.name}</h3>
                <h4>{post.title}</h4>
                <p className='bodyP'>{post.body}</p>
            </div>
            {showEdit && <PostEdit postOrigional={post} setShowEdit={setShowEdit} />}
            {<>
                {comments.map(comment =>
                    <Comment key={comment.id} comment={comment}></Comment>
                )}
                {showAddComment && <AddComment setShowAddComment={setShowAddComment} setComments={setComments} />}
                {!showAddComment && <><button onClick={() => setShowAddComment(true)}>add comment</button></>}
            </>}
            <button onClick={handleShowComments}>show comments</button>
            <button onClick={() => setShowEdit(true)}>✒️</button>
            <button onClick={handleDelete}>🗑️</button>
        </div>
    )
}

export default PostMain