import React, { useContext } from 'react'
import {NavLink} from 'react-router-dom'

import AuthContext from "../context/authContext"
const MainNav =(props)=>{
    const {authData ,setAuthData } = useContext(AuthContext)
    const logout=()=>{
        setAuthData({
            token:null,
            userID:null
        })
    }
    return(

        <header>
            <div className="main_navigation_logo">
                <h1>Event Booking app</h1>
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/auth">Authentication</NavLink>
                    </li>
                    <li>
                       <NavLink to="/events">Events</NavLink> 
                    </li>
                    <li>
                        <NavLink to="/Bookings">Bookings</NavLink>
                    </li>
                   { authData.token && (<li>
                        <button onClick={logout}>logout</button>
                    </li>)}
                </ul>
            </nav>
        </header>
    )

}

export default MainNav