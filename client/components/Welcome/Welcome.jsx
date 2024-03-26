import React from 'react'
import { NavLink, Outlet, Route, Routes } from 'react-router-dom'
import NavBar from '../General/NavBar'
function Welcome() {
    return (
        <>
        <div className='enteringButtons'>
            <h3><NavLink to={"/login"}>Login</NavLink></h3>
            <h3><NavLink to={"/register"}>Register</NavLink></h3></div>
            <div className='logoImage'>
            <img src="src\assets\Blue_Elegant_Concept_Foundation_Logo__1_-removebg-preview.png" />
            </div>
        </>
    )
}

export default Welcome