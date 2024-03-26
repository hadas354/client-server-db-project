import React from 'react'
import './infoStyle.css'
function Info() {
    const currentuser = JSON.parse(localStorage.getItem('currentUser'));
    return (
        <div>
            <h1>Hello, {currentuser.name}.</h1>
            <h3>What do we know about you? 🕵️</h3>
            <div style={{ fontWeight: 'bold' }} className='information'>
                <p>
                    id: {currentuser.id}<br />
                    name: {currentuser.name}<br />
                    username: {currentuser.username}<br />
                    email: {currentuser.email}<br />
                    city: {currentuser.city}<br />
                </p>
                <p>phone: {currentuser.phone}</p>
                <p>company: {currentuser.companyName}</p>
            </div>
        </div>
    )
}

export default Info
