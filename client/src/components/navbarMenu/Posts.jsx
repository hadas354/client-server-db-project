/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import "./Posts.css";

export default function Posts() {
  const userData = JSON.parse(localStorage.getItem("currentUser"));
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostBody, setNewPostBody] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [searchUserId, setSearchUserId] = useState("");
  const [showCommentsOfPost, setShowCommentsOfPost] = useState(false);
  const [currentComments, setCurrentComments] = useState([]);
  const [indexComment, setIndexComment] = useState(0);
  const [bodyPosts, setBodyPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3305/posts?userId=${userData.id}`
        );
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const addNewPost = async () => {
    try {
      const response = await fetch(`http://localhost:3305/posts`, {
        method: "POST",
        body: JSON.stringify({
          userId: userData.id,
          title: newPostTitle,
          body: newPostBody,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (response.ok) {
        const updatedRes = await fetch(
          `http://localhost:3305/posts?userId=${userData.id}`
        );
        const updatedData = await updatedRes.json();
        setPosts(updatedData);
        setNewPostTitle("");
      } else {
        console.error("Failed to add new post:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding new post:", error);
    }
  };

  async function deletePost (index){
    const post = posts[index];
    let newPosts = [...posts];
    newPosts.splice(index, 1);
    setPosts(newPosts);

    try {
      const response = await fetch(`http://localhost:3305/posts/${post.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        alert("Failed to delete post:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }

  const updatePost = async (index) => {
    const currentTitle = posts[index].title;
    const newTitle = prompt("Enter a new title:", currentTitle);

    if (newTitle !== null) {
      let newPosts = [...posts];
      newPosts[index] = {
        ...newPosts[index],
        title: newTitle,
      };
      setPosts(newPosts);

      const post = newPosts[index];
      try {
        const response = await fetch(`http://localhost:3305/posts/${post.id}`, {
          method: "PUT",
          body: JSON.stringify(post),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });

        if (!response.ok) {
          console.error("Failed to update post:", response.statusText);
        }
      } catch (error) {
        console.error("Error updating post:", error);
      }
    }
  };

  async function hadleSearchId() {
    try {
      const res = await fetch(`http://localhost:3305/posts?id=${searchUserId}`);
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      alert("Error fetching data:", error);
    }
  }

  async function handleSearchTitle() {
    try {
      const res = await fetch(
        `http://localhost:3305/posts?userId=${userData.id}`
      );
      let data = await res.json();
      data = data.filter(
        (item) => JSON.stringify(item.title).indexOf(searchTitle) !== -1
      );
      setPosts(data);
    } catch (error) {
      alert("Error fetching data:", error);
    }
  }
  // comment part
  async function showComments(index) {
    let post = posts[index];
    setShowCommentsOfPost(true);
    setIndexComment(post.id);
    fetch(`http://localhost:3305/comments?postId=${post.id}`)
      .then((res) => res.json())
      .then((data) => setCurrentComments(data));
  }
  async function addComment(postIndex) {
    const post = posts[postIndex];

    const commenterName = userData.name;
    const commenterEmail = userData.email;
    const newCommentBody = prompt("Enter your comment:");

    if (
      commenterName !== null &&
      commenterEmail !== null &&
      newCommentBody !== null
    ) {
      try {
        const response = await fetch(`http://localhost:3305/comments`, {
          method: "POST",
          body: JSON.stringify({
            postId: post.id,
            name: commenterName,
            email: commenterEmail,
            body: newCommentBody,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });

        if (response.ok) {
          const updatedRes = await fetch(
            `http://localhost:3305/comments?postId=${post.id}`
          );
          const updatedData = await updatedRes.json();
          setCurrentComments(updatedData);
        } else {
          console.error("Failed to add new comment:", response.statusText);
        }
      } catch (error) {
        console.error("Error adding new comment:", error);
      }
    }
  }
  const updateComment = async (comment, index) => {
    const newCommentBody = prompt("Enter your comment:");
    const newComment = {
      postId: comment.postId,
      name: comment.name,
      email: comment.email,
      body: newCommentBody,
    };
    try {
      // Assuming comment.id is available to identify the specific comment
      const response = await fetch(
        `http://localhost:3305/comments/${comment.id}`,
        {
          method: "PUT",
          body: JSON.stringify(newComment),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      if (!response.ok) {
        console.error("Failed to update comment:", response.statusText);
      } else {
        let newComments = [...currentComments];
        newComments[index] = newComment;
        setCurrentComments(newComments);
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const deleteComment = async (comment, index) => {
    console.log(comment);
    try {
      // Assuming comment.id is available to identify the specific comment
      const response = await fetch(
        `http://localhost:3305/comments/${comment.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error("Failed to delete comment:", response.statusText);
      } else {
        let newCom = currentComments.filter((item, i) => i !== index)
        setCurrentComments(newCom);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  function moreInformation(index) {
    let newPostBodyId = [...bodyPosts];
    newPostBodyId.push(posts[index].id);
    setBodyPosts(newPostBodyId);
    console.log(newPostBodyId);
  }

  function lessInformation(index) {
    let indexOf=bodyPosts.indexOf(posts[index].id);
    const newBodyPst = bodyPosts.filter((item, i) => i !== indexOf);
    setBodyPosts(newBodyPst);
  }

  return (
    <div className="postsContent">
      <h1>Posts</h1>
      <div id="searchDiv">
        <div className="searchDivChild">
          <label htmlFor="searchUserId">Search by UserId:</label>
          <input
            type="text"
            id="searchUserId"
            value={searchUserId}
            onChange={(e) => setSearchUserId(e.target.value)}
          />
          <button onClick={hadleSearchId}>search by id</button>
        </div>
        <div className="searchDivChild">
          <label htmlFor="searchTitle">Search by Title:</label>
          <input
            type="text"
            id="searchTitle"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
          <button onClick={handleSearchTitle}>search by title</button>
        </div>
      </div>
      {posts.map((element, index) => (
        <div key={index} className="dataDiv">
          <h2>{element.id}</h2>
          <h3>{element.title}</h3>
          <button onClick={() => deletePost(index)} className="changeBtn">
            Delete
          </button>
          <button onClick={() => updatePost(index)} className="changeBtn">
            Update
          </button>
          <button onClick={() => showComments(index)} className="changeBtn">
            Comments
          </button>
          {!bodyPosts.includes(element.id) && (
            <button onClick={() => moreInformation(index)}>➕</button>
          )}
          {bodyPosts.includes(element.id) && (
            <div>
              <button onClick={() => lessInformation(index)}>➖</button>
              <p>{element.body}</p>
            </div>
          )}
          {showCommentsOfPost && element.id === indexComment && (
            <div>
              <button onClick={() => addComment(index)}>Add Comment</button>
              <br />
              <button onClick={() => setShowCommentsOfPost(false)}>❌</button>
              <br />
              {currentComments.map((comment, commentIndex) => (
                <div key={commentIndex}>
                  <h4>
                    <b>name:</b> {comment.name}
                  </h4>
                  <h4>
                    <b>email:</b> {comment.email}
                  </h4>
                  <h4>
                    <b>body:</b> {comment.body}
                  </h4>
                  {userData.name === comment.name &&
                    userData.email === comment.email && (
                      <div>
                        <button
                          onClick={() => deleteComment(comment, commentIndex)}
                        >
                          🗑️
                        </button>
                        <button
                          onClick={() => updateComment(comment, commentIndex)}
                        >
                          ✏️
                        </button>
                      </div>
                    )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <div id="addPost">
        <label htmlFor="newPostTitle">New Post Title:</label>
        <input
          type="text"
          id="newPostTitle"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
        />
        <label htmlFor="newPostBody">New Post Body:</label>
        <input
          type="text"
          id="newPostBody"
          value={newPostBody}
          onChange={(e) => setNewPostBody(e.target.value)}
        />
        <button onClick={addNewPost} id="add">
          Add Post
        </button>
      </div>
    </div>
  );
}
