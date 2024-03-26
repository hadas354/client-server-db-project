import React from 'react'
import { useState } from 'react';

function EditComment({ comment, setShowEdit }) {
    const [body, setBody] = useState(comment.body);

    function handleUpdate() {
        const url = `http://localhost:3305/comments/${comment.id}`;
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...comment, body: body })
        }
        fetch(url, options)
            .then(response => response.json())
            .then(json => {
                console.log(json);
            }).catch(error => {
                console.log(error);
            });
        setShowEdit(false);
    }

    return (
        <div className='wrapper'>
            <button onClick={() => setShowEdit(false)}>x</button>
            <div className='commentEdit'>
                <h2>{comment.id}</h2>
                <input type="text" value={body} onChange={e => setBody(e.target.value)} />
                <button onClick={handleUpdate}>update</button>
            </div>
        </div>
    )
}

export default EditComment