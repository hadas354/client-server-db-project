import React, { useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useState } from 'react';

export default function PostTitle({ post }) {
  const { id } = useParams();
  const [userPost, setUserPost] = useState({});
  useEffect(() => {
    fetch(`http://localhost:3305/users/?id=${post.userId}`)
      .then(response => response.json())
      .then(json => {
        setUserPost(json[0]);
      })
      .catch(e => console.log(e))
  }, []);
  return (
    <NavLink to={`/${id}/posts/${post.id}`}
      className='postTitle'>
      <h5>{`${post.id} ${userPost.name}`}</h5>
      <h4>{post.title}</h4>
    </NavLink>
  )
}