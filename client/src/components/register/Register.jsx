/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./Register.css";
import { json, redirect,  } from "react-router-dom";
import { useNavigate,Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordV, setPasswordV] = useState("");
  const [existUser, setExistUser] = useState("");
  const [matchPassword, setMatchPassword] = useState(false);
  const [unMatchPassword, setUnmatchPassword] = useState(false);
  const navigate = useNavigate();

  function checkPasswords() {
    fetch("http://localhost:3305/users/")
      .then((res) => res.json())
      .then((data) => validData(data)); // כבר משתמש בשם זה בודק האם קיים
    if (existUser == false && password == passwordV) {
      //הססמאות שוות וגם שם המשתמש אינו קיים במערכת
      setMatchPassword(true);
      navigate("/register/detailForm", { state: { username, password } });
    } else if (existUser == false && password != passwordV) {
      // אבל משתמש קיים בלתי אפשרי---ססמאות לא שוות
      setUnmatchPassword(true);
    }
  }
  function validData(arr) {
    arr.forEach((item) => {
      if (item.username == username) {
        setExistUser(true);
      }
    });
  }
  return (
    <>
      <div id="form">
        <h3>Join us!</h3>
        <label className="registerLable" htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Enter your user name"
          id="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
        />
        <label className="registerLable" htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
        <label className="registerLable" htmlFor="passwordV"> password-verify</label>
        <input
          type="password"
          placeholder="Rewrite your password"
          id="password"
          value={passwordV}
          onChange={(e) => {
            setPasswordV(e.target.value);
          }}
          required
        />
        <button id="regBtn" onClick={checkPasswords}>Register</button>
        <br />
        <Link to="/logIn">already have an account?</Link>     
        {existUser && <h3> This username already exist</h3>}
        {matchPassword && <h1>welcome</h1>}
        {unMatchPassword && <h3>Your passwords are not match</h3>}
      </div>
    </>
  );
}
