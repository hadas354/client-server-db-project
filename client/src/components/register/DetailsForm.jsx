import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./DetailsForm.css";

const UserForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const username = state?.username || "";
  const password = state?.password || "";
  const [formData, setFormData] = useState({
    name: "",
    username: username,
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: "",
      },
    },
    phone: "",
    website: password,
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleAddressChange (e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        [name]: value,
      },
    }));
  }

  function handleGeoChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        geo: {
          ...prevData.address.geo,
          [name]: value,
        },
      },
    }));
  }

  function handleCompanyChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      company: {
        ...prevData.company,
        [name]: value,
      },
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    enterNewUser();
  }

  async function enterNewUser() {
    const response = await fetch("http://localhost:3305/users", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).catch((error) => {
      console.log("Error:", error);
    });
    const json_response = await response.json();
    localStorage.setItem("currentUser", JSON.stringify(json_response));
    navigate(`/users/${json_response.id}`);
  }

  return (
    <div id="detForm">
      <form onSubmit={handleSubmit}>
        <h3 id="titleDet">{username} please complite your profile</h3>
        <label>
          Name:
          <br />
          <input
            className="inputDet"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            pattern="[A-Za-z]+"
            maxLength="20"
            required
          />
        </label>
        <br />
        <label>
          Email:
          <br />
          <input
            className="inputDet"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
            required
          />
        </label>
        <br />
        <label>
          Street:
          <br />
          <input
            className="inputDet"
            type="text"
            name="street"
            value={formData.address.street}
            onChange={handleAddressChange}
          />
        </label>
        <br />
        <label>
          City:
          <br />
          <input
            className="inputDet"
            type="text"
            name="city"
            value={formData.address.city}
            onChange={handleAddressChange}
            required
          />
        </label>
        <br />
        <label>
          Zipcode:
          <br />
          <input
            className="inputDet"
            type="text"
            name="zipcode"
            value={formData.address.zipcode}
            onChange={handleAddressChange}
          />
        </label>
        <br />
        <label>
          Geography latitude:
          <br />
          <input
            className="inputDet"
            type="text"
            name="lat"
            value={formData.address.geo.lat}
            onChange={handleGeoChange}
          />
        </label>
        <br />
        <label>
          Geography longitude:
          <br />
          <input
            className="inputDet"
            type="text"
            name="lng"
            value={formData.address.geo.lng}
            onChange={handleGeoChange}
          />
        </label>
        <br />
        <label>
          Phone:
          <br />
          <input
            className="inputDet"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            pattern="[0-9]{10}"
            required
          />
        </label>
        <br />
        <label>
          Conpany name:
          <br />
          <input
            className="inputDet"
            type="text"
            name="name"
            value={formData.company.name}
            onChange={handleCompanyChange}
            required
          />
        </label>
        <br />
        <label>
          Conpany catchPhrase:
          <br />
          <input
            className="inputDet"
            type="text"
            name="catchPhrase"
            value={formData.company.catchPhrase}
            onChange={handleCompanyChange}
          />
        </label>
        <br />
        <label>
          Conpany bs:
          <br />
          <input
            className="inputDet"
            type="text"
            name="bs"
            value={formData.company.bs}
            onChange={handleCompanyChange}
          />
        </label>
        <br />
        <button type="submit" id="submitDet">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
