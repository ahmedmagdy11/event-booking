import React, { useContext } from "react";
import AuthContext from "../context/authContext";
import UserBookings from "../componenets/userBookings/userBookings"
const Bookings = () => {
  const { authData, setAuthData } = useContext(AuthContext);

    if (authData.token){
        return (<UserBookings/>)
    }
    return (<h1>not Authorized</h1>)
};

export default Bookings;
