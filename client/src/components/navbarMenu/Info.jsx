/* eslint-disable no-unused-vars */
import React from "react";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import "./Info.css";
export default function Info() {
  // const navigate = useNavigate();
  const information = localStorage.getItem("currentUser");
  // useEffect(() => {
  //   if (information == null) navigate("/login");
  // }, []);
  const parsedData = JSON.parse(information);

  return (
    <div className="infoContaner">
      <h2 id="userTitle">User Details</h2>
      <p>
        <b>ID: </b> {parsedData.id}
      </p>
      <p>
        <b>Name: </b> {parsedData.name}
      </p>
      <p>
        <b>Username: </b> {parsedData.username}
      </p>
      <p>
        <b>Email: </b> {parsedData.email}
      </p>
      <p>
        <b>City: </b> {parsedData.city}
      </p>

      <p>
        <b>Phone:</b> {parsedData.phone}
      </p>
      <p>
        <b>Website:</b> {parsedData.website}
      </p>

      <p>
        <b>Company Name:</b> {parsedData.companyName}
      </p>
    </div>
  );
}
