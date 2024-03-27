import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

function AddPost({ setShowAdd, setPosts }) {
    const [title, setTitle] = useState('');
    const { id } = useParams();

    function handleSubmit(e) {
        e.preventDefault();
        const url = `http://localhost:3305/todos`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: title, completed: false, userID: id })
        }
        fetch(url, options)
            .then(response => response.json())
            .then(json => {
                setPosts(posts => posts.concat(json));
            }).catch(error => {
                console.log(error);
            });
        setShowAdd(false);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="title..." />
                <button className="btn">submit</button>
            </form>
        </div>
    )
}

export default AddPost