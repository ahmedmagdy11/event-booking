import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import AuthContext from "../../context/authContext";
import "../navBar/navBar.css";
const MainNav = (props) => {
  const { authData, setAuthData } = useContext(AuthContext);
  const logout = () => {
    setAuthData({
      token: null,
      userID: null,
    });
  };
  return (
    <header className="topnav">
      <div>
        <h1>Event Booking app</h1>
      </div>
      <nav>
        <NavLink to="/auth">Authentication</NavLink>

        <NavLink to="/events">Events</NavLink>

        <NavLink to="/Bookings">Bookings</NavLink>

        {authData.token && <button onClick={logout}>logout</button>}
      </nav>
    </header>
  );
};

export default MainNav;
