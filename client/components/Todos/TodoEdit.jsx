import React, { useState } from 'react'

function TodoEdit({ setShowEdit, todo }) {
    const [title, setTitle] = useState(todo.title);

    function handleUpdate() {
        const url = `http://localhost:3305/todos/${todo.id}`;
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title })
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
            <div className='todoEdit'>
                <h2>{todo.id}</h2>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
                <button onClick={handleUpdate}>update</button>
            </div>
        </div>
    )
}

export default TodoEdit