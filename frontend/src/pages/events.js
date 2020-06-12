import React, { useContext } from "react";
import AuthContext from "../context/authContext";
import LoadEvents from "../componenets/allEvents";
import CreateEvent from "../componenets/createEvent/createEvent"
const Events = () => {
  const { authData, setAuthData } = useContext(AuthContext);
  console.log(authData);

  if (authData.token) {
    return (
      <React.Fragment>
          <CreateEvent />
        <LoadEvents />
        
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <LoadEvents />
    </React.Fragment>
  );
};

export default Events;
