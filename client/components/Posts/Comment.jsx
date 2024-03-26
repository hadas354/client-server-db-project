import React, { useEffect } from 'react'
import { useState } from 'react';
import EditComment from './EditComment';
import './postsStyle.css'
function Comment({ comment }) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const [showEdit, setShowEdit] = useState(false);
    const [newComment, setNewComment] = useState(comment);

    useEffect(() => {
        fetch(`http://localhost:3305/comments/${comment.id}`)
            .then(response => response.json())
            .then(json => {
                setNewComment(json);
            })
    }, [showEdit]);

    function handleDelete() {
        fetch(`http://localhost:3305/comments/${comment.id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
            }).catch(error => {
                console.log(error);
            });
    }

    return (
        <div className='singleComment'>
            <h5>{newComment.id}✓✓</h5>
            <p className='privateDetails'>{newComment.name}</p>
            <p className='privateDetails'>{newComment.email}</p>
            <p>{newComment.body}</p><hr />
            <div className='commentsActions'>
                {showEdit && <EditComment comment={newComment} setShowEdit={setShowEdit} />}
                {user.email == newComment.email && <><button onClick={() => setShowEdit(true)}>✒️</button>
                    <button onClick={handleDelete}>🗑️</button></>}</div>
        </div>
    )
}

export default Comment