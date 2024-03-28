/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';
import Home from './components/Home';
import Info from './components/navbarMenu/Info';
import Posts from './components/navbarMenu/Posts';
import Todos from './components/navbarMenu/Todos';
import Login from './components/Login';
import Register from './components/register/Register';
import DetailsForm from './components/register/DetailsForm'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <header>
                <nav>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </nav>
              </header>
              <Outlet />
            </div>
          }
        />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/register/detailForm" element={<DetailsForm/>} />
        <Route path="/users/:id" element={<Home />}>
          <Route index element={<h1 style={{color:'#6c584c'}}>Home Page🏠</h1>}/>
          <Route path="info" element={<Info />} />
          <Route path="posts" element={<Posts />} />
          <Route path="todos" element={<Todos />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
