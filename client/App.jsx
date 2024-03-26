import { useState } from 'react'
import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Welcome from "./components/Welcome/Welcome.jsx"
import LogIn from './components/Welcome/LogIn.jsx'
import Home from './components/Home/Home.jsx'
import Todos from './components/Todos/Todos.jsx'
import Posts from './components/Posts/Posts.jsx'
import Register from './components/Welcome/Register.jsx'
import NavBar from './components/General/NavBar.jsx'
import PostMain from './components/Posts/PostMain.jsx'
import ExitPage from './components/Home/ExitPage.jsx'
import Info from './components/Info/Info.jsx'
function App() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <Routes >
        <Route path="">
          <Route index element={<Welcome />} />
          <Route path="login" element={<LogIn />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/:id">
          <Route index element={<Home />} />
          <Route path="info" element={<Info />} />
          <Route path="exit" element={<ExitPage />} />
          <Route path="todos" element={<Todos />} />
          <Route path="posts">
            <Route index element={<Posts />} />
            <Route path=":postId" element={<PostMain />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
