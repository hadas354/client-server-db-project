import React, {useState} from 'react'
import './postsStyle.css'

function PostEdit({setShowEdit, postOrigional}){
    const [post, setPost] = useState(postOrigional);
    function handleUpdate(){
        fetch(`http://localhost:3305/posts/${post.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
        });
        setShowEdit(false);
    }
  return (
    <div>
        <div className='wrapper'>
        <button onClick={()=>setShowEdit(false)}>x</button>
            <div className='postEdit'>
                <h2>{post.id}</h2>
                <input type="text" value={post.title} onChange={e => setPost(p=>{return{...p, title:e.target.value}})} />
                <input type="text" value={post.body} onChange={e => setPost(p=>{return{...p, body:e.target.value}})} />
                <button onClick={handleUpdate}>update</button>
            </div>
        </div>
    </div>
  )
}

export default PostEdit