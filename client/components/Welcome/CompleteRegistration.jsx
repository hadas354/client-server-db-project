import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function CompleteRegistration({ userName, password }) {
    const navigate = useNavigate();
    const [newUser, setNewUser] = useState({
        "name": "",
        "username": userName,
        "email": "",
        "address": {
            "street": "",
            "suite": "",
            "city": "",
            "zipcode": "",
            "geo": {
                "lat": "",
                "lng": ""
            }
        },
        "phone": "",
        "website": password,
        "company": {
            "name": "",
            "catchPhrase": "",
            "bs": ""
        }
    });

    function handleComplate() {
        fetch(`http://localhost:3305/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": newUser.name,
                "username": newUser.username,
                "email": newUser.email,
                "address": {
                    "street": newUser.address.street,
                    "suite": newUser.address.suite,
                    "city": newUser.address.city,
                    "zipcode": newUser.address.zipcode,
                    "geo": {
                        "lat": newUser.address.geo.lat,
                        "lng": newUser.address.geo.lng
                    }
                },
                "phone": newUser.phone,
                "website": newUser.website,
                "company": {
                    "name": newUser.company.name,
                    "catchPhrase": newUser.company.catchPhrase,
                    "bs": newUser.company.bs
                }
            })
        })
            .then(response => response.json())
            .then(json => {
                localStorage.setItem("currentUser", JSON.stringify(json));
                navigate(`/${json.id}`);
            })
    }
    return (
        <>
            <div className='formCompleteDetails'>
                <h1 id='v'>✓</h1>
                <h2>Fill in all your details to register:</h2>
                <input
                    type="text"
                    placeholder="name"
                    value={newUser.name}
                    onChange={(e) => setNewUser(u => { return { ...u, name: e.target.value } })}
                />
                <input
                    type="email"
                    placeholder="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser(u => { return { ...u, email: e.target.value } })}
                />
                <input
                    type="text"
                    placeholder="phone"
                    value={newUser.phone}
                    onChange={(e) => setNewUser(u => { return { ...u, phone: e.target.value } })}
                />
                <input
                    type="text"
                    placeholder="fullName"
                    value={newUser.name}
                    onChange={(e) => setNewUser(u => { return { ...u, name: e.target.value } })}
                />
                <input
                    type="text"
                    placeholder="street"
                    value={newUser.address.street}
                    onChange={(e) => setNewUser(u => { return { ...u, address: { ...u.address, street: e.target.value } } })}
                />
                <input
                    type="text"
                    placeholder="suite"
                    value={newUser.address.suite}
                    onChange={(e) => setNewUser(u => { return { ...u, address: { ...u.address, suite: e.target.value } } })}
                />
                <input
                    type="text"
                    placeholder="city"
                    value={newUser.address.city}
                    onChange={(e) => setNewUser(u => { return { ...u, address: { ...u.address, city: e.target.value } } })}
                />
                <input
                    type="text"
                    placeholder="zipcode"
                    value={newUser.address.zipcode}
                    onChange={(e) => setNewUser(u => { return { ...u, address: { ...u.address, zipcode: e.target.value } } })}
                />
                <input
                    type="text"
                    placeholder="geo - lat"
                    value={newUser.address.geo.lat}
                    onChange={(e) => setNewUser(u => { return { ...u, address: { ...u.address, geo: { ...u.address.geo, lat: e.target.value } } } })}
                />
                <input
                    type="text"
                    placeholder="geo - lng"
                    value={newUser.address.geo.lng}
                    onChange={(e) => setNewUser(u => { return { ...u, address: { ...u.address, geo: { ...u.address.geo, lng: e.target.value } } } })}
                />
                <input
                    type="text"
                    placeholder="companyName"
                    value={newUser.company.name}
                    onChange={(e) => setNewUser(u => { return { ...u, company: { ...u.company, name: e.target.value } } })}
                />
                <input
                    type="text"
                    placeholder="catchPhrase"
                    value={newUser.company.catchPhrase}
                    onChange={(e) => setNewUser(u => { return { ...u, company: { ...u.company, catchPhrase: e.target.value } } })}
                />
                <input
                    type="text"
                    placeholder="bs"
                    value={newUser.bs}
                    onChange={(e) => setNewUser(u => { return { ...u, company: { ...u.company, bs: e.target.value } } })}
                />
                <button onClick={handleComplate}>Complete Sign Up</button>
            </div>
        </>
    )
}

export default CompleteRegistration
