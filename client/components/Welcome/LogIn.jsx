import React, { useState } from 'react'
import Home from "../Home/Home"
import { Routes, Route, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import './formsStyle.css';

function LogIn() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loginMessage, setLoginMessage] = useState('');
    const navigate = useNavigate();

    async function handleLogin() {
        if (!userName || !password) {
            setLoginMessage('Please fill in all fields.');
            return;
        }
        const response = await fetch(`http://localhost:3005/users/?username=${userName}&website=${password}`);
        if (!response.ok && response.status != 404) {
            setLoginMessage("You don't have an account yet. Create an account to register");
            return;
        }
        const data = await response.json();
        if (data[0]) {
            localStorage.setItem("currentUser", JSON.stringify(data[0]));
            navigate(`/${data[0].id}`);
        }
        else {
            setLoginMessage('Invalid username or password.');
            setUserName("");
            setPassword("");
        }
    };

    return (
        <div>
            <div className='form'>
                <h2>Login</h2>
                <label>User Name:</label>
                <input id="addName" type="username" placeholder="Write your user name" value={userName} onChange={(e) => setUserName(e.target.value)} /><br />

                <label>Password:</label><br/>
                <input id="addPassword" type="password" placeholder="Write your password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />

                {loginMessage && <p style={{ color: 'orange' }}>{loginMessage}</p>}
                <div className='connectLogIn'>
                    <button onClick={() => handleLogin()}>Click to connect</button>
                    <Link style={{ color: 'orange', fontWeight: 'bold' }} to="/register">Register↪</Link>
                </div>
            </div>
        </div>
    )
}

export default LogIn
