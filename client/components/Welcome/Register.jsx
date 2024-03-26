import React, { useState } from 'react'
import './formsStyle.css';
import { Link } from 'react-router-dom';
import CompleteRegistration from './CompleteRegistration';


function Register() {
  const [userName, setUserName] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [password, setPassword] = useState("");
  const [continueSingUp, setContinueSingUp] = useState(false);
  const [signUpMessage, setSignUpMessage] = useState('');

  async function handleRegistration() {
    if (!userName || !password || !verifyPassword) {
      setSignUpMessage('Please fill in all fields.');
      return;
    }
    if (password != verifyPassword) {
      setSignUpMessage("Password don't match.");
      return;
    }
    else {
      const response = await fetch(`http://localhost:3305/users/?username=${userName}`)
        .catch(error => {
          console.log("Error:", error);
        })
      let data = await response.json();
      console.log(data)
      if (data.length == 0 && password == verifyPassword) {
        setContinueSingUp(true);
      }
    }

  }
  return (
    <>
    {!continueSingUp&&<div className="form">

      <h2>Sign Up</h2>
      <label>User Name:</label>
      <input
        type="text"
        placeholder="User-name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)} /><br />

      <label>Password:</label><br/>
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} /><br />

      <label>Verify Password:</label><br/>
      <input
        type="passwordVerify"
        placeholder="verify password"
        value={verifyPassword}
        onChange={(e) => setVerifyPassword(e.target.value)} /><br />

      {signUpMessage && <p style={{ color: 'orange' }}>{signUpMessage}</p>}

      <div className="connect">
        <button onClick={() => handleRegistration()}>Connect</button>
        <Link style={{ color: 'orange', fontWeight: 'bold' }} to="/login">Log In↩</Link>
      </div>
      

    </div>}
    {continueSingUp && <CompleteRegistration password={password} userName={userName} />}</>
  )
}

export default Register