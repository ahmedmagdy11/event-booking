import React from 'react'
import {NavLink} from 'react-router-dom'


const MainNav =(props)=>{

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
                </ul>
            </nav>
        </header>
    )

}

export default MainNav