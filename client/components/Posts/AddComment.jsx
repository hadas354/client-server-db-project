import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function AddComment({ setShowAddComment, setComments }) {
    const [body, setBody] = useState('');
    const { postId, id } = useParams();
    const user = JSON.parse(localStorage.getItem('currentUser'));

    function handleSubmit(e) {
        e.preventDefault();
        const url = `http://localhost:3305/comments`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ body: body, postId: postId, email: user.email, name: user.name })
        }
        fetch(url, options)
            .then(response => response.json())
            .then(json => {
                setComments(comments => comments.concat({ body: body, email: user.email, name: user.name, id: json.id }));
            }).catch(error => {
                console.log(error);
            });

        setShowAddComment(false);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" value={body}
                    onChange={e => setBody(e.target.value)} placeholder="body..." />
                <button className="btn">submit</button>
            </form>
        </div>
    )
}

export default AddComment