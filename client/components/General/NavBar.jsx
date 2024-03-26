import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

function NavBar() {
    const [userIn, setUserIn] = useState(0);
    const location = useLocation();
    let id;
    useEffect(() => {
        let json = localStorage.getItem('currentUser');
        if (json) {
            setUserIn(JSON.parse(json)?.id);
        }
        else {
            setUserIn(0);
        }
    }, [location.pathname]);
    return (
        <nav>
            <h2 className='h2title'>.NET</h2>
            {userIn != 0 && <>
                <h4 ><NavLink to={`/${userIn}`}>Home</NavLink></h4>
                <h4 ><NavLink to={`/${userIn}/todos`}>Todos</NavLink></h4>
                <h4 ><NavLink to={`/${userIn}/posts`}>Posts</NavLink></h4>
                <h4 ><NavLink to={`/${userIn}/info`}>Info</NavLink></h4></>
            }
        </nav>
    )
}

export default NavBar