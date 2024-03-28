/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// NavigationBar.jsx
import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './NavigationBar.css'

function NavigationBar({ id}) {
  const navigate=useNavigate();

  function logout(){
    localStorage.clear();
    navigate('/login');
  }
  return (
    <nav>
      <Link to={`/users/${id}/info`}>Info</Link>
      <Link to={`/users/${id}/todos`}>Todos</Link>
      <Link to={`/users/${id}/posts`}>Posts</Link>
      <a onClick={logout}>Logout</a>
    </nav>
  );
}

export default NavigationBar;
