import React, { useEffect, useState } from 'react'
import './postsStyle.css'
import PostTitle from './PostTitle'
import AddPost from './AddPost'
import { useParams } from 'react-router-dom'

export default function Posts() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsKind, setPostsKind] = useState('My Posts');

  function handleSearch() {
    fetch(`http://localhost:3305/posts/?&userId=${id}`)
      .then(response => response.json())
      .then(json => {
        setPosts(json);
        if (json.length == 0) {
          setCurrentPage(1);
        }
      }).catch(error => {
        console.log(error);
      });
  };

  async function getPosts() {
    if (postsKind === 'All Posts') {
      await fetch(`http://localhost:3305/posts?_page=${currentPage}&_limit=5`)
        .then(re => {if(re.status==404)throw "not found"; return re.json();})
        .then(data => setPosts(data))
        .catch(e => console.log(e));
      document.querySelector('.postsKind').firstElementChild.classList.add('kindOfPosts');
      document.querySelector('.postsKind').lastElementChild.classList.remove('kindOfPosts');
    } else if (postsKind === 'My Posts') {
      await fetch(`http://localhost:3305/posts?_page=${currentPage}&_limit=8&userId=${id}`)
        .then(re => re.json())
        .then(data => setPosts(data))
        .catch(e => console.log(e));
        document.querySelector('.postsKind').firstElementChild.classList.remove('kindOfPosts');
        document.querySelector('.postsKind').lastElementChild.classList.add('kindOfPosts');
    }
  }

  useEffect(() => { getPosts() }, [postsKind, currentPage]);

  return (
    <>
      <div className='postsKind'>
        <h2 onClick={() => setPostsKind("All Posts")}>All Posts🤨</h2>
        <h2 onClick={() => setPostsKind("My Posts")} className='kindOfPosts'>My Posts🤗</h2>
      </div>
      <button className='addPostButton' onClick={() => setShowAdd(true)}>+</button>
      {showAdd && <AddPost setShowAdd={setShowAdd} setPosts={setPosts} />}
      <input type="search" className='searchPost' placeholder='search...'
        onChange={e => setSearch(e.target.value)} value={search} onSubmit={handleSearch} />
      <button type="submit" className='searchButton' onClick={handleSearch}>🔍</button>
      <div className='posts'>
        {posts.map(p =>
          <PostTitle post={p} key={p.id} />
        )} </div>
      <button onClick={() => setCurrentPage(p => p + 1)}>⬅️</button>
      <button onClick={() => setCurrentPage(p => p == 1 ? 1 : p - 1)}>➡️</button>

    </>
  )
}