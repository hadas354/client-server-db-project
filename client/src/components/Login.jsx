/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notValid, setNotValid] = useState(false);

  function checkPassward() {
    fetch(`http://localhost:3305/users?username=${username}`)
      .then((res) => res.json())
      .then((data) => checkPassWithId(data));
  }

  function checkPassWithId(userData) {
    if (userData.length === 0) {
      setNotValid(true);
      return;
    }
    fetch(
      `http://localhost:3305/passwords?userID=${userData[0].id}&password=${password}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          setNotValid(true);
          return;
        } else {
          localStorage.setItem("currentUser", JSON.stringify(userData[0]));
          window.location.pathname = `/users/${userData[0].id}`;
        }
      });
  }

  return (
    <>
      <div id="form">
        <h3>Login here</h3>
        <label className="label" htmlFor="username">
          Username
        </label>
        <input
          type="text"
          placeholder="Enter your user name"
          id="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label className="label" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          placeholder="Enter your password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button id="logBtn" onClick={checkPassward}>
          Log In
        </button>
        <br /> <br /> <br />
        <Link to="/register" id="link">
          Don`t have an account?
        </Link>
        {notValid && <h3>Invalid username or password</h3>}
      </div>
    </>
  );
}
