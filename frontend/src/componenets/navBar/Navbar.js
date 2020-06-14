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
        {!authData.token && <NavLink to="/auth">Authentication</NavLink>}

        <NavLink to="/events">Events</NavLink>

        {authData.token && (
          <React.Fragment>
            {" "}
            <NavLink to="/Bookings">Bookings</NavLink>
            <button onClick={logout}>logout</button>{" "}
          </React.Fragment>
        )}
      </nav>
    </header>
  );
};

export default MainNav;
