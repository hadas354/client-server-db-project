import React, { useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useState } from 'react';

export default function PostTitle({ post }) {
  // console.log(post);
  const { id } = useParams();
  const [userPost, setUserPost] = useState({});
  useEffect(() => {
    fetch(`http://localhost:3305/users/${post.userID}`)
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