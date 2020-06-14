import React, { useContext , useState, useEffect } from "react";
import AuthContext from "../context/authContext";

import LoadEvents from "../componenets/allEvents/allEvents"
import CreateEvent from "../componenets/createEvent/createEvent"
const Events = () => {
  const { authData, setAuthData } = useContext(AuthContext);
  console.log(authData);
  const [created , setCreated] = useState(false);
  if (authData.token) {
    return (
      <React.Fragment >
          <CreateEvent updateCreated={()=>{
            setCreated(true)
            console.log("this is called")
          }} />
   
        <LoadEvents created={created}/>
        
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
